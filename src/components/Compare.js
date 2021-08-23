import React from 'react';
import { getImage } from '../helper/helps';
import './Compare.css'

export const Compared = ({ left, right }) => {
    const fields = {
      Height: 'height',
      Weight: 'weight',
      Gender: 'gender',
      Abilities: 'abilities',
    };

    const field_modify = {
      'Height': (x) => (x / 10) + ' m',
      'Weight': (x) => (x / 10) + ' kg',
      'Gender': (x) => x < 5 ? 'male' : 'female',
    }
  
    return (
      <div className='tab column '>
        <div className='flex row between'>
          <h3 className='title'>{left?.name.toUpperCase()}</h3>
          <p className='versus'> vs </p>
          <h3 className='title'>{right?.name.toUpperCase()}</h3>
        </div>
        <div className='flex row between'>
          <img src={getImage(left?.id)} alt='Pokemon icon' />
          <img src={getImage(right?.id)} alt='Pokemon icon' />
        </div>
        <div className='body-compare'>
          {Object.keys(fields).map((camp, ident) => (
            <div key={ident} className='flex between'>
              {camp !== 'Abilities' ? (
                <p>{field_modify[camp](left[fields[camp]])}</p>
              ) : (
                <ul className='list-left'>
                  {left[fields[camp]].map((ability, key) => (
                    <li key={key} >{ability}</li>
                  ))}
                </ul>
              )}
              <div className='container-compare'>
                <div className='compare flex'>
                  <p>{camp}</p>
                </div>
              </div>
              {camp !== 'Abilities' ? (
                  <p>{field_modify[camp](right[fields[camp]])}</p>
              ) : (
                <ul className='list-right'>
                  {right[fields[camp]].map((ability, key) => (
                    <li key={key} >{ability}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }