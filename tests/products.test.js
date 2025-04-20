const request = require('supertest');
var should = require('should');

const app = require('../dist/src/app').app;

function loginUser(auth) {
    return function(done) {
        request(app)
            .get('/api/login/')
            .query({ username: "admin", password: "password"})
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}

describe('POST /api/products/create', function() {

    it('/api/products/create should require authorization', function(done) {
        request(app)
            .post('/api/products/create')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    var auth = {};
    before(loginUser(auth));

    it('should respond with Product', function(done) {
        const creatingProduct = { title: "AI bot", description: "Bot assistant", price: 100, count: 200}
        request(app)
            .post('/api/products/create')
            .send(creatingProduct)
            .set('authorization', auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.eqls(creatingProduct);
                done();
            });
    });

});
