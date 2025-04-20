const request = require('supertest');

const app = require('../dist/src/app').app;


const tokenValidation = function(res) {
    return !!res.body.token;
};


it('/api/login should return Token or 401', function (done) {
    request(app)
        .get('/api/login/')
        .query({ username: "admin", password: "password"})
        .expect(200)
        .expect(tokenValidation)
        .end(done);
});