import cc from "classnames";
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
import { useDownloadPdf } from "./useDownloadPdf";
import dayjs from "dayjs";
import { PersistantLoadingSpinner } from "core/components/LoadingBox/PersistantLoadingSpinner";

export type ShowReportInputs = {
  title?: string;
  subtitle?: string;
  notes?: string;
  showStart?: string;
  showEnd?: string;
  intervalStart?: string;
  intervalEnd?: string;
  houseOpen?: string;
  actOneFOHClearance?: string;
  actTwoFOHClearance?: string;
};

export const ShowReportForm: React.FC<{
  initialValues?: ShowReportInputs;
  id: string;
}> = ({ initialValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ShowReportInputs>({
    defaultValues: initialValues,
    mode: "onChange",
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const title = watch("title");

  const params = useParams();

  const mutation = useMutation<unknown, Error, ShowReportInputs>({
    mutationFn: (formData) => {
      return api.showreportsIdPost({
        id: params.id as string,
        report: {
          title: formData.title,
          subtitle: formData.subtitle,
          notes: formData.notes,
          showStart: parseTime(formData.showStart),
          showEnd: parseTime(formData.showEnd),
          intervalStart: parseTime(formData.intervalStart),
          intervalEnd: parseTime(formData.intervalEnd),
          houseOpen: parseTime(formData.houseOpen),
          actOneFOHClearance: parseTime(formData.actOneFOHClearance),
          actTwoFOHClearance: parseTime(formData.actTwoFOHClearance),
        },
      });
    },
    onError: () => {
      showToastError("Could not save show report");
    },
  });

  const downloadMutation = useDownloadPdf(
    params.id as string,
    title || "Show Report"
  );

  const onSubmit = (data: ShowReportInputs) => {
    mutation.mutate(data, {
      onSuccess: () => setIsWaiting(false),
    });
  };

  const onSubmitDebounce = useRef(debounce(onSubmit, 1000));

  const handleOnChange = (data: ShowReportInputs) => {
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
        <div className="flex gap-2">
          <Input
            label="Show start"
            register={register("showStart")}
            errors={errors}
            type="time"
          />
          <Input
            label="Interval start"
            register={register("intervalStart")}
            errors={errors}
            type="time"
          />
          <Input
            label="Interval end"
            register={register("intervalEnd")}
            errors={errors}
            type="time"
          />
          <Input
            label="Show end"
            register={register("showEnd")}
            errors={errors}
            type="time"
          />
        </div>
        <div className="flex gap-2">
          <Input
            label="House open"
            register={register("houseOpen")}
            errors={errors}
            type="time"
          />
          <Input
            label="Act one FOH clearance"
            register={register("actOneFOHClearance")}
            errors={errors}
            type="time"
          />
          <Input
            label="Act two FOH clearance"
            register={register("actTwoFOHClearance")}
            errors={errors}
            type="time"
          />
        </div>
        <TextArea
          register={register("notes")}
          placeholder="Use markdown for formatting"
          errors={errors}
          className="h-80"
        />
        <div className="flex mt-4 gap-2">
          <button
            type="submit"
            className={cc("btn", {
              ["btn-disabled"]: mutation.isLoading || isWaiting,
            })}
          >
            {(mutation.isLoading || isWaiting) && <PersistantLoadingSpinner />}
            Save
          </button>
          <a
            className={cc("btn", {
              ["btn-disabled"]: mutation.isLoading || isWaiting,
            })}
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

const parseTime = (time: string | undefined) => {
  if (!time) {
    return undefined;
  }
  return dayjs(`1999-01-01 ${time}`, "YYYY-MM-DD HH:mm").toDate();
};
