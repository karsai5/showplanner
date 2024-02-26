import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import React from 'react';

import WelcomeModal from './WelcomeModal';

describe('<WelcomeModal />', () => {
  test('it should mount', () => {
    render(<WelcomeModal />);

    const welcomeModal = screen.getByTestId('WelcomeModal');

    expect(welcomeModal).toBeInTheDocument();
  });
});
