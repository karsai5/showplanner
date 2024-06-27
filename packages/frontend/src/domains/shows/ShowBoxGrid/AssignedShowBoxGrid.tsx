import { useQuery } from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import { ShowDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import dayjs from "dayjs";
import { ShowBox } from "domains/shows/ShowBox/ShowBox";
import { groupBy, orderBy } from "lodash";
import Image from "next/image";

import missingImg from "./missing.png";
import styles from "./styles.module.scss";

export const AssignedShowBoxGrid: React.FC = () => {
  const {
    data: shows,
    isLoading,
    isError,
  } = useQuery(["ShowList"], () => {
    return api.rostering.rosteringShowsGet();
  });

  if (isError) {
    return <ErrorBox>Could not get shows</ErrorBox>;
  }
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (!shows) {
    return null;
  }

  const groupedShows = groupBy(orderBy(shows, "start"), (show: ShowDTO) => {
    if (show.end && dayjs(show.end).isBefore(new Date())) {
      return "past";
    } else if (!show.end) {
      return "nodates";
    }
    return "future";
  });

  return (
    <>
      {shows.length === 0 && (
        <div className="prose flex mr-auto ml-auto gap-4 flex-col-reverse md:flex-row">
          <Image
            src={missingImg}
            alt="Chef pointing at thin air"
            width="500"
            height="500"
          />
          <div>
            <h2 className="mb-2">Sad Chef!</h2>
            <p>
              You have no shows assigned to you. The ShowPlanner team will have
              gotten an email letting them know that you&apos;ve signed up. Sit
              tight for now and you&apos;ll get an email once you&apos;ve been
              assigned to a show.
            </p>
            <p className="text-sm text-slate-500">
              This app is built in my spare time, so sometimes it takes a day or
              two to get added to a show.
            </p>
          </div>
        </div>
      )}

      <div className={cc("grid gap-4", styles.grid)}>
        {groupedShows?.nodates &&
          groupedShows.nodates.map((show) => (
            <ShowBox key={show.id} show={show} />
          ))}
        {groupedShows?.future &&
          groupedShows.future.map((show) => (
            <ShowBox key={show.id} show={show} />
          ))}
        {groupedShows?.past &&
          groupedShows.past.map((show) => (
            <ShowBox key={show.id} show={show} />
          ))}
      </div>
    </>
  );
};
