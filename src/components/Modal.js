import { useState, useEffect } from 'react';
import './Modal.css';
import { getImage } from '../helper/helps';

export function Modal({ visible, url, onClose }) {
  const { data } = useManager(url);

  return visible ? (
    <div className='container'>
      <div className='content flex column'>
        <div className='head'>
          <div className='flex row center'>
            <p className='title'>{data?.name.toUpperCase()}</p>
            <div className='btn'>Compare To</div>
          </div>
          <a className='btn' onClick={onClose}>
            X
          </a>
        </div>
        <div >
          <img src={getImage(data?.id)} className='image' />
          <p>{data?.desc}</p>
          <table >
            <tr>
              <th>Height</th>
              <th>Weight</th>
              <th>Gender</th>
              <th>Abilities</th>
              <th>Type</th>
            </tr>
            <tr>
              <td>{data?.height}</td>
              <td>{data?.weight}</td>
              <td>{data?.gender === 0 ? 'Male' : 'Female'}</td>
              <td>
                <Ul data={data?.abilities} />
              </td>
              <td>
                <Ul data={data?.types} />
              </td>
            </tr>
          </table>
        </div>
        <div>FOOTER</div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function useManager(url) {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(url).then((res) =>
      res.json().then((data) => {
        fetch(data.species.url).then((result) =>
          result.json().then((data2) => {
            const abilities = data?.abilities.map((el) => el?.ability?.name);
            const types = data?.types.map((el) => el.type?.name);
            setData({
              ...data,
              abilities,
              types,
              desc: data2?.flavor_text_entries[0]?.flavor_text,
              gender: data2.gender_rate,
            });
          })
        );
      })
    );
  }, [url]);

  return { data };
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
