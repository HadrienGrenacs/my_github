import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {getUserByLogin} from '../../Api/GithubApi';
import RenderFavorite from '../../Components/renderFavorite';

const Profile = ({route}) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserByLogin(route.params.login).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [route.params.login]);

  const renderLoading = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
  };

  const renderUser = () => {
    if (user !== undefined) {
      return (
        <ScrollView>
          <View style={styles.userContainer}>
            <View>
              <Image style={styles.image} source={{uri: user.avatar_url}} />
              <Image
                style={styles.imageLogo}
                source={require('../../Assets/users_logo.png')}
              />
            </View>
            <View style={styles.infosContainer}>
              <Text style={styles.userLogin}>{user.login}</Text>
              <Text style={styles.data}>{user.followers} followers</Text>
              <Text style={styles.data}>{user.following} following</Text>
              <Text style={styles.data}>{user.type}</Text>
            </View>
            <View style={styles.favoriteContainer}>
              <RenderFavorite item={user} size={50} />
            </View>
          </View>
          <Text style={styles.public_repos}>
            {user.public_repos} public repos
          </Text>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.main_container}>
      {renderUser()}
      {renderLoading()}
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  favoriteContainer: {
    paddingRight: 12,
    flex: 0.5,
  },
  imageLogo: {height: 38, width: 38, position: 'absolute', left: 65, top: 65},
  data: {
    fontSize: 16,
    fontWeight: '300',
    marginTop: 5,
    color: '#6A6A6A',
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 250, 250, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLogin: {
    fontSize: 24,
    fontWeight: '500',
  },
  public_repos: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '500',
  },
  infosContainer: {
    flex: 1,
    paddingLeft: 24,
  },
});

export default Profile;
