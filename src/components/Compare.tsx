import React from "react";
import { getImage } from "../helper/helps";

import { Comparing } from "../interfaces/Compared";
import { Left } from "../interfaces/leftRight";

export const Compared : React.FC<Comparing>= ({ left, right }: Comparing) => {
  const fields = {
    Height: "height",
    Weight: "weight",
    Gender: "gender",
    Abilities: "abilities",
  };

  const field_modify = {
    Height: (x: number) => x / 10 + " m",
    Weight: (x: number) => x / 10 + " kg",
    Gender: (x: number) => (x < 5 ? "male" : "female"),
  };

  return (
    <div className="table-column ">
      <div className="flex flex-row space-x-4">
        <h3 className="title">{left?.name.toUpperCase()}</h3>
        <p className="text-center m-4"> vs </p>
        <h3 className="title">{right?.name.toUpperCase()}</h3>
      </div>
      <div className="flex flex-row space-x-4">
        <img src={getImage(left?.id)} alt="Pokemon icon" />
        <img src={getImage(right?.id)} alt="Pokemon icon" />
      </div>
      <div className='body-compare'>
          {Object.keys(fields).map((camp, ident) => (
            <div key={ident} className='flex between'>
              {camp !== 'Abilities' ? (
                <p>{field_modify[camp](left[fields[camp]])}</p>
              ) : (
                <ul className='list-left'>
                  {left[fields[camp]].map((ability:Left, key: React.Key | null) => (
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
                  {right[fields[camp]].map((ability: Left, key: React.Key | null) => (
                    <li key={key} >{ability}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
  );
};
