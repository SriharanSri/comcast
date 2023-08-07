import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import Icon2 from 'react-native-vector-icons/Fontisto';
import TextComponent from './TextComponent';

interface Country {
  capital: string[];
  name: {common: string};
  population: number;
  area: number;
  languages: Record<string, string>;
  timezones: string[];
  currencies: Record<string, {name: string; symbol: string}>;
  flags: {svg: string};
}

const CountryCard: FC<{
  item: Country;
  addFavourites: (args: Country) => void;
}> = ({item, addFavourites}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      key={item.name.common}
      style={[
        styles.flatlist,
        {
          backgroundColor: isDarkMode ? '#3d3f45' : '#fff',
          borderColor: isDarkMode ? '#5d5e61' : '#dedfe3',
        },
      ]}>
      <View style={styles.map}>
        <View>
          <TextComponent
            size={25}
            color={isDarkMode ? '#fff' : '#2c3e8f'}
            fontWeight={'bold'}>
            {item?.name?.common}
          </TextComponent>
          <TextComponent
            size={16}
            color={isDarkMode ? '#fff' : '#2c3e8f'}
            fontWeight={'bold'}>
            {item?.capital?.[0]}
          </TextComponent>
        </View>
        <View style={{flexDirection: 'row'}}>
          <SvgUri height={50} width={70} uri={item?.flags?.svg} />

          <TouchableOpacity
            onPress={() => addFavourites(item)}
            style={styles.searchArea}>
            <Icon2 name="favorite" size={25} color="#a39350" />
          </TouchableOpacity>
        </View>
      </View>
      <TextComponent>
        Population : {item?.population.toLocaleString('en-IN')}
      </TextComponent>
      <TextComponent>
        Area : {item?.area} KM & {Math.round(item?.area * 0.621371)} Miles
      </TextComponent>
      <TextComponent>
        Languages Spoken : {Object.values(item?.languages).join(', ')}
      </TextComponent>
      <TextComponent>Timezone : {item?.timezones.join(', ')}</TextComponent>
      <TextComponent>
        Currency :{item?.currencies[Object.keys(item?.currencies)[0]]?.name}{' '}
        {item?.currencies[Object.keys(item?.currencies)[0]]?.symbol}
      </TextComponent>
    </View>
  );
};

export default CountryCard;

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
    margin: 10,
    borderRadius: 15,
    padding: 10,
    borderWidth: 3.5,
    borderColor: '#dedfe3',
  },
  map: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  searchArea: {
    height: 40,
    width: 40,
    // backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  textHead: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  head: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginVertical: 10,
  },
  clear: {
    height: 28,
    width: 80,
    backgroundColor: '#dedfe3',
    borderRadius: 6,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  favHead: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
});
