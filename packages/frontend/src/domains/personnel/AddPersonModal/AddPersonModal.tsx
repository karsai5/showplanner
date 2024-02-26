import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from 'core/api';
import ErrorBox from 'core/components/ErrorBox/ErrorBox';
import { LoadingBox } from 'core/components/LoadingBox/LoadingBox';
import { useModal } from 'core/components/Modal/Modal';
import { showToastError } from 'core/utils/errors';
import { toast } from 'react-toastify';

export const AddPersonModal: React.FC<{
  showId: number;
}> = ({ showId }) => {
  const { Modal, open, close, isOpen } = useModal();
  const { data, isLoading, isError } = useQuery(
    ['unassigned-people', showId],
    () => api.personnelAssignableGet({ showId: showId }),
  );

  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, string | undefined>({
    mutationFn: (personId) => {
      if (!personId) {
        throw new Error('Person id missing');
      }
      return api.personnelAssignPost({ showId: showId, personId: personId });
    },
    onError: (e) => {
      showToastError('Something went wrong adding person to show.', e);
    },
    onSuccess: () => {
      toast.success('Person added to show!');
      queryClient.invalidateQueries({
        queryKey: ['unassigned-people', showId],
      });
      queryClient.invalidateQueries({ queryKey: ['assigned-people', showId] });
    },
  });

  return (
    <>
      <button className="btn btn-sm" onClick={() => open()}>
        Add Person
      </button>
      <Modal isOpen={isOpen} close={close} title="Add person to show">
        {isLoading && <LoadingBox />}
        {isError && <ErrorBox>Something went wrong</ErrorBox>}
        {data?.people?.length === 0 && <p> No people available to add</p>}
        {data && (
          <table className="table">
            <tbody>
              {data.people?.map((p) => {
                return (
                  <tr key={p.id}>
                    <td>
                      {p.firstName} {p.lastName}
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => mutation.mutate(p.id)}
                      >
                        Add to show
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Modal>
    </>
  );
};
