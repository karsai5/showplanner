import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { api_deprecated } from "core/api";
import { PersonDTOWithEmail } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { getPersonDisplayName } from "domains/personnel/PersonDisplayName";
import { PersonNameWithModal } from "domains/personnel/PersonModal/PersonModal";
import { FC } from "react";

import { UnassignPersonButton } from "./UnassignPersonButton";

export const PeopleTable: React.FC<{
  showId: number;
  initialData?: PersonDTOWithEmail[];
}> = ({ showId, initialData }) => {
  const {
    data: people,
    isLoading,
    isError,
  } = useQuery({
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
  if (people) {
    return <PurePeopleTable showId={showId} people={people} />;
  }
  return null;
};

const columnHelper = createColumnHelper<PersonDTOWithEmail>();
const baseColumns = [
  columnHelper.accessor((row) => row, {
    id: "name",
    cell: (info) => <PersonNameWithModal person={info.getValue()} />,
    header: "Name",
  }),
];
export const PurePeopleTable: FC<{
  people: PersonDTOWithEmail[];
  showId: number;
}> = ({ people, showId }) => {
  const table = useReactTable({
    data: people,
    columns: [
      ...baseColumns,
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
