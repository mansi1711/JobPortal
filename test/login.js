const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
require("dotenv").config();

chai.use(chaiHttp);

const app = require('../app.js');

describe('Login', () => {
    it('Login form should load', () => {
        return chai.request(app)
            .get('/login')
            .end((error, response) => {
                if (error) done(error);

                expect(response).to.have.status(200);
            })
    });
    it('Login should be performed', () => {
        return chai.request(app)
            .post('/login/user')
            .send({
                username: 'Mansi',
                password: 'manu123'
            })
            .then(response => {
                // Now let's check our response
                expect(response).to.have.status(200);
            })
    });
});