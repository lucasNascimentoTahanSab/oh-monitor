/**
 * @file Módulo responsável pela normalização do objeto Code retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Code {
  constructor(code) {
    this.id = code?.id ?? null;
    this.uid = code?.attributes?.uid ?? code?.uid ?? null;
    this.name = code?.attributes?.name ?? code?.name ?? null;
    this.path = code?.attributes?.path ?? code?.path ?? null;
    this.current = code?.attributes?.current ?? code?.current ?? false;
    this.createdAt = code?.attributes?.createdAt ?? code?.createdAt ?? null;
    this.updatedAt = code?.attributes?.updatedAt ?? code?.updatedAt ?? null;
    this.publishedAt = code?.attributes?.publishedAt ?? code?.publishedAt ?? null;
    this.order = code?.attributes?.order ?? code?.order ?? null;
    this.disabled = code?.attributes?.disabled ?? code?.disabled ?? false;
    this.alternativePath = code?.attributes?.alternativePath ?? code?.alternativePath ?? null;
    this.content = code?.content ?? null;
  }
}