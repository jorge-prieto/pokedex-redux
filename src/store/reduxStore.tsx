import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { pokemonsReducer } from './slicePokemons'
import { modalReducer } from './sliceModal'

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    modal: modalReducer,
  }
})

type Props = {
  children: JSX.Element,
};

export function MProvider({ children }: Props) :JSX.Element {
  return (
    <Provider store={store}>{children}</Provider>
  )
}
