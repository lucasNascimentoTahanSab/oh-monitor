import React, { useEffect, useState } from 'react';
import CodeEditorOutput from '../CodeEditorOutput/CodeEditorOutput';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace';
import File from '../../../classes/file';
import { callouts } from '../../../classes/callout';

function CodeEditor(props) {
  const [files, setFiles] = useState([]);

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

  return (
    <div className='code-editor'>
      <CodeEditorWorkspace files={files} />
      <CodeEditorOutput />
    </div>
  );
}

export default CodeEditor;