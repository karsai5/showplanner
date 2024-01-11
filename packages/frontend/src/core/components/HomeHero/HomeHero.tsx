import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import Session from "supertokens-auth-react/recipe/session";

import imageSrc from './hero.png';

interface HomeHeroProps { }

const HomeHero: FC<HomeHeroProps> = () => {
  const session = Session.useSessionContext();

  return (
    <div className="hero relative h-full">
      <div className="hero-content text-center text-neutral-content bg-white rounded-md p-6">
        <div className="max-w-md prose">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome to the ShowPlanner
          </h1>
          <Image src={imageSrc} objectFit="scale-down" alt="People chaotically organising paper" />
          <p className="mb-5">
            Tired of dozens of complicated spreadsheets? Use the ShowPlanner to handle schedules, availabilities and rostering.
          </p>
          {!session.loading && !session.doesSessionExist && (
            <>
              <Link href="/auth" className="btn btn-primary mr-4 w-28">
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
