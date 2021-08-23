import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="main-container">
      <div className="container">
        <h1 className="sorry-title">ERROR 404</h1>
        <NavLink to="/" className="back-button">
          HOME
        </NavLink>
      </div>
    </div>
  );
};
