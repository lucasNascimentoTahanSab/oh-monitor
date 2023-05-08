import React, { useEffect, useContext, useRef, useState, useCallback } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay.js';
import AnimationEngine from '../AnimationEngine/AnimationEngine';
import Dragger from '../../../classes/dragger';
import InputRange from '../../InputComponents/InputRange/InputRange';
import { ConfigContext } from '../../Context/ConfigContext/ConfigContext.js';

function AnimationScreen(props) {
  const [play, setPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [dragger, setDragger] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [snapshot, setSnapshot] = useState([]);
  const [animationEngine, setAnimationEngine] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const animationScreen = useRef(null);
  const config = useContext(ConfigContext);

  useEffect(() => {
    if (!animationScreen) { return; }
    if (!animationEngine) { return; }

    setDragger(new Dragger(animationScreen.current, animationEngine.current));
  }, [animationEngine]);

  function getAnimationScreenClass() {
    return props.theme === 'dark' ? 'background-color--color-blue--dark' : 'background-color--color-blue--light';
  }

  function handleScreenMouseDown(event) {
    if (typeof animationEngine?.current !== 'object') { return; }

    dragger.drag(event);
  }

  function toggleTimeline() {
    if (play) { pauseTimeline(); }
    else { playTimeline(); }
  }

  function playTimeline() {
    if (playing) { return; }

    setPlay(true);
    setPlaying(true);
    setSnapshot(null);
    setCurrentTime(currentTime >= finalTime ? 0 : currentTime);
    setInitialTime(currentTime >= finalTime ? Date.now() : Date.now() - currentTime);
    setFinalTime(Date.now() + totalTime);
    setTimer(setInterval(countTimer, 1));
  }

  function countTimer() {
    const finalTimeValue = getFinalTimeValue();

    if (Date.now() <= finalTimeValue) {
      const newCurrentTimeValue = getNewCurrentTimeValue();
      const newSnapshotNumber = getNewSnapshotNumber(newCurrentTimeValue);

      setCurrentTime(newCurrentTimeValue);
      placeElements(newSnapshotNumber);
    } else {
      setPlay(false);
      setPlaying(false);

      clearInterval(getTimerValue());
    }
  }

  function placeElements(snapshotNumber) {
    if (snapshotNumber > snapshots?.length - 1) { return; }

    setSnapshot(snapshots[snapshotNumber]);
  }

  function getNewSnapshotNumber(currentTimeValue) {
    return Math.floor(currentTimeValue / config.animation.duration);
  }

  function getNewCurrentTimeValue() {
    const initialTimeValue = getInitialTimeValue();
    const currentTimeValue = getCurrentTimeValue();

    return Date.now() - initialTimeValue ?? currentTimeValue;
  }

  function getTimerValue() {
    let timerValue = 0;

    setTimer(timer => {
      timerValue = timer;

      return timer;
    });

    return timerValue;
  }

  function getCurrentTimeValue() {
    let currentTimeValue = 0;

    setCurrentTime(currentTime => {
      currentTimeValue = currentTime;

      return currentTime;
    });

    return currentTimeValue;
  }

  function getInitialTimeValue() {
    let initialTimeValue = 0;

    setInitialTime(initialTime => {
      initialTimeValue = initialTime;

      return initialTime;
    });

    return initialTimeValue;
  }

  function getFinalTimeValue() {
    let finalTimeValue = 0;

    setFinalTime(finalTime => {
      finalTimeValue = finalTime;

      return finalTime;
    });

    return finalTimeValue;
  }

  function pauseTimeline() {
    if (!playing) { return; }

    setPlay(false);
    setPlaying(false);

    clearInterval(timer);
  }

  function configureSnapshots(result) {
    setSnapshots(result);
    setTotalTime(result?.length * config.animation.duration);
  }

  function onInputRangeChange(event) {
    setPlaying(false);
    setCurrentTime(event.target.value);

    placeElements(getNewSnapshotNumber(event.target.value));
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
          setSnapshots={configureSnapshots}
          snapshot={snapshot}
          setSnapshot={setSnapshot}
          dragger={dragger} />
      </div>
      <div className='animation-screen__control'>
        <ButtonPlay height='1.5rem' width='1.5rem' color={props.theme === 'dark' ? '#3498DB' : '#1E1E1E'} onClick={toggleTimeline} />
        <InputRange theme={props.theme} snapshots={snapshots} max={totalTime} value={currentTime} onChange={onInputRangeChange} />
        <ButtonExpand height='1.5rem' width='1.5rem' color={props.theme === 'dark' ? '#3498DB' : '#1E1E1E'} />
      </div>
    </div>
  );
}

export default AnimationScreen;