import React from "react";
import { getIdFromPokenUrl } from "../helper/helps";
import { images } from "../service";

interface Card {
  name: string;
  url: string;
  onClick: (url: React.SetStateAction<undefined>) => void;
}

export function Card({ name, url, onClick }: Card) {
  const image = images + getIdFromPokenUrl(url) + ".png";

  function pressed(event: { preventDefault: () => void }) {
    event.preventDefault();
    onClick(url);
  }

  return (
    <div
      className="flex flex-col  flex-1 justify-center items-center cursor-pointer duration-500 border-solid max-w-lg border-off-grey border-4 hover:bg-background hover:scale-110"
      onClick={pressed}
    >
      <img src={image} className="block object-contain w-5/6" alt="Pokemon" />
      <div className="w-full text-center bg-off-grey border-t-4 border-off-grey py-1">
        {name.toUpperCase()}
      </div>
    </div>
  );
}
