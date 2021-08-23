import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { MProvider } from './store/reduxStore';
import { Home } from './pages';
import { PokemonsList } from './pages';
import { NotFound } from './pages/NotFound';

const App = () => (
  <MProvider>
    <HashRouter basename='/'>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/pokemons' component={PokemonsList} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </HashRouter>
  </MProvider>
);

export default App;
