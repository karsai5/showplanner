import { Dialog } from "@headlessui/react";
import cc from "classnames";
import React, { FC, useState } from "react";
import { createPortal } from "react-dom";

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, setIsOpen, open, close, Modal };
};

export interface NewShowModalProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  close: () => void;
  isOpen: boolean;
  className?: string;
  dialogClassName?: string;
}

const Modal: FC<NewShowModalProps> = ({
  children,
  title,
  close,
  isOpen,
  className,
  dialogClassName,
}) => {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <Dialog
      open={isOpen}
      onClose={close}
      as="div"
      className={cc(
        "modal modal-bottom sm:modal-middle",
        {
          ["modal-open"]: isOpen,
        },
        className
      )}
    >
      <Dialog.Panel className={cc("modal-box flex flex-col", dialogClassName)}>
        <button
          onClick={close}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
        <div className="flex-1">{children}</div>
      </Dialog.Panel>
    </Dialog>,
    document.body
  );
};
