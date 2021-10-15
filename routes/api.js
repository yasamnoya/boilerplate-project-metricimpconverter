'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    const initNum = convertHandler.getNum(req.query.input)
    const initUnit = convertHandler.getUnit(req.query.input)
    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const resBody = convertHandler.getResBody(initNum, initUnit, returnNum, returnUnit)
    if (!resBody.string) {
      res.status(400)
    }
    res.json(resBody);
  });
};
