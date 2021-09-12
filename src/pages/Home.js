import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../assets/pokemon-background.png';

export function Home() {
  return (
    <div className='main-container h-4/6 md:h-4/5 lg:h-screen bg-off-white'>
      <div className='home-container flex justify-center items-center'>
        <div className='text-container'>
          <h1 className='text-4xl font-bold mb-4'>Welcome to PokeApp</h1>
          <p className='mb-4'>
            In this page you can find information
            <br />
            about every pokemon you want
          </p>
          <Link to='pokemons'>
            <button type='button' className='button w-3/4 md:w-3/4 h-10 bg-orange rounded-lg border-solid font-bold hover:bg-yellow hover:text-red cursor-pointer'>
              VIEW ALL POKEMONS
            </button>
          </Link>
        </div>
        <div>
          <img src={Background} alt='Pikachu with Ash' className='img h-96 lg:h-xxl' />
        </div>
      </div>
    </div>
  );
}
