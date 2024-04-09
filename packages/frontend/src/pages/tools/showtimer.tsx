import { ClockIcon } from "core/components/Icons";
import { H2 } from "core/components/Typography";
import { ShowTimer } from "domains/showtimer/ShowTimer";
import Head from "next/head";

const Shows = () => (
  <>
    <Head>
      <title>ShowTimer</title>
    </Head>
    <H2 className="mb-6 flex items-center gap-2">
      <ClockIcon />
      ShowTimer
    </H2>
    <ShowTimer />
  </>
);

export default Shows;
