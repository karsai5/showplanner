import { ShowReportDTO } from "core/api/generated";
import { ifResponseErrorCode, ssrWrapper } from "core/permissions/ssr";
import { ShowReportForm } from "domains/showreports/ShowReportForm";
import { InferGetServerSidePropsType } from "next";
import superjson from "superjson";

export const getServerSideProps = ssrWrapper(async (context, api) => {
  const id = context.query.id;
  if (typeof id !== "string") {
    throw new Error("Incorrect ID format");
  }
  try {
    const showReport = await api.showdocs.showdocReportsIdGet({ id });
    return { props: { id, showReportJSON: superjson.stringify(showReport) } };
  } catch (err) {
    if (ifResponseErrorCode(err, 404)) {
      return { props: { id, showReportJSON: superjson.stringify({}) } };
    }
    throw err;
  }
});

export default function ShowReport(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <ShowReportForm
      initialValues={superjson.parse<ShowReportDTO>(props.showReportJSON)}
      id={props.id}
    />
  );
}
