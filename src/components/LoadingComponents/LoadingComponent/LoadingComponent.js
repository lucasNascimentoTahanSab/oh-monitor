import React from 'react';

function LoadingComponent(props) {
  return (
    <div className='button-play--loading' style={{ width: props.width, height: props.height }}>
      <div style={{ width: props.width, height: props.height }}></div>
      <div style={{ width: props.width, height: props.height }}></div>
      <div style={{ width: props.width, height: props.height }}></div>
      <div style={{ width: props.width, height: props.height }}></div>
    </div>
  );
}

export default LoadingComponent;