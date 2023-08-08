import axios from 'axios';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Favourites from './components/Favourites';
import CountryCard from './components/ContryCard';
import TextComponent from './components/TextComponent';

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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const themeBackground = isDarkMode ? Colors.darker : Colors.lighter;
  const themeText = isDarkMode ? Colors.lighter : Colors.darker;
  const [search, setSearch] = useState('');
  const [fav, setFav] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorHandle, setErrorHandle] = useState(false);
  const [countryData, setCountryData] = useState<Country[]>([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const fetchdata = async (key: string) => {
    console.log(key);
    try {
      setLoading(true);
      const cachedData = await AsyncStorage.getItem(key.toLowerCase());
      if (cachedData !== null) {
        console.log('cached');
        let val = JSON.parse(cachedData);
        setCountryData(val);
        setLoading(false);
        setErrorHandle(false);
        return;
      }
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${search}?fullText=true`,
      );
      console.log('api');
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
    setFav(oldArray => [...oldArray, item]);
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
        <View style={styles.searchContainer}>
          <TextInput
            style={{flex: 1, color: themeText}}
            value={search}
            placeholder="Search Here"
            onChangeText={e => setSearch(e)}
            placeholderTextColor={'grey'}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch('')}
              style={styles.searchArea}>
              <Icon1 name="clear" size={25} color="grey" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => fetchdata(search)}
            disabled={search.length < 1}
            style={styles.searchArea}>
            <Icon name="search" size={20} color="grey" />
          </TouchableOpacity>
        </View>

        {countryData.length > 0 && countryData && (
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
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
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
  logo: {
    width: 27,
    height: 27,
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
