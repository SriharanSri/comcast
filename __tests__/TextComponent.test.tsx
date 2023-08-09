import React from 'react';
import {render} from '@testing-library/react-native';
import TextComponent from '../components/TextComponent';

describe('TextComponent', () => {
  it('renders the provided text', () => {
    const {getByText} = render(<TextComponent>Hello, World!</TextComponent>);
    const textElement = getByText('Hello, World!');
    expect(textElement).toBeDefined();
  });
});
