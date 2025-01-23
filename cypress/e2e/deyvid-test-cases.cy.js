describe('template spec', () => {
  beforeEach(() => {
    // define the host
    let host = Cypress.env("TEST_HOST") || 'https://toronto.imd.ufrn.br/portal/login';
    cy.visit(host);

    // login in the system
    const credentials = {
      username: 'testedeyvid',
      password: 'testedeyvid',
    }

    cy.get('#login-username').type(credentials.username, { force: true })
    cy.get('#login-password').type(credentials.password, { force: true })

    cy.get('.btn.btn-primary').should('have.value', 'Logar').click({ force: true })
  });

  // first test case
  it('accessing the notice register page and registering an notice to check if is success', () => {
    const forceTrue = { force: true };

    cy.get('.main-menu > #side-main-menu > li:nth-child(2) > a').click(forceTrue)
    cy.get('a.btn.btn-primary[href="/portal/noticias-adm/form"]').click(forceTrue)

    cy.get('#publicarImd1').check(forceTrue);
    cy.get('#release2').check(forceTrue);
    cy.get('#imagemcapa').type('https://dominio.com/image.png', forceTrue);
    cy.get('#titulo').type('Test Title', forceTrue);
    cy.get('#inputSubTitulo').type('Test Subtitle', forceTrue);
    cy.get('iframe#input_ifr').then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).type('Test content', forceTrue);
    });
    cy.get('#resumo').type('Test summary', forceTrue);
    cy.get('#rotulosSelect').select(['110', '15'], forceTrue);
    cy.get('#selectCategoria').select('5', forceTrue);

    cy.get('.form-horizontal').then(($el) => {
      expect($el[0].checkValidity()).to.have.true;
    });

    cy.get('button[name="salvar"]').click(forceTrue);

    cy.url().should('include', '/portal/noticias-adm');
    cy.get('.sweet-alert.showSweetAlert').should('be.visible');
  });

  // second test case
  it('accessing the notice register page and registering an notice without "categoriaParque1"', () => {
    const forceTrue = { force: true };

    cy.get('.main-menu > #side-main-menu > li:nth-child(2) > a').click(forceTrue)
    cy.get('a.btn.btn-primary[href="/portal/noticias-adm/form"]').click(forceTrue)

    cy.get('#publicarImd1').check(forceTrue);
    cy.get('#publicarParque1').check(forceTrue);
    cy.get('#release2').check(forceTrue);
    cy.get('#imagemcapa').type('https://dominio.com/image.png', forceTrue);
    // preenchendo campo com espaco branco
    cy.get('#titulo').type(' ', forceTrue).then(($el) => {
      expect($el[0].checkValidity()).to.have.false;
    });
    cy.get('#inputSubTitulo').type(' ', forceTrue).then(($el) => {
      expect($el[0].checkValidity()).to.have.true;
    });
    cy.get('iframe#input_ifr').then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).type('Test content', forceTrue);
    });
    // preenchendo campo com espaco em branco
    cy.get('#resumo').type(' ', forceTrue).then(($el) => {
      expect($el[0].checkValidity()).to.have.false;
    });
    cy.get('#rotulosSelect').select(['110', '15'], forceTrue);
    cy.get('#selectCategoria').select('5', forceTrue);

    cy.get('.form-horizontal').then(($el) => {
      expect($el[0].checkValidity()).to.have.false;
    });
  });
})