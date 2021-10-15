const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('should correctly read a whole number input', () => {
        const result = convertHandler.getNum('3kg');
        assert.equal(result, 3);
    })

    test('should correctly read a decimal number input', () => {
        const result = convertHandler.getNum('3.5kg');
        assert.equal(result, 3.5);
    })

    test('should correctly read a fractional input', () => {
        const result = convertHandler.getNum('7/2kg');
        assert.equal(result, 3.5);
    })

    test('should correctly read a fractional input', () => {
        const result = convertHandler.getNum('7.0/2kg');
        assert.equal(result, 3.5);
    })

    test('should correctly return an error on a double-fraction', () => {
        const result = convertHandler.getNum('7/2/2kg');
        assert.equal(result, 'invalid');
    })

    test('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
        const result = convertHandler.getNum('kg');
        assert.equal(result, 1);
    })

    test('should correctly read each valid input unit', () => {
        convertHandler.getUnit('kg');
        convertHandler.getUnit('lbs');
        convertHandler.getUnit('L');
        convertHandler.getUnit('gal');
        convertHandler.getUnit('km');
        convertHandler.getUnit('mi');
    })

    test('should correctly return an error for an invalid input unit', () => {
        const result = convertHandler.getUnit('invalid');
        assert.equal(result, 'invalid');
    })

    test('should return the correct return unit for each valid input unit', () => {
        const mapping = {
            'gal': 'L',
            'L': 'gal',
            'km': 'mi',
            'mi': 'km',
            'kg': 'lbs',
            'lbs': 'kg',
        };

        for (const [k, v] of Object.entries(mapping)) {
            const result = convertHandler.getReturnUnit(k)
            assert.equal(result, v);
        }
    })

    test('should correctly return the spelled-out string unit for each valid input', () => {
        const mapping = {
            'gal': 'gallons',
            'L': 'liters',
            'km': 'kilometers',
            'mi': 'miles',
            'kg': 'kilograms',
            'lbs': 'pounds',
        };

        for (const [k, v] of Object.entries(mapping)) {
            const result = convertHandler.spellOutUnit(k)
            assert.equal(result, v);
        }
    })

    test('should correctly convert gal to L', () => {
        const result = convertHandler.convert(1, 'gal')
        assert.equal(result, 3.78541)
    })

    test('should correctly convert lbs to Kg', () => {
        const result = convertHandler.convert(1, 'lbs')
        assert.equal(result, 0.45359)
    })

    test('should correctly convert mi to Km', () => {
        const result = convertHandler.convert(1, 'mi')
        assert.equal(result, 1.60934)
    })

    test('should correctly convert L to gal', () => {
        const result = convertHandler.convert(1, 'L')
        assert.equal(result, 0.26417)
    })

    test('should correctly convert Kg to lbs', () => {
        const result = convertHandler.convert(1, 'Kg')
        assert.equal(result, 2.20462)
    })

    test('should correctly convert Km to mi', () => {
        const result = convertHandler.convert(1, 'Km')
        assert.equal(result, 0.62137)
    })
});