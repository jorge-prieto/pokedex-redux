import React from "react";

interface data {
  data: unknown[]
}

export const List: React.FC<data> = (data: data) => {
  return (
    <ul>
      {data?.map((element: string, index: number) => (
        <li key={index} className="list">
          {element}
        </li>
      ))}
    </ul>
  );
};
