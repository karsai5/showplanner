import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { CrossIcon } from "core/components/Icons";
import { PERMISSION, showPermission, useHasPermission } from "core/permissions";
import Link from "next/link";
import { useEffect } from "react";

export const AssignedShowBoxGrid: React.FC = () => {
  const api = getApi();
  const hasPermission = useHasPermission();
  const { data: shows, isLoading, isError } = useQuery(
    ["AssignedShowsList"],
    () => api.showsGet()
  );

  if (isError) {
    return (
      <ErrorBox>Could not get shows</ErrorBox>
    );
  }
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <ul className="list-disc">
      {shows?.filter(show => hasPermission(showPermission(show.id, PERMISSION.viewEvents)))
        .map((show) =>
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
