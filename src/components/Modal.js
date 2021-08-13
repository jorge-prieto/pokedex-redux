import { useState, useEffect } from 'react';
import './Modal.css';
import { getImage } from '../helper/helps';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPoken, initCompare, clearModal } from '../store/sliceModal';

export function Modal({ visible, url, onClose }) {
  const { left, right, is_compared, initialCompare, closeAndClean } = useManager(url, onClose);

  return visible && !!left ? (
    <div className='container'>
      <div className='content flex column'>
        <div className='head'>
          <div className='flex row center'>
            <p className='title'>{left?.name.toUpperCase()}</p>
            {!is_compared && <button onClick={initialCompare}>CompareTo</button>}
          </div>
          <a className='btn' onClick={closeAndClean}>
            X
          </a>
        </div>
        { is_compared && !!right ? <Compared left={left} right={right} /> : <PokenDescription {...left} />}
        <div>FOOTER</div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function useManager(url, onClose) {
  const { left, right, is_compared } = useSelector(state => state.modal)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!url) {
      dispatch(fetchPoken(url))
    }
  }, [url]);

  function initialCompare() {
    dispatch(initCompare())
    onClose()
  }

  function closeAndClean() {
    dispatch(clearModal())
    onClose()
  }

  return { initialCompare, closeAndClean, is_compared, left, right };
}

function Ul({ data }) {
  return (
    <ul>
      {data?.map((element, index) => (
        <li key={index}>{element}</li>
      ))}
    </ul>
  );
}

function PokenDescription({id, desc, height, weight, gender, abilities, types}) {
  return (
    <div>
      <img src={getImage(id)} className='image' />
      <p>{desc}</p>
      <table >
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
            <Ul data={abilities} />
          </td>
          <td>
            <Ul data={types} />
          </td>
        </tr>
      </table>
    </div>
  )
}

function Compared({ left, right }) {
  const fields = {
    Height: 'height',
    Weight: 'weight',
    Gender: 'gender',
    Abilities: 'abilities',
  }

  return (
    <div className="flex column ">
      <div className="flex row between">
        <img src={getImage(left?.id)} />
        <img src={getImage(right?.id)} />
      </div>
      <div>
        {
          Object.keys(fields).map((camp, ident) => (
            <div key={ident} className="flex row between">
              {
                camp !== 'Abilities' ? 
                <p>{left[fields[camp]]}</p> : 
                <ul>
                  {
                    left[fields[camp]].map((abilitie, key) => (
                      <li key={key}>{abilitie}</li>
                    ))
                  }
                </ul>
              }
              <p>{camp}</p>
              {
                camp !== 'Abilities' ? 
                <p>{right[fields[camp]]}</p> : 
                <ul>
                  {
                    right[fields[camp]].map((abilitie, key) => (
                      <li key={key}>{abilitie}</li>
                    ))
                  }
                </ul>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}
