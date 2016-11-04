"use strict";

module.exports = function(app) {
  app.get("/pagamentos", function(request, response) {
    response.send("OK");
  });

  app.post("/pagamentos/pagamento", function(request, response) {

    request.assert('forma_pagamento', 'Este campo é obrigatório.').notEmpty();
    request.assert('valor', 'Este campo é obrigatório e precisa ser um decimal.').notEmpty().isFloat();

    let erros = request.validationErrors();
    if (erros) {
      console.log("Erros de validação.");
      response.status(400).send(erros);
      return;
    }

    let pagamento = request.body;

    pagamento.status = 'CRIADO';
    pagamento.data = new Date();

    console.log("Processando uma requisição de novo pagamento.");

    let connection = app.persistencia.connectionFactory();
    let dao = new app.persistencia.PagamentoDao(connection);

    dao.salva(pagamento, function(err, result) {
      if (err) {
        console.log('Erro ao inserir registro no banco: ' + err);
        response.status(400).send(err);
      } else {
        console.log('Pagamento criado.');
        response.json(pagamento);
      }
    });

  });
}
