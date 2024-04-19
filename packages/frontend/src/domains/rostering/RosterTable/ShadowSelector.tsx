import { TrashIcon } from "@heroicons/react/24/outline";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import { PersonSummaryDTO, RosterDTOEventsInner } from "core/api/generated";
import { showToastError } from "core/utils/errors";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { FC, useState } from "react";
import React from "react";

import { PersonSelectorModal } from "domains/personnel/PersonSelector/PersonSelectorModal";
import { colorCodednameComponent } from "./ColorCodedName";

export const ShadowSelector: FC<{
  event: RosterDTOEventsInner;
  roleId: number;
  people?: PersonSummaryDTO[];
}> = (props) => {
  const queryClient = useQueryClient();
  const createShadow = useMutation<unknown, Error, string>({
    mutationFn: (personId) => {
      if (personId === "") {
        return new Promise((res) => res(undefined));
      }

      return api.shadowPost({
        shadow: {
          eventId: props.event.id,
          roleId: props.roleId,
          personId,
        },
      });
    },
    onError: (e) => {
      showToastError("Something went wrong assigning shadow.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roster"] });
    },
  });

  const deleteShadow = useMutation<unknown, Error, number>({
    mutationFn: (shadowId) => api.shadowIdDelete({ id: shadowId }),
    onError: (e) => {
      showToastError("Something went wrong removing shadow.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roster"] });
    },
  });

  return (
    <ShadowSelectorPure
      {...props}
      onChange={createShadow}
      onDelete={deleteShadow}
      loading={createShadow.isLoading || deleteShadow.isLoading}
    />
  );
};

export const ShadowSelectorPure: FC<{
  event: RosterDTOEventsInner;
  roleId: number;
  people?: PersonSummaryDTO[];
  onChange: UseMutationResult<unknown, Error, string, unknown>;
  onDelete: UseMutationResult<unknown, Error, number, unknown>;
  loading?: boolean;
}> = ({ event, roleId, people, onChange, onDelete, loading }) => {
  const shadows = event.shadows?.[roleId] || [];
  const [showPersonSelector, setShowPersonSelector] = useState(false);
  const filteredPeople =
    people?.filter((p) => !shadows.find((s) => s.person.id === p.id)) || [];

  const handleChange = (person: PersonSummaryDTO) => {
    onChange.mutate(person.id, {
      onSuccess: () => setShowPersonSelector(false),
    });
  };

  return (
    <>
      <div className="mb-4">
        {shadows.map((s) => (
          <div key={s.person.id} className="flex justify-between items-center">
            <div
              className={cc({
                ["line-through"]: s.available === false,
                ["text-slate-300"]: s.available === null,
              })}
            >
              <PersonDisplayName person={s.person} />
            </div>
            <button
              className="btn btn-ghost"
              onClick={() => onDelete.mutate(s.id)}
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        ))}
        {shadows.length === 0 && <div>No shadows are assigned</div>}
      </div>
      {showPersonSelector && (
        <PersonSelectorModal
          loading={loading}
          people={filteredPeople}
          placeholder="Assign Shadow"
          onChange={(p) => handleChange(p)}
          nameComponent={colorCodednameComponent(event)}
          selectedPersonId={undefined}
        />
      )}
      <button
        className="btn btn-outline btn-block"
        onClick={() => setShowPersonSelector(true)}
      >
        Add Shadow
      </button>
    </>
  );
};
