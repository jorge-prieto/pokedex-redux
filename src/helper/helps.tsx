import { images } from "../service";

export const getIdFromPokenUrl = (url: string) => url.split("/")[6];

export const getImage = (id: number) => {
  return images + id + ".png";
};
