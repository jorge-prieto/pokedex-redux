import React from "react";

export const List = (data: []) => {
  return (
    <ul>
      {data?.map((element: string, index: React.Key | null | undefined) => (
        <li key={index} className="list">
          {element}
        </li>
      ))}
    </ul>
  );
};
