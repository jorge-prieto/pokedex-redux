import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoken, initCompare, clearModal } from '../store/sliceModal';
import { getImage } from '../helper/helps';
import { Compared } from './Compare';
import './Modal.css';

export function Modal({ visible, url, onClose }) {
  const { left, right, isCompared, initialCompare, closeAndClean } =
    useManager(url, onClose);

  return visible && !!left ? (
    <div className='container'>
      <div className='content flex column'>
        <div className='head'>
          <div className='flex row center'>
            <p className='title'>{left?.name.toUpperCase()}</p>
            {!isCompared && (
              <button onClick={initialCompare}>CompareTo</button>
            )}
          </div>
          <a className='btn' onClick={closeAndClean}>
            X
          </a>
        </div>
        {isCompared && !!right ? (
          <Compared left={left} right={right} />
        ) : (
          <PokenDescription {...left} />
        )}
        <div>FOOTER</div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function useManager(url, onClose) {
  const { left, right, isCompared } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!url) {
      dispatch(fetchPoken(url));
    }
  }, [url]);

  function initialCompare() {
    dispatch(initCompare());
    onClose();
  }

  function closeAndClean() {
    dispatch(clearModal());
    onClose();
  }

  return { initialCompare, closeAndClean, isCompared, left, right };
}

const List = ({ data }) => {
  return (
    <ul>
      {data?.map((element, index) => (
        <li key={index}>{element}</li>
      ))}
    </ul>
  );
}

function PokenDescription({
  id,
  desc,
  height,
  weight,
  gender,
  abilities,
  types,
}) {
  return (
    <div>
      <img src={getImage(id)} className='image' />
      <p>{desc}</p>
      <table>
        <tr>
          <th>Height</th>
          <th>Weight</th>
          <th>Gender</th>
          <th>Abilities</th>
          <th>Type</th>
        </tr>
        <tr>
          <td>{height}</td>
          <td>{weight}</td>
          <td>{gender === 0 ? 'Male' : 'Female'}</td>
          <td>
            <List data={abilities} />
          </td>
          <td>
            <List data={types} />
          </td>
        </tr>
      </table>
    </div>
  );
}
