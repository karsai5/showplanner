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
          <h2>Welcome to the ShowPlanner</h2>
          <Image src={imageSrc} className="m-0 mr-auto ml-auto" height="200" alt="People chaotically organising paper" />
          <p className="mb-5 mt-0">
            Tired of dozens of complicated spreadsheets? Use the ShowPlanner to handle schedules, availabilities and rostering.
          </p>
          {!session.loading && !session.doesSessionExist && (
            <>
              <Link href="/auth" className="btn btn-primary mr-4 w-28">
                Log In
              </Link>
            </>
          )}
          <p>Interested in organising your next show with the ShowPlanner? Reach out by filling in <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScECbLQKaO33JURBgheSSo6f2IUGsrxiDS66nKLdxK0ZvXdOg/viewform">this form</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
