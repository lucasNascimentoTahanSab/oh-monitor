/**
 * @file Módulo responsável por disponibilizar estaticamente métodos utilitários
 * para a aplicação.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Util {
  /**
   * Método responsável por igualar atributos do objeto de destino com o objeto de
   * origem.
   * 
   * @param {object} origin 
   * @param {object} destiny 
   * @returns {object}
   */
  static matchObjects(origin, destiny) {
    if (typeof origin !== 'object') { return; }
    if (typeof destiny !== 'object') { return; }

    Array.from(Object.keys(origin)).forEach(key => destiny[key] = origin[key]);

    return destiny;
  }

  /**
   * Método responsável pela transformação de um número em letra (UTF-8), iniciando 
   * por 'A'.
   * 
   * @param {number} index 
   * @returns {string}
   */
  static getLetterByIndex(index) {
    if (typeof index !== 'number') { return String.fromCharCode(65); }

    return String.fromCharCode(index + 65);
  }

  /**
   * Método responsável pela obtenção do item atualmente selecionado dentre os itens
   * recebidos.
   * 
   * @param {array} items 
   * @returns {object}
   */
  static getCurrentItem(items) {
    if (!items?.length) { return null; }

    return items.find(item => item.current);
  }

  /**
   * Método responsável pela obtenção de um item, dados os itens recebidos, a partir
   * de um uuid correspondente.
   * 
   * @param {array} items 
   * @param {string} uuid 
   * @returns {object}
   */
  static getItemByUuid(items, uuid) {
    if (!items?.length) { return null; }

    return items.find(item => item.uuid === uuid);
  }

  /**
   * Método responsável pela obtenção da posição de um determinado item, dados os itens
   * recebidos, a partir de um uuid correspondente.
   * 
   * @param {array} items 
   * @param {string} uuid 
   * @returns {array}
   */
  static getItemIndexByUuid(items, uuid) {
    if (!items?.length) { return null; }

    return items.map(item => item.uuid).indexOf(uuid);
  }

  /**
   * Método responsável pela execução de um método repassando seus parâmetros.
   * 
   * @param {function} method 
   * @param  {...any} params 
   * @returns 
   */
  static handle(method, ...params) {
    if (typeof method !== 'function') { return; }

    method(...params);
  }

  /**
   * Método responsável pela seleção de um item dentre outros recebidos.
   * 
   * @param {array} items 
   * @param {function} setItems 
   * @returns {function}
   */
  static setCurrentItem(items, setItems) {
    if (typeof setItems !== 'function') { return function () { }; }
    if (!items?.length) { return function () { }; }

    return function (uuid) {
      unselectCurrentItem();
      selectItemByUuid(uuid);
      setItems(items);

      function selectItemByUuid(uuid) {
        const newItem = Util.getItemByUuid(items, uuid);

        if (newItem) { newItem.current = true; }
      }

      function unselectCurrentItem() {
        const currentItem = Util.getCurrentItem(items);

        if (currentItem) { currentItem.current = false; }
      }
    }
  }

  /**
   * Método responsável pela seleção de um item num mapa recebido.
   * 
   * @param {Map} items 
   * @param {function} setItems 
   * @returns {function}
   */
  static setCurrentItemInMap(items, setItems) {
    if (typeof setItems !== 'function') { return function () { }; }
    if (!items?.size) { return function () { }; }

    return function (uuid) {
      unselectCurrentItem();
      selectItemByUuid(uuid);
      setItems(items);

      function selectItemByUuid(uuid) {
        const newItem = items.get(uuid);

        if (newItem) { newItem.current = true; }
      }

      function unselectCurrentItem() {
        const currentItem = Util.getCurrentItem(Array.from(items.values()));

        if (currentItem) { currentItem.current = false; }
      }
    }
  }

  /**
   * Método responsável pela atualização de um item dentro de um conjunto de outros itens
   * recebidos.
   * 
   * @param {array} items 
   * @param {function} setItems 
   * @returns {function}
   */
  static updateItemIn(items, setItems) {
    if (typeof setItems !== 'function') { return function () { }; }
    if (!items?.length) { return function () { }; }

    return function (item) {
      if (typeof item !== 'object') { return; }

      Util.matchObjects(item, Util.getItemByUuid(items, item.uuid));

      setItems(items);
    }
  }

  /**
   * Método responsável pela atualização de um item dentro de um mapa de outros itens
   * recebidos.
   * 
   * @param {Map} items 
   * @param {function} setItems 
   * @returns {function}
   */
  static updateItemInMap(items, setItems) {
    if (typeof setItems !== 'function') { return function () { }; }
    if (!items?.size) { return function () { }; }

    return function (item) {
      if (typeof item !== 'object') { return; }

      Util.matchObjects(item, items.get(item.uuid));

      setItems(items);
    }
  }

  /**
   * Método responsável por alternar o valor de open no item de uuid recebido.
   * 
   * @param {array} items 
   * @param {function} setItems 
   * @returns {function}
   */
  static toggleOpen(items, setItems) {
    if (typeof setItems !== 'function') { return function () { }; }
    if (!items?.length) { return function () { }; }

    return function (uuid) {
      openItemByUuid(uuid);
      setItems(items);

      function openItemByUuid(uuid) {
        const item = Util.getItemByUuid(items, uuid);

        if (item) { item.open = !item.open; }
      }
    }
  }

  /**
   * Método responsável pela atualização do código em arquivo dentre os arquivos
   * recebidos.
   * 
   * @param {Map} files 
   * @param {function} setFiles 
   * @returns {function}
   */
  static updateFileIn(files, setFiles) {
    if (typeof setFiles !== 'function') { return function () { }; }
    if (!files?.size) { return function () { }; }

    return function (uuid, content) {
      updateFileContent(uuid, content);
      setFiles(files);

      function updateFileContent(uuid, content) {
        const file = files.get(uuid);

        if (file) { file.content = content; }
      }
    }
  }
}