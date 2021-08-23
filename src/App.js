import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MProvider } from './store/reduxStore';
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
