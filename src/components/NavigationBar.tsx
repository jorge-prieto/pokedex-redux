import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import LOGO from "../assets/pokemon-logo.png";
import { appendFilter } from "../store/slicePokemons";

export const NavBar: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
    dispatch(appendFilter(event.target.value));
  }

  return (
    <div className="nav sticky top-0 flex flex-col justify-center items-center md:flex-row md:justify-between bg-background z-1 shadow-md">
      <div>
        <Link to="/">
          {" "}
          <img src={LOGO} alt="Pokemon logo" className="img-logo w-48" />{" "}
        </Link>
      </div>
      <div className="justify-center content-center flex-col md:flex md:items-center md:flex-row ">
        <div className="flex justify-center items-center">
          <Link
            className="btn-nav mr-4 ml-4 no-underline text-black hover:underline hover:text-red"
            to="/"
          >
            Home
          </Link>
          <Link
            className="btn-nav mr-4 ml-4 no-underline text-black hover:underline hover:text-red"
            to="/pokemons"
          >
            Pokemons
          </Link>
        </div>
        {pathname !== "/" && (
          <div>
            <input
              className="search mt-4 mb-4 w-96 md:w-48 md:p-1 md:mr-4 rounded border-solid "
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
