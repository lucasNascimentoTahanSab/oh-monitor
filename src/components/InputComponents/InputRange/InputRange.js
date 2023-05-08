import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../Context/ConfigContext/ConfigContext';

function InputRange(props) {
  const [snapshots, setSnapshots] = useState([]);
  const [snapshot, setSnapshot] = useState(null);
  const config = useContext(ConfigContext);

  useEffect(() => { setSnapshots(props.snapshots) }, [props.snapshots]);
  useEffect(() => { setSnapshot(props.snapshot) }, [props.snapshot]);

  function getThemeClass() {
    return props.theme === 'dark' ? 'progress-bar--light' : 'progress-bar--dark';
  }

  function handleInputChange(event) {
    if (typeof props.onChange !== 'function') { return; }

    props.onChange(event);
  }

  return (
    <input className={`progress-bar ${getThemeClass()}`} type='range' min={0} max={props.max} step={1} value={props.value} onChange={handleInputChange} />
  );
}

export default InputRange;