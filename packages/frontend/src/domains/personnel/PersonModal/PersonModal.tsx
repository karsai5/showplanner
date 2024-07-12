import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import { PersonSummaryDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { Modal } from "core/components/Modal/Modal";
import { PersonCard } from "domains/personnel/PersonCard/PersonCard";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { useState } from "react";

export const PersonNameWithModal: React.FC<{ person: PersonSummaryDTO }> = ({
  person,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onClick={() => setIsOpen(true)} className="cursor-pointer">
      <PersonDisplayName person={person} />
      {isOpen && (
        <PersonModal
          personId={person.id}
          isOpen={isOpen}
          close={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const PersonModal: React.FC<{
  personId: string;
  close: () => void;
  isOpen: boolean;
}> = ({ close, isOpen, personId }) => {
  const {
    data: person,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["person", personId],
    queryFn: () =>
      api.personnel.personnelPeoplePersonIdGet({ personId: personId }),
  });
  return (
    <Modal close={close} isOpen={isOpen}>
      {isLoading && <LoadingBox />}
      {isError && <ErrorBox>Could not load persons details</ErrorBox>}
      {person && person._private && (
        <PersonCard person={person} privateDetails={person._private} />
      )}
    </Modal>
  );
};
