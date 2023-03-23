import React from 'react';

function ButtonConfirmation(props) {
  return (
    <button className='button--confirmation'>
      {props.text}
    </button>
  );
}

export default ButtonConfirmation;