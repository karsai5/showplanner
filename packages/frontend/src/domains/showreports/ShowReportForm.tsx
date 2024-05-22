import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { api } from "core/api";
import TextArea from "core/components/fields/TextArea";
import Input from "core/components/fields/TextInput";
import { H2 } from "core/components/Typography";
import { showToastError } from "core/utils/errors";
import { debounce } from "lodash";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  title?: string;
  subtitle?: string;
  notes?: string;
};

export const ShowReportForm: React.FC<{
  initialValues?: Inputs;
  id: string;
}> = ({ initialValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: initialValues,
    mode: "onChange",
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const title = watch("title");

  const params = useParams();

  const mutation = useMutation<unknown, Error, Inputs>({
    mutationFn: (formData) => {
      return api.showreportsIdPost({
        id: params.id as string,
        report: {
          title: formData.title,
          subtitle: formData.subtitle,
          notes: formData.notes,
        },
      });
    },
    onError: () => {
      showToastError("Could not save show report");
    },
  });

  const downloadMutation = useMutation<Blob>({
    mutationFn: () => {
      return api.showreportsIdPdfGet({ id: params.id as string });
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

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data, {
      onSuccess: () => setIsWaiting(false),
    });
  };

  const onSubmitDebounce = useRef(debounce(onSubmit, 1000));

  const handleOnChange = (data: Inputs) => {
    setIsWaiting(true);
    onSubmitDebounce?.current(data);
  };

  return (
    <div>
      <H2>Show Report</H2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleSubmit(handleOnChange)}
        ref={formRef}
      >
        <Input
          label="Title"
          placeholder="Les Misérables Show 17 Report"
          register={register("title")}
          errors={errors}
        />
        <Input
          label="Subtitle"
          placeholder="Saturday 2pm, 12th August 2023"
          register={register("subtitle")}
          errors={errors}
        />
        <TextArea
          register={register("notes")}
          placeholder="Use markdown for formatting"
          errors={errors}
          className="h-20"
        />
        <div className="flex mt-4 gap-2">
          <button type="submit" className={"btn"}>
            {(mutation.isLoading || isWaiting) && (
              <span className="loading loading-spinner"></span>
            )}
            Save
          </button>
          <a
            className="btn"
            onClick={() => downloadMutation.mutate()}
            aria-disabled={downloadMutation.isLoading}
          >
            {downloadMutation.isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <DocumentArrowDownIcon className="h-5 w-5" />
            )}
            Download
          </a>
        </div>
      </form>
    </div>
  );
};
