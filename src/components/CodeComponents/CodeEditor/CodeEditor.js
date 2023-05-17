/**
 * @file Módulo responsável pela exibição do editor de código. Agrega, além do editor, menu,
 * tela para animação, terminal e demais configurações relacionadas. 
 * @copyright Lucas N. T. Sab 2023
 */
import React, { createElement, useEffect, useState, useContext, useCallback } from 'react';
import { ReactComponent as Right } from '../../../svg/right.svg';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace.js';
import CodeEditorPrompt from '../CodeEditorPrompt/CodeEditorPrompt.js';
import FullscreenContext from '../../Context/FullscreenContext/FullscreenContext.js';
import FilesContext from '../../Context/FilesContext/FilesContext.js';
import FileContext from '../../Context/FileContext/FileContext.js';
import PackagesContext from '../../Context/PackagesContext/PackagesContext.js';
import PackageContext from '../../Context/PackageContext/PackageContext.js';
import ResultContext from '../../Context/ResultContext/ResultContext.js';
import OutputContext from '../../Context/OutputContext/OutputContext.js';
import InputContext from '../../Context/InputContext/InputContext.js';
import RenderContext from '../../Context/RenderContext/RenderContext.js';
import Package from '../../../classes/strapi/Package.js';
import File from '../../../classes/strapi/File.js';
import Util from '../../../classes/util/Util.js';
import callouts from '../../../classes/callouts/callout.js';
import config from '../../../config.json';

function CodeEditor(props) {
  const [packages, setPackages] = useContext(PackagesContext);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [files, setFiles] = useState(new Map());
  const [currentFile, setCurrentFile] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [result, setResult] = useState(null);
  const [output, setOutput] = useState([getRightArrow()]);
  const [input, setInput] = useState([getRightArrow()]);
  const [render, setRender] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => setExercise(props.exercise), [props.exercise]);

  const getFilesCallback = useCallback(getFiles, [getFiles]);

  /**
   * Método responsável pela obtenção dos arquivos de código a partir dos metadados recebidos.
   * 
   * @returns 
   */
  async function getFiles() {
    if (!exercise?.codes?.length) { return; }
    if (files.size) { return; }

    const retrievedFiles = await retriveFilesFromRepo();

    setFilesMap(retrievedFiles);
    updateFiles(files);
  }

  /**
   * Método responsável pela atualização dos arquivos assim como arquivo atual.
   * 
   * @param {Map} files 
   */
  function updateFiles(files) {
    setCurrentFile(Util.getCurrentItem(Array.from(files.values())));
    setFiles(new Map(files));

    updatePackages(files);
  }

  /**
   * Método responsável pela atualização dos editores de código assim como o
   * editor atual.
   */
  function updatePackages(files) {
    const updatedPackage = new Package(packages.get(exercise.uid), files);

    packages.set(exercise.uid, updatedPackage);

    setCurrentPackage(updatedPackage);
    setPackages(new Map(packages));
  }

  /**
   * Método responsável pela configuração de mapa para os arquivos de código recuperados, 
   * separados por endereço.
   * 
   * @param {array} retrievedFiles 
   */
  function setFilesMap(retrievedFiles) {
    retrievedFiles.forEach(file => files.set(file.uid, file));
  }

  /**
   * Método responsável pela requisição dos arquivos informados ao repositório ou recuperação
   * em memória primária quando previamente carregados.
   * 
   * @returns {Promise}
   */
  async function retriveFilesFromRepo() {
    return Promise.all(exercise.codes.map(getFile));
  }

  async function getFile(file) {
    return packagesHasFile(file) ? getFileFromCodes(file) : new File(file, (await calloutFile(file))?.data);
  }

  async function calloutFile(file) {
    return await callouts.repo.getFile(file.path, config.language, config.languages[config.language].extension);
  }

  function packagesHasFile(file) {
    return packages.has(exercise.uid) && packages.get(exercise.uid)?.files?.has(file.uid);
  }

  function getFileFromCodes(file) {
    return packages.get(exercise.uid)?.files?.get(file.uid);
  }

  /**
   * Hook responsável pela requisição dos arquivos em repositório ou obtenção em memória
   * quando previamente carregados, configurando arquivo principal.
   */
  useEffect(() => { if (!currentFile && exercise) { getFilesCallback() } }, [currentFile, exercise, getFilesCallback]);

  /**
   * Método responsável pela atualização do arquivo recebido dentre os demais arquivos.
   * 
   * @param {object} file 
   */
  function updateCurrentFile(file) {
    Util.updateItemInMap(files, updateFiles)(file);
  }

  /**
   * Método responsável por configurar saída e comandos de acordo com resultado obtido
   * em execução.
   * 
   * @param {object} result 
   */
  function updateResult(result) {
    currentPackage.output = getOutput(result);
    currentPackage.commands = getCommands(result);

    updateOutputContent();
    updateCurrentPackage();
    setResult(result);
    setRender(true);
  }

  function updateCurrentPackage() {
    Util.updateItemInMap(packages, setPackages)(currentPackage);
  }

  /**
   * Método responsável pela atualização das saídas a serem exibidas em terminal do editor
   * de códigos.
   */
  function updateOutputContent() {
    setOutput([getRightArrow(), getOutputContent()]);
  }

  /**
   * Método responsável pela obtenção das saídas a serem exebidas em terminal.
   * 
   * @returns {array}
   */
  function getOutputContent() {
    if (!currentPackage.output) { return []; }

    return currentPackage.output.map(item => [getItem(item), getRightArrow()]);
  }

  function getItem(item) {
    return createElement('p', { key: `${currentPackage.uid}_content_${currentPackage.output.length}` }, item);
  }

  function getRightArrow() {
    return createElement(Right, {
      key: `${currentPackage?.uid ?? ''}_right_${currentPackage?.output?.length ?? ''}`,
      style: { height: '1rem', width: '1rem', minHeight: '1rem' },
      alt: 'Arrow pointing to the right.'
    });
  }

  /**
   * Método responsável pela obtenção dos comandos gerados a partir do resultado obtido.
   * 
   * @param {object} result 
   * @returns {array}
   */
  function getCommands(result) {
    if (!result || result.error) { return currentPackage.commands; }
    if (!result.output) { return currentPackage.commands; }

    const justCommands = getJustCommandsFromResult(result);

    return getFilteredCommands(justCommands);
  }

  function getFilteredCommands(justCommands) {
    if (!justCommands?.length) { return []; }

    // Os comandos são, por padrão, postos após o divisor (/).
    return justCommands.map(justCommand => JSON.parse(justCommand.split('/')[1]));
  }

  function getJustCommandsFromResult(result) {
    // A expressão regular considera apenas saídas que iniciem pelo UID especificado.
    return result.output.split('\n')?.filter(line => line.match(/35a7bfa2-e0aa-11ed-b5ea-0242ac120002.*/g));
  }

  /**
   * Método responsável por atualizar a saída do editor de código a partir do resultado 
   * obtido.
   * 
   * @param {object} result 
   * @returns {array}
   */
  function getOutput(result) {
    if (!result) { return currentPackage.output; }

    if (result.error) { currentPackage.output.push(result.error); }
    else { currentPackage.output.push(result.output.replaceAll(/35a7bfa2-e0aa-11ed-b5ea-0242ac120002.*\n/g, '')); }

    return currentPackage.output;
  }

  function getCodeEditorClass() {
    return fullscreen ? 'code-editor code-editor--fullscreen' : 'code-editor';
  }

  return (
    <PackageContext.Provider value={[currentPackage, setCurrentPackage]}>
      <FilesContext.Provider value={[files, updateFiles]}>
        <FileContext.Provider value={[currentFile, updateCurrentFile]}>
          <ResultContext.Provider value={[result, updateResult]}>
            <OutputContext.Provider value={[output, setOutput]}>
              <InputContext.Provider value={[input, setInput]}>
                <FullscreenContext.Provider value={[fullscreen, setFullscreen]}>
                  <RenderContext.Provider value={[render, setRender]}>
                    <div className={getCodeEditorClass()}>
                      <CodeEditorWorkspace />
                      <CodeEditorPrompt />
                    </div>
                  </RenderContext.Provider>
                </FullscreenContext.Provider>
              </InputContext.Provider>
            </OutputContext.Provider>
          </ResultContext.Provider>
        </FileContext.Provider>
      </FilesContext.Provider>
    </PackageContext.Provider>
  );
}

export default CodeEditor;