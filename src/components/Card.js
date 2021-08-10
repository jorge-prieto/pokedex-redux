import './Card.css'
import { getIdFromPokenUrl } from '../helper/helps'

export function Card({ name, url, onClick }) {
  const image = 'https://raw.githubusercontent.com/PokeAPI/sprites/146c91287ad01f6e15315bbd733fd7442c91fe6d/sprites/pokemon/' + getIdFromPokenUrl(url) + '.png'

  function pressed(e) {
    e.preventDefault()
    onClick(url)
  }

  return (
    <div className="card" onClick={pressed}>
      <img src={image} className="card-image" />
      <div className="card-name">{name}</div>
    </div>
  )
}