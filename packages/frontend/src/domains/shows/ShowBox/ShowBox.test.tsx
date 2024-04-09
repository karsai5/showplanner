import dayjs from "dayjs";

import { getDates } from "./ShowBox";

describe("ShowBox", () => {
  describe("getDates", () => {
    it("if no start of end, return null", () => {
      expect(getDates(undefined, undefined)).toBe(null);
      expect(getDates(dayjs("2022-03-02"), undefined)).toBe(null);
      expect(getDates(undefined, dayjs("2022-03-02"))).toBe(null);
    });
    it("if dates are this year, show the months", () => {
      expect(getDates(dayjs("2022-03-02"), dayjs("2022-04-02"))).toBe(
        "Mar - Apr"
      );
    });
    it("if end date is in a different year, show the year", () => {
      expect(getDates(dayjs("2022-03-02"), dayjs("2023-04-02"))).toBe(
        "Mar - Apr (2023)"
      );
    });
    it("if show is starts and ends in the same month of this year", () => {
      expect(getDates(dayjs("2022-03-02"), dayjs("2022-03-08"))).toBe("Mar");
    });
    it("if show is starts and ends in the same month of next year", () => {
      expect(getDates(dayjs("2023-03-02"), dayjs("2023-03-08"))).toBe(
        "Mar (2023)"
      );
    });
  });
});
