/**
 * @file Módulo responsável pela normalização do objeto Choice retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Choice {
  constructor(answer) {
    this.id = answer?.id ?? null;
    this.statement = answer?.attributes?.statement ?? answer?.statement ?? null;
    this.createdAt = answer?.attributes?.createdAt ?? answer?.createdAt ?? null;
    this.updatedAt = answer?.attributes?.updatedAt ?? answer?.updatedAt ?? null;
    this.publishedAt = answer?.attributes?.publishedAt ?? answer?.publishedAt ?? null;
    this.uid = answer?.attributes?.uid ?? answer?.uid ?? null;
    this.current = answer?.current ?? false;
    this.correct = answer?.correct ?? false;
    this.wrong = answer?.wrong ?? false;
  }
}