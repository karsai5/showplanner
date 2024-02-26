import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import React from 'react';

import NewShowForm from './NewShowForm';

describe('<NewShowForm />', () => {
  test('it should mount', () => {
    render(<NewShowForm onSuccess={() => {}} />);

    const newShowForm = screen.getByTestId('NewShowForm');

    expect(newShowForm).toBeInTheDocument();
  });
});
