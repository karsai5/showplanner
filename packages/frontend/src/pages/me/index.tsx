import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import dayjs from "dayjs";
import NewPersonForm from "domains/personnel/NewPersonForm/NewPersonForm";

const MePage: React.FC = () => {
  const { isLoading, isError, data, refetch, isRefetching } = useQuery(
    ["medetails"],
    () => api.personnel.meDetailsGet()
  );
  return (
    <div>
      {(isLoading || isRefetching) && <LoadingBox />}
      {isError && <ErrorBox>Could not get your details</ErrorBox>}
      {data && !isRefetching && (
        <NewPersonForm
          onSuccess={refetch}
          initialData={{
            firstname: data.firstName,
            lastname: data.lastName,
            pronoun: data.pronouns,
            preferredName: data.preferredName,
            wwc: data._private?.wwc || undefined,
            phone: data._private?.phone,
            dob: data._private?.dob
              ? dayjs(data._private.dob).format("YYYY-MM-DD")
              : undefined,
            allergies: data._private?.allergies,
            emergencyName: data._private?.emergencyContact?.name,
            emergencyPhone: data._private?.emergencyContact?.phone,
            emergencyRelationship:
              data._private?.emergencyContact?.relationship,
          }}
        />
      )}
    </div>
  );
};

export default MePage;
