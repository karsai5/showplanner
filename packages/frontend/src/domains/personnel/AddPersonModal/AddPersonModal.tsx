import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "core/api";
import { PersonSearchResultDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import Input from "core/components/fields/TextInput";
import { useModal } from "core/components/Modal/Modal";
import { showToastError } from "core/utils/errors";
import useDebounce from "core/utils/useDebounce";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  search: string;
};

export const AddPersonModal: React.FC<{ showId: number }> = ({ showId }) => {
  const { Modal, open, close, isOpen } = useModal();
  const [searchString, setSearchString] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const [onChange] = useDebounce(() => {
    handleSubmit((data) => {
      setSearchString(data.search);
    })();
  }, 500);

  return (
    <>
      <button className="btn" onClick={() => open()}>
        Add person to show
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} close={close} title="Add person to show">
          <div className="min-h-60">
            <form onChange={onChange} className="relative">
              <Input
                register={register("search", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Search must be at least 3 characters",
                  },
                })}
                errors={errors}
                placeholder="Search"
              ></Input>
            </form>
            <ResultsTable searchString={searchString.trim()} showId={showId} />
          </div>
        </Modal>
      )}
    </>
  );
};

const ResultsTable: React.FC<{ searchString: string; showId: number }> = ({
  searchString,
  showId,
}) => {
  const queryClient = useQueryClient();
  const { data, isError, isFetching } = useQuery({
    queryKey: ["people-search", showId, searchString],
    queryFn: () => {
      return api.personnel.personnelSearchGet({ s: searchString, showId });
    },
    retry: false,
    enabled: !!searchString,
  });

  useEffect(() => {
    queryClient.invalidateQueries(["people-search", showId]);
  }, [queryClient, showId, searchString]);

  const mutation = useMutation<unknown, Error, string | undefined>({
    mutationFn: (personId) => {
      if (!personId) {
        throw new Error("Person id missing");
      }
      return api.rostering.invitationsPost({ showId, personId });
    },
    onError: (e) => {
      showToastError("Something went wrong inviting person to show.", e);
    },
    onSuccess: (_, personId) => {
      toast.success("Person added to show!");
      queryClient.invalidateQueries({ queryKey: ["assigned-people", showId] });
      queryClient.invalidateQueries({ queryKey: ["invitations", showId] });
      queryClient.setQueryData(
        ["people-search", showId, searchString],
        (oldData: PersonSearchResultDTO[] | undefined) => {
          if (!oldData) {
            return oldData;
          }
          return oldData.filter((p) => p.id !== personId);
        }
      );
    },
  });

  return (
    <div className="relative">
      {isFetching && (
        <span className="loading loading-spinner absolute -top-14 right-4" />
      )}
      {isError && <ErrorBox>Something went wrong</ErrorBox>}
      {data && data.length === 0 && <p>No people returned from search</p>}
      {data && data.length > 0 && (
        <table className="table">
          <tbody>
            {data.map((p) => {
              return (
                <tr key={p.id}>
                  <td>
                    <div className="flex justify-between items-center">
                      {p.name}
                      <button
                        className="btn"
                        onClick={() => mutation.mutate(p.id)}
                      >
                        Add to show
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
