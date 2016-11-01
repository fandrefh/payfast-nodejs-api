"use strict";

module.exports = function(app) {
  app.get("/pagamentos", function(request, response) {
    response.send("OK");
  });

  app.post("/pagamentos/pagamento", function(request, response) {
    let pagamento = request.body;
    console.log(pagamento);
    response.send('OK');
  });
}
