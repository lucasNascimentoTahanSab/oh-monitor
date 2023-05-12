import React, { useEffect, useState, createElement } from 'react';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace';
import CodeEditorPrompt from '../CodeEditorPrompt/CodeEditorPrompt';
import File from '../../../classes/file';
import callouts from '../../../classes/callout';
import util from '../../../classes/util';
import { FullscreenContext } from '../../Context/FullscreenContext/FullscreenContext';
import { ReactComponent as Right } from '../../../svg/right.svg';
import config from '../../../config.json';

function CodeEditor(props) {
  const [render, setRender] = useState(false);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [output, setOutput] = useState([
    createElement(Right, {
      key: 0,
      style: { height: '1rem', width: '1rem', minHeight: '1rem' },
      alt: 'Arrow pointing to the right.'
    })
  ]);
  const [commands, setCommands] = useState([]);
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
    return new File(file.attributes, (await getFile(file))?.data);
  }

  async function getFile(file) {
    return await callouts.repo.getFile(file.attributes?.path, config.language, config.languages[config.language].extension);
  }

  useEffect(() => { if (files.length) { setFile(util.getCurrentItem(files)); } }, [files]);

  function getCodeEditorClass() {
    return fullscreen ? 'code-editor code-editor--fullscreen' : 'code-editor';
  }

  function updateResult(result) {
    setResult(result);
    updateOutput(result);
    updateCommands(result);
    setRender(true);
  }

  function updateCommands(result) {
    if (!result || result.error) { return; }
    if (!result.output) { return; }

    const justCommands = getJustCommandsFromResult(result);

    setCommands(getCommands(justCommands));
  }

  function getCommands(justCommands) {
    if (!justCommands?.length) { return []; }

    return justCommands.map(justCommand => {
      const justCommandsArray = justCommand.split('/');

      return JSON.parse(justCommandsArray[1])
    });
  }

  function getJustCommandsFromResult(result) {
    return result.output.split('\n')?.filter(line => line.match(/35a7bfa2-e0aa-11ed-b5ea-0242ac120002.*/g));
  }

  function updateOutput(result) {
    if (!result) { return; }

    output.push(createElement(
      'p',
      { key: output.length },
      result.error ? result.error : result.output.replaceAll(/35a7bfa2-e0aa-11ed-b5ea-0242ac120002.*\n/g, ''))
    );
    output.push(createElement(Right, {
      key: output.length,
      style: { height: '1rem', width: '1rem', minHeight: '1rem' },
      alt: 'Arrow pointing to the right.'
    }));

    setOutput(output);
  }

  return (
    <FullscreenContext.Provider value={[fullscreen, setFullscreen]}>
      <div className={getCodeEditorClass()}>
        <CodeEditorWorkspace
          render={render}
          setRender={setRender}
          files={files}
          file={file}
          setFile={file => util.updateItem(files, setFiles)(file, setFile)}
          setCurrentFile={util.setCurrentItem(files, setFiles)}
          commands={commands}
          setResult={updateResult} />
        <CodeEditorPrompt output={output} />
      </div>
    </FullscreenContext.Provider>
  );
}

export default CodeEditor;