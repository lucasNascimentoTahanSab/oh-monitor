import React, { useRef } from 'react';
import drag from '../../../classes/drag';

function ProgressBar(props) {
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  const boxRef = useRef(null);

  function getThemeClass() {
    return props.theme === 'dark' ? 'background-color--color-blue--light-dark' : 'background-color--color-blue--dark';
  }

  function getBackgroundThemeClass() {
    return props.theme === 'dark' ? 'background-color--color-blue--light' : 'background-color--color-gray';
  }

  function handleThumbMouseDown(event) {
    drag(event, thumbRef, boxRef, trackRef);
  }

  return (
    <div className='progress-bar'>
      <button className={`progress-bar__thumb ${getThemeClass()}`} ref={thumbRef} onMouseDown={handleThumbMouseDown}></button>
      <div className='progress-bar__track' ref={boxRef}>
        <div className={`progress-bar__track-accomplished ${getThemeClass()}`} ref={trackRef}></div>
        <div className={`progress-bar__track-background ${getBackgroundThemeClass()}`}></div>
      </div>
    </div>
  );
}

export default ProgressBar;