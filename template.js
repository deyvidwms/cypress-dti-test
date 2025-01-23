describe("<dê uma nome qualquer a esse agrupamento>", () => {
    // Todo describe deve ter um beforeEach exatamente
    // como o que está abaixo. A falta desse trecho de
    // código vai acarretar nota zero no processo de
    // correção automática.
    beforeEach(() => {
        let host = Cypress.env("TEST_HOST") || 'https://todomvc.com/examples/angular/dist/browser/#/all';
        cy.visit(host);
    });

    // abaixo você pode criar os testes que desejar
    // para testar a aplicação em questão.
    it("<dê um nome para esse teste>", () => {
        // O código do teste vai aqui.
        console.log('opa')
    });
});