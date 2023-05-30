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
    this.state = user?.state ?? null;
    this.screen = user?.screen ?? null;
  }
}