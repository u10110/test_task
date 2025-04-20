const request = require('supertest');

const app = require('../dist/src/app').app;


const responseValidation = function(res) {
    return res.body.message === "Index";
};


it('/ should return Index', function (done) {
    request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(responseValidation)
        .end(done);
});