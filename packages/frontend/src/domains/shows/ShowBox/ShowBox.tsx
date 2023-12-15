import cc from "classnames";
import ColorHash from "color-hash";
import { FragmentType, useFragment } from "core/gql";
import { getImageUrl } from "core/images";
import dayjs, { Dayjs } from "dayjs";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { RequestToJoinButton } from "../RequestToJoinButton";
import { ContactForm_ShowFragment, ShowBox_ShowFragment } from "./gql";

const colorHash = new ColorHash();

type Props = {
  id: string;
  show: FragmentType<typeof ShowBox_ShowFragment>;
  expressionOfInterest?: boolean;
};

const getDateString = (date: Dayjs) => {
  if (dayjs().isSame(date, "year")) {
    return date.format("MMM");
  }
  return date.format("MMM (YYYY)");
};

export const getDates = (paramStart: any, paramEnd: any) => {
  if (!paramStart || !paramEnd) {
    return null;
  }
  const start = dayjs(paramStart);
  const end = dayjs(paramEnd);
  if (start.isSame(end, "month")) {
    if (dayjs().isSame(start, "year")) {
      return start.format("MMM");
    }
    return start.format("MMM (YYYY)");
  }
  return `${getDateString(start)} - ${getDateString(end)}`;
};

export const ShowBox: React.FunctionComponent<Props> = (props) => {
  const show = useFragment(ShowBox_ShowFragment, props.show);
  if (!show?.attributes) {
    return null;
  }
  const { bannerimage, slug, name, company } = show.attributes;
  const start = minBy(show.attributes.events?.data, "attributes.start")
    ?.attributes?.start;
  const end = maxBy(show.attributes.events?.data, "attributes.start")
    ?.attributes?.start;
  const dates = getDates(start, end);

  const pastEvent = start && end && moment(end).isBefore(moment());
  const showCount = show.attributes.events?.data?.filter(
    (e) => !!e.attributes?.curtainsUp
  ).length;
  const imageUrl = getImageUrl(bannerimage, "medium");
  return (
    <>
      <div
        className={cc(
          {
            grayscale: pastEvent,
          },
          "card card-compact w-full sm:w-80 bg-base-100 shadow-xl"
        )}
      >
        <figure className="relative h-40">
          {imageUrl ? (
            <Image src={imageUrl} layout="fill" objectFit="cover" alt="" />
          ) : (
            <div
              style={{ backgroundColor: colorHash.hex(name) }}
              className="text-white h-40 w-full flex items-center justify-center text-3xl"
            >
              <div>{name}</div>
            </div>
          )}
        </figure>
        <div className="card-body">
          <div className="flex flex-col">
            <h2 className="card-title">
              {name}
              {pastEvent && <div className="badge">Show finished</div>}
            </h2>
            <p>{company}</p>
          </div>
          <div className="card-actions">
            {props.expressionOfInterest ? (
              <ContactButton show={props.show as any} />
            ) : (
              <Link href={`/shows/${slug}`}>
                <a className="btn btn-block btn-outline">View schedule</a>
              </Link>
            )}
            <div className="">{dates ? dates : "No dates yet"}</div>
            {!!showCount && showCount > 0 && (
              <div className="">{showCount} shows</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const ContactButton: React.FC<{
  show: FragmentType<typeof ContactForm_ShowFragment>;
}> = (props) => {
  const show = useFragment(ContactForm_ShowFragment, props.show);
  const { data: session } = useSession();
  return (
    <RequestToJoinButton
      toEmail={show.attributes?.mainContact?.data?.attributes?.email as string}
      toName={
        show.attributes?.mainContact?.data?.attributes?.firstname as string
      }
      fromName={session?.person?.attributes?.firstname as string}
      fromEmail={session?.person?.attributes?.email as string}
      showname={show?.attributes?.name as string}
      className="btn-block"
    />
  );
};
