import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {favoritesActions} from '../redux/actions/favoritesActions';
import {useSelector, useDispatch} from 'react-redux';

const RenderFavorite = ({item, size = 30}) => {
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();

  const toggleFavorite = item => {
    dispatch(favoritesActions.toggleFavorite(item));
  };

  let sourceImage = require('../Assets/favorite_border.png');

  if (favorites.findIndex(elem => elem.id === item.id) !== -1) {
    sourceImage = require('../Assets/favorite.png');
  }
  return (
    <TouchableOpacity
      style={styles.favoriteContainer}
      onPress={() => toggleFavorite(item)}>
      <Image style={{width: size, height: size}} source={sourceImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteContainer: {
    marginLeft: 'auto',
  },
});

export default RenderFavorite;
