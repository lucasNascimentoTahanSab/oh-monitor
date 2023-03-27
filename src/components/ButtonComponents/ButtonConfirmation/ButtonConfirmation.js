import React from 'react';

function ButtonConfirmation(props) {
  function onButtonClick() {
    if (typeof props?.onClick !== 'function') { return; }

    props.onClick();
  }

  return (
    <button className='button--confirmation' onClick={onButtonClick}>
      {props.value}
    </button>
  );
}

export default ButtonConfirmation;