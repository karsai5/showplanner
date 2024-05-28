import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { H2 } from "core/components/Typography";
import { dayMonthYearStringReadable } from "core/dates/datesConstants";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const ShowReport = () => {
  const router = useRouter();

  const createNewShowReport = () => {
    const id = uuidv4();
    gotoShowReport(id);
  };

  const gotoShowReport = (id: string) => {
    router.push(`/tools/showreports/${id}`);
  };

  const { data, isLoading, isError } = useQuery(["showreports"], async () =>
    api.showreportsGet()
  );

  return (
    <div>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">Show reports</H2>
        <button className="btn mt-4" onClick={() => createNewShowReport()}>
          Create new show report
        </button>
      </div>
      {isLoading && <LoadingBox />}
      {isError && <ErrorBox>Could not load show reports</ErrorBox>}
      {data && (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {orderBy(data, "lastUpdated", "desc").map((sr) => (
              <tr
                key={sr.id}
                className="hover cursor-pointer"
                onClick={() => gotoShowReport(sr.id as string)}
              >
                <td>{sr.title}</td>
                <td>
                  {sr.lastUpdated &&
                    dayjs(sr.lastUpdated).format(dayMonthYearStringReadable)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowReport;
