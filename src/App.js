import React, { useEffect } from 'react';
//import { useDispatch } from 'react-redux';
import { MProvider } from './store/reduxStore';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import { fetchPokemons } from './store/slicePokemons';
//import { Navigator } from './components';
import { Home } from './pages';
import { PokemonsList } from './pages';


const App = () => (
  <MProvider>
    <HashRouter basename="/">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/pokemons" component={PokemonsList} />
      </Switch>
    </HashRouter>
  </MProvider>
);



/*function App() {
  return (
    <MProvider>
      <>
        <Scheduler />
        <Navigator />
      </>
    </MProvider>
  );
} */

/* function Scheduler() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return <></>;
} */

export default App;
