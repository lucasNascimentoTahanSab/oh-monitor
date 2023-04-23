import React from 'react';

function ButtonPlay(props) {
  function onClick() {
    if (typeof props.onClick !== 'function') { return; }

    props.onClick();
  }

  return (
    <button onClick={onClick}>
      <svg width={props.width} height={props.height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.3432 5.9154L3.12506 0.0303955V14.9935L12.3394 9.0879C12.6077 8.91929 12.8288 8.68547 12.9822 8.40826C13.1356 8.13105 13.2162 7.8195 13.2166 7.50268C13.217 7.18586 13.1371 6.87412 12.9843 6.59655C12.8316 6.31898 12.611 6.08463 12.3432 5.9154Z" fill={props.color} />
      </svg>
    </button>
  );
}

export default ButtonPlay;