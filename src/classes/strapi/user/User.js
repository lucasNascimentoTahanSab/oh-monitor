import UserSubject from "./UserSubject";

/**
 * @file Módulo responsável pela construção de usuário na plataforma.
 * @copyright Lucas N. T. Sab 2023
 */
export default class User {
  constructor(user) {
    this.id = user?.id ?? null;
    this.username = user?.username ?? null;
    this.email = user?.email ?? null;
    this.provider = user?.provider ?? null;
    this.confirmed = user?.confirmed ?? null;
    this.blocked = user?.blocked ?? null;
    this.createdAt = user?.createdAt ?? null;
    this.updatedAt = user?.updatedAt ?? null;
    this.screen = user?.screen ?? null;
    this.state = user?.state ? new Map(user.state) : new Map();
  }

  /**
   * Método responsável pela atualização do estado do usuário a partir das informações
   * do assunto tratado em sala de aula recebidas.
   * 
   * @param {object} subject 
   */
  updateState(subject) {
    if (!subject) { return; }

    if (this.state.has(subject?.uid)) { this._updateStateWithState(subject); }
    else { this._updateStateWithoutState(subject); }
  }

  _updateStateWithoutState(subject) {
    this.state.set(subject.uid, new UserSubject(subject));
  }

  _updateStateWithState(subject) {
    const state = this.state.get(subject.uid);

    this.state.set(subject.uid, new UserSubject(subject, state));
  }
}