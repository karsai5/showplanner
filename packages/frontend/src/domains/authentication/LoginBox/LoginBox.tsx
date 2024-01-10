import cc from "classnames";
import { CrossIcon } from "core/components/Icons";
import { API_URL } from "core/config";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaDiscord, FaFacebook, FaGoogle } from "react-icons/fa";

type Inputs = {
  username: string;
  password: string;
};

export const LoginBox: React.FC<{ className?: string; signup?: boolean }> = ({
  signup,
}) => {
  const noun = signup ? "Signup" : "Login";
  const verb = signup ? "Sign up" : "Log in";
  const status = undefined;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [errorCode, setErrorCode] = useState<undefined | number>(undefined);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setErrorCode(undefined);

    const result: any = undefined;

    setLoading(false);

    if (result?.error) {
      setErrorCode(result.status);
    }

    if (result?.url) router.push(result?.url);
  };

  if (status === "authenticated") {
    return (
      <div className="card card-compact w-full sm:w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Already signed in</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card card-compact w-full sm:w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{noun}</h2>
          <div className="flex flex-col gap-3">
            <Link href={`${API_URL}/api/connect/google`} className="btn">
              <a className="btn bg-sky-500 border-sky-500">
                <FaGoogle className="mr-2" />
                {verb} with Google
              </a>
            </Link>
            <Link href={`${API_URL}/api/connect/facebook`}>
              <a className="btn bg-sky-700 border-sky-700">
                <FaFacebook className="mr-2" />
                {verb} with Facebook
              </a>
            </Link>
            <Link href={`${API_URL}/api/connect/discord`}>
              <a className="btn bg-zinc-500 border-zinc-500">
                <FaDiscord className="mr-2" />
                {verb} with Discord
              </a>
            </Link>
          </div>
          {!signup && (
            <>
              <div className="divider">OR</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <>
                  <div className="form-control w-full mb-4">
                    <input
                      type="text"
                      placeholder="Username"
                      className={cc(
                        { ["input-error"]: !!errors.username },
                        "input input-bordered w-full"
                      )}
                      disabled={loading}
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <label className="label">
                        <span className="label-text-alt text-red-600 ">
                          Username is required
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control w-full">
                    <input
                      type="password"
                      placeholder="Password"
                      className={cc(
                        { ["input-error"]: !!errors.password },
                        "input input-bordered w-full"
                      )}
                      disabled={loading}
                      {...register("password", { required: true })}
                    />
                    <label className="label">
                      <span className="label-text-alt text-red-600">
                        {errors.password && "Password is required"}
                      </span>
                    </label>
                  </div>

                  {errorCode && (
                    <div className="alert alert-error mb-4">
                      <div>
                        <CrossIcon />
                        <span>
                          {errorCode === 401
                            ? "Incorrect username or password"
                            : "Something went wrong logging in"}
                        </span>
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    className={cc({ loading }, "btn btn-block")}
                  >
                    Login
                  </button>
                </>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};
