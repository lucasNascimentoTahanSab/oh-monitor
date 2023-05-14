/**
 * @file Módulo responsável pela exibição do botão dropdown.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import util from '../../../classes/util';

function ButtonArrow(props) {
  function getShape() {
    return props.open
      ? <path d="M2.91675 5.25H11.0834L7.4125 8.92092C7.30311 9.03028 7.15476 9.09171 7.00008 9.09171C6.8454 9.09171 6.69706 9.03028 6.58767 8.92092L2.91675 5.25Z" fill={props.fill} />
      : <path d="M5.66249 11.2542V3.08752L9.33341 6.75844C9.44277 6.86783 9.5042 7.01618 9.5042 7.17086C9.5042 7.32554 9.44277 7.47388 9.33341 7.58327L5.66249 11.2542Z" fill={props.fill} />;
  }

  return (
    <button onClick={event => util.handle(props.onClick, event)}>
      <svg width={props.width} height={props.height} viewBox='0 0 14 14' fill="none" xmlns="http://www.w3.org/2000/svg">
        {getShape()}
      </svg>
    </button>
  );
}

export default ButtonArrow;