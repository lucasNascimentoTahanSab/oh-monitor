import React from 'react';

function CodeEditorMenuItem(props) {
  function setCurrentFile() {
    if (typeof props.setCurrentFile !== 'function') { return; }

    props.setCurrentFile(props.file?.uuid);
  }

  return (
    <div className='menu__item'>
      <input id={props.file?.uuid} className='menu__item-radio' type='radio' name={props.group} checked={props.file?.current} onChange={setCurrentFile} />
      <label className='menu__item-label' htmlFor={props.file?.uuid}>{props.file?.name}</label>
    </div>
  );
}

export default CodeEditorMenuItem;