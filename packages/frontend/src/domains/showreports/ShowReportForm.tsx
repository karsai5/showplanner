import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import { UpdateShowreportDTO } from "core/api/generated";
import TextArea from "core/components/fields/TextArea";
import Input from "core/components/fields/TextInput";
import { StickyLoadingSpinner } from "core/components/LoadingBox/PersistantLoadingSpinner";
import { showToastError } from "core/utils/errors";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { ShowLatexButton } from "./ShowLatex";
import { useDownloadPdf } from "./useDownloadPdf";

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
  eventId?: number;
};

export const ShowReportForm: React.FC<{
  initialValues?: ShowReportInputs;
  id: string;
  readOnlyTimers?: boolean;
  readOnlyTitles?: boolean;
}> = ({ initialValues, id, readOnlyTimers, readOnlyTitles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ShowReportInputs>({
    defaultValues: {
      ...initialValues,
    },
    mode: "onChange",
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const title = watch("title");

  const mutation = useMutation<unknown, Error, ShowReportInputs>({
    mutationFn: (formData) => {
      const report: UpdateShowreportDTO = {
        title: formData.title,
        subtitle: formData.subtitle,
        showStart: parseTime(formData.showStart),
        showEnd: parseTime(formData.showEnd),
        intervalStart: parseTime(formData.intervalStart),
        intervalEnd: parseTime(formData.intervalEnd),
        houseOpen: parseTime(formData.houseOpen),
        actOneFOHClearance: parseTime(formData.actOneFOHClearance),
        actTwoFOHClearance: parseTime(formData.actTwoFOHClearance),
        notes: formData.notes,
        eventId: initialValues?.eventId,
      };

      return api.showdocs.showdocReportsIdPost({ id, report });
    },
    onError: () => {
      showToastError("Could not save show report");
    },
  });

  const downloadMutation = useDownloadPdf(
    id,
    title || initialValues?.title || "Show Report"
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={handleSubmit(handleOnChange)}
      ref={formRef}
    >
      <Input
        label="Title"
        placeholder="Les Misérables Show 17 Report"
        register={register("title", { disabled: readOnlyTitles })}
        errors={errors}
      />
      <Input
        label="Subtitle"
        placeholder="Saturday 2pm, 12th August 2023"
        register={register("subtitle", { disabled: readOnlyTitles })}
        errors={errors}
      />
      <div className="sm:flex sm:gap-2">
        <Input
          label="Show start"
          register={register("showStart", { disabled: readOnlyTimers })}
          errors={errors}
          type="time"
        />
        <Input
          label="Interval start"
          register={register("intervalStart", { disabled: readOnlyTimers })}
          errors={errors}
          type="time"
        />
        <Input
          label="Interval end"
          register={register("intervalEnd", { disabled: readOnlyTimers })}
          errors={errors}
          type="time"
        />
        <Input
          label="Show end"
          register={register("showEnd", { disabled: readOnlyTimers })}
          errors={errors}
          type="time"
        />
      </div>
      <div className="sm:flex sm:gap-2">
        <Input
          label="House open"
          register={register("houseOpen", { disabled: readOnlyTimers })}
          errors={errors}
          type="time"
        />
        <Input
          label="Act one FOH clearance"
          register={register("actOneFOHClearance", {
            disabled: readOnlyTimers,
          })}
          errors={errors}
          type="time"
        />
        <Input
          label="Act two FOH clearance"
          register={register("actTwoFOHClearance", {
            disabled: readOnlyTimers,
          })}
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
          {(mutation.isLoading || isWaiting) && <StickyLoadingSpinner />}
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
        <ShowLatexButton id={id} />
      </div>
    </form>
  );
};

const parseTime = (time: string | undefined) => {
  if (!time) {
    return undefined;
  }
  return dayjs(`1999-01-01 ${time}`, "YYYY-MM-DD HH:mm").toDate();
};
