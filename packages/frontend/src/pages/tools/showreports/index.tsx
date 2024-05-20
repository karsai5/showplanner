import { H2 } from "core/components/Typography";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const ShowReport = () => {
  const router = useRouter();

  const createNewShowReport = () => {
    const id = uuidv4();
    router.push(`/tools/showreports/${id}`);
  };
  return (
    <div>
      <H2 className="mb-4">Show reports</H2>
      <button className="btn" onClick={() => createNewShowReport()}>
        Create new show report
      </button>
    </div>
  );
};

export default ShowReport;
