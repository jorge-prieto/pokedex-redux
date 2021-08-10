import { useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import './navbar.css'
import LOGO from '../assets/pokemon-logo.png'
import { appendFilter } from '../store/slicePokemons'

export function NavBar() {
  const [text, setText] = useState("")
  const dispatch = useDispatch()

  function onChange(e) {
    setText(e.target.value)
    dispatch(appendFilter(e.target.value))
  }

  return (
    <div className="nav">
      <div>
          <img src={LOGO} alt='Pokemon logo' className='img-logo' />
      </div>
      <div className="row">
        <div className="center">
          <Link className="btn-nav" to="/">Home</Link>
          <Link className="btn-nav" to="/pokemons">Pokemons</Link>
        </div>
        <div>
          <input className="search" type="input" placeholder="Search" value={text} onChange={onChange}/>
        </div>
      </div>
    </div>
  );
}
