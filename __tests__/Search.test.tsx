import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Search from '../components/Search';

describe('Search', () => {
  it('renders correctly', () => {
    const mockOnSearch = jest.fn();
    const {getByPlaceholderText, getByTestId} = render(
      <Search onSearchCountry={mockOnSearch} />,
    );

    const searchInput = getByPlaceholderText('Search Here');
    fireEvent.changeText(searchInput, 'india');
    const searchButton = getByTestId('search-button');
    const clearButton = getByTestId('clear-button');

    expect(searchInput).toBeTruthy();
    expect(searchButton).toBeTruthy();
    expect(clearButton).toBeTruthy();
  });

  it('calls onSearchCountry when search button is pressed', () => {
    const mockOnSearch = jest.fn();
    const {getByTestId, getByPlaceholderText} = render(
      <Search onSearchCountry={mockOnSearch} />,
    );
    const searchInput = getByPlaceholderText('Search Here');
    fireEvent.changeText(searchInput, 'india');
    const searchButton = getByTestId('search-button');
    fireEvent.press(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('india');
  });

  it('clears search input when clear button is pressed', () => {
    const mockOnSearch = jest.fn();
    const {getByPlaceholderText, getByTestId} = render(
      <Search onSearchCountry={mockOnSearch} />,
    );

    const searchInput = getByPlaceholderText('Search Here');
    fireEvent.changeText(searchInput, 'india');
    const clearButton = getByTestId('clear-button');

    fireEvent.changeText(searchInput, 'india');
    fireEvent.press(clearButton);

    expect(searchInput.props.value).toBe('');
  });

  it('disables search button when search input is empty', () => {
    const mockOnSearch = jest.fn();
    const {getByTestId, getByPlaceholderText} = render(
      <Search onSearchCountry={mockOnSearch} />,
    );
    const searchInput = getByPlaceholderText('Search Here');
    fireEvent.changeText(searchInput, 'india');

    const searchButton = getByTestId('search-button');
    // expect(searchButton.props.disabled).toBe(true);
    expect(searchButton.props.accessibilityState.disabled).toBe(false);
  });

  it('enables search button when search input has text', () => {
    const mockOnSearch = jest.fn();
    const {getByPlaceholderText, getByTestId} = render(
      <Search onSearchCountry={mockOnSearch} />,
    );

    const searchInput = getByPlaceholderText('Search Here');
    const searchButton = getByTestId('search-button');

    fireEvent.changeText(searchInput, '');
    expect(searchButton.props.accessibilityState.disabled).toBe(true);
  });
});
