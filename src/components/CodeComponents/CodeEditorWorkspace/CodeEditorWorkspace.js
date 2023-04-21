import React from 'react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen';
import CodeEditorFile from '../CodeEditorFile/CodeEditorFile';
import CodeEditorMenu from '../CodeEditorMenu/CodeEditorMenu';

function CodeEditorWorkspace(props) {
  return (
    <div className='code-editor__workspace'>
      <CodeEditorMenu files={props.files} setCurrentFile={props.setCurrentFile} />
      <div className='code-editor__workspace-inner'>
        <CodeEditorFile file={props.file} setFile={props.setFile} />
        <AnimationScreen />
      </div>
    </div>
  );
}

export default CodeEditorWorkspace;