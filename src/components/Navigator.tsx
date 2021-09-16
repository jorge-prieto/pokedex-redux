import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { NavBar } from "./NavigationBar";
import { Home, PokemonsList } from "../pages";

export const Navigator: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/pokemons">
            <PokemonsList />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
