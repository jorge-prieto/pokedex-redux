import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPokemons } from '../store/slicePokemons'
import { Card } from '../components'
import { getIdFromPokenUrl } from '../helper/helps'
import { Modal } from '../components/Modal'
import './pokemonsList.css'

export function PokemonsList() {
  const { selected, data_filtered, onClickPokemons, onCloseModal} = useManager()

  return (
    <div>
      <Modal visible={!!selected} url={selected} onClose={onCloseModal} />
      <div className='grid-list'>{
        data_filtered.map((el, i) => <Card key={i} name={el.name} url={el.url} onClick={onClickPokemons} />)
      }</div>
    </div>
  )
}

const search = (array, text) => array.filter(el => !el.name.toLowerCase().indexOf(text.toLowerCase()))

function useManager() {
  const [selected, setSelect] = useState()
  const dispatch = useDispatch()
  const { array, textfilter } = useSelector(state => state.pokemons)
  const data_filtered = search(array, textfilter)

  function next() {
    dispatch(fetchPokemons())
  }

  function onClickPokemons(url) {
    setSelect(url)
  }

  function onCloseModal() {
    setSelect(null)
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        next()
      }
    })

    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = !!selected ? 'hidden' : 'unset'
  }, [selected])


  return { selected, data_filtered, onClickPokemons, onCloseModal }
}