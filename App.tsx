import axios from 'axios';
import React, {FC, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Favourites from './components/Favourites';
import CountryCard from './components/ContryCard';
import TextComponent from './components/TextComponent';
import Search from './components/Search';

const App: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeBackground = isDarkMode ? Colors.darker : Colors.lighter;
  const [fav, setFav] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorHandle, setErrorHandle] = useState(false);
  const [countryData, setCountryData] = useState<Country[]>([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const searchCountry = async (key: string) => {
    console.log(key);
    try {
      setLoading(true);
      const cachedData = await AsyncStorage.getItem(key.toLowerCase());
      if (cachedData !== null) {
        // console.log('cached');
        let val = JSON.parse(cachedData);
        setCountryData(val);
        setLoading(false);
        setErrorHandle(false);
        return;
      }
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${key}?fullText=true`,
      );
      // console.log('api');
      await AsyncStorage.setItem(
        key.toLowerCase(),
        JSON.stringify(response?.data),
      );
      setCountryData(response?.data);
      setErrorHandle(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorHandle(true);
      setLoading(false);
      setCountryData([]);
    }
  };
  const addFavourites = (item: Country) => {
    setFav([...fav, item]);
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: backgroundStyle.backgroundColor}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: themeBackground,
        }}>
        <TextComponent
          size={25}
          color={isDarkMode ? '#fff' : '#2c3e8f'}
          fontWeight={'bold'}
          marginVertical={20}
          align="center">
          Country Explorer
        </TextComponent>
        <Search onSearchCountry={searchCountry} />
        {countryData.length > 0 && (
          <FlatList
            data={countryData}
            style={styles.flat}
            renderItem={({item}) => (
              <CountryCard item={item} addFavourites={addFavourites} />
            )}
            keyExtractor={item => item.name.common}
          />
        )}
        {errorHandle && (
          <Text style={styles.errText}>Search Records Not Found!</Text>
        )}
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {fav.length > 0 && <Favourites item={fav} setFav={setFav} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 6,
    marginBottom: 20,
  },
  errText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  searchArea: {
    height: 40,
    width: 40,
    // backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    flexDirection: 'column',
    margin: 10,
    borderRadius: 15,
    padding: 10,
    borderWidth: 3.5,
    borderColor: '#dedfe3',
    flexGrow: 0,
    flex: 1,
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
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
  },
  flat: {flex: 1, flexGrow: 0.6},
});

export default App;
