import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import { H2 } from "core/components/Typography";
import { PersonNameWithModal } from "domains/personnel/PersonModal/PersonModal";
import { useRouter } from "next/router";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { UserRoleClaim } from "supertokens-web-js/recipe/userroles";

const Impersonate: React.FC = () => {
  const router = useRouter();
  const { data: people } = useQuery(["people"], () =>
    api.personnel.personnelPeopleGet()
  );
  const handleImpersonate = (personId: string) => {
    api.personnel
      .personnelPeoplePersonIdImpersonatePost({ personId })
      .then(() => {
        router.push("/");
      });
  };
  return (
    <>
      <div className="mb-4">
        <H2>Users</H2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people?.map((person) => (
            <tr key={person.id}>
              <td>
                <PersonNameWithModal person={person} />
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleImpersonate(person.id)}
                >
                  Impersonate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const SafeImpersonate: React.FC = () => {
  return (
    <SessionAuth
      accessDeniedScreen={AccessDenied}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        UserRoleClaim.validators.includes("admin"),
      ]}
    >
      <Impersonate />
    </SessionAuth>
  );
};

export default SafeImpersonate;
