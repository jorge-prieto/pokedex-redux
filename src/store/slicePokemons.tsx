import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";

const url_begin: string = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

interface pokemons {
  count: number;
  next: string;
  previous: boolean;
  results: result[];
}

interface result {
  name: string;
  url: string;
}

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async (_, { getState }) => {
    try {
      console.log("CARGAR ");
      const { pokemons }  = getState() as { pokemons: pokemons };
      const response = await fetch(pokemons.next);
      const data = await response.json();

      const { next, results } = data;
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

export const appendFilter = (text: string) => (dispatch: (arg0: { payload: unknown; type: string; }) => void) => {
  try {
    dispatch(putFilterText(text));
  } catch (error) {}
};
