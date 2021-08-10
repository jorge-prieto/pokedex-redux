import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { pokemonsReducer } from './slicePokemons'

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer
  }
})

export function MProvider({ children}) {
  return (
    <Provider store={store}>{children}</Provider>
  )
}
