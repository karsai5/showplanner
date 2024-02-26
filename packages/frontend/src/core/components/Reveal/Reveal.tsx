import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const Body = styled.div`
  margin-left: 0.5rem;
  margin-top: 0.5rem;
`;

export const Reveal: React.FunctionComponent<
  React.PropsWithChildren<{ text: string; children: React.ReactNode }>
> = ({ text, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: '0.5rem' }}>
      <header onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
        <Icon name={open ? 'caret down' : 'caret right'} />
        {text}
      </header>
      {open ? <Body>{children}</Body> : null}
    </div>
  );
};
