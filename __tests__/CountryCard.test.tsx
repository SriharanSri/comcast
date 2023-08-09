import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CountryCard from '../components/ContryCard';

describe('CountryCard', () => {
  const mockAddFavourites = jest.fn();

  const mockCountry = {
    name: {common: 'india'},
    capital: ['New Delhi'],
    flags: {svg: 'https://flagcdn.com/in.svg'},
    population: 1000000,
    area: 500,
    languages: {en: 'English', fr: 'Tamil'},
    timezones: ['UTC+1'],
    currencies: {USD: {name: 'US Dollar', symbol: '$'}},
  };

  it('renders correctly', () => {
    const {getByTestId, getByText} = render(
      <CountryCard item={mockCountry} addFavourites={mockAddFavourites} />,
    );

    const countryName = getByText('india');
    const capital = getByText('New Delhi');
    const population = getByText('Population : 10,00,000');
    const favoriteButton = getByTestId('favorite-button');

    expect(countryName).toBeTruthy();
    expect(capital).toBeTruthy();
    expect(population).toBeTruthy();
    expect(favoriteButton).toBeTruthy();
  });

  it('calls addFavourites when favorite button is pressed', () => {
    const {getByTestId} = render(
      <CountryCard item={mockCountry} addFavourites={mockAddFavourites} />,
    );

    const favoriteButton = getByTestId('favorite-button');
    fireEvent.press(favoriteButton);

    expect(mockAddFavourites).toHaveBeenCalledWith(mockCountry);
  });
});
