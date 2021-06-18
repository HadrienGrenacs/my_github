import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import RenderFavorite from './renderFavorite';
import threeDots from '../Utils/ThreeDots';
import {useNavigation} from '@react-navigation/native';

const RenderRepo = ({item}) => {
  const navigation = useNavigation();

  const goToRepo = (login, name) => {
    navigation.navigate('RepoNavigation', {
      login: login,
      name: name,
    });
  };

  return (
    <TouchableOpacity
      style={styles.element}
      onPress={() => goToRepo(item.owner.login, item.name)}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: item.owner.avatar_url,
          }}
        />
        <Image
          style={styles.imageLogo}
          source={require('../Assets/repos_logo.png')}
        />
      </View>
      <View style={styles.usersInfo}>
        <Text style={styles.loginText}>{item.name}</Text>
        <Text style={styles.lightText}>
          {item.description
            ? threeDots(item.description, 65)
            : 'No description.'}
        </Text>
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
    marginTop: 6,
  },

  imageLogo: {height: 20, width: 20, position: 'absolute', left: 35, top: 35},
});

export default RenderRepo;
