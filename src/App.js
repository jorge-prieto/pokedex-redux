import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MProvider } from './store/redux_store';
import { fetchPokemons } from './store/slicePokemons';
import { Navigator } from './components';

function App() {
  return (
    <MProvider>
      <>
        <Scheduler />
        <Navigator />
      </>
    </MProvider>
  );
}

function Scheduler() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  return <></>;
}

export default App;
