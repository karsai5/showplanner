import { serverSideApi } from "core/api";
import { getDefaultValuesForShowReport } from "domains/showreports/getDefaultValuesForShowReport";
import {
  ShowReportForm,
  ShowReportInputs,
} from "domains/showreports/ShowReportForm";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

const EventShowReport = ({
  initialValues,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ShowReportForm initialValues={initialValues} id={id as string} />;
};

export const getServerSideProps = (async (context) => {
  const id = context.query.id;
  const ssrApi = serverSideApi(context);

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    throw new Error("Incorrect ID format");
  }

  const event = await ssrApi.eventsIdGet({
    id: Number(id),
  });

  if (!event.showReport) {
    const newShowReport = await ssrApi.showreportsIdPost({
      id: uuidv4().toString(),
      report: {
        eventId: Number(id),
      },
    });

    return {
      props: {
        initialValues: getDefaultValuesForShowReport(newShowReport),
        id: newShowReport.id as string,
      },
    };
  } else {
    const showReport = await ssrApi.showreportsIdGet({
      id: event.showReport,
    });
    return {
      props: {
        initialValues: getDefaultValuesForShowReport(showReport),
        id: showReport.id as string,
      },
    };
  }
}) satisfies GetServerSideProps<{
  initialValues?: ShowReportInputs;
  id: string;
}>;

EventShowReport.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default EventShowReport;
