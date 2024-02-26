import cc from 'classnames';
import React, { useContext, useState } from 'react';

import { NewShowModalProps, useModal } from './Modal';

type ShowModal = (title: string, message: string, onYes: () => void) => void;
const ConfirmationModalContext = React.createContext<{
  title: string;
  message: string;
  showModal: ShowModal;
  onYes: () => void;
}>({ title: '', message: '', showModal: () => {}, onYes: () => {} });

const ConfirmationModal: React.FC<{
  Modal: React.FC<NewShowModalProps>;
  isOpen: boolean;
  close: () => void;
}> = ({ Modal, isOpen, close }) => {
  const context = useContext(ConfirmationModalContext);
  return (
    <>
      <Modal
        isOpen={isOpen}
        close={close}
        title={context.title}
        className="z-50"
      >
        <p className="my-2">{context.message}</p>
        <div className="pt-4 flex gap-2">
          <button
            className={cc('btn btn-primary w-24', {
              ['loading']: false,
            })}
            onClick={() => {
              context.onYes();
              close();
            }}
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

export const ConfirmationModalWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { Modal, close, isOpen, open } = useModal();
  const [state, updateState] = useState({
    title: '',
    message: '',
    onYes: () => {},
  });
  const showModal: ShowModal = (title, message, onYes) => {
    updateState({ title, message, onYes });
    open();
  };

  return (
    <>
      <ConfirmationModalContext.Provider
        value={{
          title: state.title,
          message: state.message,
          showModal,
          onYes: state.onYes,
        }}
      >
        {children}
        <ConfirmationModal Modal={Modal} close={close} isOpen={isOpen} />
      </ConfirmationModalContext.Provider>
    </>
  );
};

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
  return context.showModal;
};
