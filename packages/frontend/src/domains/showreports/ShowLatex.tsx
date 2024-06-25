import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { api_deprecated } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { useModal } from "core/components/Modal/Modal";

export const ShowLatexButton: React.FC<{ id: string }> = ({ id }) => {
  const { Modal, isOpen, close, open } = useModal();
  return (
    <>
      <button className="btn" onClick={() => open()}>
        <CodeBracketIcon className="w-5 h-5" /> Show Latex
      </button>
      {isOpen && (
        <Modal close={close} isOpen={isOpen}>
          <ModalContent id={id} />
        </Modal>
      )}
    </>
  );
};

export const ModalContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, isError } = useQuery(["showReportTex", id], () =>
    api_deprecated.showreportsIdTexGet({ id })
  );
  if (isLoading) {
    return <LoadingBox />;
  }
  if (isError) {
    return <ErrorBox>Could not get tex for this show report</ErrorBox>;
  }
  return (
    <div className="">
      <pre className="">
        <code>{data.contents}</code>
      </pre>
    </div>
  );
};
