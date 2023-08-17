// 필드 옮기기

// 함수에 어떤 레코드를 넘길 때마다 또 다른 레코드의 필드도 함께 넘기고 있다면 데이터 위치를 옮겨야 한다.
// 레코드 변경시 다른 레코드 필드까지 변경되어야 한다면 위치가 잘못되었을 수 있다.

function before() {
  class Customer {
    constructor(name, discountRate) {
      this._name = name;
      this._discountRate = discountRate;
      this._contract = new CustomerContract(dateToday());
    }

    get discountRate() {
      return this._discountRate;
    }
    becomePreferred() {
      this._discountRate += 0.03;
      // 뭐 대충 다른 일
    }
    applyDiscount(amount) {
      return amount.subtract(amount.multiply(this._discountRate));
    }
  }

  class CustomerContract {
    constructor(startDate) {
      this._startDate = startDate;
    }
  }
}

// 변수를 캡슐화한다.
function after1() {
  class Customer {
    constructor(name, discountRate) {
      this._name = name;
      this._setDiscountRate(discountRate);
      this._contract = new CustomerContract(dateToday());
    }

    get discountRate() {
      return this._discountRate;
    }
    _setDiscountRate(aNumber) {
      this._discountRate = aNumber;
    }
    becomePreferred() {
      this._setDiscountRate(this._discountRate + 0.03);
      // 뭐 대충 다른 일
    }
    applyDiscount(amount) {
      return amount.subtract(amount.multiply(this._discountRate));
    }
  }

  class CustomerContract {
    constructor(startDate) {
      this._startDate = startDate;
    }
  }
}

// 옮기고자 하는 클래스에 필드와 접근자 추가
function after2() {
  class CustomerContract {
    constructor(startDate, discountRate) {
      this._startDate = startDate;
      this._discountRate = discountRate;
    }

    get discountRate() {
      return this._discountRate;
    }

    set discountRate(arg) {
      this._discountRate = arg;
    }
  }
}

// Customer의 접근자들이 새로운 필드를 사용하도록 수정
function after3() {
  class Customer {
    constructor(name, discountRate) {
      this._name = name;
      this._setDiscountRate(discountRate);
      this._contract = new CustomerContract(dateToday());
    }

    get discountRate() {
      return this._contract.discountRate;
    }
    _setDiscountRate(aNumber) {
      this._contract.discountRate = aNumber;
    }
  }
}

(function beforeAccount() {
  class Account {
    constructor(number, type, interestRate) {
      this._number = number;
      this._type = type;
      this._interestRate = interestRate;
    }

    get interestRate() {
      return this._interestRate;
    }
  }

  class AccountType {
    constructor(nameString) {
      this._name = nameString;
    }
  }
})();

// AccountType에 접근자 추가
function afterAccount1() {
  class Account {
    constructor(number, type, interestRate) {
      this._number = number;
      this._type = type;
      this._interestRate = interestRate;
    }

    get interestRate() {
      return this._interestRate;
    }
  }

  class AccountType {
    constructor(nameString, interestRate) {
      this._name = nameString;
      this._interestRate = interestRate;
    }

    get interestRate() {
      return this._interestRate;
    }
  }
}

// Account에서 AccountType을 받아 type의 interestRate를 사용하도록 수정
function afterAccount1() {
  class Account {
    constructor(number, type) {
      this._number = number;
      this._type = type;
    }

    get interestRate() {
      return this.type.interestRate;
    }
  }

  class AccountType {
    constructor(nameString, interestRate) {
      this._name = nameString;
      this._interestRate = interestRate;
    }

    get interestRate() {
      return this._interestRate;
    }
  }
}
