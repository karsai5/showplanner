/* eslint-disable react/display-name */
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import {
  PersonSummaryDTO,
  RoleDTO,
  RosterDTOEventsInner,
} from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { useConfirmationModal } from "core/components/Modal/ConfirmationModal";
import { useModal } from "core/components/Modal/Modal";
import { GapRow, Td } from "core/components/tables/tables";
import { TimeRangeWithCurtainsUp } from "core/components/tables/TimeRangeWithCurtainsUp";
import {
  HasPermission,
  PERMISSION,
  showPermission,
  useHasPermission,
} from "core/permissions";
import { showToastError } from "core/utils/errors";
import { displayDate } from "domains/events/lib/displayDate";
import { processEvents } from "domains/events/lib/processEvents";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { PersonSelectorModal } from "domains/personnel/PersonSelector/PersonSelectorModal";
import { AddRoleModal } from "domains/rostering/AddRoleModal/AddRoleModal";
import { getBgColorForRoster } from "domains/rostering/helpers";
import { RenameRole } from "domains/rostering/RolesTable";
import sortBy from "lodash/sortBy";
import React, { Fragment, useState } from "react";

import { AssignmentCell, AssignmentDisplay } from "./AssignmentCell";

export const RosterTable: React.FC<{
  showId: number;
  showPastEvents?: boolean;
}> = ({ showId, showPastEvents }) => {
  const rosterRequest = useQuery(["roster", showId], () =>
    api.rosterGet({ showId: showId })
  );

  if (rosterRequest.isError) {
    return <ErrorBox>Could not get shows</ErrorBox>;
  }
  if (rosterRequest.isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (rosterRequest.data) {
    const roster = rosterRequest.data;
    const { dates, groupedEvents } = processEvents<RosterDTOEventsInner>(
      roster.events,
      !showPastEvents
    );
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th></th>
            <th></th>
            {roster.roles?.map((r) => (
              <RoleNameHeader
                key={r.id}
                role={r}
                showId={showId}
                roles={roster.roles as Array<RoleDTO>}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date, datei) => {
            const thisGroupEvents = sortBy(
              groupedEvents[date.date.toString()],
              "start",
              "curtainsUp"
            );
            return (
              <Fragment key={date.date.toString()}>
                {thisGroupEvents.map((e, i) => {
                  return (
                    <tr
                      key={e.id}
                      className="last:border-b first:border-t border-slate-200"
                    >
                      {i === 0 && (
                        <Td
                          className="whitespace-nowrap w-20"
                          rowSpan={thisGroupEvents.length}
                        >
                          {displayDate(e.start)}
                        </Td>
                      )}
                      <Td className="w-40 sticky left-0 bg-white z-30 pl-0">
                        <TimeRangeWithCurtainsUp event={e} />
                      </Td>
                      {roster.roles?.map((r) => {
                        if (r.id === undefined || e.assignments === undefined) {
                          throw new Error();
                        }
                        const a = e.assignments[r.id];
                        return (
                          <Cell
                            key={r.id}
                            assignment={a}
                            showId={showId}
                            event={e}
                            role={r}
                          />
                        );
                        return (
                          <AssignmentCell
                            assignment={a}
                            showId={showId}
                            event={e}
                            role={r}
                            key={r.id}
                          />
                        );
                      })}
                      <HasPermission
                        showId={showId}
                        permission={PERMISSION.rostering}
                      >
                        {i === 0 && datei === 0 && (
                          <Td
                            className="whitespace-nowrap"
                            rowSpan={
                              (roster.events?.length || 0) +
                              Object.keys(groupedEvents).length
                            }
                          >
                            <div className="flex justify-center">
                              <AddRoleModal
                                showId={showId}
                                className="btn-outline text-slate-500"
                              />
                            </div>
                          </Td>
                        )}
                      </HasPermission>
                    </tr>
                  );
                })}
                {date.gapAfter && <GapRow length={4} />}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }
  return null;
};

const Cell: React.FC<React.ComponentProps<typeof AssignmentCell>> = (props) => {
  const { assignment, event, role } = props;
  const hasRosteringPermission = useHasPermission()(
    showPermission(props.showId, PERMISSION.rostering)
  );
  if (hasRosteringPermission) {
    return <AssignmentCell {...props} />;
  }
  let bgClassName = "";
  if (assignment.person?.id) {
    bgClassName = getBgColorForRoster(assignment.available);
  }
  return (
    <Td className={cc(bgClassName, "relative p-0")}>
      <AssignmentDisplay
        assignment={assignment}
        shadows={event.shadows}
        roleId={role.id as number}
      />
    </Td>
  );
};

const enum ModalType {
  RENAME,
}

const RoleNameHeader: React.FC<
  React.ComponentProps<typeof ReadOnlyRoleNameHeader> &
    React.ComponentProps<typeof EditableRoleNameHeader>
> = (props) => {
  const hasRosteringPermission = useHasPermission()(
    showPermission(props.showId, PERMISSION.rostering)
  );
  if (hasRosteringPermission) {
    return <EditableRoleNameHeader {...props} />;
  }
  return <ReadOnlyRoleNameHeader {...props} />;
};

const ReadOnlyRoleNameHeader: React.FC<{
  role: RoleDTO;
}> = ({ role }) => {
  return (
    <th className="sticky top-0 bg-white z-40">
      <div className="flex gap-2 justify-between">
        <div>
          <div>{role.name}</div>
          {role.person && <PersonDisplayName person={role.person} />}
        </div>
      </div>
    </th>
  );
};

const EditableRoleNameHeader: React.FC<{
  role: RoleDTO;
  showId: number;
  roles: RoleDTO[];
}> = ({ role, showId, roles }) => {
  const confirmationModal = useConfirmationModal();
  const queryClient = useQueryClient();
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const { isOpen, open, close, Modal } = useModal();
  const [showAssigmentModal, setShowAssigmentModal] = useState(false);

  const openAndSetModal = (type: ModalType) => {
    setModalType(type);
    open();
  };

  const deleteRole = useMutation<unknown, Error>({
    mutationFn: () => {
      return api.rolesIdDelete({
        id: role.id as number,
      });
    },
    onError: (e) => {
      showToastError("Something went wrong deleting role.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roster"] });
    },
  });

  const unassignRole = useMutation<unknown, Error>({
    mutationFn: () => {
      return api.rolesIdPut({
        id: role.id as number,
        roleDetails: {
          name: role.name,
          personId: null,
        },
      });
    },
    onError: (e) => {
      showToastError("Something went wrong updating role.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roster"] });
    },
  });

  const handleDelete = () => {
    confirmationModal(
      "Delete role",
      `Are you sure you want to delete the role of "${role.name}"?`,
      () => deleteRole.mutate()
    );
  };

  return (
    <th className="sticky top-0 bg-white z-40">
      <div className="flex gap-2 justify-between">
        <div>
          <div>{role.name}</div>
          {role.person && <PersonDisplayName person={role.person} />}
          {unassignRole.isLoading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </div>
        <Menu className="dropdown dropdown-open" as="div">
          <MenuButton className="btn btn-sm btn-ghost">
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52"
            as="ul"
            unmount={false}
          >
            <MenuItem as="li">
              <button onClick={() => openAndSetModal(ModalType.RENAME)}>
                Rename
              </button>
            </MenuItem>
            {!role.person && (
              <MenuItem as="li">
                <button onClick={() => setShowAssigmentModal(true)}>
                  Assign to person
                </button>
              </MenuItem>
            )}
            {role.person && (
              <>
                <MenuItem as="li">
                  <button onClick={() => setShowAssigmentModal(true)}>
                    Reassign
                  </button>
                </MenuItem>
                <MenuItem as="li">
                  <button onClick={() => unassignRole.mutate()}>
                    Unassign
                  </button>
                </MenuItem>
              </>
            )}
            <MenuItem as="li">
              <button onClick={() => handleDelete()}>Delete role</button>
            </MenuItem>
          </MenuItems>
          {isOpen && (
            <Modal isOpen={isOpen} close={() => close()}>
              {modalType === ModalType.RENAME && (
                <RenameRole role={role} onClose={() => close()} />
              )}
            </Modal>
          )}
          {showAssigmentModal && (
            <AssignRole
              role={role}
              showId={showId}
              onClose={() => setShowAssigmentModal(false)}
              roles={roles}
            />
          )}
        </Menu>
      </div>
    </th>
  );
};

const AssignRole: React.FC<{
  role: RoleDTO;
  showId: number;
  onClose: () => void;
  roles: RoleDTO[];
}> = ({ role, showId, onClose, roles }) => {
  const { data, isLoading } = useQuery(["assigned-people", showId], () =>
    api.personnelAssignedGet({ showId: showId })
  );
  const queryClient = useQueryClient();

  const assignRole = useMutation<unknown, Error, string | null>({
    mutationFn: (personId) => {
      if (personId === "") {
        personId = null;
      }
      return api.rolesIdPut({
        id: role.id as number,
        roleDetails: {
          name: role.name,
          personId: personId,
        },
      });
    },
    onError: (e) => {
      showToastError("Something went wrong updating role.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roster"] });
      onClose();
    },
  });

  return (
    <>
      <PersonSelectorModal
        loading={isLoading}
        people={data?.people || []}
        selectedPersonId={role.person?.id}
        onChange={(person) => assignRole.mutate(person.id)}
        nameComponent={nameComponentThatShowsExistingRoles(roles)}
        onClose={() => onClose()}
      />
    </>
  );
};

const nameComponentThatShowsExistingRoles =
  (roles: RoleDTO[]): React.FC<{ person: PersonSummaryDTO }> =>
  ({ person }) => {
    const assignedRoles = roles.filter((r) => r.person?.id === person.id);
    return (
      <p className={cc({})}>
        <PersonDisplayName person={person} />
        {assignedRoles.length > 0 && (
          <div className="text-xs text-slate-400">
            Already assigned: {assignedRoles.map((r) => r.name).join(", ")}
          </div>
        )}
      </p>
    );
  };
