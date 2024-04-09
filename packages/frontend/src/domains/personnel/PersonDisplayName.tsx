import cc from "classnames";
import { PersonSummaryDTO } from "core/api/generated";

export const PersonDisplayName: React.FC<{
  person: PersonSummaryDTO;
  className?: string;
}> = ({ person, className }) => {
  const firstName = person.preferredName || person.firstName || "";
  return (
    <span className={cc(className)}>
      {firstName} {person.lastName || ""}
    </span>
  );
};
