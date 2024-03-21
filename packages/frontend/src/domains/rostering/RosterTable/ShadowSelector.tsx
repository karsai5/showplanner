import { TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { PersonSummaryDTO, RosterDTOEventsInner } from 'core/api/generated';
import { PersonDisplayName } from 'domains/personnel/PersonDisplayName';
import { PersonSelector } from 'domains/personnel/PersonSelector/PersonSelector';
import { FC, useState } from 'react';
import React from 'react';

export const ShadowSelector: FC<{
  event: RosterDTOEventsInner,
  roleId: number
  people: PersonSummaryDTO[],
}> = ({
  event,
  roleId,
  people
}) => {
    const shadows = event.shadows?.[roleId] || [];
    const [showPersonSelector, setShowPersonSelector] = useState(false);
    return <>
      <div className="dropdown dropdown-hover dropdown-open">
        <div tabIndex={0} role="button" className="btn btn-sm px-2 btn-ghost m-1 indicator">
          {shadows.length > 0 &&
            <span className="indicator-item badge badge-default">{shadows.length}</span>}
          <UserPlusIcon className='h-6 w-6' />
        </div>
        <div className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box">
          <div className="font-semibold text-lg mb-2">Shadows</div>
          <div className="mb-4">
            {shadows.map((s) =>
              <div key={s.person.id} className="flex justify-between items-center">
                <div><PersonDisplayName person={s.person} /></div>
                <button className="btn btn-ghost btn-sm -mr-2"><TrashIcon className="h-6 w-6 text-slate-500" /></button>
              </div>
            )}
            {shadows.length === 0 && <div>No shadows are assigned</div>}
          </div>
          {showPersonSelector ?
            <PersonSelector
              people={people}
              onChange={() => { }}
              selectedPersonId={undefined}
              placeholder='Assign Shadow'
              openOnLoad={true}
            />
            :
            <button className='btn btn-outline whitespace-nowrap w-52' onClick={() => setShowPersonSelector(true)}>Add Shadow</button>
          }
        </div>
      </div></>
  };
