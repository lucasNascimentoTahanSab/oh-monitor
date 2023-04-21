import React from 'react';
import CodeEditorMenuItem from '../CodeEditorMenuItem/CodeEditorMenuItem';
import CodeEditorMenuSettings from '../CodeEditorMenuSettings/CodeEditorMenuSettings';

function CodeEditorMenu(props) {
  function getMenuItems() {
    if (!props.files?.length) { return null; }

    return props.files.map(file => <CodeEditorMenuItem key={file.uuid} file={file} group='radio-group-bst' setCurrentFile={props.setCurrentFile} />);
  }

  return (
    <div className='code-editor__menu'>
      <div className='code-editor__menu-tabs'>{getMenuItems()}</div>
      <CodeEditorMenuSettings files={props.files} setResult={props.setResult} />
    </div>
  );
}

export default CodeEditorMenu;