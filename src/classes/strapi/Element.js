/**
 * @file Módulo responsável pela normalização do objeto Element retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Exercise from './Exercise.js';
import Snippet from './Snippet.js';

export default class Element {
  constructor(element) {
    this.id = element?.id ?? null;
    this.type = element?.attributes?.type ?? element?.type ?? null;
    this.value = element?.attributes?.value ?? element?.value ?? null;
    this.createdAt = element?.attributes?.createdAt ?? element?.createdAt ?? null;
    this.updatedAt = element?.attributes?.updatedAt ?? element?.updatedAt ?? null;
    this.publishedAt = element?.attributes?.publishedAt ?? element?.publishedAt ?? null;
    this.displayAnimationScreen = element?.attributes?.displayAnimationScreen ?? element?.displayAnimationScreen ?? false;
    this.uid = element?.attributes?.uid ?? element?.uid ?? null;
    this.elements = this._getElements(element?.attributes?.elements?.data ?? element?.elements);
    this.exercises = this._getExercises(element?.attributes?.exercises?.data ?? element?.exercises);
    this.snippet = element?.attributes?.snippet?.data ? new Snippet(element.attributes.snippet.data)
      : element?.snippet ? new Snippet(element.snippet)
        : null;
  }

  _getExercises(exercises) {
    if (!exercises?.length) { return []; }

    return exercises.map(exercise => new Exercise(exercise));
  }

  _getElements(elements) {
    if (!elements?.length) { return []; }

    return elements.map(element => new Element(element));
  }
}