import React from 'react';

function CodeEditorMenuItem(props) {
  function setCurrentItem() {
    if (typeof props.setCurrentItem !== 'function') { return; }

    props.setCurrentItem(props.item?.uuid);
  }

  return (
    <div className='menu__item'>
      <input id={props.item?.uuid} className={props.selectorClassName} type='radio' name={props.group} checked={props.item?.current} onChange={setCurrentItem} />
      <label className={props.labelClassName} htmlFor={props.item?.uuid}>{props.item?.name}</label>
    </div>
  );
}

export default CodeEditorMenuItem;