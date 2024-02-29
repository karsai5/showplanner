import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from 'core/api';
import { PersonSummaryDTO, RoleDTO } from 'core/api/generated';
import ErrorBox from 'core/components/ErrorBox/ErrorBox';
import Input from 'core/components/fields/TextInput';
import { PencilIcon } from 'core/components/Icons';
import { LoadingBox } from 'core/components/LoadingBox/LoadingBox';
import { showToastError } from 'core/utils/errors';
import { useShowSummary } from 'domains/shows/lib/summaryContext';
import { useEffect, useState } from 'react';
import { Fragment } from 'react'
import { useForm } from 'react-hook-form';

export const RolesTable: React.FC<{
  className?: string;
}> = ({ className }) => {
  const show = useShowSummary();
  const {
    isError,
    isLoading,
    data: roles,
  } = useQuery(['show-roles', show.id], () =>
    api.rolesGet({ showId: show.id }),
  );

  const { data: assignedPersonnel, isLoading: isLoadingPeople, isError: isErrorPeople } = useQuery(
    ['assigned-people', show.id],
    () => api.personnelAssignedGet({ showId: show.id }),
  );
  return (
    <div className={className}>
      {(isLoading || isLoadingPeople) && <LoadingBox />}
      {(isError || isErrorPeople) && <ErrorBox>Could not get roles</ErrorBox>}
      {!roles?.length && <p>No roles yet</p>}
      {roles && assignedPersonnel?.people && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((r) => (
              <tr key={r.id}>
                <td>
                  <RoleItem role={r} people={assignedPersonnel.people || []} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const RoleItem: React.FC<{
  role: RoleDTO;
  people: PersonSummaryDTO[];
}> = ({
  role,
  people,
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const mutation = useMutation<unknown, Error, string | undefined>({
      mutationFn: (personId) => {
        return api.rolesIdPut({
          id: role.id as number,
          roleDetails: {
            name: role.name,
            personId: personId || null,
          },
        });
      },
      onError: (e) => {
        showToastError('Something went wrong updating role.', e);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['show-roles'] });
      },
    });
    if (editMode) {
      return <RenameRole role={role} onClose={() => setEditMode(false)} />;
    }
    return (
      <div className="flex justify-between">
        <div>{role.name}</div>
        <div className="flex gap-2">
          <PersonSelector
            people={people}
            loading={mutation.isLoading}
            onChange={(person) => mutation.mutate(person.id)}
            selectedPersonId={role.person?.id}
          />
          <button className="btn" onClick={() => setEditMode(true)}>
            <PencilIcon />
          </button>
        </div>
      </div >
    );
  };

type Inputs = {
  name: string;
};

export const RenameRole: React.FC<{
  role: RoleDTO;
  onClose: () => void;
}> = ({ role, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: role.name,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, Inputs>({
    mutationFn: (inputs) => {
      return api.rolesIdPut({
        id: role.id as number,
        roleDetails: {
          name: inputs.name,
        },
      });
    },
    onError: (e) => {
      showToastError('Something went wrong updating role.', e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['show-roles'] });
      onClose();
    },
  });

  return (
    <form
      className="flex flex-row gap-2"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <Input
        register={register('name', { required: true })}
        placeholder="Name"
        errors={errors}
        showRequired
      />
      <button type="submit" className="btn btn-success">
        {mutation.isLoading && (
          <span className="loading loading-spinner"></span>
        )}
        Save
      </button>
      <button type="submit" className="btn" onClick={() => onClose()}>
        Cancel
      </button>
    </form>
  );
};

const unassignedPerson: PersonSummaryDTO = {
  id: undefined,
  firstName: 'Unassigned',
  lastName: '',
}

const PersonSelector: React.FC<{
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
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
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
