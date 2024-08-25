import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import cc from "classnames";
import { api_deprecated } from "core/api";
import {
  PersonSummaryDTO,
  RoleDTO,
  RosterAssignedDTO,
  RosterEventDTO,
} from "core/api/generated";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { NewShowModalProps, useModal } from "core/components/Modal/Modal";
import { ShortText } from "core/components/ShortText";
import { Indicator, Indicators } from "core/components/tables/Indicators";
import { Td } from "core/components/tables/tables";
import { showToastError } from "core/utils/errors";
import {
  getPersonDisplayName,
  PersonDisplayName,
} from "domains/personnel/PersonDisplayName";
import { PersonSelectorModal } from "domains/personnel/PersonSelector/PersonSelectorModal";
import { getBgColorForRoster } from "domains/rostering/helpers";
import React, { useEffect, useState } from "react";

import { colorCodednameComponent } from "./ColorCodedName";
import { ShadowSelector } from "./ShadowSelector";

export const AssignmentCell: React.FC<{
  assignment: RosterAssignedDTO;
  showId: number;
  event: RosterEventDTO;
  role: RoleDTO;
}> = ({ assignment, showId, event, role }) => {
  const assignedPeopleRequest = useQuery(["assigned-people", showId], () =>
    api_deprecated.personnelAssignedGet({ showId: showId })
  );

  const queryClient = useQueryClient();
  const changeAssignmentMutation = useMutation<unknown, Error, string>({
    mutationFn: (personId) => {
      if (personId === "" && assignment.assignmentId) {
        return api_deprecated.assignmentIdDelete({
          id: assignment.assignmentId,
        });
      }
      if (personId !== "") {
        if (assignment.assignmentId) {
          return api_deprecated.assignmentIdPut({
            id: assignment.assignmentId,
            assignment: {
              personId: personId,
            },
          });
        }
        return api_deprecated.assignmentPost({
          assignment: {
            eventId: event.id,
            personId: personId,
            roleId: role.id as number,
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
    },
  });

  const handleChange = (personId: string) => {
    changeAssignmentMutation.mutate(personId);
  };

  return (
    <PureAssignmentCell
      assignment={assignment}
      event={event}
      people={assignedPeopleRequest.data}
      onChangeAssigned={handleChange}
      isLoading={changeAssignmentMutation.isLoading}
      role={role}
    />
  );
};

export const PureAssignmentCell: React.FC<{
  assignment: RosterAssignedDTO;
  event: RosterEventDTO;
  people?: PersonSummaryDTO[];
  onChangeAssigned: (personId: string) => void;
  isLoading?: boolean;
  role: RoleDTO;
}> = ({ people, assignment, event, role }) => {
  const { Modal, open, close, isOpen } = useModal(false);
  let bgClassName = "";
  if (assignment.person?.id) {
    bgClassName = getBgColorForRoster(assignment.available);
  }

  return (
    <Td
      onClick={() => open()}
      className={cc(bgClassName, "relative p-0 cursor-pointer")}
    >
      <AssignmentDisplay
        assignment={assignment}
        shadows={event.shadows}
        roleId={role.id as number}
      />
      <AssignmentModal
        Modal={Modal}
        isOpen={isOpen}
        close={close}
        event={event}
        role={role}
        assignment={assignment}
        people={people}
      />
    </Td>
  );
};

export const AssignmentDisplay: React.FC<{
  assignment: RosterAssignedDTO;
  shadows: RosterEventDTO["shadows"];
  roleId: number;
}> = ({ assignment, shadows, roleId }) => {
  const shadowsForThisRole = shadows?.[roleId] || [];
  const hasShadows = shadowsForThisRole.length > 0;

  const indicators: Indicator[] = [];

  if (assignment.cover) {
    indicators.push({ content: "cover", className: "bg-orange-400" });
  }

  return (
    <div className="flex">
      <Indicators items={indicators} className="mr-1.5" />
      <div className="flex" tabIndex={0}>
        {!assignment.person?.id && (
          <span className="italic text-slate-400">Unassigned</span>
        )}
        {assignment.person?.id && (
          <>
            <div className="flex flex-col justify-center">
              <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                <PersonDisplayName
                  person={assignment.person}
                  className="block whitespace-nowrap text-ellipsis overflow-hidden w-32"
                />
              </div>
              {hasShadows && (
                <ShortText className="text-slate-500 text-xs w-40">
                  Shadows:{" "}
                  {shadowsForThisRole
                    .map((s) =>
                      getPersonDisplayName(s.person, {
                        firstNameOnly: true,
                      })
                    )
                    .join(", ")}
                </ShortText>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const AssignmentModal: React.FC<{
  isOpen: boolean;
  close: () => void;
  Modal: React.FC<NewShowModalProps>;
  event: RosterEventDTO;
  role: RoleDTO;
  assignment: RosterAssignedDTO;
  people?: PersonSummaryDTO[];
}> = ({ isOpen, close, Modal, event, role, assignment, people }) => {
  const queryClient = useQueryClient();
  const changeAssignmentMutation = useMutation<unknown, Error, string>({
    mutationFn: (personId) => {
      if (personId === "" && assignment.assignmentId) {
        return api_deprecated.assignmentIdDelete({
          id: assignment.assignmentId,
        });
      }
      if (personId !== "") {
        if (assignment.assignmentId) {
          return api_deprecated.assignmentIdPut({
            id: assignment.assignmentId,
            assignment: {
              personId: personId,
            },
          });
        }
        return api_deprecated.assignmentPost({
          assignment: {
            eventId: event.id,
            personId: personId,
            roleId: role.id as number,
          },
        });
      }
      return new Promise((res) => res(undefined));
    },
    onError: (e) => {
      showToastError("Could not update availability", e);
    },
    onSuccess: async () => {
      // NOTE: This should be optimised to just reload the cell instead of the whole table
      queryClient.invalidateQueries({ queryKey: ["roster", event.showId] });
    },
  });

  const normalPersonAvailability =
    event.availabilities?.[role?.person?.id || ""]?.available;

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={
        <>
          {role.name} {event.name && " - " + event.name}
          {role.person && (
            <span className="">
              {" - "}
              <PersonDisplayName person={role.person} />{" "}
              {normalPersonAvailability !== true && (
                <span className="text-slate-500 font-normal text-sm">
                  ({getAvailabilityString(normalPersonAvailability)})
                </span>
              )}
            </span>
          )}
        </>
      }
      dialogClassName="max-h-full"
    >
      {!people && <LoadingBox />}
      {people && (
        <>
          <Cover
            mutation={changeAssignmentMutation}
            assignment={assignment}
            event={event}
            people={people}
            role={role}
          />
          <div className="divider py-2 my-2"></div>
          <Shadows
            role={role}
            mutation={changeAssignmentMutation}
            assignment={assignment}
            event={event}
            people={people}
          />
        </>
      )}
    </Modal>
  );
};

const Cover: React.FC<{
  mutation: UseMutationResult<unknown, Error, string, unknown>;
  assignment: RosterAssignedDTO;
  event: RosterEventDTO;
  people?: PersonSummaryDTO[];
  role: RoleDTO;
}> = ({ mutation, assignment, event, people, role }) => {
  const coverAvailability = assignment.cover
    ? event.availabilities?.[assignment.person.id]?.available
    : undefined;
  const [showPersonSelector, setShowPersonSelector] = useState(false);
  const handleChange = (person: PersonSummaryDTO) => {
    mutation.mutate(person.id, {
      onSuccess: () => setShowPersonSelector(false),
    });
  };
  const selectedPersonId = assignment?.cover
    ? assignment?.person?.id
    : undefined;
  const filteredPeople = people?.filter((p) => p.id != role?.person?.id) || [];

  const showAssignment =
    assignment.cover || (!role.person && assignment.person);

  useEffect(() => {
    // Auto open selector if no one is assigned to role
    if (!role?.person && !assignment.person.id) {
      setShowPersonSelector(true);
    }
  }, [role.person, assignment.person]);

  return (
    <>
      {showAssignment && (
        <div className="flex items-center gap-2 justify-between">
          <span>
            <PersonDisplayName person={assignment.person} />{" "}
            {coverAvailability !== true && (
              <div className="text-slate-500">
                ({getAvailabilityString(coverAvailability)})
              </div>
            )}
          </span>
          <div className="mt-2 flex">
            <button
              className="btn btn-outline"
              onClick={() => setShowPersonSelector(true)}
            >
              <PencilIcon className="w-6 h-6" />
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => mutation.mutate("")}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      {!showAssignment && (
        <button
          className="btn btn-block btn-outline"
          onClick={() => setShowPersonSelector(true)}
        >
          Assign Cover
        </button>
      )}
      {showPersonSelector && (
        <PersonSelectorModal
          onClose={() => setShowPersonSelector(false)}
          loading={mutation.isLoading}
          people={filteredPeople}
          nameComponent={colorCodednameComponent(event)}
          onChange={(p) => handleChange(p)}
          selectedPersonId={selectedPersonId}
        />
      )}
    </>
  );
};

const Shadows: React.FC<{
  mutation: UseMutationResult<unknown, Error, string, unknown>;
  assignment: RosterAssignedDTO;
  event: RosterEventDTO;
  role: RoleDTO;
  people?: PersonSummaryDTO[];
}> = ({ mutation, assignment, event, people, role }) => {
  const [showPersonSelector, setShowPersonSelector] = useState(false);
  const handleChange = (person: PersonSummaryDTO) => {
    mutation.mutate(person.id, {
      onSuccess: () => setShowPersonSelector(false),
    });
  };
  return (
    <>
      <ShadowSelector
        event={event}
        roleId={role.id as number}
        people={people}
      />
      {showPersonSelector && people && (
        <PersonSelectorModal
          loading={mutation.isLoading}
          people={people}
          onChange={(p) => handleChange(p)}
          selectedPersonId={assignment?.person?.id}
          onClose={() => setShowPersonSelector(false)}
        />
      )}
    </>
  );
};

const getAvailabilityString = (available: undefined | boolean): string => {
  if (available === undefined) {
    return "availability is unknown";
  }
  if (available) {
    return "available";
  } else return "not available";
};
