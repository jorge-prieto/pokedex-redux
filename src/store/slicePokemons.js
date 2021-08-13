import { createSlice } from '@reduxjs/toolkit';

const url_begin = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';

const initialState = {
  array: [],
  next: url_begin,
  textFilter: '',
};

const slicePokemons = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    addPokemonsToList(state, { payload }) {
      state.array = state.array.concat(payload); // array
    },
    changeStateNavigation(state, { payload }) {
      state.next = payload;
    },
    putFilterText(state, { payload }) {
      state.textFilter = payload;
    },
  },
});

const { actions, reducer } = slicePokemons;
const { addPokemonsToList, changeStateNavigation, putFilterText } = actions;
export const pokemonsReducer = reducer;

export const fetchPokemons = () => async (dispatch, getState) => {
  try {
    const { pokemons } = getState();
    const response = await fetch(pokemons.next);
    const data = await response.json();

    const { next, results } = data;
    // assign state nav
    dispatch(changeStateNavigation(next));
    // push data
    dispatch(addPokemonsToList(results));
  } catch (error) {
    dispatch(addPokemonsToList([]));
  }
};

export const appendFilter = (text) => (dispatch) => {
  try {
    dispatch(putFilterText(text));
  } catch (error) {}
};
