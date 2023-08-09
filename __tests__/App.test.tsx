import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);

    const heading = getByText('Country Explorer');
    expect(heading).toBeTruthy();
  });
});
