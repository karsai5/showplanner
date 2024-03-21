import cc from 'classnames';
import { PersonSummaryDTO, RosterDTOEventsInner } from "core/api/generated";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { FC } from "react";


// eslint-disable-next-line react/display-name
export const colorCodednameComponent = (event: RosterDTOEventsInner): FC<{person: PersonSummaryDTO}> => ({person}) => {
  const availability = event.availabilities?.[person?.id || ''];
  return <p className={cc({
    ['line-through']: person.id && availability?.available === false,
    ['text-slate-300']: person.id && availability?.available === undefined || availability?.available === null,
  })}>
    <PersonDisplayName person={person} />
  </p>
}

