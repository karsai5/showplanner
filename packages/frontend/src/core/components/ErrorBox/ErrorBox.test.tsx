import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import React from 'react';

import ErrorBox from './ErrorBox';

describe('<ErrorBox />', () => {
  test('it should mount', () => {
    render(<ErrorBox />);

    const errorBox = screen.getByTestId('ErrorBox');

    expect(errorBox).toBeInTheDocument();
  });
});
