import { UserCircleIcon } from "@heroicons/react/20/solid";
import crypto from "crypto";
import Image from "next/image";

import { getPersonDisplayName } from "./PersonDisplayName";
import { PersonDetails } from "./types/PersonDetails";

export const Avatar: React.FC<{ person?: PersonDetails | null }> = ({
  person,
}) => {
  const displayName = person ? getPersonDisplayName(person) : undefined;
  if (!person || !displayName) {
    return (
      <div className="avatar">
        <div className="rounded-full w-6 grayscale">
          <UserCircleIcon className="h-6 w-6" />
        </div>
      </div>
    );
  }
  const hash = crypto.createHash("md5").update(displayName).digest("hex");

  return (
    <div className="avatar">
      <div className="rounded-full w-6 grayscale">
        <Image
          width={24}
          height={24}
          src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${hash}`}
          alt={person.firstName}
          unoptimized={true}
        />
      </div>
    </div>
  );
};
