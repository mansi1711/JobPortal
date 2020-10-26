const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
require("dotenv").config();

chai.use(chaiHttp);

const app = require('../app.js');

describe('Home', () => {
    describe('Load Home Screen', () => {
        it('Returns a 200 response', () => {
            return chai.request(app)
                .get('/')
                .end((error, response) => {
                    if (error) done(error);

                    expect(response).to.have.status(200);
                    done();
                })
        });
    });
});