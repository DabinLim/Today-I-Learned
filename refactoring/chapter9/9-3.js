// 파생 변수를 질의함수로 바꾸기

// production을 applyAdjustment() 실행시마다 변하는 가변데이터가 아닌 production getter에 의해 계산되는 질의 함수를 활용하도록 변경하는 과정

function before() {
  class ProductionPlan {
    constructor(production) {
      this._production = production;
      this._adjustments = [];
    }

    get production() {
      return this._production;
    }
    applyAdjustment(anAdjustment) {
      this._adjustments.push(anAdjustment);
      // 관련이 없는 production 값을 변경하는 코드
      this._production += anAdjustment.amount;
    }
  }
}

function after1() {
  class ProductionPlan {
    get production() {
      // 검증 테스트
      if (this._production !== this.calculatedProduction) {
        throw new Error("안됨");
      }
      return this._production;
    }

    get calculatedProduction() {
      return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }
  }
}

function after2() {
  class ProductionPlan {
    // 계산된 production 으로 대체
    get production() {
      return this.calculatedProduction;
    }

    get calculatedProduction() {
      return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }
  }
}

function after3() {
  class ProductionPlan {
    applyAdjustment(anAdjustment) {
      this._adjustments.push(anAdjustment);
      // 코드 제거
    }
    // 인라인
    get production() {
      return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }
  }
}
