import {favoritesConstants} from '../constants/favoritesConstants';

export const favoritesActions = {
  toggleFavorite,
};

function toggleFavorite(favorite) {
  return dispatch => {
    dispatch({
      type: favoritesConstants.TOGGLE_FAVORITE,
      value: favorite,
    });
  };
}
