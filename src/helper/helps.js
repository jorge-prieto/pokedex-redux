import { images } from "../service"

export const getIdFromPokenUrl = (url) => url.split('/')[6]

export const getImage = (id) => {
 return images + id + '.png'
} 
