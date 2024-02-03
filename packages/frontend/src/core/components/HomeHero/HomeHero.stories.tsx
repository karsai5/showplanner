/* eslint-disable */
import { SuperTokensWrapper } from "supertokens-auth-react";
import SuperTokensReact from "supertokens-auth-react";
import HomeHero from "./HomeHero";
import { frontendConfig } from "../../../../config/frontendConfig";

export default {
  title: "HomeHero",
};

export const Default = () => {
  SuperTokensReact.init(frontendConfig());
  return (
    <SuperTokensWrapper>
      <HomeHero />
    </SuperTokensWrapper>
  );
};

Default.story = {
  name: "default",
};
