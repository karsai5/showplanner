import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { ShowBox } from "domains/shows/ShowBox/ShowBox";
import Image from "next/image";

import missingImg from "./missing.png";

export const AssignedShowBoxGrid: React.FC = () => {
  const api = getApi();
  const { data: shows, isLoading, isError } = useQuery(
    ["ShowList"],
    () => {
        return api.showsGet();
    }
  );

  if (isError) {
    return (
      <ErrorBox>Could not get shows</ErrorBox>
    );
  }
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (!shows) {
    return null;
  }

  return (
    <>
      {shows.length === 0 && <div className="prose flex mr-auto ml-auto gap-4 flex-col-reverse md:flex-row">
        <Image src={missingImg} alt="Chef pointing at thin air" width="500" height="500" />
        <div>
          <h2 className="mb-2">Sad Chef!</h2>
          <p>You have no shows assigned to you. Ask a show manager to add you to a show so that it appears on this page.</p> 
        </div>
      </div>}

      <div className="flex gap-4 flex-wrap">
      {shows.map((show) =>
        <ShowBox
          key={show.id}
          show={show}
        />
      )}
      </div>
    </>
  );
};
