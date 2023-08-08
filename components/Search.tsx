import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {FC, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Search: FC<{onSearchCountry: (args: string) => void}> = ({
  onSearchCountry,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeBackground = isDarkMode ? Colors.darker : Colors.lighter;
  const themeText = isDarkMode ? Colors.lighter : Colors.darker;
  const [search, setSearch] = useState('');
  return (
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
        onPress={() => onSearchCountry(search)}
        disabled={search.length < 1}
        style={styles.searchArea}>
        <Icon name="search" size={20} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

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
});
