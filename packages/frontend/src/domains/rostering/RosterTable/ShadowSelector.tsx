import { Popover } from '@headlessui/react'
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { PersonSummaryDTO, RosterDTOEventsInner } from 'core/api/generated';
import { PersonDisplayName } from 'domains/personnel/PersonDisplayName';
import { PersonSelector } from 'domains/personnel/PersonSelector/PersonSelector';
import { FC } from 'react';
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
    return <Popover className="relative">
      <div className="indicator">
        {shadows.length > 0 &&
          <span className="indicator-item badge badge-default">{shadows.length}</span>}
        <Popover.Button className='btn btn-sm btn-ghost px-2'><UserPlusIcon className='h-6 w-6' /></Popover.Button>
      </div>
      <Popover.Panel as='li' className="absolute z-10 menu bg-white shadow-lg ring-1 ring-black/5 min-w-40 rounded-box">
        {shadows.map((s) => <div key={s.person.id}><PersonDisplayName person={s.person} /></div>)}
        <PersonSelector
          people={people}
          onChange={() => { }}
          selectedPersonId={undefined}
        />
      </Popover.Panel>
    </Popover>
  };
