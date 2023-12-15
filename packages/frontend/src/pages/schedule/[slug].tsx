import { H2 } from "core/components/Typography";
import { getUnauthenticatedAxiosClient } from "core/config";
import { returnUrl } from "core/images";
import { EventTable } from "domains/events/EventTable";
import { PublicShowSchedule } from "domains/events/lib/types";
import { RequestToJoinButton } from "domains/shows/RequestToJoinButton";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

const PureShowPage: React.FC<{ showSchedule: PublicShowSchedule }> = ({
  showSchedule,
}) => {
  const { name, company, mainContact } = showSchedule;

  const thumbnailUrl = showSchedule?.bannerimage?.formats?.large?.url;

  return (
    <>
      <Head>
        <title>{name} - ShowPlanner</title>
        <meta property="og:title" content={name} />
        <meta property="og:description" content={`Schedule for ${name}`} />
        {thumbnailUrl && (
          <meta property="og:image" content={returnUrl(thumbnailUrl)} />
        )}
      </Head>
      <div className="flex justify-between">
        <H2>{name}</H2>
        <RequestToJoinButton
          toEmail={showSchedule.mainContact?.email}
          toName={showSchedule.mainContact?.firstname}
          showname={showSchedule.name}
        />
      </div>
      {mainContact && (
        <p>
          Main contact - {mainContact.firstname} {mainContact.lastname}
        </p>
      )}
      {company && <p>{company}</p>}
      {showSchedule.events ? (
        <EventTable events={showSchedule.events as any} />
      ) : (
        <p>No events</p>
      )}
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = getUnauthenticatedAxiosClient();
  const data = await client.get<PublicShowSchedule>(
    `show-schedule/${context.query.slug}`
  );
  return { props: { showSchedule: data?.data } };
};

export default PureShowPage;
