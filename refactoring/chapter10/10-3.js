// 중첩 조건문을 보호 구문으로 바꾸기

function before() {
  let result;
  if (isDead) {
    result = deadAmount();
  } else {
    if (isSeparated) {
      result = separatedAmount();
    } else {
      if (isRetired) {
        result = retiredAmount();
      } else {
        result = normalPayAmount();
      }
    }
  }
}

function after() {
  // 빠져나오는 것을 보호구문이라 한다.
  if (isDead) {
    return deadAmount();
  }
  if (isSeparated) {
    return separatedAmount();
  }
  if (isRetired) {
    return retiredAmount();
  }
  return normalPayAmount();
}

function payAmountBefore(employee) {
  let result;
  if (employee.isSeparated) {
    result = { amount: 0, reasonCode: "SEP" };
  } else {
    if (employee.isRetired) {
      result = { amount: 0, reasonCode: "RET" };
    } else {
      result = someFinalComputation();
    }
  }
}

function payAmountAfter(employee) {
  if (employee.isSeparated) {
    return { amount: 0, reasonCode: "SEP" };
  }
  if (employee.isRetired) {
    return { amount: 0, reasonCode: "RET" };
  } else {
    return someFinalComputation();
  }
}
