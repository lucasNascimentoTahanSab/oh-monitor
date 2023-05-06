import React, { useState } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay.js';
import AnimationEngine from '../AnimationEngine/AnimationEngine';

function AnimationScreen(props) {
  const [play, setPlay] = useState(false);

  function getAnimationScreenClass() {
    return props.theme === 'dark' ? 'background-color--color-blue--dark' : 'background-color--color-blue--light';
  }

  function getThemeClass() {
    return props.theme === 'dark' ? 'progress-bar--light' : 'progress-bar--dark';
  }

  return (
    <div className={`code-snippet__animation ${getAnimationScreenClass()}`}>
      <div className='animation-screen__screen'>
        <AnimationEngine commands={props.commands} render={props.render} setRender={props.setRender} play={play} />
      </div>
      <div className='animation-screen__control'>
        <ButtonPlay height='1.5rem' width='1.5rem' color={props.theme === 'dark' ? '#3498DB' : '#1E1E1E'} onClick={() => setPlay(!play)} />
        <input className={`progress-bar ${getThemeClass()}`} type='range' min={0} max={100} step={1} defaultValue={0} />
        <ButtonExpand height='1.5rem' width='1.5rem' color={props.theme === 'dark' ? '#3498DB' : '#1E1E1E'} />
      </div>
    </div>
  );
}

export default AnimationScreen;