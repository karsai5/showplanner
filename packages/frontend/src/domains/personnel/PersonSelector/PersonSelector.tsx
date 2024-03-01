import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { PersonSummaryDTO } from 'core/api/generated';
import { useEffect, useState } from 'react';
import { Fragment } from 'react'


const unassignedPerson: PersonSummaryDTO = {
  id: undefined,
  firstName: 'Unassigned',
  lastName: '',
}
export const PersonSelector: React.FC<{
  people: Array<PersonSummaryDTO>
  onChange?: (person: PersonSummaryDTO) => void
  loading?: boolean
  selectedPersonId?: string
}> = ({
  people,
  onChange,
  loading,
  selectedPersonId
}) => {
    const [selected, setSelected] = useState<PersonSummaryDTO | undefined>(undefined)
    const [query, setQuery] = useState('')

    useEffect(() => {
      if (selectedPersonId) {
        setSelected(people.find(p => p.id === selectedPersonId))
      } else {
        setSelected(unassignedPerson)
      }
    }, [selectedPersonId, people]);

    const handleChange = (person: PersonSummaryDTO) => {
      if (onChange) {
        onChange(person)
      } else {
        setSelected(person);
      }
    }

    const filteredPeople = [unassignedPerson];
    filteredPeople.push(
      ...(query === ''
        ? people
        : people.filter((person) =>
          `${person.firstName} ${person.lastName}`
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        ))
    )

    return (
      <div className="">
        <Combobox value={selected} onChange={handleChange}>
          <div className="relative">
            <div className="relative">
              <Combobox.Button>
                {loading && <div className="absolute top-0 left-0 right-0 bottom-0">
                  <div className="loading loading-spinner mt-3"></div>
                </div>}
                <Combobox.Input
                  className="input input-bordered"
                  displayValue={(person: PersonSummaryDTO) => `${person.firstName} ${person.lastName}`}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                {filteredPeople.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700" key="-1">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                              }`}
                          >
                            {person.firstName} {person.lastName}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                }`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
        </Combobox>
      </div>
    )
  }
