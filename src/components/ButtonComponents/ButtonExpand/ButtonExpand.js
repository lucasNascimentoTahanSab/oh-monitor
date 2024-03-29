/**
 * @file Módulo responsável pela exibição do botão de expansão de tela.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import Util from '../../../classes/util/Util.js';

function ButtonExpand(props) {
  return (
    <button onClick={event => Util.handle(props.onClick, event)}>
      <svg width={props.width} height={props.height} viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_25_76)'>
          <path d='M12.2499 14.0002H9.33325V12.8335H12.2499C12.4046 12.8335 12.553 12.7721 12.6624 12.6627C12.7718 12.5533 12.8332 12.4049 12.8332 12.2502V9.33352H13.9999V12.2502C13.9999 12.7143 13.8155 13.1594 13.4873 13.4876C13.1592 13.8158 12.714 14.0002 12.2499 14.0002Z' fill={props.color} />
          <path d='M1.16667 4.66667H0V1.75C0 1.28587 0.184374 0.840752 0.512563 0.512563C0.840752 0.184374 1.28587 0 1.75 0L4.66667 0V1.16667H1.75C1.59529 1.16667 1.44692 1.22812 1.33752 1.33752C1.22812 1.44692 1.16667 1.59529 1.16667 1.75V4.66667Z' fill={props.color} />
          <path d='M4.66667 14.0002H1.75C1.28587 14.0002 0.840752 13.8158 0.512563 13.4876C0.184374 13.1594 0 12.7143 0 12.2502L0 9.33352H1.16667V12.2502C1.16667 12.4049 1.22812 12.5533 1.33752 12.6627C1.44692 12.7721 1.59529 12.8335 1.75 12.8335H4.66667V14.0002Z' fill={props.color} />
          <path d='M13.9999 4.66666H12.8332V1.74999C12.8332 1.59528 12.7718 1.44691 12.6624 1.33751C12.553 1.22812 12.4046 1.16666 12.2499 1.16666H9.33325V-7.62939e-06H12.2499C12.714 -7.62939e-06 13.1592 0.184367 13.4873 0.512555C13.8155 0.840744 13.9999 1.28586 13.9999 1.74999V4.66666Z' fill={props.color} />
        </g>
      </svg>
    </button >
  );
}

export default ButtonExpand;