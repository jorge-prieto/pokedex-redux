import React from "react";
import { getImage } from "../helper/helps";

interface Compared {
  left: {
    name: string;
    id: number;
  };
  right: {
    name: string;
    id: number;
  };
}

export const Compared = ({ left, right }: Compared) => {
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
      <div className="body-compare">
        {Object.keys(fields).map((camp, ident) => (
          <div key={ident} className="flex between space-x-4">
            {camp !== "Abilities" ? (
              <p className="text-center justify-center items-center my-1">
                {field_modify[camp](left[fields[camp]])}
              </p>
            ) : (
              <ul className="list-left">
                {left[fields[camp]].map(
                  (
                    ability:
                      | boolean
                      | React.ReactChild
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined,
                    key: React.Key | null | undefined
                  ) => (
                    <li key={key}>{ability}</li>
                  )
                )}
              </ul>
            )}
            <div className="container-compare">
              <div className="fixed items-center font-bold left-2/4 px-4 flex">
                <p className="text-center justify-center items-center my-1">
                  {camp}
                </p>
              </div>
            </div>
            {camp !== "Abilities" ? (
              <p className="text-center justify-center items-center my-1">
                {field_modify[camp](right[fields[camp]])}
              </p>
            ) : (
              <ul className="list-right">
                {right[fields[camp]].map(
                  (
                    ability:
                      | boolean
                      | React.ReactChild
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined,
                    key: React.Key | null | undefined
                  ) => (
                    <li key={key}>{ability}</li>
                  )
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
