import { useMutation } from "@tanstack/react-query";
import { api } from "core/api";
import { showToastError } from "core/utils/errors";

export const useDownloadPdf = (id: string, title: string) => {
  return useMutation<Blob>({
    mutationFn: () => {
      return api.showreportsIdPdfGet({ id });
    },
    onError: () => {
      showToastError("Something went wrong creating a pdf of this report");
    },
    onSuccess: (file) => {
      const pdfUrl = window.URL.createObjectURL(file);
      const tempLink = document.createElement("a");
      tempLink.href = pdfUrl;
      tempLink.setAttribute("download", `${title}.pdf`);
      tempLink.click();
    },
  });
};
