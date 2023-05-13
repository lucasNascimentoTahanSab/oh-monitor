export default class Code {
  constructor(code) {
    this.id = code?.id ?? null;
    this.uuid = code?.attributes?.uuid ?? code?.uuid ?? null;
    this.name = code?.attributes?.name ?? code?.name ?? null;
    this.path = code?.attributes?.path ?? code?.path ?? null;
    this.current = code?.attributes?.current ?? code?.current ?? false;
    this.createdAt = code?.attributes?.createdAt ?? code?.createdAt ?? null;
    this.updatedAt = code?.attributes?.updatedAt ?? code?.updatedAt ?? null;
    this.publishedAt = code?.attributes?.publishedAt ?? code?.publishedAt ?? null;
    this.order = code?.attributes?.order ?? code?.order ?? null;
    this.disabled = code?.attributes?.disabled ?? code?.disabled ?? false;
    this.alternativePath = code?.attributes?.alternativePath ?? code?.alternativePath ?? null;
  }
}