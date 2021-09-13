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

export const fetchPoken = (url: RequestInfo) => async (dispatch: (arg0: { payload: any; type: string; }) => void, getState: () => { modal: any; }) => {
  const { modal } = getState();
  const { isCompared } = modal;
  const data = await getPokenInf(url);
  if (isCompared) {
    dispatch(appendRightPokemon(data));
    return;
  }
  dispatch(appendLeftPokemon(data));
};

async function getPokenInf(url: RequestInfo) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const response1 = await fetch(data?.species?.url);
    const data2 = await response1.json();
    const abilities: string = data?.abilities.map((el: { ability: { name: string; }; }) => el?.ability?.name);
    const stats: [] = data?.stats;
    const types: string = data?.types.map((el: { type: { name: string; }; }) => el.type?.name);
    const desc: string = data2?.flavor_text_entries[0]?.flavor_text;
    const gender: number = data2?.gender_rate;
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
