/* eslint-disable */
import ErrorBox from "./ErrorBox";

export default {
  title: "ErrorBox",
};

export const Default = () => <ErrorBox>Example error box</ErrorBox>;

Default.story = {
  name: "default",
};

export const Info = () => <ErrorBox info>Example info box</ErrorBox>;
