import { FC, useState } from "react";
import cc from "classnames";
import { useModal } from "core/components/Modal/Modal";
import { useMutation } from "@tanstack/react-query";
import { api } from "core/api";
import { toast } from "react-toastify";
import { showToastError } from "core/utils/errors";
import { useRouter } from "next/router";

export const ReleaseRosterButton: FC<{ showId: number; className: string }> = ({
  showId,
  className,
}) => {
  const { Modal, isOpen, open, close } = useModal();
  const [notifyViaEmail, setNotifyViaEmail] = useState(true);
  const router = useRouter();
  const mutation = useMutation<unknown, Error>(
    () => {
      return api.rostering.showsShowIdRosterReleasePost({
        showId,
        sendEmail: notifyViaEmail,
      });
    },
    {
      onSuccess: () => {
        toast.success("Roster released");
        close();
        router.reload();
      },
      onError: (err) => {
        showToastError("Could not release roster", err);
      },
    }
  );

  return (
    <>
      <button className={cc(className, "btn btn-primary")} onClick={open}>
        Release Roster
      </button>
      <Modal isOpen={isOpen} close={close} title="Release Roster">
        <p>
          Releasing the roster will allow all members of the show to view it.
        </p>
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className={"checkbox"}
            checked={notifyViaEmail}
            onChange={(e) => setNotifyViaEmail(e.target.checked)}
          />
          <span className="label-text pl-2">
            Send an email to all show members letting them know the roster is
            available.
          </span>
        </label>
        <div className="flex gap-2 mt-2 justify-end">
          <button className="btn" onClick={close}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => mutation.mutate()}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading && (
              <span className="loading loading-spinner"></span>
            )}
            Release roster
          </button>
        </div>
      </Modal>
    </>
  );
};
