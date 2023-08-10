// 클래스 추출하기

(function before() {
  class Person {
    constructor(name, telephoneNumber, officeAreaCode, officeNumber) {
      this._name = name;
      this._telephoneNumber = telephoneNumber;
      this._officeAreaCode = officeAreaCode;
      this._officeNumber = officeNumber;
    }

    get name() {
      return this._name;
    }

    set name(arg) {
      this._name = arg;
    }

    get telephoneNumber() {
      return this._telephoneNumber;
    }

    set telephoneNumber(arg) {
      this._telephoneNumber = arg;
    }

    get officeAreaCode() {
      return this._officeAreaCode;
    }

    set officeAreaCode(arg) {
      this._officeAreaCode = arg;
    }

    get officeNumber() {
      return this._officeNumber;
    }

    set officeNumber(arg) {
      this._officeNumber = arg;
    }
  }
})();

// 클래스 추출하기
(function after1() {
  class Person {
    constructor(name) {
      this._name = name;
      this._telephoneNumber = new TelephoneNumber();
    }

    //...
  }

  class TelephoneNumber {}
})();

// 필드 옮기기
(function after2() {
  class Person {
    _telephoneNumber;
    constructor(name) {
      this._name = name;
      this._telephoneNumber = new TelephoneNumber("office", "officeNumber");
    }

    get officeAreaCode() {
      return this._telephoneNumber.officeAreaCode;
    }

    set officeAreaCode(arg) {
      this._telephoneNumber.officeAreaCode = arg;
    }

    // ...
  }

  class TelephoneNumber {
    constructor(officeAreaCode, officeNumber) {
      this._officeAreaCode = officeAreaCode;
      this._officeNumber = officeNumber;
    }

    get officeAreaCode() {
      return this._officeAreaCode;
    }
    set officeAreaCode(arg) {
      this._officeAreaCode = arg;
    }
    get officeNumber() {
      return this._officeNumber;
    }
    set officeNumber(arg) {
      this._officeNumber = arg;
    }
  }
})();

// 네이밍 변경
(function after3() {
  class Person {
    _telephoneNumber;
    constructor(name) {
      this._name = name;
      this._telephoneNumber = new TelephoneNumber("office", "officeNumber");
    }

    get officeAreaCode() {
      return this._telephoneNumber.areaCode;
    }

    set officeAreaCode(arg) {
      this._telephoneNumber.areaCode = arg;
    }

    // ...
  }

  class TelephoneNumber {
    constructor(areaCode, number) {
      this._areaCode = areaCode;
      this._number = number;
    }

    get areaCode() {
      return this._areaCode;
    }
    set areaCode(arg) {
      this._areaCode = arg;
    }
    get number() {
      return this._number;
    }
    set number(arg) {
      this._number = arg;
    }
  }
})();
