import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { fetchPoken, initCompare, clearModal } from "../store/sliceModal";

import { Compared } from "./Compare";
import { Charts } from "./Chart";
import Close from "../assets/cancel.png";
import { PokenDescription } from "./PokenDescription";

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

const normal = (stats: any[]) =>
  stats?.reduce(
    (acc: [], el: { stat: { name: string }; base_stat: number }) => [
      ...acc,
      `${el.stat.name},${el.base_stat}`,
    ],
    []
  ) || [];

export function Modal(visible: boolean, url: string, onClose: any) {
  interface Compared {
    left: {
      name: string;
      stats: [];
    };
    right: {
      name: string;
      stats: [];
    };
    isCompared: boolean;
    initialCompare: () => void;
    closeAndClean: () => void;
  }
  const { left, right, isCompared, initialCompare, closeAndClean }: Compared =
    useManager(url, onClose);

  const chartLeft = normal(left?.stats);
  const chartRight = normal(right?.stats);

  return visible && !!left ? (
    <div className="flex fixed top-0 left-0 w-screen h-screen justify-center items-center z-1 bg-card">
      <div className="flex-col block w-2/5 h-5/6 p-5 min-w-1/2 max-w-1/2 bg-off-white rounded-xl border-solid border-off-white shadow-lg border-4">
        <div className="flex flex-row justify-between border-b-2 border-b-solid border-off-grey pb-2">
          <div className="flex flex-row justify-center items-center">
            <h2 className="pl-4 font-bold">
              {isCompared ? "BEING COMPARED ..." : left?.name.toUpperCase()}
            </h2>
            {!isCompared && (
              <button
                onClick={initialCompare}
                className="ml-4 p-2 rounded w-4/6 bg-off-grey border-solid border-2 hover:bg-yellow"
              >
                Compare to...
              </button>
            )}
          </div>
          <img
            src={Close}
            alt="Close png"
            className="w-8 h-8"
            onClick={closeAndClean}
          />
        </div>
        <div className="flex justify-center items-center flex-row mt-4">
          {isCompared && !!right ? (
            <Compared left={left} right={right} className="table" />
          ) : (
            <PokenDescription {...left} />
          )}
        </div>
        <div>
          <Charts
            titleLeft={left?.name}
            dataLeft={chartLeft}
            titleRight={right?.name}
            dataRight={chartRight}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function useManager(url: RequestInfo, onClose: () => void) {
  const { left, right, isCompared } = useSelector(
    (state: RootStateOrAny) => state.modal
  );
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
