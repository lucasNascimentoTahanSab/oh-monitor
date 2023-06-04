/**
 * @file Módulo responsável pela exibição do editor de código. Agrega, além do editor, menu,
 * tela para animação, terminal e demais configurações relacionadas. 
 * @copyright Lucas N. T. Sab 2023
 */
import React, { createElement, useEffect, useState, useContext, useCallback, useRef } from 'react';
import { ReactComponent as Right } from '../../../svg/right.svg';
import FullscreenContext from '../../Context/FullscreenContext/FullscreenContext.js';
import CodesContext from '../../Context/CodesContext/CodesContext.js';
import CodeContext from '../../Context/CodeContext/CodeContext.js';
import PromisesContext from '../../Context/PromisesContext/PromisesContext.js';
import OutputContext from '../../Context/OutputContext/OutputContext.js';
import InputContext from '../../Context/InputContext/InputContext.js';
import RenderContext from '../../Context/RenderContext/RenderContext.js';
import CodeEditorRefContext from '../../Context/CodeEditorRefContext/CodeEditorRefContext';
import FileContext from '../../Context/FileContext/FileContext';
import Code from '../../../classes/strapi/Code.js';
import Fullscreen from '../../../classes/util/Fullscreen.js';
import Util from '../../../classes/util/Util.js';
import callouts from '../../../classes/callouts/callout.js';
import config from '../../../config.json';

function CodeEditor(props) {
  const [setPromiseInPromises] = useContext(PromisesContext);
  const [currentFile, setCurrentFile] = useState(null);
  const [codes, setCodes] = useState([]);
  const [currentCode, setCurrentCode] = useState(null);
  const [output, setOutput] = useState([getRightArrow('output')]);
  const [input, setInput] = useState([getRightArrow('input')]);
  const [render, setRender] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenOperator,] = useState(new Fullscreen(setFullscreen));
  const [loadCodes, setLoadCodes] = useState(true);
  const codeEditorRef = useRef(null);

  useEffect(() => { setCurrentFile(props.file); }, [props.file]);

  useEffect(() => {
    if (fullscreen) { fullscreenOperator.open(codeEditorRef.current, setFullscreen); }
    else { fullscreenOperator.close(codeEditorRef.current); }
  }, [fullscreenOperator, fullscreen]);

  const getCodesCallback = useCallback(getCodes, [getCodes]);

  /**
   * Método responsável pela obtenção dos arquivos de código a partir dos metadados recebidos.
   * 
   * @returns 
   */
  function getCodes() {
    if (isThereAnyCodeToRetrieve()) { loadCodesFromOrigin(); }
    else { updateCodes(currentFile.codes); }

    setLoadCodes(false);
  }

  function loadCodesFromOrigin() {
    setPromiseInPromises({ uid: currentFile.uid, loading: true });

    retrieveCodesFromOrigin();
  }

  /**
   * Método responsável pela requisição dos arquivos informados ao repositório ou recuperação
   * em memória primária quando previamente carregados.
   * 
   * @returns {Promise}
   */
  function retrieveCodesFromOrigin() {
    Promise.all(currentFile.codes.map(getCodeFromOrigin))
      .then(updateCodesFromOrigin)
      .catch();
  }

  function updateCodesFromOrigin(codes) {
    updateCodes(codes);
    setPromiseInPromises({ uid: currentFile.uid, loading: false });
  }

  /**
   * Método responsável pela atualização dos arquivos assim como arquivo atual.
   * 
   * @param {array} codes 
   */
  function updateCodes(codes) {
    const newCurrentCode = Util.getCurrentItem(codes);

    setCodes(codes);
    setCurrentCode(newCurrentCode);

    Util.handle(props.setFile, { ...currentFile, codes });

    updateOutputContent();
  }

  /**
   * Método responsável pela obtenção de código em origem quando conteúdo não 
   * estiver previamente carregado (quando edição desabilitada, o conteúdo é 
   * carregado vazio).
   * 
   * @param {object} code 
   * @returns {object}
   */
  function getCodeFromOrigin(code) {
    return code.content ? code : retrieveCodeFromOrigin(code);
  }

  function retrieveCodeFromOrigin(code) {
    return new Promise((resolve, reject) => {
      calloutCode(code)
        .then(result => resolve(new Code({ ...code, content: result })))
        .catch(error => reject(error))
    });
  }

  function calloutCode(code) {
    return callouts.repo.getCode(code.path, config.language, config.languages[config.language].extension);
  }

  /**
   * Método responsável pela atualização do arquivo atual em conjunto de arquivos.
   * 
   * @param {object} code 
   */
  function updateCurrentCode(code) {
    Util.updateItemIn(codes, setCodes)(code);

    updateCodes(codes);
  }

  function isThereAnyCodeToRetrieve() {
    return currentFile.codes.find(code => !code.content);
  }

  /**
   * Hook responsável pela requisição dos arquivos em repositório ou obtenção em memória
   * quando previamente carregados, configurando arquivo principal.
   */
  useEffect(() => {
    if (!loadCodes) { return; }
    if (!currentFile) { return; }
    if (currentCode) { return; }

    getCodesCallback();
  }, [currentFile, currentCode, loadCodes, getCodesCallback]);

  /**
   * Método responsável por configurar saída e comandos de acordo com resultado em exercício
   * obtido.
   * 
   * @param {object} file 
   */
  function updateResult(file) {
    currentFile.result = file.result;
    currentFile.output = getOutput(file.result);
    currentFile.commands = getCommands(file.result);

    updateOutputContent();

    Util.handle(props.updateResult, currentFile.output);
    Util.handle(props.setFile, { ...currentFile });

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
    if (!currentFile.output?.length) { return []; }

    return currentFile.output.map(item => [getItem('output', item), getRightArrow('output')]);
  }

  function getItem(content, item) {
    return createElement('p', { key: `${currentFile.uid}_${content}_${currentFile[content].length}` }, item);
  }

  function getRightArrow(content) {
    return createElement(Right, {
      key: `${currentFile?.uid ?? ''}_right-${content}_${currentFile?.[content]?.length ?? ''}`,
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
    if (!result || result.error) { return currentFile.commands; }
    if (!result.output) { return currentFile.commands; }

    const justCommands = getJustCommandsFromResult(result);

    return getFilteredCommands(justCommands);
  }

  function getFilteredCommands(justCommands) {
    if (!justCommands?.length) { return []; }

    // Os comandos são, por padrão, postos após o divisor (/).
    return justCommands.map(justCommand => JSON.parse(justCommand.split('/')[1]));
  }

  function getJustCommandsFromResult(result) {
    // A expressão regular considera apenas saídas que iniciem por [UID].
    return result.output.split('\n')?.filter(line => line.match(new RegExp(`${Util.getURLLastPathname()}.*`, 'g')));
  }

  /**
   * Método responsável por atualizar a saída do editor de código a partir do resultado 
   * obtido.
   * 
   * @param {object} result 
   * @returns {array}
   */
  function getOutput(result) {
    if (!result) { return currentFile.output; }

    if (result.error) { currentFile.output.push(result.error); }
    else if (result.output) { currentFile.output.push(result.output.replaceAll(new RegExp(`${Util.getURLLastPathname()}.*\n`, 'g'), '')); }

    return currentFile.output;
  }

  function getClassName() {
    return `tcc-code-editor ${fullscreen ? 'tcc-code-editor--fullscreen' : ''} ${!currentFile?.codes?.length ? 'tcc-skeleton' : ''}`;
  }

  return (
    <CodeEditorRefContext.Provider value={codeEditorRef}>
      <FileContext.Provider value={[currentFile, updateResult]}>
        <CodesContext.Provider value={[codes, updateCodes]}>
          <CodeContext.Provider value={[currentCode, updateCurrentCode]}>
            <OutputContext.Provider value={[output, setOutput]}>
              <InputContext.Provider value={[input, setInput]}>
                <FullscreenContext.Provider value={[fullscreen, setFullscreen]}>
                  <RenderContext.Provider value={[render, setRender]}>
                    <div className="tcc-code-editor__container">
                      <div className={getClassName()} ref={codeEditorRef}>
                        {currentFile?.codes?.length ? props.children : null}
                      </div>
                    </div>
                  </RenderContext.Provider>
                </FullscreenContext.Provider>
              </InputContext.Provider>
            </OutputContext.Provider>
          </CodeContext.Provider>
        </CodesContext.Provider >
      </FileContext.Provider>
    </CodeEditorRefContext.Provider>
  );
}

export default CodeEditor;