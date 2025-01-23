describe("template spec", () => {
  beforeEach(() => {
    // define the host
    let host =
      Cypress.env("TEST_HOST") || "https://toronto.imd.ufrn.br/portal/login";
    cy.visit(host);

    const credentials = {
      username: "deyvidwendyrh",
      password: "]GexN*50",
    };

    const forceTrue = { force: true };

    cy.get("#login-username").type(credentials.username, forceTrue);
    cy.get("#login-password").type(credentials.password, forceTrue);

    cy.get(".btn.btn-primary")
      .should("have.value", "Logar")
      .click(forceTrue);
  });

  // first test case
  it("deve realizar login e preencher o formulário com o primeiro conjunto de dados", () => {
    const forceTrue = { force: true };

    cy.get('a[href="/portal/processoSeletivo"]:nth-child(1)').click(forceTrue);
    cy.get('a.btn.btn-primary[href="/portal/processoSeletivo/form"]').click(forceTrue);

    cy.get("#codigo").type("001/2022 - Talento Metrópole");
    cy.get("#titulo").type("Processo Seletivo 2022");
    cy.get("#descricao").type("Descrição do processo seletivo.");
    cy.get("#dateInicio").type("2025-01-21");
    cy.get("#dateFim").type("2025-01-21");
    cy.get("#dateInicioInscricao").type("2025-01-21");
    cy.get("#dateFimInscricao").type("3000-01-21").then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
    });;
    cy.get("#selectTipoEdital").select("Talento Metrópole");
    cy.get("#valorBolsa").type("1000");
    cy.get("#numVagas").type("10");
    cy.get("#publicado").check();
    cy.get("#descricaoArquivo").type("Descrição do arquivo");
    cy.get("#novoArquivo").attachFile("arquivoAula.pdf");
  });

  // second test case
  it("deve realizar login e preencher o formulário com o segundo conjunto de dados", () => {
    const forceTrue = { force: true };

    cy.get('a[href="/portal/processoSeletivo"]:nth-child(1)').click(forceTrue);
    cy.get('a.btn.btn-primary[href="/portal/processoSeletivo/form"]').click(forceTrue);

    cy.get("#codigo").type("002/2023 - Inovação Metrópole");
    cy.get("#titulo").type("Processo Seletivo 2023");
    cy.get("#descricao").type("Outro processo seletivo para teste.");
    cy.get("#dateInicio").type("2025-02-01");
    cy.get("#dateFim").type("2025-02-15");
    cy.get("#dateInicioInscricao").type("2025-02-01");
    cy.get("#dateFimInscricao").type("2025-02-10");
    cy.get("#selectTipoEdital").select("Talento Metrópole");
    cy.get("#valorBolsa").type("1500");
    cy.get("#numVagas").type("5");
    cy.get("#publicado").check();
    cy.get("#descricaoArquivo").type("arquivo de teste");
    cy.get("#novoArquivo").attachFile("arquivoAula.pdf");

    cy.get("#submit").click();
    cy.get(".sweet-alert.showSweetAlert").should("be.visible");
  });
});