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
        const creatingProduct = {
            title: "AI bot",
            description: "Bot assistant",
            price: 80,
            count: 200,
            currency: 1
        }
        request(app)
            .post('/api/products/create')
            .send(creatingProduct)
            .set('authorization', auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                const {id, ...created} = res.body
                created.should.be.eqls(creatingProduct);
                done();
            });
    });

});


describe('GET /api/products', function() {

    it('/api/products should require authorization', function(done) {
        request(app)
            .post('/api/products')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    var auth = {};
    before(loginUser(auth));

    it('should respond with array Product', function(done) {
        const ProductAttrs = [
            "id",
            "title",
            "description",
            "price",
            "count",
            "currency"
        ]
        request(app)
            .get('/api/products')
            .query({ searchText: "bot", priceFrom: 40, priceTo: 210 })
            .set('authorization', auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.find(product => {
                    return !Object.keys(product).should.be.eqls(ProductAttrs)
                })
                done();
            });
    });

});

describe('POST /api/products/{id}', function() {

    var auth = {};
    before(loginUser(auth));


    var productId = 0

    it('should find any Product', function(done) {

        request(app)
            .get('/api/products')
            .query({ searchText: "bot", priceFrom: 90, priceTo: 210 })
            .set('authorization', auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.find(product => {
                    return productId = product.id
                })

                done();
            });
    });


    it('should update and find  updated Product', function(done) {
        const updatedProduct = {
            id: productId,
            title: "AI bot updated",
            description: "Bot assistant updated",
            price: 300,
            count: 100,
            currency: 1
        }

        request(app)
            .post('/api/products/' + productId)
            .send(updatedProduct)
            .set('authorization', auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.eqls(updatedProduct);
                done();
            });
    });



});

describe('GET /api/products/{id}', function() {

    var auth = {};
    before(loginUser(auth));


    var foundedProduct = {}

    it('should find any Product', function(done) {

        request(app)
            .get('/api/products')
            .query({ searchText: "bot", priceFrom: 90, priceTo: 210 })
            .set('authorization', auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.find(product => {
                    return foundedProduct = product
                })
                done();
            });
    });


    it('should get Product by Id', function(done) {
        request(app)
            .get('/api/products/' + foundedProduct.id)
            .set('authorization', auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);

                res.body.should.be.eqls(foundedProduct);
                done();
            });
    });

});


describe('GET /api/products/delete/{id}', function() {

    var auth = {};
    before(loginUser(auth));


    var foundedProduct = {}

    it('should find any Product', function(done) {

        request(app)
            .get('/api/products')
            .query({ searchText: "bot", priceFrom: 90, priceTo: 210 })
            .set('authorization', auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.find(product => {
                    return foundedProduct = product
                })

                done();
            });
    });


    it('should delete Product by Id', function(done) {

        request(app)
            .get('/api/products/delete/' + foundedProduct.id)
            .set('authorization', auth.token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });


    it('should get 404 response', function(done) {

        request(app)
            .get('/api/products/' + foundedProduct.id)
            .set('authorization', auth.token)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });

    });

});