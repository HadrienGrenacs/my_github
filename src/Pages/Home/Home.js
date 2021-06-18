import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {searchUsers, searchRepos} from '../../Api/GithubApi';
import TopBar from '../../Navigation/TopBar';
import RenderRepo from '../../Components/renderRepo';
import RenderUser from '../../Components/renderUser';
import SplashScreen from 'react-native-splash-screen';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    searchAndReset();
  }, [isUser]);

  // useEffect(() => {
  //   isUser ? loadUsers() : loadRepos();
  // }, [page]);

  const loadUsers = my_page => {
    const real_page = my_page ? my_page : page;
    if (searchText.length > 0 && !loading) {
      setLoading(true);
      searchUsers(searchText, real_page).then(response => {
        setTotal(response.total_count);
        setPage(real_page + 1);
        setData(oldArray => [...oldArray, ...response.items]);
        setLoading(false);
      });
    }
  };

  const loadRepos = my_page => {
    const real_page = my_page ? my_page : page;
    if (searchText.length > 0 && !loading) {
      setLoading(true);
      searchRepos(searchText, real_page).then(response => {
        setTotal(response.total_count);
        setPage(real_page + 1);
        setData(oldArray => [...oldArray, ...response.items]);
        setLoading(false);
      });
    }
  };

  const renderResults = () => (
    <View style={styles.container}>
      <Text style={styles.total}>
        {total} {isUser ? 'user(s)' : 'repo(s)'} found
      </Text>

      <FlatList
        data={data}
        renderItem={({item}) =>
          item.hasOwnProperty('type') ? (
            <RenderUser item={item} />
          ) : (
            <RenderRepo item={item} />
          )
        }
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.8}
        onEndReached={() => {
          if (page * 20 <= total) {
            search();
          }
        }}
        style={styles.list}
      />
    </View>
  );

  const renderNoResults = () => (
    <View style={styles.noResults}>
      <Image
        style={styles.noResultsImage}
        source={require('../../Assets/github_octocat.png')}
      />
      <Text style={styles.noResultsText}>No results found</Text>
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

  const renderFooter = () => {
    if (total > 20) {
      return (
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={search}
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Load More</Text>
            {loading ? (
              <ActivityIndicator color="white" style={{marginLeft: 8}} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
    } else return null;
  };

  const search = () => {
    isUser ? loadUsers() : loadRepos();
  };

  const searchAndReset = () => {
    setPage(1);
    setTotal(0);
    setData([]);
    isUser ? loadUsers(1) : loadRepos(1);
  };

  return (
    <View style={styles.container}>
      <TopBar type="home" />
      <View style={styles.homeContainer}>
        <View style={styles.lookingContainer}>
          <Text style={styles.lookingText}>I'm looking for</Text>
          <View style={styles.selectorContainer}>
            <TouchableOpacity
              onPress={() => {
                if (!loading) setIsUser(true);
              }}>
              <Image
                source={
                  isUser
                    ? require('../../Assets/users_image.png')
                    : require('../../Assets/users_image_border.png')
                }
                style={styles.usersImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (!loading) setIsUser(false);
              }}>
              <Image
                source={
                  !isUser
                    ? require('../../Assets/repos_image.png')
                    : require('../../Assets/repos_image_border.png')
                }
                style={styles.reposImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setSearchText}
            onSubmitEditing={searchAndReset}
            placeholder={'Search for ...'}
            placeholderTextColor="#b2b2b2"
            value={searchText}
          />
          <TouchableOpacity onPress={searchAndReset}>
            <Image
              source={require('../../Assets/search.png')}
              style={styles.searchImage}
            />
          </TouchableOpacity>
        </View>
        {total > 0 ? renderResults() : renderNoResults()}
        {renderLoading()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 250, 250, 1)',
  },
  homeContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },

  list: {
    marginTop: 8,
  },
  inputContainer: {
    backgroundColor: '#6a6a6a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 14,
    paddingLeft: 12,
    color: 'white',
  },
  searchImage: {
    marginRight: 12,
    marginLeft: 6,
    width: 24,
    height: 24,
  },
  total: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '400',
  },

  noResults: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  noResultsText: {
    fontSize: 26,
    fontWeight: '400',
  },
  noResultsImage: {
    width: 200,
    height: 200,
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
    backgroundColor: 'rgba(255, 250, 250, 1)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usersImage: {
    width: 79,
    height: 30,
  },
  reposImage: {
    width: 84,
    height: 30,
    marginLeft: 12,
  },
  lookingText: {
    fontSize: 18,
    fontWeight: '600',
  },
  lookingContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorContainer: {
    marginLeft: 32,
    marginRight: 12,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageLogo: {height: 20, width: 20, position: 'absolute', left: 35, top: 35},
});

export default Home;
