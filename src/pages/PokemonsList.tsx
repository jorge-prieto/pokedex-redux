import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { fetchPokemons } from '../store/slicePokemons';

import { Card, Sidebar } from '../components';
import { Modal } from '../components/Modal';
import { PokeProp } from '../interfaces/pokeList';

export const PokemonsList: React.FC = () => {
  const { selected, dataFilter, isCompared, pRight, onClickPokemons, onCloseModal } : PokeProp =
    useManager();

  return (
    <div>
      <Modal visible={!!selected} url={selected} onClose={onCloseModal} />
      <div className="grid grid-cols-2col md:grid-cols-md-2col">
        <div className='grid grid-cols-cards gap-8 p-4 md:grid-cols-md-cards md:p-16 md:place-content-center'>
          {dataFilter.map((element: { name: string; url: string; }, index: React.Key | null | undefined) => (
            <Card key={index} name={element.name} url={element.url} onClick={onClickPokemons} />
          ))}
        </div>
        {(isCompared && !(!!pRight)) && <Sidebar />}
      </div>
    </div>
  );
}

const search = (array: never[], text: string) =>
  array.filter((element: { name: string; }) => !element.name.toLowerCase().indexOf(text.toLowerCase()));

const useManager = () => {
  const [selected, setSelected] = useState<undefined>();
  const dispatch = useDispatch();
  const { array, textFilter } = useSelector((state: RootStateOrAny) => state.pokemons);
  const { isCompared, right } = useSelector((state: RootStateOrAny) => state.modal)
  const dataFilter = search(array, textFilter);

  const next = (): void => {
    dispatch(fetchPokemons());
  }

  const onClickPokemons = (url: React.SetStateAction<undefined>) => {
    setSelected(url);
  }

  const onCloseModal = () => {
    setSelected(undefined);
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
