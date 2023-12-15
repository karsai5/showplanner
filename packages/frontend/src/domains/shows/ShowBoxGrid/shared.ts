import { ShowEntity } from "core/gql/graphql";
import sortBy from "lodash/sortBy";

export const sortShowsByFirstShow = (shows?: Array<ShowEntity>) => {
  if (!shows) {
    return shows;
  }
  return sortBy(shows, (show) => {
    const showDates = show?.attributes?.events?.data.filter(
      (e) => e.attributes?.curtainsUp
    );
    const sortedShowDates = sortBy(showDates, (e) => e?.attributes?.start);
    if (sortedShowDates?.length >= 1) {
      return sortedShowDates[0]?.attributes?.start;
    }
    return undefined;
  });
};
