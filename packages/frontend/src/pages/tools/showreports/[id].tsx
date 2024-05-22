import { serverSideApi } from "core/api";
import { ShowReportDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { ShowReportForm } from "domains/showreports/ShowReportForm";
import { pickBy } from "lodash";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useParams } from "next/navigation";

type Props = {
  initialValues?: Inputs;
};

type Inputs = {
  title?: string;
  subtitle?: string;
  notes?: string;
};

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
  }
  return { props: { initialValues: getDefaultValues(showReport) } };
}) satisfies GetServerSideProps<Props>;

const getDefaultValues = (showReport: ShowReportDTO | null): Inputs => {
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
  const valuesFromShowReport = {
    title: showReport.title || undefined,
    subtitle: showReport.subtitle || undefined,
    notes: showReport.notes || undefined,
  };

  return pickBy(valuesFromShowReport, (x) => x);
};
