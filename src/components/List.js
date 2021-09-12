import React from "react";

export const List = ({ data }) => {
    return (
      <ul>
        {data?.map((element, index) => (
          <li key={index} className="list">
            {element}
          </li>
        ))}
      </ul>
    );
  };