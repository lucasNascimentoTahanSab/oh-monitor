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
import TabContext from '../../Context/TabContext/TabContext.js';
import OutputContext from '../../Context/OutputContext/OutputContext.js';
import InputContext from '../../Context/InputContext/InputContext.js';
import RenderContext from '../../Context/RenderContext/RenderContext.js';
import CodeEditorRefContext from '../../Context/CodeEditorRefContext/CodeEditorRefContext';
import Code from '../../../classes/strapi/Code.js';
import Fullscreen from '../../../classes/util/Fullscreen.js';
import Util from '../../../classes/util/Util.js';
import callouts from '../../../classes/callouts/callout.js';
import config from '../../../config.json';

function CodeEditor(props) {
  const [currentTab, setCurrentTab] = useContext(TabContext);
  const [file, setFile] = useState(null);
  const [codes, setCodes] = useState([]);
  const [currentCode, setCurrentCode] = useState(null);
  const [output, setOutput] = useState([getRightArrow('output')]);
  const [input, setInput] = useState([getRightArrow('input')]);
  const [render, setRender] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const codeEditorRef = useRef(null);

  useEffect(() => { setFile(props.file); }, [props.file]);

  useEffect(() => {
    if (fullscreen) { Fullscreen.open(codeEditorRef.current); }
    else { Fullscreen.close(); }
  }, [fullscreen]);

  const getCodesCallback = useCallback(getCodes, [getCodes]);

  /**
   * Método responsável pela obtenção dos arquivos de código a partir dos metadados recebidos.
   * 
   * @returns 
   */
  async function getCodes() {
    if (!file?.codes?.length) { return; }
    if (codes.length) { return; }

    if (isThereAnyCodeToRetrieve()) {
      setCurrentTab({ ...currentTab, loading: true });

      updateCodes(await retrieveCodesFromRepo());

      setCurrentTab({ ...currentTab, loading: false });
    } else {
      updateCodes(await retrieveCodesFromRepo());
    }

    updateOutputContent();

    Util.handle(props.updateResult, file.output);
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

    Util.handle(props.setFile, { ...file, codes });
  }

  /**
   * Método responsável pela requisição dos arquivos informados ao repositório ou recuperação
   * em memória primária quando previamente carregados.
   * 
   * @returns {Promise}
   */
  async function retrieveCodesFromRepo() {
    return Promise.all(file.codes.map(getCode));
  }

  async function getCode(code) {
    return code.content ? code : new Code({ ...code, content: (await calloutCode(code))?.data });
  }

  async function calloutCode(code) {
    return await callouts.repo.getCode(code.path, config.language, config.languages[config.language].extension);
  }

  function isThereAnyCodeToRetrieve() {
    return file.codes.find(code => code.content === null);
  }

  /**
   * Hook responsável pela requisição dos arquivos em repositório ou obtenção em memória
   * quando previamente carregados, configurando arquivo principal.
   */
  useEffect(() => {
    if (!file) { return; }
    if (currentCode) { return; }
    if (currentTab.loading) { return; }

    getCodesCallback();
  }, [currentCode, file, currentTab, getCodesCallback]);

  /**
   * Método responsável por configurar saída e comandos de acordo com resultado em exercício
   * obtido.
   * 
   * @param {object} exercise 
   */
  function updateResult(exercise) {
    file.result = exercise.result;
    file.output = getOutput(exercise.result);
    file.commands = getCommands(exercise.result);

    updateOutputContent();

    Util.handle(props.updateResult, file.output);
    Util.handle(props.setFile, { ...file });

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
    if (!file.output) { return []; }

    return file.output.map(item => [getItem('output', item), getRightArrow('output')]);
  }

  function getItem(content, item) {
    return createElement('p', { key: `${file.uid}_${content}_${file[content].length}` }, item);
  }

  function getRightArrow(content) {
    return createElement(Right, {
      key: `${file?.uid ?? ''}_right-${content}_${file?.[content]?.length ?? ''}`,
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
    if (!result || result.error) { return file.commands; }
    if (!result.output) { return file.commands; }

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
    if (!result) { return file.output; }

    if (result.error) { file.output.push(result.error); }
    else { file.output.push(result.output.replaceAll(/35a7bfa2-e0aa-11ed-b5ea-0242ac120002.*\n/g, '')); }

    return file.output;
  }

  return (
    <CodeEditorRefContext.Provider value={codeEditorRef}>
      <CodesContext.Provider value={[codes, updateCodes]}>
        <CodeContext.Provider value={[currentCode, updateResult]}>
          <OutputContext.Provider value={[output, setOutput]}>
            <InputContext.Provider value={[input, setInput]}>
              <FullscreenContext.Provider value={[fullscreen, setFullscreen]}>
                <RenderContext.Provider value={[render, setRender]}>
                  <div className='code-editor' ref={codeEditorRef}>
                    {props.children}
                  </div>
                </RenderContext.Provider>
              </FullscreenContext.Provider>
            </InputContext.Provider>
          </OutputContext.Provider>
        </CodeContext.Provider>
      </CodesContext.Provider >
    </CodeEditorRefContext.Provider>
  );
}

export default CodeEditor;