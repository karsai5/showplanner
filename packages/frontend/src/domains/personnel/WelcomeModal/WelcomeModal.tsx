import cc from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';

import heroImage from './stairs.png';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={cc('modal', { ['modal-open']: isOpen })}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Welcome to the ShowPlanner!</h3>
        <Image height="200" className="mx-auto" src={heroImage} alt="" />
        <p className="py-4">
          Hi there, thanks for signing up to use the ShowPlanner! Before you can
          acess the site we just need to setup the rest of your profile.
        </p>
        <p className="py-4">
          The information here will get shared with the stage manager of shows
          you join. In instances where other people are helping with organising
          the show, your information will also be available to them.
        </p>
        <div className="modal-action">
          <button className="btn" onClick={() => setIsOpen(false)}>
            Yay! Let&apos;s get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
