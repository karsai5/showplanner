/* eslint-disable */
import { ShowSummaryContext } from "domains/shows/lib/summaryContext";
import { ShowDTO } from "core/api/generated";
import { EventDividerForm } from "./EventDividerForm";

export default {
  title: "Forms / Event Divider",
};

const show: ShowDTO = {
  id: 1,
  name: "",
  company: "",
  slug: "",
};

export const New = () => (
  <ShowSummaryContext.Provider value={show}>
    <EventDividerForm onSuccess={() => {}} showId={0} />
  </ShowSummaryContext.Provider>
);
