export default class File {
  constructor(file, code) {
    this.uuid = file?.uuid ?? null;
    this.name = file?.name ?? null;
    this.path = file?.path ?? null;
    this.alternativePath = file?.alternativePath ?? null;
    this.current = file?.current ?? null;
    this.order = file?.order ?? null;
    this.disabled = file?.disabled ?? null;
    this.code = code;
  }
}