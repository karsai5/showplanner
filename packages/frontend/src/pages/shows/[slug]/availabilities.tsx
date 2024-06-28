import { AvailabilitiesDTO } from "core/api/generated";
import { H2 } from "core/components/Typography";
import {
  PERMISSION,
  PermissionRequired,
  showPermission,
} from "core/permissions";
import { ssrWrapper } from "core/permissions/ssr";
import { AvailabilitiesTable } from "domains/rostering/AvailabilitiesTable/AvailabilitiesTable";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import superjson from "superjson";

export const getServerSideProps = ssrWrapper(async (context, api) => {
  const slug = context.query.slug;

  if (typeof slug !== "string") {
    throw new Error("Incorrect slug format");
  }

  const show = await api.rostering.showsShowSlugSummaryGet({
    showSlug: slug,
  });
  const data = await api.default.availabilitiesGet({ showId: show.id });
  return {
    props: { show, dataJSON: superjson.stringify(data) },
  };
});

export default function AvailabilitiesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { show } = props;
  return (
    <PermissionRequired
      permission={showPermission(show?.id, PERMISSION.rostering)}
    >
      <Head>
        <title>Availabilities - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - Availabilities</H2>
      </div>
      <AvailabilitiesTable
        showId={show.id}
        initialData={superjson.parse<AvailabilitiesDTO>(props.dataJSON)}
      />
    </PermissionRequired>
  );
}
