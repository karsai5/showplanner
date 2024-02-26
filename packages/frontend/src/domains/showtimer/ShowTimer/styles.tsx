import { Card, Form, Table } from 'semantic-ui-react';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  &.big-clock {
    width: 300px;
  }
  .clock {
    display: flex;
    flex-direction: column;
  }
  .split {
    display: flex;
    justify-content: space-between;
    > .section {
      &.rhs {
        text-align: right;
      }
      h3 {
        margin-bottom: 0;
      }
    }
  }
  .description {
    font-size: 1.5rem;
  }
  .timer-block {
    font-size: 1rem;
    &.static {
      background: #dfdfdf;
      margin-left: -5px;
      margin-right: -5px;
      padding: 2px 5px;
      margin-bottom: 2px;
      border-radius: 2px;
    }
    .label {
      font-weight: bolder;
      margin-bottom: 0 !important;
    }
    .times {
      font-weight: initial;
    }
    .duration {
      font-size: 1.2rem;
    }
  }
`;

export const StyledForm = styled(Form)`
  width: 290px;
  max-width: 100%;
`;

export const StyledTable = styled(Table)`
  tr.past {
    > td {
      text-decoration: line-through;
      color: #c1c1c1;
    }
  }
`;
