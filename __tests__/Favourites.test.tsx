import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Favourites from '../components/Favourites';
Favourites;

describe('Favourites', () => {
  const mockSetFav = jest.fn();

  const mockFavItems = [
    {
      name: {common: 'india'},
      capital: ['New Delhi'],
      flags: {svg: 'https://flagcdn.com/in.svg'},
      population: 1000000,
      area: 500,
      languages: {en: 'English', fr: 'Tamil'},
      timezones: ['UTC+1'],
      currencies: {USD: {name: 'US Dollar', symbol: '$'}},
    },
  ];
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(
      <Favourites item={mockFavItems} setFav={mockSetFav} />,
    );

    const favHeaderText = getByText('Your Favourites');
    const clearButton = getByTestId('clear-button');

    expect(favHeaderText).toBeTruthy();
    expect(clearButton).toBeTruthy();
  });

  it('calls setFav when clear button is pressed', () => {
    const {getByTestId} = render(
      <Favourites item={mockFavItems} setFav={mockSetFav} />,
    );

    const clearButton = getByTestId('clear-button');
    fireEvent.press(clearButton);

    expect(mockSetFav).toHaveBeenCalledWith([]);
  });
});
