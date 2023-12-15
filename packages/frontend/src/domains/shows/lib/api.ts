import { useQuery } from "@tanstack/react-query";
import { useAuthenticatedClient } from "core/config";
import { graphql } from "core/gql";
import { ShowSummaryQuery } from "core/gql/graphql";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

import { ShowSummary } from "./types";

const getShow = graphql(`
  query ShowSummary($slug: String) {
    shows(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          name
          slug
          company
        }
      }
    }
  }
`);

export const useGetShow = (showSlug: any) => {
  if (!showSlug) {
    throw new Error("Could not find show slug");
  }
  if (typeof showSlug !== "string") {
    throw new Error("Show slug is not string");
  }

  const client = useAuthenticatedClient();
  const { isLoading, isError, data } = useQuery(
    ["show-summary", { slug: showSlug }],
    async () => client.request(getShow, { slug: showSlug })
  );
  return { isLoading, isError, show: mapShowSummary(data) };
};

const mapShowSummary = (
  data: ShowSummaryQuery | undefined
): ShowSummary | undefined => {
  if (!data || !data?.shows?.data) {
    return undefined;
  }
  if (data?.shows?.data?.length > 1) {
    throw new Error("Too many shows returned");
  }
  if (data?.shows?.data?.length === 0) {
    throw new PageNotFoundError("Show not found");
  }
  const show = data?.shows?.data[0];

  return {
    id: show.id as string,
    name: show.attributes?.name as string,
    slug: show.attributes?.slug as string,
    company: show.attributes?.company,
  };
};
