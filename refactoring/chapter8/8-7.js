// 반복문 쪼개기

const people = [
  { name: "사람1", age: 30, salary: 1000 },
  { name: "사람2", age: 31, salary: 2000 },
  { name: "사람3", age: 29, salary: 3000 },
  { name: "사람4", age: 32, salary: 4000 },
];

function before() {
  let youngest = people[0] ? people[0].age : Infinity;
  let totalSalary = 0;
  for (const p of people) {
    // 최연소를 구하는 일
    if (p.age < youngest) youngest = p.age;
    // 총급여를 구하는 일
    totalSalary += p.salary;
  }

  return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
}

function after1() {
  let totalSalary = 0;

  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
    totalSalary += p.salary;
  }

  // 복제
  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
    totalSalary += p.salary;
  }

  return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
}

function after() {
  let youngest = people[0] ? people[0].age : Infinity;
  let totalSalary = 0;
  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
  }
  for (const p of people) {
    totalSalary += p.salary;
  }
}

function 더가다듬기() {
  function totalSalary() {
    let result = 0;
    for (const p of people) {
      result += p.salary;
    }
    return result;
  }

  function youngestAge() {
    let result = people[0] ? people[0].age : Infinity;
    for (const p of people) {
      if (p.age < result) result = p.age;
    }
    return result;
  }

  return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;
}

function 알고리즘교체하기() {
  function totalSalary() {
    return people.reduce((total, p) => total + p.salary, 0);
  }

  function youngestAge() {
    return Math.min(...people.map((p) => p.age));
  }

  return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;
}
