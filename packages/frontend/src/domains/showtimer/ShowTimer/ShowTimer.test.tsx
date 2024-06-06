import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "jest-canvas-mock";

import { ShowTimer } from "./ShowTimer";

describe("Showtimer", () => {
  it("Should render the ShowTimer component", () => {
    render(<ShowTimer />);
    expect(screen.getByText(/Current time/i)).toBeInTheDocument();
  });

  const setup = (
    options: {
      props?: React.ComponentProps<typeof ShowTimer>;
    } = { props: {} }
  ) => {
    const user = userEvent.setup({ delay: null });
    render(<ShowTimer {...options.props} />);
    return { user };
  };

  describe("Beginners", () => {
    it("should save house open time", async () => {
      const now = new Date("2020-01-01:19:30:00");
      jest.useFakeTimers().setSystemTime(now);

      const onChange = jest.fn();
      const { user } = setup({ props: { onChange } });

      await user.click(screen.getByText(/House open/i));
      expect(onChange).toBeCalledWith(
        expect.objectContaining({ houseOpen: now })
      );
    });

    it("should save FOH clearance", async () => {
      const now = new Date("2020-01-01:19:30:00");
      jest.useFakeTimers().setSystemTime(now);

      const onChange = jest.fn();
      const { user } = setup({ props: { onChange } });

      await user.click(screen.getByText(/FOH clearance/i));
      expect(onChange).toBeCalledWith(
        expect.objectContaining({ fohClearance: now })
      );
    });

    it("should save FOH clearance", async () => {
      const now = new Date("2020-01-01:19:30:00");
      jest.useFakeTimers().setSystemTime(now);

      const onChange = jest.fn();
      const { user } = setup({ props: { onChange } });

      await user.click(screen.getByText(/Start act one/i));
      expect(onChange).toBeCalledWith(
        expect.objectContaining({ actOneStart: now })
      );

      // Should show next screen
      screen.getByText(/Act one/i);
    });
  });

  describe("Act one", () => {
    it("Should show act one started time", async () => {
      const now = new Date("2020-01-01:19:30:00");
      jest.useFakeTimers().setSystemTime(now);

      const onChange = jest.fn();
      const { user } = setup({ props: { onChange } });

      await user.click(screen.getByText(/Start act one/i));
      expect(screen.getByText("Started at 7:30pm")).toBeInTheDocument();
    });

    it("Should show started time", async () => {
      const now = new Date("2020-01-01:19:30:00");
      jest.useFakeTimers().setSystemTime(now);

      const onChange = jest.fn();
      const { user } = setup({ props: { onChange } });

      await user.click(screen.getByText(/Start act one/i));
      expect(screen.getByText("7:30pm - ongoing")).toBeInTheDocument();
    });
  });

  describe("Interval", () => {
    it("should be able to go to interval", async () => {
      const now = new Date("2020-01-01:19:30:00");
      jest.useFakeTimers().setSystemTime(now);

      const onChange = jest.fn();
      const { user } = setup({ props: { onChange } });

      await user.click(screen.getByText(/Start act one/i));

      await user.click(screen.getByText(/Start Interval/i));
      expect(onChange).toBeCalledWith(
        expect.objectContaining({ intervalStart: now })
      );
    });
  });
});
