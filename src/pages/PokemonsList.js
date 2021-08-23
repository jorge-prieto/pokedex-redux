import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../store/slicePokemons';

import { NavBar } from '../components/NavigationBar';
import { Card, Sidebar } from '../components';
import { Modal } from '../components/Modal';
import './pokemonsList.css';
import '../components/Sidebar.css'

export function PokemonsList() {
  const { selected, dataFilter, isCompared, pRight, onClickPokemons, onCloseModal } =
    useManager();

  return (
    <div>
      <NavBar />
      <Modal visible={!!selected} url={selected} onClose={onCloseModal} />
      <div className="grid-2col">
        <div className='grid-list'>
          {dataFilter.map((element, index) => (
            <Card key={index} name={element.name} url={element.url} onClick={onClickPokemons} className='proof'/>
          ))}
        </div>
        {(isCompared && !(!!pRight)) && <Sidebar />}
      </div>
    </div>
  );
}

const search = (array, text) =>
  array.filter((element) => !element.name.toLowerCase().indexOf(text.toLowerCase()));

const useManager = () => {
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const { array, textFilter } = useSelector((state) => state.pokemons);
  const { isCompared, right } = useSelector((state) => state.modal)
  const dataFilter = search(array, textFilter);

  const next = () => {
    dispatch(fetchPokemons());
  }

  const onClickPokemons = (url) => {
    setSelected(url);
  }

  const onCloseModal = () => {
    setSelected(null);
  }

  useEffect(() => {
    next();
    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        next();
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = !!selected ? 'hidden' : 'unset';
  }, [selected]);

  return { selected, dataFilter, isCompared, pRight: right, onClickPokemons, onCloseModal };
}
