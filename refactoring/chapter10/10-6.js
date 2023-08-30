// 어서션 추가하기


// 남발 금지, 반드시 참이어야만 하는 조건에 사용


function assert(condition) {
  if (!condition) {
    throw new Error("Assert Failed");
  }
}

function before(aNumber) {
  if (this.discountRate) {
    aNumber = aNumber - this.discountRate * aNumber;
  }
}

function after(aNumber) {
  if (!this.discountRate) {
    return aNumber;
  }

  assert(this.discountRate >= 0);

  if (this.discountRate) {
    aNumber = aNumber - this.discountRate * aNumber;
  }
}
