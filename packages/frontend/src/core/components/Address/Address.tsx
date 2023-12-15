import React, { FC } from "react";

interface AddressProps {
  location?: {
    address?: string;
    name?: string;
  };
}

const getUrl = (address: string) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
};

const Address: FC<AddressProps> = ({ location }) => {
  if (!location) {
    return null;
  }
  const { address, name } = location;
  if (address) {
    return (
      <a
        className="link"
        target="_blank"
        href={getUrl(address)}
        rel="noreferrer"
      >
        {name || address}
      </a>
    );
  }
  if (name) {
    return <>name</>;
  }
  return null;
};

export default Address;
