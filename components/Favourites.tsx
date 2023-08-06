import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {SvgUri} from 'react-native-svg';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React, {useEffect, useState} from 'react';
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
const Favourites = ({item, setFav}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeBackground = isDarkMode ? Colors.darker : Colors.lighter;
  const themeText = isDarkMode ? Colors.lighter : Colors.darker;
  const [favData, setFavData] = useState<Country[]>([]);
  useEffect(() => {
    uniqueArray();
  }, [item]);
  const uniqueArray = async () => {
    const uniqueArray = await item.map((obj: any) => JSON.stringify(obj));
    const uniqueSet = new Set(uniqueArray);
    const value = Array.from(uniqueSet).map((str: any) => JSON.parse(str));
    setFavData([...value]);
  };
  return (
    <View style={{flex: 1}}>
      {item.length > 0 && item && (
        <>
          <View style={styles.favHead}>
            <Text
              style={[styles.head, {color: isDarkMode ? '#fff' : '#2c3e8f'}]}>
              Your Favourites
            </Text>
            <TouchableOpacity
              onPress={() => {
                setFav([]);
                setFavData([]);
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
              <Icon1 name="closecircleo" size={16} color="#000" />
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
                    backgroundColor: isDarkMode ? '#3d3f45' : '#fff',
                    borderColor: isDarkMode ? '#5d5e61' : '#dedfe3',
                  },
                ]}>
                <View style={styles.map}>
                  <View>
                    <Text
                      style={[
                        styles.textHead,
                        {color: isDarkMode ? '#fff' : '#2c3e8f', fontSize: 24},
                      ]}>
                      {item?.name?.common}
                    </Text>
                    <Text
                      style={[
                        styles.textHead,
                        {color: isDarkMode ? '#fff' : '#2c3e8f'},
                      ]}>
                      {item?.capital?.[0]}
                    </Text>
                  </View>
                  <SvgUri height={50} width={70} uri={item?.flags?.svg} />
                </View>

                <Text style={[styles.commonText, {color: themeText}]}>
                  Population : {item?.population}
                </Text>
                <Text style={[styles.commonText, {color: themeText}]}>
                  Area : {item?.area} KM & {Math.round(item?.area * 0.621371)}{' '}
                  Miles
                </Text>
                <Text style={[styles.commonText, {color: themeText}]}>
                  Languages Spoken : {Object.values(item?.languages).join(', ')}
                </Text>
                <Text style={[styles.commonText, {color: themeText}]}>
                  Timezone : {item?.timezones.join(', ')}
                </Text>
                <Text style={[styles.commonText, {color: themeText}]}>
                  Currency :
                  {item?.currencies[Object.keys(item?.currencies)[0]]?.name}{' '}
                  {item?.currencies[Object.keys(item?.currencies)[0]]?.symbol}
                </Text>
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
