export default class File {
  constructor(file, code) {
    this.uuid = file?.uuid ?? null;
    this.name = file?.name ?? null;
    this.path = file?.path ?? null;
    this.current = file?.current ?? null;
    this.code = code;
  }
}