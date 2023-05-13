import React from 'react';
import CodeEditorMenuItem from '../CodeEditorMenuItem/CodeEditorMenuItem';
import CodeEditorMenuSettings from '../CodeEditorMenuSettings/CodeEditorMenuSettings';

function CodeEditorMenu(props) {
  function getMenuItems() {
    if (!props.files?.length) { return null; }

    return props.files.map(file =>
      <CodeEditorMenuItem
        key={file.uuid}
        item={file}
        group='code-editor-menu-radio-group'
        setCurrentItem={props.setCurrentFile}
        selectorClassName='menu__item-radio'
        labelClassName='menu__item-label'
      />
    );
  }

  return (
    <div className='code-editor__menu'>
      <div className='code-editor__menu-tabs'>{getMenuItems()}</div>
      <CodeEditorMenuSettings files={props.files} setResult={props.setResult} />
    </div>
  );
}

export default CodeEditorMenu;