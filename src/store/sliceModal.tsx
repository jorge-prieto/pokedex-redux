import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  left: null,
  right: null,
  isCompared: false,
};

const sliceModal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    appendLeftPokemon(state, { payload }) {
      state.left = { ...payload };
    },
    appendRightPokemon(state, { payload }) {
      state.right = { ...payload };
    },
    initCompare(state) {
      state.isCompared = true;
    },
    clearModal(state) {
      state.left = null;
      state.right = null;
      state.isCompared = false;
    },
  },
});

const { actions, reducer } = sliceModal;
const { appendLeftPokemon, appendRightPokemon } = actions;

export const initCompare = actions.initCompare;
export const clearModal = actions.clearModal;
export const modalReducer = reducer;

export const fetchPoken = (url: string) => async (dispatch: (arg0: { payload: unknown; type: string; }) => void, getState: () => { modal: boolean; }) => {
  const { modal } = getState();
  const isCompared  = modal;
  const data = await getPokenInf(url);
  if (isCompared) {
    dispatch(appendRightPokemon(data));
    return;
  }
  dispatch(appendLeftPokemon(data));
};

interface data2 {
  flavor_text_entries: flavor[];
  gender_rate: number;
}

interface stats {
  stats: property[]
}

interface property {
  id: number;
  name: string;
  game_index?: number;
  is_battle_only?: boolean;
}

interface flavor {
    flavor_text: string;
    language?: language;
}
interface language {
  id: number;
  name?: string;
  official?: boolean;
  iso639?: string;
  iso3166?: string;
}

async function getPokenInf(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const response1 = await fetch(data?.species?.url);
    const data2: data2 = await response1.json();
    const abilities: string = data?.abilities.map((el: { ability: { name: string; }; }) => el?.ability?.name);
    const stats: stats = data?.stats;
    const types: string = data?.types.map((el: { type: { name: string; }; }) => el.type?.name);
    const desc = data2?.flavor_text_entries[0]?.flavor_text;
    const gender = data2?.gender_rate;
    return {
      ...data,
      abilities,
      types,
      desc,
      gender,
      stats,
    };
  } catch (error) {
    return null;
  }
}
