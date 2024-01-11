import cc from "classnames";
import ColorHash from "color-hash";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";

const colorHash = new ColorHash();

type Props = {
  id: string;
  show: any; // TODO: Make show dto
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
  const { show } = props;
  if (!show?.attributes) {
    return null;
  }
  const { slug, name, company } = show.attributes;
  const start = dayjs();
  const end = dayjs();
  const dates = getDates(start, end);

  const pastEvent = false;
  const showCount = 0;
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
          <div
            style={{ backgroundColor: colorHash.hex(name) }}
            className="text-white h-40 w-full flex items-center justify-center text-3xl"
          >
            <div>{name}</div>
          </div>
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
            <Link href={`/shows/${slug}`} className="btn btn-block btn-outline">
              View schedule
            </Link>
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
