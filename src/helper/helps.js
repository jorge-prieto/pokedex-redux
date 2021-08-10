export const getIdFromPokenUrl = (url) => url.split('/')[6]

export const getImage = (id) => {
 return 'https://raw.githubusercontent.com/PokeAPI/sprites/146c91287ad01f6e15315bbd733fd7442c91fe6d/sprites/pokemon/' + id + '.png'
} 