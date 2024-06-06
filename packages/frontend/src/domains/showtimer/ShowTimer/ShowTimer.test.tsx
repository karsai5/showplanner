import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    it.skip("should save FOH clearance", async () => {
      const now = new Date("2020-01-01:19:30:00");
      jest.useFakeTimers().setSystemTime(now);

      const onChange = jest.fn();
      const { user } = setup({ props: { onChange } });

      await user.click(screen.getByText(/Start act one/i));
      expect(onChange).toBeCalledWith(expect.objectContaining({ actOne: now }));
    });
  });
});
