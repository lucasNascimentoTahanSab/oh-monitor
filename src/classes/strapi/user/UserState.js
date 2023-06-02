/**
 * @file Módulo responsável por registrar estado do usuário de acordo com interações
 * com exercícios e code snippets na plataforma.
 * @copyright Lucas N. T. Sab 2023
 */
export default class UserState {
  constructor(state) {
    this.exercises = state?.exercises ? new Map(state.exercises) : new Map();
    this.snippets = state?.snippets ? new Map(state.snippets) : new Map();
  }
}