import { Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import cc from "classnames";
import { PersonSummaryDTO } from "core/api/generated";
import { useModal } from "core/components/Modal/Modal";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import React, { FC, useCallback, useMemo, useRef } from "react";
import { useEffect, useState } from "react";

type NameComponentType = FC<{ person: PersonSummaryDTO }>;

export const PersonSelectorModal: React.FC<{
  people: Array<PersonSummaryDTO>;
  onChange: (person: PersonSummaryDTO) => void;
  selectedPersonId: string | undefined;
  loading?: boolean;
  openOnLoad?: boolean;
  className?: string;
  nameComponent?: NameComponentType;
  placeholder?: string;
  onClose: () => void;
}> = ({
  people,
  onChange,
  loading,
  selectedPersonId,
  openOnLoad,
  className,
  placeholder,
  onClose,
  nameComponent: NameComponent = PersonDisplayName,
}) => {
  const { Modal } = useModal(true);

  const unassignedPerson: PersonSummaryDTO = useMemo(() => {
    return {
      id: "",
      firstName: placeholder || "Unassigned",
      lastName: "",
    };
  }, [placeholder]);

  const getSelectedPerson = useCallback(
    (people: Array<PersonSummaryDTO>, selectedPersonId: string | undefined) => {
      if (selectedPersonId) {
        const selectedPerson = people.find((p) => p.id === selectedPersonId);
        return selectedPerson || unassignedPerson;
      }
      return unassignedPerson;
    },
    [unassignedPerson]
  );

  const [selected, setSelected] = useState<PersonSummaryDTO | undefined>(
    getSelectedPerson(people, selectedPersonId)
  );
  const [query, setQuery] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (buttonRef.current && openOnLoad) {
      buttonRef.current?.click();
    }
  }, [buttonRef, openOnLoad]);

  useEffect(() => {
    setSelected(getSelectedPerson(people, selectedPersonId));
  }, [selectedPersonId, people, getSelectedPerson]);

  const handleChange = (person: PersonSummaryDTO) => {
    onChange(person);
  };

  const filteredPeople = [unassignedPerson];
  filteredPeople.push(
    ...(query === ""
      ? people
      : people.filter((person) =>
          `${person.preferredName || person.firstName} ${person.lastName}`
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        ))
  );

  const handleBlur = (open: boolean) => {
    if (selected && onChange && !open) {
      onChange(selected);
    }
  };

  const handleOnClick = (open: boolean) => {
    if (!open && buttonRef.current) {
      buttonRef.current.click();
    }
  };

  return (
    <div className="">
      <Modal close={() => onClose && onClose()} isOpen={true}>
        <Combobox value={selected} onChange={handleChange}>
          {({ open }) => (
            <div className="relative">
              <div className="relative">
                {loading && (
                  <div className="absolute top-0 left-0 right-0 bottom-0">
                    <div className="loading loading-spinner mt-3"></div>
                  </div>
                )}
                <Combobox.Input
                  className={cc(
                    "input w-full mb-4",
                    className ? className : "input-bordered"
                  )}
                  displayValue={(person: PersonSummaryDTO) =>
                    `${person.preferredName || person.firstName} ${
                      person.lastName
                    }`
                  }
                  onChange={(event) => setQuery(event.target.value)}
                  onClick={() => handleOnClick(open)}
                  onBlur={() => handleBlur(open)}
                />
                <Combobox.Button ref={buttonRef}></Combobox.Button>
              </div>
              <Combobox.Options className="h-60 overflow-y-auto" static>
                {filteredPeople.length === 0 && query !== "" ? (
                  <div
                    className="relative cursor-default select-none px-4 py-2 text-gray-700"
                    key="-1"
                  >
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person, i) => (
                    <Combobox.Option
                      key={i}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            <NameComponent person={person} />
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </div>
          )}
        </Combobox>
      </Modal>
    </div>
  );
};
