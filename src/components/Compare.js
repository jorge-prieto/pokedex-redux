import React from 'react';
import { getImage } from '../helper/helps';

export const Compared = ({ left, right }) => {
    const fields = {
      Height: 'height',
      Weight: 'weight',
      Gender: 'gender',
      Abilities: 'abilities',
    };
  
    return (
      <div className='flex column '>
        <div className='flex row between'>
          <img src={getImage(left?.id)} />
          <img src={getImage(right?.id)} />
        </div>
        <div>
          {Object.keys(fields).map((camp, ident) => (
            <div key={ident} className='flex row between'>
              {camp !== 'Abilities' ? (
                <p>{left[fields[camp]]}</p>
              ) : (
                <ul>
                  {left[fields[camp]].map((ability, key) => (
                    <li key={key}>{ability}</li>
                  ))}
                </ul>
              )}
              <p>{camp}</p>
              {camp !== 'Abilities' ? (
                <p>{right[fields[camp]]}</p>
              ) : (
                <ul>
                  {right[fields[camp]].map((ability, key) => (
                    <li key={key}>{ability}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }