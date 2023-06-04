/**
 * @file Módulo responsável pelo carregamento das guias do terminal em editor de
 * códigos.
 * @copyright Lucas N. T. Sab 2023
 */
export default class PromptMenuItem {
  constructor(item, file) {
    this.uid = this._getUid(item, file);
    this.name = item?.name ?? null;
    this.current = item?.current ?? false;
    this.allowOutput = item?.allowOutput ?? false;
    this.allowInput = item?.allowInput ?? false;
  }

  _getUid(item, file) {
    if (!item) { return null; }
    if (!file) { return null; }

    return `${item?.uid}-${file?.uid}`;
  }
}