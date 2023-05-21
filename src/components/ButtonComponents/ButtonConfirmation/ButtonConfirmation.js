/**
 * @file Módulo responsável pela exibição do botão de confirmação.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useRef } from 'react';
import Util from '../../../classes/util/Util.js';
import LoadingComponent from '../../LoadingComponents/LoadingComponent/LoadingComponent.js';

function ButtonConfirmation(props) {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.style.minWidth = `${buttonRef.current.getBoundingClientRect().width}px`
    buttonRef.current.style.minHeight = `${buttonRef.current.getBoundingClientRect().height}px`
  }, []);

  function getValue() {
    return props.loading ? getLoading() : props.value;
  }

  function getLoading() {
    return (<LoadingComponent className='tcc-loading--white' width={props.width} height={props.height} />);
  }

  return (
    <button className='tcc-button-confirmation' ref={buttonRef} onClick={event => Util.handle(props.onClick, event)}>
      {getValue()}
    </button>
  );
}

export default ButtonConfirmation;