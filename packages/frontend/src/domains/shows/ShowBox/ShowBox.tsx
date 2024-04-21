import cc from "classnames";
import ColorHash from "color-hash";
import { ShowDTO } from "core/api/generated";
import { dateFormatString } from "core/dates/datesConstants";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";
import Tilt from 'react-parallax-tilt';

dayjs.extend(advancedFormat);

const colorHash = new ColorHash();

type Props = {
  show: ShowDTO;
};

export const ShowBox: React.FunctionComponent<Props> = (props) => {
  const { show } = props;
  const pastEvent = show.end && dayjs(show.end).isBefore(new Date());

  const showCount = 0;

  const dates = [show.start, show.end]
    .filter((d) => d)
    .map((d) => dayjs(d).format(dateFormatString))
    .join(" - ");

  return (
    <Tilt scale={1.02} transitionSpeed={2000} tiltMaxAngleX={10} tiltMaxAngleY={10}>
      <Link
        href={`/shows/${show.slug}`}
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
            <h2 className="card-title flex gap-2 justify-between">
              {show.name}
              {pastEvent && <div className="badge">Show finished</div>}
            </h2>
            <div className="flex gap-2 justify-between">
              <div>{show.company}</div>
              <div>{dates}</div>
            </div>
          </div>
          <div className="card-actions">
            {/* <div className="">{dates ? dates : "No dates yet"}</div> */}
            {!!showCount && showCount > 0 && (
              <div className="">{showCount} shows</div>
            )}
          </div>
        </div>
      </Link>
    </Tilt>
  );
};
