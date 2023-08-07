import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const TextComponent: FC<{
  children: ReactNode;
  size?: number;
  fontWeight?: any;
  color?: string;
  align?: any;
  marginVertical?: number;
}> = ({
  children,
  size = 13,
  fontWeight = '500',
  color,
  align = 'auto',
  marginVertical,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeText = isDarkMode ? Colors.lighter : Colors.darker;
  return (
    <Text
      style={[
        {
          color: color ? color : themeText,
          fontSize: size,
          fontWeight: fontWeight,
          textAlign: align,
          marginVertical: marginVertical,
        },
      ]}>
      {children}
    </Text>
  );
};

export default TextComponent;
