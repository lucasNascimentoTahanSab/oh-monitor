import React from 'react';
import CodeEditorMenuItem from '../CodeEditorMenuItem/CodeEditorMenuItem';

function CodeEditorPromptMenu(props) {
  function getMenuItems() {
    if (!props.items?.length) { return null; }

    return props.items.map(item =>
      <CodeEditorMenuItem
        key={item.uuid}
        item={item}
        group={`radio-group-${item.uuid}`}
        setCurrentItem={props.setCurrentItem}
        selectorClassName='prompt__menu-item-radio'
        labelClassName='prompt__menu-item no-select'
      />
    );
  }

  return (
    <div className='code-editor__prompt-menu'>
      {getMenuItems()}
    </div>
  );
}

export default CodeEditorPromptMenu;