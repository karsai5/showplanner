import { serverSideApi_deprecated } from "core/api";
import { AvailabilitiesDTO, ShowDTO } from "core/api/generated";
import { H2 } from "core/components/Typography";
import {
  PERMISSION,
  PermissionRequired,
  showPermission,
} from "core/permissions";
import { getSSRErrorReturn } from "core/utils/ssr";
import { AvailabilitiesTable } from "domains/rostering/AvailabilitiesTable/AvailabilitiesTable";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import superjson from "superjson";

export const getServerSideProps = (async (context) => {
  const slug = context.query.slug;
  const ssrApi = serverSideApi_deprecated(context);

  if (typeof slug !== "string") {
    throw new Error("Incorrect slug format");
  }

  try {
    const show = await ssrApi.showsShowSlugSummaryGet({
      showSlug: slug,
    });
    const data = await ssrApi.availabilitiesGet({ showId: show.id });
    return {
      props: { show, dataJSON: superjson.stringify(data) },
    };
  } catch (err) {
    return getSSRErrorReturn(err);
  }
}) satisfies GetServerSideProps<{ show: ShowDTO; dataJSON: string }>;

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
