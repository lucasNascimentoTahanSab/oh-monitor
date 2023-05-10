import React, { useEffect, useContext, useRef, useState } from 'react';
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
  const [finished, setFinished] = useState(false);
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
    if (timer) { clearInterval(timer); }

    setPlay(true);
    setPlaying(true);
    setSnapshot(finished ? null : snapshot);
    setCurrentTime(finished ? 0 : currentTime);
    setInitialTime(finished ? Date.now() : Date.now() - currentTime);
    setFinalTime(finished ? Date.now() + totalTime : (Date.now() - currentTime) + totalTime);
    setTimer(setInterval(countTimer, 1));
    setFinished(false);
  }

  function countTimer() {
    if (!getPlaying()) { clearIntervalWhenNotPlaying(); }
    else if (timeIsOver()) { clearIntervalWhenTimeIsOver(); }
    else { setCurrentTimeWhenPlaying(); }
  }

  function setCurrentTimeWhenPlaying() {
    const newCurrentTimeValue = getNewCurrentTimeValue();
    const newSnapshotNumber = getNewSnapshotNumber(newCurrentTimeValue);

    setCurrentTime(newCurrentTimeValue);
    placeElements(newSnapshotNumber);
  }

  function clearIntervalWhenTimeIsOver() {
    setPlay(false);
    setPlaying(false);
    setFinished(true);

    clearInterval(getTimerValue());
  }

  function timeIsOver() {
    return Date.now() > getFinalTimeValue();
  }

  function clearIntervalWhenNotPlaying() {
    clearInterval(getTimerValue());
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
    const finalTimeValue = getFinalTimeValue();
    const currentTimeValue = getCurrentTimeValue();
    const newCurrentTimeValue = Date.now() - initialTimeValue ?? currentTimeValue;

    return newCurrentTimeValue > finalTimeValue ? finalTimeValue : newCurrentTimeValue;
  }

  function getTimerValue() {
    let timerValue = timer;

    setTimer(timer => {
      timerValue = timer;

      return timer;
    });

    return timerValue;
  }

  function getCurrentTimeValue() {
    let currentTimeValue = currentTime;

    setCurrentTime(currentTime => {
      currentTimeValue = currentTime;

      return currentTime;
    });

    return currentTimeValue;
  }

  function getInitialTimeValue() {
    let initialTimeValue = initialTime;

    setInitialTime(initialTime => {
      initialTimeValue = initialTime;

      return initialTime;
    });

    return initialTimeValue;
  }

  function getPlaying() {
    let playingValue = playing;

    setPlaying(playing => {
      playingValue = playing;

      return playing;
    });

    return playingValue;
  }

  function getFinalTimeValue() {
    let finalTimeValue = finalTime;

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

    if (event.target.value === totalTime) { setFinished(true); }

    placeElements(getNewSnapshotNumber(event.target.value));
  }

  function onInputTouchEnd(event) {
    if (!play) { return; }

    playTimeline();
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
        <InputRange theme={props.theme} snapshots={snapshots} max={totalTime} value={currentTime} onChange={onInputRangeChange} onTouchEnd={onInputTouchEnd} />
        <ButtonExpand height='1.5rem' width='1.5rem' color={props.theme === 'dark' ? '#3498DB' : '#1E1E1E'} />
      </div>
    </div>
  );
}

export default AnimationScreen;