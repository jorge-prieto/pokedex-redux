import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoken, initCompare, clearModal } from "../store/sliceModal";
import { getImage } from "../helper/helps";
import { Compared } from "./Compare";
import { Charts } from "./Chart";
import Close from "../assets/cancel.png";
import "./Modal.css";

/**
 * stats: [
 * {
 *  base_stat: number,
 *  stat: {
 *    name: string
 *  }
 * }
 * ]
 * hp, attack, defense, special-attack, special-defense, speed
 */

const normal = (stats) =>
  stats?.reduce((acc, el) => [...acc, `${el.stat.name},${el.base_stat}`], []) || [];

export function Modal({ visible, url, onClose }) {
  const { left, right, isCompared, initialCompare, closeAndClean } = useManager(
    url,
    onClose
  );

  const chartLeft = normal(left?.stats)
  const chartRight = normal(right?.stats)

  return visible && !!left ? (
    <div className="container">
      <div className="content flex column">
        <div className="head">
          <div className="flex row center">
            <h2 className="title">
              {isCompared ? "BEING COMPARED ..." : left?.name.toUpperCase()}
            </h2>
            {!isCompared && (
              <button onClick={initialCompare} className="compareBtn">
                Compare to...
              </button>
            )}
          </div>
          <img
            src={Close}
            alt="Close png"
            className="x-button"
            onClick={closeAndClean}
          />
        </div>
        <div className="description">
          {isCompared && !!right ? (
            <Compared left={left} right={right} className="compared-list" />
          ) : (
            <PokenDescription {...left} />
          )}
        </div>
        <div>
          <Charts titleLeft={left?.name} dataLeft={chartLeft} titleRight={right?.name} dataRight={chartRight} />
        </div>
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
  }, [url, dispatch]);

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
        <li key={index} className="list">
          {element}
        </li>
      ))}
    </ul>
  );
};

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
    <div className="description">
      <div>
        <img src={getImage(id)} className="image" />
      </div>
      <div>
        <p className="text">{desc}</p>
        <div className="table">
          <div className="up-box">
            <tr>
              <th>Height</th>
              <th>Weight</th>
              <th>Gender</th>
            </tr>
            <tr>
              <td>{height / 10} m</td>
              <td>{weight / 10} kg</td>
              <td>{gender < 5 ? "Male" : "Female"}</td>
            </tr>
          </div>
          <div className="low-box">
            <tr>
              <th>Abilities</th>
              <th>Type</th>
            </tr>
            <tr>
              <td>
                <List data={abilities} />
              </td>
              <td>
                <List data={types} />
              </td>
            </tr>
          </div>
        </div>
      </div>
    </div>
  );
}
