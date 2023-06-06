/**
 * @file Módulo responsável pela exibição de botão de recarregamento.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useEffect, useRef } from 'react';
import Util from '../../../classes/util/Util';

function ButtonReload(props) {
  const buttonRef = useRef();

  const rotateCallback = useCallback(rotate, [rotate]);

  /**
   * Método responsável por controlar rotação do botão de carregamento.
   */
  function rotate() {
    if (props.loading && !buttonRef.current.classList.contains('tcc-rotate')) { startRotating(); }
    else if (!props.loading && buttonRef.current.classList.contains('tcc-rotate')) { stopRotating(); }
  }

  function stopRotating() {
    buttonRef.current.classList.remove('tcc-rotate');
  }

  function startRotating() {
    buttonRef.current.classList.add('tcc-rotate');
  }

  useEffect(() => { rotateCallback(); }, [props.loading, rotateCallback]);

  return (
    <button onClick={event => Util.handle(props.onClick, event)} ref={buttonRef}>
      <svg width={props.width} height={props.height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_712_2)">
          <path d="M7.50013 1.25005C8.3292 1.25277 9.14949 1.41989 9.91355 1.74173C10.6776 2.06358 11.3702 2.53375 11.9514 3.12506H9.37513V4.37506H12.5895C12.8972 4.37472 13.1922 4.25234 13.4098 4.03475C13.6274 3.81716 13.7498 3.52215 13.7501 3.21443V5.47365e-05H12.5001V1.9238C11.4236 0.954341 10.0889 0.317964 8.65789 0.0918102C7.22689 -0.134344 5.76102 0.0594341 4.43795 0.649657C3.11488 1.23988 1.99141 2.20121 1.20372 3.41711C0.416034 4.63302 -0.00205554 6.0513 0.0001306 7.50006H1.25013C1.25195 5.84301 1.91102 4.25436 3.08272 3.08265C4.25443 1.91094 5.84309 1.25187 7.50013 1.25005V1.25005Z" fill={props.color} />
          <path d="M13.7501 7.5C13.7519 8.74084 13.3838 9.95405 12.6928 10.9847C12.0018 12.0153 11.0193 12.8166 9.87073 13.2861C8.72217 13.7557 7.45972 13.8723 6.2446 13.6209C5.02949 13.3696 3.91688 12.7617 3.04887 11.875H5.62512V10.625H2.41075C2.10303 10.6253 1.80801 10.7477 1.59043 10.9653C1.37284 11.1829 1.25045 11.4779 1.25012 11.7856V15H2.50012V13.0763C3.5767 14.0457 4.91137 14.6821 6.34237 14.9082C7.77336 15.1344 9.23923 14.9406 10.5623 14.3504C11.8854 13.7602 13.0088 12.7988 13.7965 11.5829C14.5842 10.367 15.0023 8.94875 15.0001 7.5H13.7501Z" fill={props.color} />
        </g>
        <defs>
          <clipPath id="clip0_712_2">
            <rect width={props.width} height={props.height} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default ButtonReload;