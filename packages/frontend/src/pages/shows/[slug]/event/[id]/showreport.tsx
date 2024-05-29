import { serverSideApi } from "core/api";
import { H2 } from "core/components/Typography";
import { getDefaultValuesForShowReport } from "domains/showreports/getDefaultValuesForShowReport";
import {
  ShowReportForm,
  ShowReportInputs,
} from "domains/showreports/ShowReportForm";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

const EventShowReport = ({
  initialValues,
  id,
  hasTimer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const path = usePathname();
  const showtimerUrl = path.replace(/\/[^/]*$/, "/showtimer");

  return (
    <>
      <div className="flex gap-4 justify-between">
        <H2>Show Report</H2>
        <Link href={showtimerUrl}>
          <button className="btn">Show Timer</button>
        </Link>
      </div>
      <ShowReportForm
        initialValues={initialValues}
        id={id as string}
        readOnlyTitles={initialValues.eventId !== undefined}
        readOnlyTimers={hasTimer}
      />
    </>
  );
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

  if (event.showReport) {
    const showReport = await ssrApi.showreportsIdGet({
      id: event.showReport,
    });
    return {
      props: {
        initialValues: getDefaultValuesForShowReport(showReport),
        hasTimer: event.showTimer !== undefined,
        id: showReport.id as string,
      },
    };
  }

  const newShowReport = await ssrApi.showreportsIdPost({
    id: uuidv4().toString(),
    report: {
      eventId: Number(id),
    },
  });

  return {
    props: {
      initialValues: getDefaultValuesForShowReport(newShowReport),
      hasTimer: event.showTimer !== undefined,
      id: newShowReport.id as string,
    },
  };
}) satisfies GetServerSideProps<{
  initialValues?: ShowReportInputs;
  hasTimer?: boolean;
  id: string;
}>;

EventShowReport.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default EventShowReport;
