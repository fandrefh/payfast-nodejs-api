"use strict";

module.exports = function(app) {
  app.get("/pagamentos", function(request, response) {
    response.send("OK");
  });

  app.post("/pagamentos/pagamento", function(request, response) {
    let pagamento = request.body;

    pagamento.status = 'CRIADO';
    pagamento.data = new Date();

    console.log("Processando uma requisição de novo pagamento.");

    let connection = app.persistencia.connectionFactory();
    let dao = new app.persistencia.PagamentoDao(connection);

    dao.salva(pagamento, function(err, result) {
      console.log('Pagamento criado.');;
      response.json(pagamento);
    });

  });
}
