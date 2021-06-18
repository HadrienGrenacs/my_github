import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import RenderFavorite from './renderFavorite';
import RenderLanguage from './RenderLanguage';
import threeDots from '../Utils/ThreeDots';
import kFormatter from '../Utils/kFormatter';
import {useNavigation} from '@react-navigation/native';

const RenderStars = ({stars}) => {
  return (
    <View style={styles.rowContainer}>
      <Image style={styles.starImage} source={require('../Assets/star.png')} />
      <Text style={styles.languageText}>{stars}</Text>
    </View>
  );
};

const RenderRepoDetails = ({item}) => {
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
      <View style={styles.imageContainer} />
      <View style={styles.usersInfo}>
        <Text style={styles.loginText}>{item.name}</Text>
        <Text style={styles.lightText}>
          {item.description
            ? threeDots(item.description, 65)
            : 'No description.'}
        </Text>
        <View style={styles.rowContainer}>
          {item.language && <RenderLanguage language={item.language} />}
          <RenderStars stars={kFormatter(item.stargazers_count)} />
        </View>
      </View>
      <RenderFavorite item={item} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  element: {
    flexDirection: 'row',
    marginTop: 18,
    alignItems: 'center',
    marginLeft: 8,
  },
  usersInfo: {
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
    marginTop: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  imageLogo: {height: 20, width: 20, position: 'absolute', left: 35, top: 35},
  languageText: {fontSize: 16, marginLeft: 4},
  starImage: {
    width: 16,
    height: 16,
  },
});

export default RenderRepoDetails;
