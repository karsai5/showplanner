import { useMutation } from "@tanstack/react-query";
import { api } from "core/api";
import TextArea from "core/components/fields/TextArea";
import Input from "core/components/fields/TextInput";
import { H2 } from "core/components/Typography";
import { showToastError } from "core/utils/errors";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  title: string;
  subtitle: string;
  notes: string;
};

const ShowReport = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      notes: `# General notes

- note 1
- note 2

# Performance notes

- note 1
- note 2
`,
    },
  });

  const title = watch("title");

  const params = useParams();

  const mutation = useMutation<unknown, Error, Inputs>({
    mutationFn: (formData) => {
      return api.showreportIdPost({
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
      return api.showreportIdPdfGet({ id: params.id as string });
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

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div>
      <H2>Show Report</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" className={"btn btn-block mt-4"}>
          {mutation.isLoading && (
            <span className="loading loading-spinner"></span>
          )}
          Save
        </button>
      </form>
      <a
        className="btn"
        onClick={() => downloadMutation.mutate()}
        aria-disabled={downloadMutation.isLoading}
      >
        {downloadMutation.isLoading && (
          <span className="loading loading-spinner"></span>
        )}
        Download
      </a>
    </div>
  );
};

export default ShowReport;
