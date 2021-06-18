import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import RenderRepo from '../../Components/renderRepo';
import RenderUser from '../../Components/renderUser';
import TopBar from '../../Navigation/TopBar';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites.favorites);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const renderResults = () => (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({item}) =>
          item.hasOwnProperty('type') ? (
            <RenderUser item={item} />
          ) : (
            <RenderRepo item={item} />
          )
        }
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );

  const renderNoResults = () => (
    <View style={styles.noResults}>
      <Text>No results found</Text>
    </View>
  );

  const renderLoading = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TopBar name="Favorites" />
      <View style={styles.list_container}>
        {favorites.length > 0 ? renderResults() : renderNoResults()}
        {renderLoading()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  list_container: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  element: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  login: {
    marginLeft: 8,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    width: 172,
    height: 36,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 16,
  },
  textButton: {
    color: 'white',
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 250, 250, 0.5)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usersImage: {
    width: 79,
    height: 30,
  },
  loginText: {
    fontSize: 18,
    fontWeight: '500',
  },
  lightText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6a6a6a',
  },
  usersInfo: {
    marginLeft: 12,
  },
  reposImage: {
    width: 84,
    height: 30,
    marginLeft: 12,
  },
  imageLogo: {height: 20, width: 20, position: 'absolute', left: 35, top: 35},
});

export default Favorites;
