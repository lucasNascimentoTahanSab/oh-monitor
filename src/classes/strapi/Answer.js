export default class Answer {
  constructor(answer) {
    this.id = answer?.id ?? null;
    this.statement = answer?.attributes?.statement ?? answer?.statement ?? null;
    this.createdAt = answer?.attributes?.createdAt ?? answer?.createdAt ?? null;
    this.updatedAt = answer?.attributes?.updatedAt ?? answer?.updatedAt ?? null;
    this.publishedAt = answer?.attributes?.publishedAt ?? answer?.publishedAt ?? null;
    this.uuid = answer?.attributes?.uuid ?? answer?.uuid ?? null;
    this.current = answer?.current ?? false;
  }
}