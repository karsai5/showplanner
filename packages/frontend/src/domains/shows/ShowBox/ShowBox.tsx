/* eslint-disable @next/next/no-img-element */
import cc from "classnames";
import ColorHash from "color-hash";
import { MediaDTO, ShowDTO } from "core/api/generated";
import dayjs from "dayjs";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

const colorHash = new ColorHash();

type Props = {
  show: ShowDTO;
};

export const ShowBox: React.FunctionComponent<Props> = (props) => {
  const { show } = props;
  const pastEvent = show.end && dayjs(show.end).isBefore(new Date());

  const showCount = 0;

  let dates = [show.start, show.end]
    .filter((d) => d)
    .map((d) => dayjs(d).format("MMM"));

  if (dates.length == 2 && dates[0] === dates[1]) {
    dates = [dates[0]];
  }

  return (
    <Tilt
      scale={1.02}
      transitionSpeed={2000}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
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
          {show.image?.url ? (
            <ImageBox image={show.image} />
          ) : (
            <ColorBox showName={show.name} />
          )}
        </figure>
        <div className="card-body">
          <div className="flex flex-col">
            <h2 className="card-title flex gap-2 justify-between">
              {show.name}
              {pastEvent && <div className="badge">Show finished</div>}
            </h2>
            <div className="flex gap-2 justify-between">
              <div>{show.company}</div>
              <div className="whitespace-nowrap">{dates.join(" - ")}</div>
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

const ColorBox: React.FunctionComponent<{ showName: string }> = ({
  showName,
}) => {
  return (
    <div
      style={{ backgroundColor: colorHash.hex(showName) }}
      className="text-white h-40 w-full flex items-center justify-center text-3xl"
    >
      <div>{showName}</div>
    </div>
  );
};

const ImageBox: React.FunctionComponent<{ image: MediaDTO }> = ({ image }) => {
  return (
    <div className="h-40 w-full flex items-center justify-center">
      <img src={image.url} alt="" className="object-cover h-full w-full" />
    </div>
  );
};
