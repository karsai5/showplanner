import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { api } from "core/api";
import { PersonSummaryDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { PERMISSION, showPermission, useHasPermission } from "core/permissions";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { FC } from "react";

export const PeopleTable: React.FC<{
  showId: number;
}> = ({ showId }) => {
  const hasPermission = useHasPermission();
  const { data, isLoading, isError } = useQuery(
    ["assigned-people", showId],
    () => api.personnelAssignedGet({ showId })
  );
  if (isLoading) {
    return <LoadingBox />;
  }
  if (isError) {
    return <ErrorBox>Could not load people</ErrorBox>;
  }
  if (data && data.people) {
    return (
      <PurePeopleTable
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
}> = ({ people, showPrivateDetails }) => {
  const table = useReactTable({
    data: people,
    columns: [
      ...baseColumns,
      ...(showPrivateDetails ? privateDetailsColumns : []),
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
