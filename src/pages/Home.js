import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar"
import Background from '../assets/pokemon_background.png'
import './Home.css'

export function Home() {
  return (
    <div className='main-container'>
        <div className='home-container'>
            <div className='text-container'>
            <h1>Welcome to PokeApp</h1>
            <p>
                In this page you can find information
                <br />
                about every pokemon you want
            </p>
            <Link to='pokemons'>
                <button type='button' className='button'> View All Pokemons </button>
            </Link>
            </div>
            <div>
                <img src={Background} 
                alt="Pikachu with Ash" 
                className='img'
                />
            </div>
        </div>
    </div>
  )
}