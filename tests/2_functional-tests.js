const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('should convert a valid input', () => {
        chai.request(server).get('/api/convert?input=10L').end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.equal(res.body.returnNum, 2.64172);
            assert.equal(res.body.returnUnit, 'gal');
            assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
        })
    })

    test('should convert with no number', () => {
        chai.request(server).get('/api/convert?input=kg').end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'kg');
            assert.equal(res.body.returnNum, 2.20462);
            assert.equal(res.body.returnUnit, 'lbs');
            assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
        })
    })

    test('should retrun 400 if input unit is invalid', () => {
        chai.request(server).get('/api/convert?input=30g', (err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body, 'invalid  unit')
        })
    })

    test('should retrun 400 if input number is invalid', () => {
        chai.request(server).get('/api/convert?input=30/3/3L', (err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body, 'invalid number')
        })
    })

    test('should retrun 400 if input number and unit are invalid', () => {
        chai.request(server).get('/api/convert?input=30/3/3kilogram', (err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body, 'invalid number and unit')
        })
    })


});
