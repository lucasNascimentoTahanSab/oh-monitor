import React from 'react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen';
import CodeEditorFile from '../CodeEditorFile/CodeEditorFile';
import CodeEditorMenu from '../CodeEditorMenu/CodeEditorMenu';

function CodeEditorWorkspace(props) {
  return (
    <div className='code-editor__workspace'>
      <CodeEditorMenu files={props.files} setCurrentFile={props.setCurrentFile} setResult={props.setResult} />
      <div className='code-editor__workspace-inner'>
        <CodeEditorFile file={props.file} setFile={props.setFile} />
        <AnimationScreen commands={props.commands} />
      </div>
    </div>
  );
}

export default CodeEditorWorkspace;