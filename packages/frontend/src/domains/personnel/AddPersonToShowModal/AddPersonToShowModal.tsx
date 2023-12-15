import { useAddPersonToShowMutation } from "../lib/api";
import { SelectPersonModal } from "../SelectPersonModal/SelectPersonModal";

export const AddPersonToShowModal: React.FC<{ showId: string }> = ({
  showId,
}) => {
  const addPerson = useAddPersonToShowMutation();
  return (
    <SelectPersonModal
      buttonText="Add person"
      onSelect={(person, close) => {
        addPerson.mutate(
          { personId: person.id, showId: showId },
          {
            onSuccess: () => close(),
          }
        );
      }}
      loading={addPerson.isLoading}
      filter={(person) =>
        !person.shows.find((personShowId) => personShowId === showId)
      }
    />
  );
};
