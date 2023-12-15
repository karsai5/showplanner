import { useModal } from "core/components/Modal/Modal";
import React, { FC } from "react";

import { Person } from "../lib/types";
import { SelectablePersonList } from "./SelectablePersonList";

type Props = {
  onSelect: (person: Person, close: () => void) => void;
  loading?: boolean;
  title?: string;
  buttonText?: string;
  filter?: (person: Person) => boolean;
};

export const SelectPersonModal: FC<Props> = ({
  onSelect,
  loading,
  title,
  buttonText,
  filter,
}) => {
  const { Modal, open, close, isOpen } = useModal();

  return (
    <>
      <button className="btn btn-outline" onClick={open}>
        {" "}
        {buttonText || "Select Person"}{" "}
      </button>
      <Modal isOpen={isOpen} close={close} title={title || "Select Person"}>
        <SelectablePersonList
          loading={loading}
          onSelect={(person) => onSelect(person, close)}
          filter={filter}
        />
      </Modal>
    </>
  );
};
