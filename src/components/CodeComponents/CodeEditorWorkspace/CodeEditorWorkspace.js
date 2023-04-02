import React, { useCallback, useEffect, useState } from 'react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen';
import CodeEditorFile from '../CodeEditorFile/CodeEditorFile';
import CodeEditorMenu from '../CodeEditorMenu/CodeEditorMenu';
import { util } from '../../../classes/util';

function CodeEditorWorkspace(props) {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const callbackGetFiles = useCallback(() => setFiles(props.files), [props.files]);
  const callbackGetFile = useCallback(() => setFile(util.getCurrentFile(props.files)), [props.files]);

  useEffect(() => {
    if (!files.length && props.files?.length) {
      callbackGetFiles();
      callbackGetFile();
    }
  }, [files, props.files, callbackGetFiles, callbackGetFile]);

  return (
    <div className='code-editor__workspace'>
      <CodeEditorMenu files={files} setCurrentFile={setFile} />
      <div className='code-editor__workspace-inner'>
        <CodeEditorFile file={file} />
        <AnimationScreen />
      </div>
    </div>
  );
}

export default CodeEditorWorkspace;