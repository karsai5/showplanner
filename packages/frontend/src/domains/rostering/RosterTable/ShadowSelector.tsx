import { CloudIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import cc from "classnames";
import { api_deprecated } from "core/api";
import { PersonSummaryDTO, RosterEventDTO } from "core/api/generated";
import { showToastError } from "core/utils/errors";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { PersonSelectorModal } from "domains/personnel/PersonSelector/PersonSelectorModal";
import { FC, useState } from "react";
import React from "react";

import { colorCodednameComponent } from "./ColorCodedName";

export const ShadowSelector: FC<{
  event: RosterEventDTO;
  roleId: number;
  people?: PersonSummaryDTO[];
}> = (props) => {
  const queryClient = useQueryClient();
  const createShadow = useMutation<unknown, Error, string>({
    mutationFn: (personId) => {
      if (personId === "") {
        return new Promise((res) => res(undefined));
      }

      return api_deprecated.shadowPost({
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
    mutationFn: (shadowId) => api_deprecated.shadowIdDelete({ id: shadowId }),
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
  event: RosterEventDTO;
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
              <CloudIcon className="h-5 w-5 inline mr-2" />
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
      </div>
      {showPersonSelector && (
        <PersonSelectorModal
          loading={loading}
          people={filteredPeople}
          placeholder="Assign Shadow"
          onChange={(p) => handleChange(p)}
          nameComponent={colorCodednameComponent(event)}
          selectedPersonId={undefined}
          onClose={() => setShowPersonSelector(false)}
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
