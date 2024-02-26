import { Dialog } from '@headlessui/react';
import cc from 'classnames';
import React, { FC, useState } from 'react';

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, setIsOpen, open, close, Modal };
};

export interface NewShowModalProps {
  children: React.ReactNode;
  title?: string;
  close: () => void;
  isOpen: boolean;
  className?: string;
}
const Modal: FC<NewShowModalProps> = ({
  children,
  title,
  close,
  isOpen,
  className,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      as="div"
      className={cc(
        'modal modal-bottom sm:modal-middle',
        {
          ['modal-open']: isOpen,
        },
        className,
      )}
    >
      <Dialog.Panel className="modal-box flex flex-col">
        <button
          onClick={close}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        {title && <h3 className="font-bold text-lg">{title}</h3>}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </Dialog.Panel>
    </Dialog>
  );
};
