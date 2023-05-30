/**
 * @file Módulo responsável por verificar validade do token do usuário, redirecionando-o para a
 * tela de login caso inválido.
 * @copyright Lucas N. T. Sab 2023
 */
const ST_AUTH = {
  validate(req, res, next) {
    if (!req.session.token) { return res.redirect('/signin'); }

    next();
  }
};

module.exports = ST_AUTH;