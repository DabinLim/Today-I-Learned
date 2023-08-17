// 함수 옮기기

// 배경
// 서로 연관된 요소를 묶고 연결 관계를 쉽게 찾고 이해할 수 있도록 해야한다.
// 이해도가 높아질수록 소프트웨어 요소들을 잘 묶는 방법을 깨우친다.
// 이를 위해 함수를 옮기는 방법을 알아보자.

function before() {
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;

    function calculateDistance() {
      let result = 0;
      for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
      }
      return result;
    }

    function distance(p1, p2) {
      // 두 지점 거리 계산
    }

    function calculateTime(p1, p2) {
      // 총 시간 계산
    }

    return {
      time: totalTime,
      distance: totalDistance,
      pace: pace,
    };
  }
}

// 함수를 복사, 매개변수 줌
function after1() {
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;

    function calculateDistance() {
      let result = 0;
      for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
      }
      return result;
    }

    function distance(p1, p2) {
      // 두 지점 거리 계산
    }

    function calculateTime(p1, p2) {
      // 총 시간 계산
    }

    return {
      time: totalTime,
      distance: totalDistance,
      pace: pace,
    };
  }

  // 함수를 복사, 매개변수 줌
  function top_calculateDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;
  }
}

// distance 함수를 옮김
function after2() {
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;

    function calculateDistance() {
      let result = 0;
      for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
      }
      return result;
    }

    function calculateTime(p1, p2) {
      // 총 시간 계산
    }

    return {
      time: totalTime,
      distance: totalDistance,
      pace: pace,
    };
  }

  function top_calculateDistance(points) {
    let result = 0;

    // distance 함수를 옮김
    function distance(p1, p2) {
      // 두 지점 거리 계산
    }

    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;
  }
}

// 옮긴 함수를 실행하도록 변경
function after3() {
  function trackSummary(points) {
    const totalTime = calculateTime();
    // 옮긴 함수를 실행하도록 변경
    const totalDistance = top_calculateDistance(points);
    const pace = totalTime / 60 / totalDistance;

    function calculateTime(p1, p2) {
      // 총 시간 계산
    }

    return {
      time: totalTime,
      distance: totalDistance,
      pace: pace,
    };
  }

  function top_calculateDistance(points) {
    let result = 0;

    // distance 함수를 옮김
    function distance(p1, p2) {
      // 두 지점 거리 계산
    }

    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;
  }
}

// 네이밍 수정 및 변수 인라인
function after4() {
  function trackSummary(points) {
    const totalTime = calculateTime();
    const pace = totalTime / 60 / totalDistance(points);

    function calculateTime(p1, p2) {
      // 총 시간 계산
    }

    return {
      time: totalTime,
      distance: totalDistance(points),
      pace: pace,
    };
  }
  // 네이밍 수정
  function totalDistance(points) {
    let result = 0;

    // distance 함수를 옮김
    function distance(p1, p2) {
      // 두 지점 거리 계산
    }

    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;
  }
}

// Account 클래스

function beforeClass() {
  class Account {
    get bankCharge() {
      let result = 4.5;
      if (this._daysOverdrawn > 0) result += this.overdraftCharge;
      return result;
    }

    get overdraftCharge() {
      if (this.type.isPremium) {
        const baseCharge = 10;
        if (this.daysOverdrawn <= 7) {
          return baseCharge;
        } else {
          return baseCharge + (this.daysOverdrawn - 7) * 0.85;
        }
      } else {
        return this.daysOverdrawn * 1.75;
      }
    }
  }
}

// 초과 인출 이자 계산 메소드를 계좌종류 클래스로 옮김
function afterClass1() {
  class Account {
    get bankCharge() {
      let result = 4.5;
      if (this._daysOverdrawn > 0) result += this.overdraftCharge;
      return result;
    }

    get overdraftCharge() {
      if (this.type.isPremium) {
        const baseCharge = 10;
        if (this.daysOverdrawn <= 7) {
          return baseCharge;
        } else {
          return baseCharge + (this.daysOverdrawn - 7) * 0.85;
        }
      } else {
        return this.daysOverdrawn * 1.75;
      }
    }
  }

  // 초과 인출 이자 계산 메소드를 계좌종류 클래스로 옮김
  class AccountType {
    overdraftCharge(daysOverdrawn) {
      if (this.isPremium) {
        const baseCharge = 10;
        if (daysOverdrawn <= 7) {
          return baseCharge;
        } else {
          return baseCharge + (daysOverdrawn - 7) * 0.85;
        }
      } else {
        return daysOverdrawn * 1.75;
      }
    }
  }
}

// 메소드 본문 수정
function afterClass2() {
  class Account {
    get bankCharge() {
      let result = 4.5;
      // 인라인 선택
      if (this._daysOverdrawn > 0) result += this.overdraftCharge;
      return result;
    }

    get overdraftCharge() {
      this.type.overdraftCharge(this.daysOverdrawn);
    }
  }

  // 초과 인출 이자 계산 메소드를 계좌종류 클래스로 옮김
  class AccountType {
    overdraftCharge(daysOverdrawn) {
      if (this.isPremium) {
        const baseCharge = 10;
        if (daysOverdrawn <= 7) {
          return baseCharge;
        } else {
          return baseCharge + (daysOverdrawn - 7) * 0.85;
        }
      } else {
        return daysOverdrawn * 1.75;
      }
    }
  }
}
