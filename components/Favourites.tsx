import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Clear from 'react-native-vector-icons/AntDesign';
import {SvgUri} from 'react-native-svg';
import React, {FC, useEffect, useState} from 'react';
import TextComponent from './TextComponent';

const Favourites: FC<{item: Country[]; setFav: (args: Country[]) => void}> = ({
  item,
  setFav,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [favData, setFavData] = useState<Country[]>([]);
  useEffect(() => {
    filterArray();
  }, [item]);
  const filterArray = () => {
    const uniqueSet = new Set(item);
    setFavData([...uniqueSet]);
  };
  return (
    <View style={{flex: 1}}>
      {item.length > 0 && item && (
        <>
          <View style={styles.favHead}>
            <TextComponent
              size={25}
              color={isDarkMode ? '#fff' : '#2c3e8f'}
              fontWeight={'bold'}
              marginVertical={15}
              align="center">
              Your Favourites
            </TextComponent>
            <TouchableOpacity
              testID="clear-button"
              onPress={() => {
                setFav([]);
              }}
              style={styles.clear}>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Clear
              </Text>
              <Clear name="closecircleo" size={16} color="#000" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={favData}
            renderItem={({item}) => (
              <View
                key={item.name.common}
                style={[
                  styles.flatlist,
                  {
                    backgroundColor: isDarkMode ? '#2f3033' : '#fff',
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
                  <SvgUri height={50} width={70} uri={item?.flags?.svg} />
                </View>

                <TextComponent>
                  Population : {item?.population.toLocaleString('en-IN')}
                </TextComponent>
                <TextComponent>
                  Area : {item?.area} KM & {Math.round(item?.area * 0.621371)}{' '}
                  Miles
                </TextComponent>
                <TextComponent>
                  Languages Spoken : {Object.values(item?.languages).join(', ')}
                </TextComponent>
                <TextComponent>
                  Timezone : {item?.timezones.join(', ')}
                </TextComponent>
                <TextComponent>
                  Currency :
                  {item?.currencies[Object.keys(item?.currencies)[0]]?.name}{' '}
                  {item?.currencies[Object.keys(item?.currencies)[0]]?.symbol}
                </TextComponent>
              </View>
            )}
            keyExtractor={item => item.name.common}
          />
        </>
      )}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
    margin: 10,
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
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

  commonText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'red',
  },
  textHead: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  head: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
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
  },
});
