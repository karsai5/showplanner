import { dateFormatStringWithDay } from 'core/dates/datesConstants';
import dayjs from 'dayjs';

export const displayDate = (time: string | Date) => {
  if (!time) {
    return null;
  }
  const date = dayjs(time);

  let dateString = date.format(dateFormatStringWithDay);
  if (date.year() !== dayjs().year()) {
    dateString = dateString + ` (${date.year()})`;
  }
  return dateString;
};
