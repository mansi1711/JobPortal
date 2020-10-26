const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
require("dotenv").config();

chai.use(chaiHttp);

const app = require('../app.js');

describe('Register', () => {
    it('Register form should load', () => {
        return chai.request(app)
            .get('/register')
            .end((error, response) => {
                if (error) done(error);

                expect(response).to.have.status(200);
            })
    });
    it('Registeration should be performed', () => {
        return chai.request(app)
            .post('/register/new')
            .send({
                username: 'Mansii',
                password: 'manu123',
                role: 'manager'
            })
            .then(response => {
                // Now let's check our response
                expect(response).to.have.status(200);
            })
    });
});