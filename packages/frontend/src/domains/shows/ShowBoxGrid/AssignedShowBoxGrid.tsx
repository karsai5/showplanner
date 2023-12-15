import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import { CrossIcon } from "core/components/Icons";
import Link from "next/link";
import { useEffect } from "react";

export const AssignedShowBoxGrid: React.FC = () => {
  const api = getApi();
  const { data: shows, isLoading, isError } = useQuery(
    ["AssignedShowsList"],
    () => api.showsGet()
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

  return (
    <ul className="list-disc">
      {shows?.map((show) =>
        <li key={show.slug}>
          <Link href={`shows/${show.slug}`}>
            <a>
            {show.name}
            </a>
          </Link>
        </li>
      )}
    </ul>
  );
};
