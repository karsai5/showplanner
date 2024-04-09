import { Popover } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import {
  PersonSummaryDTO,
  RosterAssignedDTO,
  RosterDTOEventsInner,
} from "core/api/generated";
import { Td } from "core/components/tables/tables";
import { Toggle } from "core/toggles/toggles";
import { showToastError } from "core/utils/errors";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { PersonSelector } from "domains/personnel/PersonSelector/PersonSelector";
import { getBgColorForRoster } from "domains/rostering/helpers";
import { KeyboardEventHandler, ReactNode } from "react";
import React, { useState } from "react";

import { colorCodednameComponent } from "./ColorCodedName";
import { ShadowSelector } from "./ShadowSelector";

export const AssignmentCell: React.FC<{
  assignment: RosterAssignedDTO;
  showId: number;
  event: RosterDTOEventsInner;
  roleId: number;
}> = ({ assignment, showId, event, roleId }) => {
  const assignedPeopleRequest = useQuery(["assigned-people", showId], () =>
    api.personnelAssignedGet({ showId: showId })
  );

  const [showPersonDropdown, setShowPersonDropdown] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const changeAssignmentMutation = useMutation<unknown, Error, string>({
    mutationFn: (personId) => {
      if (personId === "" && assignment.assignmentId) {
        return api.assignmentIdDelete({ id: assignment.assignmentId });
      }
      if (personId !== "") {
        if (assignment.assignmentId) {
          return api.assignmentIdPut({
            id: assignment.assignmentId,
            assignment: {
              personId: personId,
            },
          });
        }
        return api.assignmentPost({
          assignment: {
            eventId: event.id,
            personId: personId,
            roleId,
          },
        });
      }
      return new Promise((res) => res(undefined));
    },
    onError: (e) => {
      showToastError("Could not update availability", e);
    },
    onSuccess: async () => {
      // TODO: This should be optimised to just reload the cell instead of the whole table
      queryClient.invalidateQueries({ queryKey: ["roster", showId] });
      setShowPersonDropdown(false);
    },
  });

  const handleChange = (personId: string) => {
    if (personId === assignment.person.id) {
      setShowPersonDropdown(false);
    } else {
      changeAssignmentMutation.mutate(personId);
    }
  };

  return (
    <PureAssignmentCell
      assignment={assignment}
      event={event}
      people={assignedPeopleRequest.data?.people}
      onChangeAssigned={handleChange}
      isLoading={changeAssignmentMutation.isLoading}
      showPersonDropdown={showPersonDropdown}
      setShowPersonDropdown={setShowPersonDropdown}
    >
      <Toggle toggle="availabilities_shadow_menu">
        <ShadowSelector
          event={event}
          roleId={roleId}
          people={assignedPeopleRequest.data?.people}
        />
      </Toggle>
      <Toggle toggle="availabilities_menu">
        <Popover className="relative">
          <Popover.Button className="btn btn-sm btn-ghost px-2">
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </Popover.Button>
          <Popover.Panel
            as="li"
            className="absolute z-10 menu bg-white shadow-lg ring-1 ring-black/5 w-40 rounded-box"
          >
            <li>
              <a>Assign Shadow</a>
            </li>
            <li>
              <a>Role Not Required</a>
            </li>
          </Popover.Panel>
        </Popover>
      </Toggle>
    </PureAssignmentCell>
  );
};

export const PureAssignmentCell: React.FC<{
  assignment: RosterAssignedDTO;
  event: RosterDTOEventsInner;
  people?: PersonSummaryDTO[];
  onChangeAssigned: (personId: string) => void;
  showPersonDropdown: boolean;
  setShowPersonDropdown: (show: boolean) => void;
  isLoading?: boolean;
  children?: ReactNode;
}> = ({
  people,
  onChangeAssigned,
  showPersonDropdown,
  setShowPersonDropdown,
  assignment,
  event,
  isLoading,
  children = null,
}) => {
  let bgClassName = "";
  if (assignment.person?.id) {
    bgClassName = getBgColorForRoster(assignment.available);
  }

  const handleKeyPress: KeyboardEventHandler = (event) => {
    if (event.code === "Space") {
      setShowPersonDropdown(true);
    }
  };

  return (
    <Td className={cc(bgClassName, "relative min-w-46")}>
      <div className="flex justify-between items-center">
        {!showPersonDropdown && (
          <div
            className="flex cursor-pointer w-24 flex-1"
            onClick={() => setShowPersonDropdown(true)}
            onKeyDown={handleKeyPress}
            tabIndex={0}
          >
            {!assignment.person?.id && (
              <span className="italic text-slate-400">Unassigned</span>
            )}
            {assignment.person?.id && (
              <>
                {assignment.cover && (
                  <>
                    <div className="w-5"></div>
                    <div className="cover-box bg-orange-400">cover</div>
                  </>
                )}
                <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                  <PersonDisplayName person={assignment.person} />
                </div>
              </>
            )}
          </div>
        )}
        {showPersonDropdown && people && (
          <PersonSelector
            loading={isLoading}
            people={people}
            selectedPersonId={assignment.person.id}
            onChange={(p) => onChangeAssigned(p.id)}
            openOnLoad={true}
            nameComponent={colorCodednameComponent(event)}
          />
        )}
        {children}
      </div>
    </Td>
  );
};
