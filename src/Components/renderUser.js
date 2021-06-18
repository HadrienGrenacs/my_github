import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import RenderFavorite from './renderFavorite';
import kFormatter from '../Utils/kFormatter';
import {getUserByLogin} from '../Api/GithubApi';
import {useNavigation} from '@react-navigation/native';

const RenderUser = ({item}) => {
  const navigation = useNavigation();

  const [followers, setFollowers] = useState(0);

  const goToUser = login => {
    navigation.push('UserNavigation', {
      login: login,
    });
  };

  useEffect(() => {
    let mounted = true;
    getUserByLogin(item.login).then(data => {
      if (mounted) {
        setFollowers(data.followers);
      }
    });
    return () => (mounted = false);
  }, [item]);

  return (
    <TouchableOpacity
      style={styles.element}
      onPress={() => goToUser(item.login)}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: item.avatar_url,
          }}
        />
        <Image
          style={styles.imageLogo}
          source={require('../Assets/users_logo.png')}
        />
      </View>

      <View style={styles.usersInfo}>
        <Text style={styles.loginText}>{item.login}</Text>
        <Text style={styles.lightText}>{kFormatter(followers)} followers</Text>
      </View>
      <RenderFavorite item={item} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  element: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  image: {
    height: 52,
    width: 52,
    borderRadius: 50,
  },
  usersInfo: {
    marginLeft: 12,
    flex: 1,
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

  imageLogo: {height: 20, width: 20, position: 'absolute', left: 35, top: 35},
});

export default RenderUser;
