import React, { useState } from 'react';
import resize from '../../../classes/resize';
import CodeEditorPromptMenu from '../CodeEditorPromptMenu/CodeEditorPromptMenu.js';
import { util } from '../../../classes/util';
import CodeEditorPromptContent from '../CodeEditorPromptContent/CodeEditorPromptContent';

function CodeEditorPrompt(props) {
  const [menuItems, setMenuItems] = useState([
    { uuid: 'SAÍDA', name: 'SAÍDA', current: true },
    { uuid: 'ENTRADA', name: 'ENTRADA', current: false }
  ]);
  const [contentRef, setContentRef] = useState(null);

  function setCurrentItem(uuid) {
    unselectCurrentItem();
    selectItemByUuid(uuid);

    setMenuItems([...menuItems]);
  }

  function selectItemByUuid(uuid) {
    const newItem = util.getItemByUuid(menuItems, uuid);

    if (!newItem) { return; }

    newItem.current = true;
  }

  function unselectCurrentItem() {
    const currentitem = util.getCurrentItem(menuItems);

    if (!currentitem) { return; }

    currentitem.current = false;
  }

  return (
    <div className='prompt'>
      <div className='prompt__resizer' onMouseDown={event => resize(event, contentRef.current)}></div>
      <div className='prompt__content'>
        <CodeEditorPromptMenu items={menuItems} setCurrentItem={setCurrentItem} />
        <CodeEditorPromptContent content={props.output} setContentRef={setContentRef} />
      </div>
    </div>
  );
}

export default CodeEditorPrompt;