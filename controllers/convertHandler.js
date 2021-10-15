function ConvertHandler() {

  this.getFirstCharacterIndex = function(input) {
    for(let i = 0; i < input.length; i++) {
      if (input[i].match(/[A-Za-z]/)) {
        return i
      }
    }
    return -1
  }
  
  this.stringToNum = function(string) {

    if (string.includes("/")) {
      if (string.match(/\//g).length == 1){
        const [num, deno] = string.split("/")
        return parseFloat(num)/parseFloat(deno)
      }
      else return "invalid"
    }
    else return parseFloat(string)
  }

  this.getNum = function(input) {
    const FirstCharacterIndex = this.getFirstCharacterIndex(input)
    if (FirstCharacterIndex == -1) return "invalid"
    else if (FirstCharacterIndex == 0) return 1 
    
    const stringNum = input.substr(0, FirstCharacterIndex)
    return this.stringToNum(stringNum)
  };
  
  this.getUnit = function(input) {
    let result;
    const re = /[A-Za-z]+/
    result = input.match(re)[0]
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit.toLowerCase()) {
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      case "mi":
        return "km";
      case "km":
        return "mi";
      default:
        return "invalid";
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit.toLowerCase()) {
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      default:
        return "invalid";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let returnNum
    switch (initUnit.toLowerCase()) {
      case "gal":
        returnNum = initNum * galToL;
        break;
      case "l":
        returnNum = initNum / galToL;
        break;
      case "lbs":
        returnNum = initNum * lbsToKg;
        break;
      case "kg":
        returnNum = initNum / lbsToKg;
        break;
      case "mi":
        returnNum = initNum * miToKm;
        break;
      case "km":
        returnNum = initNum / miToKm;
        break;
      default:
        return "invalid unit";
    }
    return returnNum.toFixed(5)
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initSpelledOutUnit = this.spellOutUnit(initUnit)
    const returnSpelledOutUnit = this.spellOutUnit(returnUnit)
    return `${initNum} ${initSpelledOutUnit} converts to ${returnNum} ${returnSpelledOutUnit}`
  };

  this.getResBody = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum == "invalid" && returnUnit == "invalid"){
      return "invalid number and unit"
    }
    if (initNum == "invalid"){
      return "invalid number"
    }
    if (returnUnit == "invalid"){
      return "invalid unit"
    }
    return {
      "initNum": initNum,
      "initUnit": initUnit,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": this.getString(initNum, initUnit, returnNum, returnUnit) 
    }

  }
  
}

module.exports = ConvertHandler;
