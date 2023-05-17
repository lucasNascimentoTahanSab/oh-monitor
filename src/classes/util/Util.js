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
   * Método responsável pela obtenção do item atualmente correto dentre os itens
   * recebidos.
   * 
   * @param {array} items 
   * @returns {object}
   */
  static getCorrectItem(items) {
    if (!items?.length) { return null; }

    return items.find(item => item.correct);
  }

  /**
   * Método responsável pela obtenção do item atualmente incorreto dentre os itens
   * recebidos.
   * 
   * @param {array} items 
   * @returns {object}
   */
  static getWrongItem(items) {
    if (!items?.length) { return null; }

    return items.find(item => item.wrong);
  }

  /**
   * Método responsável pela obtenção de um item, dados os itens recebidos, a partir
   * de um uid correspondente.
   * 
   * @param {array} items 
   * @param {string} uid 
   * @returns {object}
   */
  static getItemByUid(items, uid) {
    if (!items?.length) { return null; }

    return items.find(item => item.uid === uid);
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
   * Método responsável pela seleção de um item dentre outros recebidos,
   * desmarcando os demais (selecionados, certos ou errados).
   * 
   * @param {array} items 
   * @param {function} setItems 
   * @returns {function}
   */
  static setCurrentItem(items, setItems) {
    if (typeof setItems !== 'function') { return function () { }; }
    if (!items?.length) { return function () { }; }

    return function (uid) {
      unselectCurrentItem();
      unselectWrongItem();
      unselectCorrectItem();
      selectItemByUid(uid);
      setItems([...items]);

      function selectItemByUid(uid) {
        const newItem = Util.getItemByUid(items, uid);

        if (newItem) { newItem.current = true; }
      }

      function unselectCorrectItem() {
        const currentItem = Util.getCorrectItem(items);

        if (currentItem) { currentItem.correct = false; }
      }

      function unselectWrongItem() {
        const currentItem = Util.getWrongItem(items);

        if (currentItem) { currentItem.wrong = false; }
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

    return function (uid) {
      unselectCurrentItem();
      selectItemByUid(uid);
      setItems(new Map(items));

      function selectItemByUid(uid) {
        const newItem = items.get(uid);

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

      Util.matchObjects(item, Util.getItemByUid(items, item.uid));

      setItems([...items]);
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

      Util.matchObjects(item, items.get(item.uid));

      setItems(new Map(items));
    }
  }

  /**
   * Método responsável por alternar o valor de open no item de uid recebido.
   * 
   * @param {array} items 
   * @param {function} setItems 
   * @returns {function}
   */
  static toggleOpen(items, setItems) {
    if (typeof setItems !== 'function') { return function () { }; }
    if (!items?.length) { return function () { }; }

    return function (uid) {
      openItemByUid(uid);
      setItems([...items]);

      function openItemByUid(uid) {
        const item = Util.getItemByUid(items, uid);

        if (item) { item.open = !item.open; }
      }
    }
  }

  /**
   * Método responsável pela atualização do código em arquivo dentre os arquivos
   * recebidos.
   * 
   * @param {Map} codes 
   * @param {function} setCodes 
   * @returns {function}
   */
  static updateCodeIn(codes, setCodes) {
    if (typeof setCodes !== 'function') { return function () { }; }
    if (!codes?.size) { return function () { }; }

    return function (uid, content) {
      updateFileContent(uid, content);
      setCodes(new Map(codes));

      function updateFileContent(uid, content) {
        const file = codes.get(uid);

        if (file) { file.content = content; }
      }
    }
  }

  /**
   * Método responsável pela obtenção do valor atual de um React state recbido.
   * 
   * @param {object} state 
   * @param {function} setState 
   * @returns {object}
   */
  static getCurrentStateValue(state, setState) {
    if (typeof setState !== 'function') { return null; }

    let stateValue = state;

    setState(state => {
      stateValue = state;

      return state;
    });

    return stateValue;
  }
}