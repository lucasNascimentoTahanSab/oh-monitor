/**
 * @file Módulo responsável pela normalização do objeto UserElement retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Element from '../Element.js';
import UserExercise from './UserExercise.js';
import UserSnippet from './UserSnippet.js';
import Util from '../../util/Util.js';

export default class UserElement extends Element {
  constructor(element, state) {
    super(element);

    this.elements = this._getUserElements(this.elements, state?.elements);
    this.exercises = this._getUserExercises(this.exercises, state?.exercises);
    this.snippet = this.snippet ? new UserSnippet(this.snippet, state?.snippet) : null;
  }

  _getUserExercises(exercises, state) {
    if (!exercises?.length) { return []; }

    return exercises.map(exercise => new UserExercise(exercise, Util.getItemByUid(state, exercise.uid)));
  }

  _getUserElements(elements, state) {
    if (!elements?.length) { return []; }

    return elements.map(element => new UserElement(element, Util.getItemByUid(state, element.uid)));
  }
}