import { Configuration, DefaultApi } from "api";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";

interface HomeHeroProps { }

const HomeHero: FC<HomeHeroProps> = () => {
  const session = Session.useSessionContext();

  return (
    <div className="hero relative h-full">
      <div className="hero-content text-center text-neutral-content bg-white rounded-md p-6">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome to the ShowPlanner
          </h1>
          <p className="mb-5">
            For all your crew management needs. <br />
            Login to view shows assigned to you.
          </p>
          {!session.loading && !session.doesSessionExist && (
            <>
              <Link href="/auth">
                <button className="btn btn-primary mr-4 w-28">Log In</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
