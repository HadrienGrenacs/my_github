import {favoritesConstants} from '../constants/favoritesConstants';

const initialState = {favorites: []};

function favoritesReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case favoritesConstants.TOGGLE_FAVORITE:
      const favoriteIndex = state.favorites.findIndex(
        item => item.id === action.value.id,
      );
      if (favoriteIndex !== -1) {
        nextState = {
          ...state,
          favorites: state.favorites.filter(
            (item, index) => index !== favoriteIndex,
          ),
        };
      } else {
        nextState = {
          ...state,
          favorites: [...state.favorites, action.value],
        };
      }
      return nextState || state;
    default:
      return state;
  }
}

export default favoritesReducer;
