// 특이 케이스 추가하기

/**
 * 배경
 * 아래 예시와 같이 같은 특이케이스를 여러번 처리하는 경우
 */

// 클라이언트 1
const aCustomer = site.customer;
// ... 수많은 코드 ...
let customerName;
if (aCustomer === "미확인 고객") {
  customerName = "거주자";
} else {
  customerName = aCustomer.name;
}

// 클라이언트 2
const plan =
  aCustomer === "미확인 고객"
    ? registry.billingPlans.basic
    : aCustomer.billingPlan;

// 클라이언트 3
if (aCustomer !== "미확인 고객") aCustomer.billingPlan = newPlan;

// 클라이언트 4
const weeksDelinquent =
  aCustomer === "미확인 고객"
    ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear;
