import { useQuery } from "@tanstack/react-query";
import { CrossIcon } from "core/components/Icons";
import { useAuthenticatedClient } from "core/config";
import { graphql } from "core/gql";

import { useSession } from "../lib/helpers";
import { ShowBox } from "../ShowBox/ShowBox";
import { sortShowsByFirstShow } from "./shared";

const unassignedShows = graphql(`
  query UnassignedShowsList {
    shows {
      data {
        id
        ...ShowBox_ShowFragment
        attributes {
          crews {
            data {
              id
            }
          }
        }
      }
    }
  }
`);

export const UnassignedShowBoxGrid: React.FC = () => {
  const client = useAuthenticatedClient();
  const session = useSession();
  const personId = session.userId;
  if (!personId) {
    throw new Error("No person ID in session");
  }
  const { data, isLoading, isError } = useQuery(
    ["UnassignedShowsList"],
    async () => {
      return client.request(unassignedShows, {});
    }
  );
  if (isError) {
    return (
      <div className="alert alert-error mb-4">
        <div>
          <CrossIcon />
          <span> Could not get shows </span>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  const filteredShows = data?.shows?.data?.filter(
    (show) =>
      !show?.attributes?.crews?.data?.find((person) => person?.id === personId)
  );
  const sortedShows = sortShowsByFirstShow(filteredShows as any);
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {sortedShows?.map((show) => {
        return (
          <ShowBox
            key={show.id}
            id={show.id as string}
            show={show as any}
            expressionOfInterest
          />
        );
      })}
    </div>
  );
};
