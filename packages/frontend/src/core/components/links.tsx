import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

const NoBreakLink = styled.a`
  white-space: nowrap;
`;

export const PhoneLink: React.FunctionComponent<
  React.PropsWithChildren<{ number?: string | null }>
> = ({ number }) => {
  if (!number) {
    return null;
  }
  return (
    <NoBreakLink href={`tel:${number}`}>
      <Icon name="phone" color="blue" />
      {number}
    </NoBreakLink>
  );
};

export const MailLink: React.FunctionComponent<
  React.PropsWithChildren<{ email?: string | null }>
> = ({ email }) => {
  if (!email) {
    return null;
  }
  return (
    <NoBreakLink href={`mailto:${email}`}>
      <Icon name="mail" color="blue" />
      {email}
    </NoBreakLink>
  );
};

export const OutboundLink: React.FC<{
  children: ReactNode;
  href: string;
  hideIcon?: boolean;
}> = ({ children, href, hideIcon }) => {
  return (
    <a className="link" target="_blank" rel="noreferrer" href={href}>
      {children}
      {!hideIcon && (
        <ArrowTopRightOnSquareIcon className="w-3 h-3 inline mb-1 ml-0.5" />
      )}
    </a>
  );
};
