import { serverSideApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { getDefaultValuesForShowReport } from "domains/showreports/getDefaultValuesForShowReport";
import {
  ShowReportForm,
  ShowReportInputs,
} from "domains/showreports/ShowReportForm";
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
    showReport = await ssrApi.showdocs.showdocReportsIdGet({ id });
  } catch (err) {
    // If the show report doesn't exist, we'll just show the form with default values
    // TODO: Should throw error if error is not a 400
  }
  return {
    props: { initialValues: getDefaultValuesForShowReport(showReport) },
  };
}) satisfies GetServerSideProps<{ initialValues: ShowReportInputs }>;
