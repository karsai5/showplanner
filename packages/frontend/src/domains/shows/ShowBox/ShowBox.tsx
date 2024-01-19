import cc from "classnames";
import ColorHash from "color-hash";
import { ShowSummaryDTO } from "core/api/generated";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";

const colorHash = new ColorHash();

type Props = {
  show: ShowSummaryDTO;
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
            style={{ backgroundColor: colorHash.hex(show.name) }}
            className="text-white h-40 w-full flex items-center justify-center text-3xl"
          >
            <div>{show.name}</div>
          </div>
        </figure>
        <div className="card-body">
          <div className="flex flex-col">
            <h2 className="card-title">
              {show.name}
              {pastEvent && <div className="badge">Show finished</div>}
            </h2>
            <p>{show.company}</p>
          </div>
          <div className="card-actions">
            <Link href={`/shows/${show.slug}`} className="btn btn-block btn-outline">
              View schedule
            </Link>
            {/* <div className="">{dates ? dates : "No dates yet"}</div> */}
            {!!showCount && showCount > 0 && (
              <div className="">{showCount} shows</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
