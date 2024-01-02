/* eslint-disable */
import NewShowForm from "./NewEventForm";
import { ShowSummaryContext } from "domains/shows/lib/summaryContext";
import { ShowDTO } from "core/api/generated";

export default {
  title: "NewEventForm",
};

const show: ShowDTO = {
  id: 1,
}

export const Default = () => (<ShowSummaryContext.Provider value={show}>
  <NewShowForm onSuccess={() => { }} />
</ShowSummaryContext.Provider>);

Default.story = {
  name: "default",
};
