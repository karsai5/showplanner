import { serverSideApi } from "core/api";
import { ShowReportDTO } from "core/api/generated";
import { getDefaultValuesForShowReport } from "domains/showreports/getDefaultValuesForShowReport";
import {
  ShowReportForm,
  ShowReportInputs,
} from "domains/showreports/ShowReportForm";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactElement } from "react";

const EventShowReport = ({
  initialValues,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ShowReportForm initialValues={initialValues} id={id as string} />;
};

export const getServerSideProps = (async (context) => {
  const id = context.query.id;
  const ssrApi = serverSideApi(context);

  if (typeof id !== "string") {
    throw new Error("Incorrect ID format");
  }

  const result = await ssrApi.eventsIdShowreportGet({
    id: Number(id),
  });

  const initialValues = getDefaultValuesForShowReport(
    result.showReport as ShowReportDTO
  );

  return {
    props: {
      initialValues,
      id: result.showReport?.id,
    },
  };
}) satisfies GetServerSideProps<{
  initialValues?: ShowReportInputs;
  overrides?: ShowReportInputs;
  id?: string;
}>;

EventShowReport.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default EventShowReport;
