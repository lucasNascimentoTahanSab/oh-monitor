/**
 * @file Módulo responsável pela exibição do botão play.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useRef } from 'react';
import Util from '../../../classes/util/Util.js';
import LoadingComponent from '../../LoadingComponents/LoadingComponent/LoadingComponent.js';

function ButtonPlay(props) {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.style.minWidth = `${buttonRef.current.getBoundingClientRect().width}px`
    buttonRef.current.style.minHeight = `${buttonRef.current.getBoundingClientRect().height}px`
  }, []);

  function getShape() {
    return props.loading ? getLoading() : (props.playing ? getPause() : getPlay());
  }

  function getPlay() {
    return (
      <svg width={props.width} height={props.height} viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M12.3432 5.9154L3.12506 0.0303955V14.9935L12.3394 9.0879C12.6077 8.91929 12.8288 8.68547 12.9822 8.40826C13.1356 8.13105 13.2162 7.8195 13.2166 7.50268C13.217 7.18586 13.1371 6.87412 12.9843 6.59655C12.8316 6.31898 12.611 6.08463 12.3432 5.9154Z' fill={props.color} />
      </svg>
    );
  }

  function getPause() {
    return (
      <svg width={props.width} height={props.height} viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_406_3688)'>
          <path d='M6.25 0H1.875V15H6.25V0Z' fill={props.color} />
          <path d='M13.1251 0H8.75006V15H13.1251V0Z' fill={props.color} />
        </g>
        <defs>
          <clipPath id='clip0_406_3688'>
            <rect width={props.width} height={props.height} fill='white' />
          </clipPath>
        </defs>
      </svg>
    );
  }

  function getLoading() {
    return (<LoadingComponent width={props.width} height={props.height} />);
  }

  return (
    <button onClick={event => Util.handle(props.onClick, event)} ref={buttonRef}>
      {getShape()}
    </button>
  );
}

export default ButtonPlay;