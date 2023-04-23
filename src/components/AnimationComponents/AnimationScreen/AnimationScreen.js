import React from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay.js';
import ProgressBar from '../../ButtonComponents/ProgressBar/ProgressBar';

function AnimationScreen(props) {
  function getAnimationScreenClass() {
    return `code-snippet__animation ${props?.theme === 'dark' ? 'background-color--color-blue--dark' : 'background-color--color-blue--light'}`
  }

  return (
    <div className={getAnimationScreenClass()}>
      <div className='animation-screen__screen'></div>
      <div className='animation-screen__control'>
        <ButtonPlay height='1.5rem' width='1.5rem' color={props.theme === 'dark' ? '#3498DB' : '#1E1E1E'} />
        <ProgressBar theme={props.theme} />
        <ButtonExpand height='1.5rem' width='1.5rem' color={props.theme === 'dark' ? '#3498DB' : '#1E1E1E'} />
      </div>
    </div>
  );
}

export default AnimationScreen;