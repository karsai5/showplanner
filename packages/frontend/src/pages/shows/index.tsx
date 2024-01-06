import { useModal } from "core/components/Modal/Modal";
import { HasPermission, PERMISSION } from "core/permissions";
import NewShowForm from "domains/shows/NewShowForm/NewShowForm";
import {
  AssignedShowBoxGrid,
} from "domains/shows/ShowBoxGrid";
import Head from "next/head";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Session from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles"

const Shows = () => {
  return (
    <SessionAuth>
      <Head>
        <title>Shows - ShowPlanner</title>
      </Head>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-4 font-bold">Shows</h1>
        <HasPermission permission={PERMISSION.addShow}>
          <AddShowButton />
        </HasPermission>
      </div>
      <AssignedShowBoxGrid />
    </SessionAuth>
  );
};

const AddShowButton = () => {
  const { Modal, open, close, isOpen } = useModal();
  let claimValue = Session.useClaimValue(PermissionClaim)

  if (claimValue.loading || !claimValue.doesSessionExist) {
    return null;
  }
  let permissions = claimValue?.value;

  if (Array.isArray(permissions) && permissions.includes("add-show")) {
    return (<>
      <button className="btn mb-2" onClick={open}>
        Add show
      </button>
      <Modal isOpen={isOpen} close={close} title="Add a new show">
        <NewShowForm onSuccess={close} />
      </Modal>
    </>);
  }

  return null;
};

export default Shows;

