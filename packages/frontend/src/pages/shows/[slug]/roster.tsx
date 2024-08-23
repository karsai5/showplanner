import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import { RosterDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { useConfirmationModal } from "core/components/Modal/ConfirmationModal";
import { useModal } from "core/components/Modal/Modal";
import { H2 } from "core/components/Typography";
import {
  HasPermission,
  PERMISSION,
  showPermission,
  useHasPermission,
} from "core/permissions";
import { ifResponseErrorCode, ssrWrapper } from "core/permissions/ssr";
import { showToastError } from "core/utils/errors";
import { DisplayDropdown } from "domains/layout/components/Nav";
import { NavItem } from "domains/layout/components/Nav/items";
import { AddRoleModal } from "domains/rostering/AddRoleModal/AddRoleModal";
import { ReleaseRosterButton } from "domains/rostering/ReleaseRosterButton/ReleaseRosterButton";
import { RosterTable } from "domains/rostering/RosterTable/RosterTable";
import { SetRoleOrder } from "domains/rostering/SetRoleOrderModal/SetRoleOrderModal";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import superjson from "superjson";

export const getServerSideProps = ssrWrapper(async (context, api) => {
  const slug = context.query.slug;

  if (typeof slug !== "string") {
    throw new Error("Incorrect slug format");
  }

  const show = await api.rostering.showsShowSlugSummaryGet({
    showSlug: slug,
  });
  let data = undefined;
  try {
    data = await api.default.rosterGet({ showId: show.id });
  } catch (err) {
    if (!ifResponseErrorCode(err, 401)) {
      throw err;
    }
  }

  return {
    props: {
      show,
      rosterJSON: data ? superjson.stringify(data) : null,
    },
  };
});

const ShowPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { show } = props;
  const [showOldEvents, setShowOldEvents] = useState(false);
  const hasRosteringPermission = useHasPermission()(
    showPermission(show.id, PERMISSION.rostering)
  );
  const confirm = useConfirmationModal();
  const unreleaseRosterMutation = useUnreleaseRosterMutation(show.id);

  const { Modal, isOpen, close, open } = useModal();

  const configItems: NavItem = {
    title: "...",
    children: [
      {
        title: showOldEvents ? "Hide past events" : "Show past events",
        onClick: () => setShowOldEvents(!showOldEvents),
      },
    ],
  };
  if (hasRosteringPermission) {
    configItems.children?.push({
      title: "Reorder roles",
      onClick: () => open(),
    });
    if (show.isRosterReleased) {
      configItems.children?.push({
        title: "Unrelease roster",
        onClick: () =>
          confirm(
            "Unrelease roster",
            "Are you sure you want to unrelease the roster?",
            () => unreleaseRosterMutation.mutate()
          ),
      });
    }
  }

  const { data, isLoading, isError } = useQuery({
    initialData: props.rosterJSON
      ? superjson.parse<RosterDTO>(props.rosterJSON)
      : undefined,
    queryKey: ["roster", show.id],
    queryFn: () => api.default.rosterGet({ showId: show.id }),
  });

  const showRoster = show.isRosterReleased || hasRosteringPermission;

  return (
    <>
      <Head>
        <title>Roster - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - Roster</H2>
        {data && (
          <div>
            <HasPermission showId={show.id} permission={PERMISSION.rostering}>
              {!show.isRosterReleased && (
                <ReleaseRosterButton showId={show.id} className="mr-2" />
              )}
              <AddRoleModal showId={show.id} className="mr-2" />
              <DisplayDropdown className="btn mr-2" item={configItems} />
              <Modal close={close} isOpen={isOpen}>
                <SetRoleOrder roles={data.roles} close={close} show={show} />
              </Modal>
            </HasPermission>
          </div>
        )}
      </div>
      {isError && <ErrorBox>Could not get roster</ErrorBox>}
      {isLoading && <LoadingBox />}
      {showRoster && data?.events && data.roles && (
        <RosterTable
          showId={show.id}
          showPastEvents={showOldEvents}
          events={data.events}
          roles={data.roles}
        />
      )}
      {!showRoster && (
        <div className="prose">
          <p>
            The roster has not been released yet.
            <br />
            You&apos;ll get an email when the roster is released.
          </p>
        </div>
      )}
    </>
  );
};

const useUnreleaseRosterMutation = (showId: number) => {
  const router = useRouter();
  const mutation = useMutation<unknown, Error>(
    () => api.rostering.showsShowIdRosterUnreleasePost({ showId }),
    {
      onSuccess: () => {
        toast.success("Roster unreleased");
        router.reload();
      },
      onError: (err) => {
        showToastError("Could not unrelease roster", err);
      },
    }
  );
  return mutation;
};

export default ShowPage;
