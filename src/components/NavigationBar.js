import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import LOGO from "../assets/pokemon-logo.png";
import { appendFilter } from "../store/slicePokemons";
import "./NavigationBar.css";

export function NavBar() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  //const { pathname } = useLocation();

  function onChange(event) {
    setText(event.target.value);
    dispatch(appendFilter(event.target.value));
  }

  return (
    <div className="nav">
      <div>
        <Link to="/">
          {" "}
          <img src={LOGO} alt="Pokemon logo" className="img-logo" />{" "}
        </Link>
      </div>
      <div className="row">
        <div className="center">
          <Link className="btn-nav" to="/">
            Home
          </Link>
          <Link className="btn-nav" to="/pokemons">
            Pokemons
          </Link>
        </div>
        {/* pathname !== "/" && */ (
          <div>
            <input
              className="search"
              type="input"
              placeholder="Search"
              value={text}
              onChange={onChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
