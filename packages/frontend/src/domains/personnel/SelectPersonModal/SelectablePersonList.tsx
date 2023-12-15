import cc from "classnames";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { useState } from "react";

import { useGetPeople } from "../lib/api";
import { Person } from "../lib/types";

type Props = {
  onSelect: (person: Person) => void;
  loading?: boolean;
  filter?: (person: Person) => boolean;
};

export const SelectablePersonList: React.FC<Props> = ({
  onSelect,
  loading,
  filter,
}) => {
  const { people, isLoading, isError } = useGetPeople();
  const [searchValue, setSearchValue] = useState("");

  if (isLoading || !people) {
    return <progress className="progress w-full"></progress>;
  }
  if (isError) {
    return <ErrorBox>Could not get people</ErrorBox>;
  }

  const filterPerson = (person: Person) => {
    const words = searchValue.split(" ").map((word) => word.toLowerCase());
    const searchString = [person.firstname, person.lastname]
      .join(" ")
      .toLowerCase();
    let result = true;
    words.forEach((word) => {
      if (!searchString.includes(word)) {
        result = false;
      }
    });
    return result;
  };

  const filteredPeople = people
    .filter(filter ? filter : () => true)
    .filter((person) => filterPerson(person));

  return (
    <>
      <input
        placeholder="Search people"
        className={cc("input input-bordered w-full my-3")}
        onChange={(value) => setSearchValue(value.target.value)}
        value={searchValue}
      />
      {filteredPeople.length === 0 && <p className="text-center">No results</p>}
      {loading && (
        <div className="absolute inset-0 bg-slate-500/75 z-10 flex items-center justify-center">
          <progress className="progress w-56"></progress>
        </div>
      )}
      <table className="table w-full">
        <tbody>
          {filteredPeople.map((person) => (
            <tr
              className="hover cursor-pointer"
              onClick={() => onSelect(person)}
              key={person.id}
            >
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={person.avatar}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {person.firstname} {person.lastname}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
