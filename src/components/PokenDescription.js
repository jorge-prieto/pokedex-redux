import React from "react";
import { List } from "./List";
import { getImage } from '../helper/helps';

export function PokenDescription({
    id,
    desc,
    height,
    weight,
    gender,
    abilities,
    types,
  }) {
    return (
      <div className="flex justify-center items-center flex-row mt-4">
        <div>
          <img src={getImage(id)} className="w-40 max-w-none" />
        </div>
        <div>
          <p className="pb-4 border-b-2">{desc}</p>
          <div className="flex flex-col">
            <div className="table text-center">
              <tr>
                <th>Height</th>
                <th>Weight</th>
                <th>Gender</th>
              </tr>
              <tr>
                <td>{height / 10} m</td>
                <td>{weight / 10} kg</td>
                <td>{gender < 5 ? "Male" : "Female"}</td>
              </tr>
            </div>
            <div className="table text-center mt-4">
              <tr>
                <th>Abilities</th>
                <th>Type</th>
              </tr>
              <tr>
                <td>
                  <List data={abilities} />
                </td>
                <td>
                  <List data={types} />
                </td>
              </tr>
            </div>
          </div>
        </div>
      </div>
    );
  }
  