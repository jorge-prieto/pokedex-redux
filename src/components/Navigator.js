import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import { NavBar } from './NavBar'
import { Home, PokemonsList} from '../pages'

export function Navigator() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/pokemons"><PokemonsList /></Route>
          <Route exact path="/"><Home /></Route>  
        </Switch>
      </div>
    </Router>
  )
}