import cc from "classnames";
import { useModal } from "core/components/Modal/Modal";

import { useDeletePersonMuation } from "../lib/api";

export const DeletePersonButton: React.FC<{
  personId: any;
  showId: string;
}> = ({ personId, showId }) => {
  const { Modal, open, close, isOpen } = useModal();
  const deletePerson = useDeletePersonMuation(personId, showId);

  return (
    <>
      <a className="link" onClick={open}>
        {" "}
        Delete{" "}
      </a>
      <Modal isOpen={isOpen} close={close} title="Delete event">
        <p className="my-2">Are you sure you want to unlink this person?</p>
        <p>
          The persons data will remain in the app they will just be removed from
          this show.
        </p>
        <div className="pt-4 flex gap-2">
          <button
            className={cc("btn btn-primary w-24", {
              ["loading"]: deletePerson.isLoading,
            })}
            onClick={() => deletePerson.mutate()}
          >
            Yes
          </button>
          <button className="btn w-24" onClick={close}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
};
