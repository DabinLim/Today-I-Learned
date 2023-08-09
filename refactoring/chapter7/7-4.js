// 임시 변수를 질의 함수로 바꾸기

// 주의사항
// 변수가 사용되기 전에 값이 확실히 결정되어 있어야 한다.
// 사용할때마다 계산 로직이 매번 다른 결과를 내지 않아야 한다.
(function before() {
  const basePrice = this._quantity * this._item.price;
  if (basePrice > 1000) return basePrice * 0.95;
  else return basePrice * 0.98;
})();

(function 첫번째() {
  class Order {
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }

    get price() {
      const basePrice = this._quantity * this._item.price;
      if (basePrice > 1000) return basePrice * 0.95;
      else return basePrice * 0.98;
    }
  }
})();

(function 두번째() {
  class Order {
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }

    get price() {
      // 상수로 변경
      const basePrice = this._quantity * this._item.price;
      let discountFactor = 0.98;
      if (basePrice > 1000) discountFactor -= 0.03;
      return basePrice * discountFactor;
    }
  }
})();

(function 세번째() {
  class Order {
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }

    get price() {
      // 대입문 우변 게터로 추출
      const basePrice = this.basePrice;
      let discountFactor = 0.98;
      if (basePrice > 1000) discountFactor -= 0.03;
      return basePrice * discountFactor;
    }

    get basePrice() {
      return this._quantity * this._item.price;
    }
  }
})();

(function 네번째() {
  class Order {
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }

    get price() {
      // 변수 인라인하기
      let discountFactor = 0.98;
      if (this.basePrice > 1000) discountFactor -= 0.03;
      return this.basePrice * discountFactor;
    }

    // 함수 추출
    get basePrice() {
      return this._quantity * this._item.price;
    }
  }
})();

(function 다섯번째() {
  class Order {
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }

    get price() {
      // 변수 인라인
      return this.basePrice * this.discountFactor;
    }

    get basePrice() {
      return this._quantity * this._item.price;
    }

    // 함수 추출
    get discountFactor() {
      let discountFactor = 0.98;
      if (this.basePrice > 1000) discountFactor -= 0.03;
      return discountFactor;
    }
  }
})();
