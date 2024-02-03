import React, { FC } from "react";

interface AddressProps {
  address?: string;
}

const getUrl = (address: string) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
};

const Address: FC<AddressProps> = ({ address }) => {
  if (!address) {
    return null;
  }

  return (
    <a className="link" target="_blank" href={getUrl(address)} rel="noreferrer">
      {address}
    </a>
  );
};

export default Address;
