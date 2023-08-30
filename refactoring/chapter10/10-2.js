// 조건식 통합하기

// 같은 결과를 수행하는 조건문을 하나로 묶는다.

if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;

function isNotEligibleForDisability() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  );
}

if (isNotEligibleForDisability()) {
  return 0;
}
