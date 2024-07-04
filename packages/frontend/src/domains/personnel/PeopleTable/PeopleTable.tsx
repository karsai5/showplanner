import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { api_deprecated } from "core/api";
import { ArrayOfPersonSummaryDTO, PersonSummaryDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { PERMISSION, showPermission, useHasPermission } from "core/permissions";
import {
  getPersonDisplayName,
  PersonDisplayName,
} from "domains/personnel/PersonDisplayName";
import { FC } from "react";

import { UnassignPersonButton } from "./UnassignPersonButton";

export const PeopleTable: React.FC<{
  showId: number;
  initialData?: ArrayOfPersonSummaryDTO;
}> = ({ showId, initialData }) => {
  const hasPermission = useHasPermission();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["assigned-people", showId],
    queryFn: () => api_deprecated.personnelAssignedGet({ showId }),
    initialData: initialData,
  });
  if (isLoading) {
    return <LoadingBox />;
  }
  if (isError) {
    return <ErrorBox>Could not load people</ErrorBox>;
  }
  if (data && data.people) {
    return (
      <PurePeopleTable
        showId={showId}
        people={data.people}
        showPrivateDetails={hasPermission(
          showPermission(showId, PERMISSION.personnelPrivateDetails)
        )}
      />
    );
  }
  return null;
};

const columnHelper = createColumnHelper<PersonSummaryDTO>();
const baseColumns = [
  columnHelper.accessor((row) => row, {
    id: "name",
    cell: (info) => (
      <PersonDisplayName className="text-nowrap" person={info.getValue()} />
    ),
    header: "Name",
  }),
];
const privateDetailsColumns = [
  columnHelper.accessor((row) => row._private?.phone, {
    id: "phone",
    cell: (info) => (
      <a className="link text-nowrap" href={`tel:${info.getValue()}`}>
        {info.getValue()}
      </a>
    ),
    header: "Phone",
  }),
  columnHelper.accessor((row) => row._private?.email, {
    id: "email",
    cell: (info) => (
      <a className="link text-nowrap" href={`mailto:${info.getValue()}`}>
        {info.getValue()}
      </a>
    ),
    header: "Email",
  }),
  columnHelper.accessor((row) => row._private?.wwc, {
    id: "wwc",
    cell: (info) => <span className="text-nowrap">{info.getValue()}</span>,
    header: "WWC",
  }),
  columnHelper.accessor((row) => row._private?.dob, {
    id: "dob",
    cell: (info) => <span className="text-nowrap">{info.getValue()}</span>,
    header: "DOB",
  }),
];
export const PurePeopleTable: FC<{
  people: PersonSummaryDTO[];
  showPrivateDetails?: boolean;
  showId: number;
}> = ({ people, showPrivateDetails, showId }) => {
  const table = useReactTable({
    data: people,
    columns: [
      ...baseColumns,
      ...(showPrivateDetails ? privateDetailsColumns : []),
      columnHelper.accessor((row) => row, {
        id: "actions",
        cell: (info) => (
          <div>
            <UnassignPersonButton
              id={info.getValue().id}
              showId={showId}
              name={getPersonDisplayName(info.getValue())}
            />
          </div>
        ),
        header: "Actions",
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
