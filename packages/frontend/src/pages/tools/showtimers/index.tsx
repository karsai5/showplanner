import { PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { H2 } from "core/components/Typography";
import {
  dateFormatStringWithDayAndTime,
  timeFormatString,
} from "core/dates/datesConstants";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { orderBy } from "lodash";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

dayjs.extend(advancedFormat);

const ShowReport = () => {
  const router = useRouter();

  const createNewShowTimer = () => {
    const id = uuidv4();
    gotoShowTimer(id);
  };

  const gotoShowTimer = (id: string) => {
    router.push(`/tools/showtimers/${id}`);
  };

  const { data, isLoading, isError } = useQuery(["showtimers"], async () =>
    api.showdocs.showdocTimersGet()
  );

  return (
    <div>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">Show timers</H2>
        <button className="btn mt-4" onClick={() => createNewShowTimer()}>
          <PlusIcon className="h-5 w-5" />
          Show timer
        </button>
      </div>
      {isLoading && <LoadingBox />}
      {isError && <ErrorBox>Could not load show timers</ErrorBox>}
      {data && (
        <table className="table">
          <thead>
            <tr>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {orderBy(data, "createdAt", "desc").map((sr) => (
              <tr
                key={sr.id}
                className="hover cursor-pointer"
                onClick={() => gotoShowTimer(sr.id as string)}
              >
                {!sr.showStart && <td colSpan={2}>Not started</td>}
                {sr.showStart && (
                  <>
                    <td>
                      {sr.showStart &&
                        dayjs(sr.showStart).format(
                          dateFormatStringWithDayAndTime
                        )}
                    </td>
                    <td>
                      {sr.showEnd && dayjs(sr.showEnd).format(timeFormatString)}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowReport;
