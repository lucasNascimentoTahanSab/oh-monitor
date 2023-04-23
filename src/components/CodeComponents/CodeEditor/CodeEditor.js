import React, { useCallback, useEffect, useState, createElement, useContext } from 'react';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace';
import CodeEditorOutput from '../CodeEditorOutput/CodeEditorOutput';
import File from '../../../classes/file';
import { callouts } from '../../../classes/callout';
import { util } from '../../../classes/util';
import { FullscreenContext } from '../../Context/FullscreenContext/FullscreenContext';
import { ReactComponent as Right } from '../../../svg/right.svg';
import { ConfigContext } from '../../Context/ConfigContext/ConfigContext';
import Command from '../../../classes/command';

function CodeEditor(props) {
  const config = useContext(ConfigContext);
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
    return new File(
      file.attributes,
      (await callouts.repo.getFile(
        file.attributes?.path,
        config?.language,
        config?.languages?.[config.language]?.extension)
      )?.data
    );
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

  function updateFile(file) {
    if (!files.length) { return; }

    updateFiles(file);
    setFile(file);
  }

  function updateFiles(file) {
    const index = util.getItemIndexByUuid(files, file.uuid);

    if (index === -1) { return; }

    files[index] = file;

    setFiles(files);
  }

  function updateResult(result) {
    setResult(result);
    updateOutput(result);
    updateCommands(result);
  }

  function updateCommands(result) {
    if (!result || result.error) { return; }
    if (!result.output) { return; }

    const justCommands = getJustCommandsFromResult(result);

    setCommands(getCommands(justCommands));
  }

  function getCommands(justCommands) {
    if (!justCommands?.length) { return []; }

    return justCommands.map(justCommand => new Command(justCommand.split(' ')));
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
        <CodeEditorWorkspace files={files} file={file} commands={commands} setFile={updateFile} setCurrentFile={setCurrentFile} setResult={updateResult} />
        {/* <CodeEditorOutput output={output} /> */}
      </div>
    </FullscreenContext.Provider>
  );
}

export default CodeEditor;