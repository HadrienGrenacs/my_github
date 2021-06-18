import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TopBar = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {props.type === 'home' ? (
        <Image
          style={styles.logoImage}
          source={require('../Assets/github.png')}
        />
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backImage}
            source={require('../Assets/back_arrow.png')}
          />
        </TouchableOpacity>
      )}

      <Text style={styles.titleText}>
        {props.name ? props.name : 'My Github'}
      </Text>
      {props.type === 'home' ? (
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Image
            style={styles.starImage}
            source={require('../Assets/white_heart.png')}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyBox} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logoImage: {
    marginLeft: 12,
    width: 46,
    height: 46,
  },
  starImage: {
    marginRight: 12,
    width: 36,
    height: 36,
  },
  backImage: {
    marginLeft: 12,
    width: 18,
    height: 32,
  },
  emptyBox: {
    width: 18,
    height: 32,
    marginRight: 12,
  },
});

export default TopBar;
