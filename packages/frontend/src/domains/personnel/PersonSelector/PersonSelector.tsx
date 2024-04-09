import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import cc from "classnames";
import { PersonSummaryDTO } from "core/api/generated";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import React, { FC, useRef } from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";

type NameComponentType = FC<{ person: PersonSummaryDTO }>;

export const PersonSelector: React.FC<{
  people: Array<PersonSummaryDTO>;
  onChange: (person: PersonSummaryDTO) => void;
  loading?: boolean;
  selectedPersonId: string | undefined;
  openOnLoad?: boolean;
  className?: string;
  nameComponent?: NameComponentType;
  placeholder?: string;
}> = ({
  people,
  onChange,
  loading,
  selectedPersonId,
  openOnLoad,
  className,
  placeholder,
  nameComponent: NameComponent = PersonDisplayName,
}) => {
  const unassignedPerson: PersonSummaryDTO = {
    id: "",
    firstName: placeholder || "Unassigned",
    lastName: "",
  };

  const getSelectedPerson = (
    people: Array<PersonSummaryDTO>,
    selectedPersonId: string | undefined
  ) => {
    if (selectedPersonId) {
      const selectedPerson = people.find((p) => p.id === selectedPersonId);
      return selectedPerson || unassignedPerson;
    }
    return unassignedPerson;
  };

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
  }, [selectedPersonId, people]);

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
                  "input",
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
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
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
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
};
