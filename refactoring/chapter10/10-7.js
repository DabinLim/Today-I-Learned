// 제어 플래그를 탈출문으로 바꾸기

function before() {
  let found = false;
  for (const p of people) {
    if (!found) {
      if (p === "나쁜사람") {
        sendAlert();
        found = true;
      }
      if (p === "더나쁜사람") {
        sendAlert();
        found = true;
      }
    }
  }
}

function after1() {
  for (const p of people) {
    if (p === "나쁜사람") {
      sendAlert();
      return;
    }
    if (p === "더나쁜사람") {
      sendAlert();
      return;
    }
  }
}

function after() {
  const found = people.some((p) => ["나쁜사람", "더나쁜사람"].includes(p));
  if (found) sendAlert();
}
