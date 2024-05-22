import { serverSideApi } from "core/api";
import { ShowReportDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import dayjs from "dayjs";
import {
  ShowReportForm,
  ShowReportInputs,
} from "domains/showreports/ShowReportForm";
import { pickBy } from "lodash";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useParams } from "next/navigation";

export default function ShowReport({
  initialValues,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const params = useParams();
  if (!params.id || typeof params.id !== "string") {
    return <ErrorBox>Could not find show report id</ErrorBox>;
  }
  return <ShowReportForm initialValues={initialValues} id={params.id} />;
}

export const getServerSideProps = (async (context) => {
  const id = context.query.id;
  const ssrApi = serverSideApi(context);

  if (typeof id !== "string") {
    throw new Error("Incorrect ID format");
  }
  let showReport = null;
  try {
    showReport = await ssrApi.showreportsIdGet({ id });
  } catch (err) {
    // If the show report doesn't exist, we'll just show the form with default values
    // TODO: Should throw error if error is not a 400
  }
  return { props: { initialValues: getDefaultValues(showReport) } };
}) satisfies GetServerSideProps<{ initialValues: ShowReportInputs }>;

const getDefaultValues = (
  showReport: ShowReportDTO | null
): ShowReportInputs => {
  if (!showReport) {
    return {
      notes: `# General notes

- note 1
- note 2

# Performance notes

- note 1
- note 2
`,
    };
  }
  const valuesFromShowReport: ShowReportInputs = {
    title: showReport.title || undefined,
    subtitle: showReport.subtitle || undefined,
    notes: showReport.notes || undefined,

    showStart: parseTime(showReport.showStart),
    showEnd: parseTime(showReport.showEnd),
    intervalStart: parseTime(showReport.intervalStart),
    intervalEnd: parseTime(showReport.intervalEnd),
    houseOpen: parseTime(showReport.houseOpen),
    actOneFOHClearance: parseTime(showReport.actOneFOHClearance),
    actTwoFOHClearance: parseTime(showReport.actTwoFOHClearance),
  };

  return pickBy(valuesFromShowReport, (x) => x);
};

const parseTime = (time: Date | null | undefined) => {
  if (!time) {
    return undefined;
  }
  return dayjs(time).format("HH:mm");
};
