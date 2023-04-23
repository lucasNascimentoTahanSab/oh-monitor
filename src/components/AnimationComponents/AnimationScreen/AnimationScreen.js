import React from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay.js';

function AnimationScreen(props) {
  function getAnimationScreenClass() {
    return props.theme === 'dark' ? 'background-color--color-blue--dark' : 'background-color--color-blue--light';
  }

  function getThemeClass() {
    return props.theme === 'dark' ? 'progress-bar--light' : 'progress-bar--dark';
  }

  return (
    <div className={`code-snippet__animation ${getAnimationScreenClass()}`}>
      <div className='animation-screen__screen'></div>
      <div className='animation-screen__control'>
        <ButtonPlay height='1.5rem' width='1.5rem' color={props.theme === 'dark' ? '#3498DB' : '#1E1E1E'} />
        <input className={`progress-bar ${getThemeClass()}`} type='range' min={0} max={100} step={1} defaultValue={0} />
        <ButtonExpand height='1.5rem' width='1.5rem' color={props.theme === 'dark' ? '#3498DB' : '#1E1E1E'} />
      </div>
    </div>
  );
}

export default AnimationScreen;