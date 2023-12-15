import { LoginBox } from "domains/authentication/LoginBox/LoginBox";
import { LayoutWithBackgroundImage } from "domains/layout/LayoutWithBackgroundImage";

const Login = () => {
  return (
    <div className="z-10">
      <LoginBox />
    </div>
  );
};

Login.getLayout = (page: any) => (
  <LayoutWithBackgroundImage>{page}</LayoutWithBackgroundImage>
);

export default Login;
