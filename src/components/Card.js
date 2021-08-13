import React from 'react';
import { getIdFromPokenUrl } from '../helper/helps';
import { images } from '../service';
import './Card.css';

export function Card({ name, url, onClick }) {
  const image = images + getIdFromPokenUrl(url) + '.png';

  function pressed(event) {
    event.preventDefault();
    onClick(url);
  }

  return (
    <div className='card' onClick={pressed}>
      <img src={image} className='card-image' />
      <div className='card-name'>{name}</div>
    </div>
  );
}
