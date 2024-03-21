import { TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import cc from 'classnames';
import { api } from 'core/api';
import { PersonSummaryDTO, RosterDTOEventsInner } from 'core/api/generated';
import { showToastError } from 'core/utils/errors';
import { PersonDisplayName } from 'domains/personnel/PersonDisplayName';
import { PersonSelector } from 'domains/personnel/PersonSelector/PersonSelector';
import { FC, useState } from 'react';
import React from 'react';

import { colorCodednameComponent } from './ColorCodedName';

export const ShadowSelector: FC<{
  event: RosterDTOEventsInner,
  roleId: number
  people?: PersonSummaryDTO[],
}> = (props) => {
  const queryClient = useQueryClient();
  const createShadow = useMutation<unknown, Error, string>({
    mutationFn: (personId) => {
      if (personId === '') {
        return new Promise((res) => res(undefined));
      }

      return api.shadowPost({
        shadow: {
          eventId: props.event.id,
          roleId: props.roleId,
          personId,
        }
      });
    },
    onError: (e) => {
      showToastError('Something went wrong assigning shadow.', e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roster'] });
    },
  });

  const deleteShadow = useMutation<unknown, Error, number>({
    mutationFn: shadowId => api.shadowIdDelete({ id: shadowId }),
    onError: (e) => {
      showToastError('Something went wrong removing shadow.', e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roster'] });
    },
  });

  const handleSelection = (personId: string) => {
    createShadow.mutate(personId);
  }

  return <ShadowSelectorPure {...props}
    onChange={handleSelection}
    onDelete={(personId) => deleteShadow.mutate(personId)}
  />
};

export const ShadowSelectorPure: FC<{
  event: RosterDTOEventsInner,
  roleId: number
  people?: PersonSummaryDTO[],
  onChange: (personId: string) => void,
  onDelete: (shadowId: number) => void,
}> = ({
  event,
  roleId,
  people,
  onChange,
  onDelete
}) => {
    const shadows = event.shadows?.[roleId] || [];
    const [showPersonSelector, setShowPersonSelector] = useState(false);
    const filteredPeople = people?.filter(p => !shadows.find(s => s.person.id === p.id)) || [];
    return <>
      <div className="dropdown dropdown-hover dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm px-2 btn-ghost m-1 indicator">
          {shadows.length > 0 &&
            <span className="indicator-item badge badge-default">{shadows.length}</span>}
          <UserPlusIcon className='h-6 w-6 text-slate-500' />
        </div>
        <div className="dropdown-content z-50 menu p-4 shadow bg-base-100 rounded-box">
          <div className="font-semibold text-lg mb-2">Shadows</div>
          <div className="mb-4">
            {shadows.map((s) =>
              <div key={s.person.id} className="flex justify-between items-center">
                <div
                  className={cc({
                    ['line-through']: s.available === false,
                    ['text-slate-300']: s.available === null,
                  })}
                ><PersonDisplayName person={s.person} /></div>
                <button className="btn btn-ghost btn-sm -mr-2" onClick={() => onDelete(s.id)}><TrashIcon className="h-6 w-6 text-slate-500" /></button>
              </div>
            )}
            {shadows.length === 0 && <div>No shadows are assigned</div>}
          </div>
          {showPersonSelector ?
            <PersonSelector
              people={filteredPeople}
              onChange={p => onChange(p.id)}
              selectedPersonId={undefined}
              placeholder='Assign Shadow'
              openOnLoad={true}
              nameComponent={colorCodednameComponent(event)}
            />
            :
            <button className='btn btn-outline whitespace-nowrap w-52' onClick={() => setShowPersonSelector(true)}>Add Shadow</button>
          }
        </div>
      </div></>
  };
