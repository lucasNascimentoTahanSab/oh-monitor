import React, { useEffect, useRef, useState } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay.js';
import AnimationEngine from '../AnimationEngine/AnimationEngine';
import Dragger from '../../../classes/dragger';

function AnimationScreen(props) {
  const [play, setPlay] = useState(false);
  const [dragger, setDragger] = useState(null);
  const [animationEngine, setAnimationEngine] = useState(null);
  const animationScreen = useRef(null);

  useEffect(() => {
    if (!animationScreen) { return; }
    if (!animationEngine) { return; }

    setDragger(new Dragger(animationScreen.current, animationEngine.current));
  }, [animationEngine]);

  function getAnimationScreenClass() {
    return props.theme === 'dark' ? 'background-color--color-blue--dark' : 'background-color--color-blue--light';
  }

  function getThemeClass() {
    return props.theme === 'dark' ? 'progress-bar--light' : 'progress-bar--dark';
  }

  function handleScreenMouseDown(event) {
    if (typeof animationEngine?.current !== 'object') { return; }

    dragger.drag(event);
  }

  return (
    <div className={`code-snippet__animation ${getAnimationScreenClass()}`}>
      <div className='animation-screen__screen' ref={animationScreen} onMouseDown={handleScreenMouseDown}>
        <AnimationEngine
          commands={props.commands}
          render={props.render}
          setRender={props.setRender}
          play={play}
          setPlay={setPlay}
          setAnimationEngine={setAnimationEngine}
          dragger={dragger} />
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