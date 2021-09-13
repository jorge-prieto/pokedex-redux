import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url_begin = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

interface Poken {
  next: string;
  results: string;
}

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async (_, { dispatch, getState }) => {
    try {
      console.log("CARGAR ");
      const { pokemons } : Poken = getState();
      const response = await fetch(pokemons.next);
      const data = await response.json();

      const { next, results } : Poken = data;
      return {
        next,
        results,
      };
    } catch (error) {
      return {
        results: [],
      };
    }
  }
);

const initialState = {
  array: [],
  next: url_begin,
  textFilter: "",
};

const slicePokemons = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    putFilterText(state, { payload }) {
      state.textFilter = payload;
    },
  },
  extraReducers: {
    [fetchPokemons.fulfilled]: (state, { payload }) => {
      const { next, results } = payload;
      if (!state.array.length || state.array[0].name !== results[0]?.name) {
        state.array = state.array.concat(results);
      }
      if (next) {
        state.next = next;
      }
    },
  },
});

const { actions, reducer } = slicePokemons;
const { putFilterText } = actions;
export const pokemonsReducer = reducer;

export const appendFilter = (text: string) => (dispatch: (arg0: { payload: any; type: string; }) => void) => {
  try {
    dispatch(putFilterText(text));
  } catch (error: unknown) {}
};
