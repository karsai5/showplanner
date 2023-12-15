import { LoginBox } from "domains/authentication/LoginBox/LoginBox";
import { LayoutWithBackgroundImage } from "domains/layout/LayoutWithBackgroundImage";

const Signup = () => {
  return (
    <div className="z-10">
      <LoginBox signup />
    </div>
  );
};

Signup.getLayout = (page: any) => (
  <LayoutWithBackgroundImage>{page}</LayoutWithBackgroundImage>
);

export default Signup;
