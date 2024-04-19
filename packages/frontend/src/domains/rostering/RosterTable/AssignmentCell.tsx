import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import {
  PersonSummaryDTO,
  RoleDTO,
  RosterAssignedDTO,
  RosterDTOEventsInner,
} from "core/api/generated";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { NewShowModalProps, useModal } from "core/components/Modal/Modal";
import { Td } from "core/components/tables/tables";
import { showToastError } from "core/utils/errors";
import {
  getPersonDisplayName,
  PersonDisplayName,
} from "domains/personnel/PersonDisplayName";
import { PersonSelectorModal } from "domains/personnel/PersonSelector/PersonSelectorModal";
import { getBgColorForRoster } from "domains/rostering/helpers";
import React, { useState } from "react";

import { colorCodednameComponent } from "./ColorCodedName";
import { ShadowSelector } from "./ShadowSelector";

export const AssignmentCell: React.FC<{
  assignment: RosterAssignedDTO;
  showId: number;
  event: RosterDTOEventsInner;
  role: RoleDTO;
}> = ({ assignment, showId, event, role }) => {
  const assignedPeopleRequest = useQuery(["assigned-people", showId], () =>
    api.personnelAssignedGet({ showId: showId })
  );

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
      people={assignedPeopleRequest.data?.people}
      onChangeAssigned={handleChange}
      isLoading={changeAssignmentMutation.isLoading}
      role={role}
    />
  );
};

export const PureAssignmentCell: React.FC<{
  assignment: RosterAssignedDTO;
  event: RosterDTOEventsInner;
  people?: PersonSummaryDTO[];
  onChangeAssigned: (personId: string) => void;
  isLoading?: boolean;
  role: RoleDTO;
}> = ({ people, assignment, event, role }) => {
  let bgClassName = "";
  if (assignment.person?.id) {
    bgClassName = getBgColorForRoster(assignment.available);
  }
  const { Modal, open, close, isOpen } = useModal(false);

  const shadows = event.shadows?.[role.id as number] || [];
  const hasShadows = shadows.length > 0;

  return (
    <Td className={cc(bgClassName)} onClick={() => open()}>
      <div className="flex cursor-pointer">
        <div className="cover-box-container">
          {assignment?.cover && (
            <>
              <div className="cover-box bg-orange-400">
                <div className="cover-box-content">cover</div>
              </div>
            </>
          )}
        </div>
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
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis text-slate-500 text-xs w-40">
                    Shadows:{" "}
                    {shadows
                      .map((s) =>
                        getPersonDisplayName(s.person, {
                          firstNameOnly: true,
                        })
                      )
                      .join(", ")}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
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

export const AssignmentModal: React.FC<{
  isOpen: boolean;
  close: () => void;
  Modal: React.FC<NewShowModalProps>;
  event: RosterDTOEventsInner;
  role: RoleDTO;
  assignment: RosterAssignedDTO;
  people?: PersonSummaryDTO[];
}> = ({ isOpen, close, Modal, event, role, assignment, people }) => {
  const titleArray = [role.name, event.name].filter((i) => i);
  const title = titleArray.length === 0 ? "Assignment" : titleArray.join(" - ");

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
      queryClient.invalidateQueries({ queryKey: ["roster", event.showId] });
    },
  });

  const normalPersonAvailability =
    event.availabilities?.[role?.person?.id || ""]?.available;

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={title}
      dialogClassName="max-h-full"
    >
      {!people && <LoadingBox />}
      {people && (
        <>
          {role.person && (
            <p className="mb-2">
              Role normally assigned to:{" "}
              <PersonDisplayName person={role.person} />{" "}
              <span className="text-slate-500">
                ({getAvailabilityString(normalPersonAvailability)})
              </span>
            </p>
          )}

          <Cover
            mutation={changeAssignmentMutation}
            assignment={assignment}
            event={event}
            people={people}
            role={role}
          />
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

const Shadows: React.FC<{
  mutation: UseMutationResult<unknown, Error, string, unknown>;
  assignment: RosterAssignedDTO;
  event: RosterDTOEventsInner;
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
      <div className="font-semibold text-lg mt-2 mb-1">Shadows</div>
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
        />
      )}
    </>
  );
};

const Cover: React.FC<{
  mutation: UseMutationResult<unknown, Error, string, unknown>;
  assignment: RosterAssignedDTO;
  event: RosterDTOEventsInner;
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

  return (
    <>
      <div className="font-semibold text-lg mt-2 mb-1">Cover</div>
      {showAssignment && (
        <div className="flex items-center gap-2 justify-between">
          <div>
            <div>
              Covered by <PersonDisplayName person={assignment.person} />{" "}
            </div>
            <div className="text-slate-500">
              ({getAvailabilityString(coverAvailability)})
            </div>
          </div>
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

const getAvailabilityString = (available: undefined | boolean): string => {
  if (available === undefined) {
    return "availability is unknown";
  }
  if (available) {
    return "available";
  } else return "not available";
};
