import cc from "classnames";
import { PersonSummaryDTO } from "core/api/generated";

export const PersonDisplayName: React.FC<{
  person: PersonSummaryDTO;
  className?: string;
  firstNameOnly?: boolean;
}> = ({ person, className, firstNameOnly }) => {
  const name = getPersonDisplayName(person, { firstNameOnly: firstNameOnly });
  return <span className={cc(className)}>{name}</span>;
};

type PersonDisplayNameOptions = {
  firstNameOnly?: boolean;
};

export const getPersonDisplayName = (
  person: PersonSummaryDTO,
  options: PersonDisplayNameOptions
) => {
  const firstName = person.preferredName || person.firstName || "";
  const lastName = person.lastName || "";

  const names = [firstName];

  if (!options.firstNameOnly) {
    names.push(lastName);
  }
  return names.join(" ");
};
