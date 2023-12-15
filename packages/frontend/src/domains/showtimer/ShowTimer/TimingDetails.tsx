import { Table, TableCaption, Tbody, Td, Tr } from "@chakra-ui/react";
import moment from "moment";

import { TimerLabels, Timers } from "./types";

export const getShowLengths = (timers: Timers) => {
  const showDiff = moment(timers.actTwoEnd).diff(timers.actOneStart);
  const actOneDiff = moment(timers.intervalStart).diff(timers.actOneStart);
  const intervalDiff = moment(timers.intervalEnd).diff(timers.intervalStart);
  const actTwoDiff = moment(timers.actTwoEnd).diff(timers.intervalEnd);

  return {
    showDiff,
    actOneDiff,
    intervalDiff,
    actTwoDiff,
    actTwoLength: moment.utc(actTwoDiff).format("HH:mm:ss"),
    intervalLength: moment.utc(intervalDiff).format("HH:mm:ss"),
    showLength: moment.utc(showDiff).format("HH:mm:ss"),
    actOneLength: moment.utc(actOneDiff).format("HH:mm:ss"),
  };
};

export const TimingDetails: React.FC<{
  timers: Timers;
}> = ({ timers }) => {
  const {
    showDiff,
    actOneDiff,
    intervalDiff,
    actTwoDiff,
    actTwoLength,
    intervalLength,
    showLength,
    actOneLength,
  } = getShowLengths(timers);

  const getTime = (timerKey: keyof Timers) => {
    const value = timers[timerKey];
    if (!value) {
      return null;
    }
    return moment(value).format("hh:mma");
  };

  const Row: React.FC<React.PropsWithChildren<{ timerKey: keyof Timers }>> = ({
    timerKey,
  }) => {
    return (
      <Tr>
        <Td>{TimerLabels[timerKey]}</Td>
        <Td>{getTime(timerKey)}</Td>
      </Tr>
    );
  };
  return (
    <>
      <Table size="sm">
        <TableCaption placement="top">Show length</TableCaption>
        <Tbody>
          <Tr>
            <Td>Act One Length</Td>
            <Td>{actOneDiff > 0 ? actOneLength : "N/A"}</Td>
          </Tr>
          <Tr>
            <Td>Interval Length</Td>
            <Td>{intervalDiff > 0 ? intervalLength : "N/A"}</Td>
          </Tr>
          <Tr>
            <Td>Act Two Length</Td>
            <Td>{actTwoDiff > 0 ? actTwoLength : "N/A"}</Td>
          </Tr>
          <Tr>
            <Td>Show length</Td>
            <Td>{showDiff > 0 ? showLength : "N/A"}</Td>
          </Tr>
        </Tbody>
      </Table>
      <Table size="sm" mb={4}>
        <TableCaption placement="top">Timestamps</TableCaption>
        <Tbody>
          <Row timerKey="houseOpen" />
          <Row timerKey="fohClearance" />
          <Row timerKey="actOneStart" />
          <Row timerKey="intervalStart" />
          <Row timerKey="intervalFohClearance" />
          <Row timerKey="intervalEnd" />
          <Row timerKey="bowsStart" />
          <Row timerKey="orchestraEnd" />
          <Row timerKey="actTwoEnd" />
        </Tbody>
      </Table>
    </>
  );
};
