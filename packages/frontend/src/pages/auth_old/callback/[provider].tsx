import { CrossIcon } from "core/components/Icons";
import { LayoutWithBackgroundImage } from "domains/layout/LayoutWithBackgroundImage";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const CallbackProvider = () => {
  const router = useRouter();
  const { provider, access_token } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const doSignIn = async () => {
      setLoading(true);
      const signinresult = await signIn("auth-callback", {
        redirect: false,
        provider: provider,
        access_token: access_token,
        callbackUrl: window.location.origin,
      });
      setLoading(false);
      if (signinresult?.url) {
        router.push(signinresult?.url);
      } else {
        setError(true);
      }
    };
    if (provider && access_token) {
      doSignIn();
    }
  }, [provider, access_token]);

  return (
    <div className="card card-compact w-full sm:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Logging in with {provider}</h2>
        {error && (
          <div className="alert alert-error mb-4">
            <div>
              <CrossIcon />
              <span>Something went wrong and you could not be logged in.</span>
            </div>
          </div>
        )}
        {loading && <progress className="progress w-full"></progress>}
      </div>
    </div>
  );
};

CallbackProvider.getLayout = (page: any) => (
  <LayoutWithBackgroundImage>{page}</LayoutWithBackgroundImage>
);

export default CallbackProvider;
