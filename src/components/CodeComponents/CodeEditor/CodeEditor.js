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
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext';
import ResultContext from '../../Context/ResultContext/ResultContext';
import OutputContext from '../../Context/OutputContext/OutputContext.js';
import InputContext from '../../Context/InputContext/InputContext.js';
import RenderContext from '../../Context/RenderContext/RenderContext.js';
import Util from '../../../classes/util/Util.js';
import callouts from '../../../classes/callouts/callout.js';
import config from '../../../config.json';
import Code from '../../../classes/strapi/Code';

function CodeEditor(props) {
  const [currentExercise, setCurrentExercise] = useContext(ExerciseContext);
  const [codes, setCodes] = useState(new Map());
  const [currentCode, setCurrentCode] = useState(null);
  const [output, setOutput] = useState([getRightArrow('output')]);
  const [input, setInput] = useState([getRightArrow('input')]);
  const [render, setRender] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const getFilesCallback = useCallback(getFiles, [getFiles]);

  /**
   * Método responsável pela obtenção dos arquivos de código a partir dos metadados recebidos.
   * 
   * @returns 
   */
  async function getFiles() {
    if (!currentExercise?.codes?.length) { return; }
    if (codes.size) { return; }

    const retrievedFiles = await retrieveCodesFromRepo();

    setCodesMap(retrievedFiles);
    updateCodes(codes);
  }

  /**
   * Método responsável pela atualização dos arquivos assim como arquivo atual.
   * 
   * @param {Map} codes 
   */
  function updateCodes(codes) {
    const codesArray = Array.from(codes.values());
    const newCurrentCode = Util.getCurrentItem(codesArray);

    setCodes(new Map(codes));
    setCurrentCode(newCurrentCode);
    setCurrentExercise({ ...currentExercise, codes });
  }

  /**
   * Método responsável pela configuração de mapa para os arquivos de código recuperados, 
   * separados por endereço.
   * 
   * @param {array} retrievedCodes 
   */
  function setCodesMap(retrievedCodes) {
    retrievedCodes.forEach(code => codes.set(code.uid, code));
  }

  /**
   * Método responsável pela requisição dos arquivos informados ao repositório ou recuperação
   * em memória primária quando previamente carregados.
   * 
   * @returns {Promise}
   */
  async function retrieveCodesFromRepo() {
    return Promise.all(currentExercise.codes.map(getCode));
  }

  async function getCode(code) {
    return code.content ? code : new Code({ ...code, content: (await calloutCode(code))?.data });
  }

  async function calloutCode(code) {
    return await callouts.repo.getCode(code.path, config.language, config.languages[config.language].extension);
  }

  /**
   * Hook responsável pela requisição dos arquivos em repositório ou obtenção em memória
   * quando previamente carregados, configurando arquivo principal.
   */
  useEffect(() => { if (!currentCode && currentExercise) { getFilesCallback() } }, [currentCode, currentExercise, getFilesCallback]);

  /**
   * Método responsável pela atualização do arquivo recebido dentre os demais arquivos.
   * 
   * @param {object} code 
   */
  function updateCurrentCode(code) {
    Util.updateItemInMap(codes, updateCodes)(code);
  }

  /**
   * Método responsável por configurar saída e comandos de acordo com resultado obtido
   * em execução.
   * 
   * @param {object} result 
   */
  function updateResult(result) {
    currentExercise.result = result;
    currentExercise.output = getOutput(result);
    currentExercise.commands = getCommands(result);

    updateOutputContent();

    setCurrentExercise({ ...currentExercise });
    setRender(true);
  }

  /**
   * Método responsável pela atualização das saídas a serem exibidas em terminal do editor
   * de códigos.
   */
  function updateOutputContent() {
    setOutput([getRightArrow('output'), getOutputContent()]);
  }

  /**
   * Método responsável pela obtenção das saídas a serem exebidas em terminal.
   * 
   * @returns {array}
   */
  function getOutputContent() {
    if (!currentExercise.output) { return []; }

    return currentExercise.output.map(item => [getItem('output', item), getRightArrow('output')]);
  }

  function getItem(content, item) {
    return createElement('p', { key: `${currentExercise.uid}_${content}_${currentExercise[content].length}` }, item);
  }

  function getRightArrow(content) {
    return createElement(Right, {
      key: `${currentExercise?.uid ?? ''}_right-${content}_${currentExercise?.[content]?.length ?? ''}`,
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
    if (!result || result.error) { return currentExercise.commands; }
    if (!result.output) { return currentExercise.commands; }

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
    if (!result) { return currentExercise.output; }

    if (result.error) { currentExercise.output.push(result.error); }
    else { currentExercise.output.push(result.output.replaceAll(/35a7bfa2-e0aa-11ed-b5ea-0242ac120002.*\n/g, '')); }

    return currentExercise.output;
  }

  function getCodeEditorClass() {
    return fullscreen ? 'code-editor code-editor--fullscreen' : 'code-editor';
  }

  return (
    <FilesContext.Provider value={[codes, updateCodes]}>
      <FileContext.Provider value={[currentCode, updateCurrentCode]}>
        <ResultContext.Provider value={[updateResult]}>
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
  );
}

export default CodeEditor;