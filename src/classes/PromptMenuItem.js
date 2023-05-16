export default class PromptMenuItem {
  constructor(item) {
    this.uuid = item?.uuid ?? null;
    this.name = item?.name ?? null;
    this.current = item?.current ?? false;
    this.allowOutput = item?.allowOutput ?? false;
    this.allowInput = item?.allowInput ?? false;
  }
}