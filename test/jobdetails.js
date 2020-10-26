const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
require("dotenv").config();

chai.use(chaiHttp);

const app = require('../app.js');

describe('Jobdetails', () => {
    it('Get job details', () => {
        return chai.request(app)
            .get('/jobdetails/employee')
            .end((error, response) => {
                if (error) done(error);

                expect(response).to.have.status(200);
            })
    });
});