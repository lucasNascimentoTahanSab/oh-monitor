import React, { useCallback, useContext, useEffect, useState } from 'react';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace';
import CodeEditorOutput from '../CodeEditorOutput/CodeEditorOutput';
import File from '../../../classes/file';
import { callouts } from '../../../classes/callout';
import { util } from '../../../classes/util';
import { FullscreenContext } from '../../Context/FullscreenContext/FullscreenContext';

function CodeEditor(props) {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => { if (!files.length) { getFiles(); } });

  async function getFiles() {
    if (!props.files?.length) { return; }

    setFiles(await retriveFilesFromRepo());
  }

  async function retriveFilesFromRepo() {
    return Promise.all(props.files.map(retriveFileFromRepo));
  }

  async function retriveFileFromRepo(file) {
    return new File(file.attributes, (await callouts.repo.getFile(file.attributes?.path, 'c', 'c'))?.data);
  }

  const callbackGetFile = useCallback(() => setFile(util.getCurrentFile(files)), [files]);

  useEffect(() => { if (files.length) { callbackGetFile(); } }, [files, callbackGetFile]);

  function setCurrentFile(uuid) {
    unselectCurrentFile();
    selectFileByUuid(uuid);

    setFiles([...files]);
  }

  function selectFileByUuid(uuid) {
    const newFile = util.getFileByUuid(files, uuid);

    if (!newFile) { return; }

    newFile.current = true;
  }

  function unselectCurrentFile() {
    const currentFile = util.getCurrentFile(files);

    if (!currentFile) { return; }

    currentFile.current = false;
  }

  function getCodeEditorClass() {
    return fullscreen ? 'code-editor code-editor--fullscreen' : 'code-editor';
  }

  return (
    <FullscreenContext.Provider value={[fullscreen, setFullscreen]}>
      <div className={getCodeEditorClass()}>
        <CodeEditorWorkspace files={files} file={file} setCurrentFile={setCurrentFile} />
        <CodeEditorOutput />
      </div>
    </FullscreenContext.Provider>
  );
}

export default CodeEditor;