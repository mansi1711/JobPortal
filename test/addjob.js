const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
require("dotenv").config();

chai.use(chaiHttp);

const app = require('../app.js');

describe('Add Job', () => {
    it('Add job form should load', () => {
        return chai.request(app)
            .get('/addjob')
            .end((error, response) => {
                if (error) done(error);

                expect(response).to.have.status(200);
            })
    });
    it('Add job should be performed', () => {
        return chai.request(app)
            .post('/addjob/new')
            .send({
                project_name: 'Pname',
                client_name: 'Cname',
                technologies: 'tech',
                role: 'role',
                job_description: 'jobdesc',
                status: 'open'
            })
            .then(response => {
                // Now let's check our response
                expect(response).to.have.status(200);
            })
    });
});