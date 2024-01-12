import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import Image from "next/image";
import Link from "next/link";

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
    <ul className="list-disc">

      {shows.length === 0 && <div className="prose flex mr-auto ml-auto gap-4 flex-col-reverse md:flex-row">
        <Image src={missingImg} alt="Chef pointing at thin air" width="500" height="500" />
        <div>
          <h2 className="mb-2">Sad Chef!</h2>
          <p>You have no shows assigned to you. Ask a show manager to add you to a show so that it appears on this page.</p> 
        </div>
      </div>}

      {shows.map((show) =>
        <li key={show.slug}>
          <Link href={`shows/${show.slug}`}>
              {show.name}
          </Link>
        </li>
      )}
    </ul>
  );
};
