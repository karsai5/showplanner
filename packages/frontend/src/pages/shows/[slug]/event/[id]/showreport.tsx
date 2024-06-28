import { ShowReportDTO } from "core/api/generated";
import { H2 } from "core/components/Typography";
import { ssrWrapper } from "core/permissions/ssr";
import { ShowReportForm } from "domains/showreports/ShowReportForm";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SuperJSON from "superjson";
import { v4 as uuidv4 } from "uuid";

export const getServerSideProps = ssrWrapper(async (context, api) => {
  const id = context.query.id;

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    throw new Error("Incorrect ID format");
  }

  const event = await api.default.eventsIdGet({
    id: Number(id),
  });

  let showReport: ShowReportDTO;
  if (event.showReport) {
    showReport = await api.showdocs.showdocReportsIdGet({
      id: event.showReport,
    });
  } else {
    showReport = await api.showdocs.showdocReportsIdPost({
      id: uuidv4().toString(),
      report: {
        eventId: Number(id),
      },
    });
  }

  return {
    props: {
      showReportJSON: SuperJSON.stringify(showReport),
      hasTimer: event.showTimer !== undefined,
      id: showReport.id as string,
    },
  };
});

const EventShowReport = ({
  showReportJSON,
  id,
  hasTimer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const path = usePathname();
  const showtimerUrl = path.replace(/\/[^/]*$/, "/showtimer");

  const showReport = SuperJSON.parse<ShowReportDTO>(showReportJSON);

  return (
    <>
      <div className="flex gap-4 justify-between">
        <H2>Show Report</H2>
        <Link href={showtimerUrl}>
          <button className="btn">Show Timer</button>
        </Link>
      </div>
      <ShowReportForm
        initialValues={showReport}
        id={id as string}
        readOnlyTitles={showReport.eventId !== undefined}
        readOnlyTimers={hasTimer}
      />
    </>
  );
};

export default EventShowReport;
