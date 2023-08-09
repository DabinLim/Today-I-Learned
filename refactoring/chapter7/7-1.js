const organization = { name: "Dabin Lim", country: "Korea" };

// 1. 간단한 캡슐화
// 1-1. 상수 캡슐화

function getRawDataOfOrganization() {
  return organization;
}

console.log(getRawDataOfOrganization().name);

// 1-2. class로 캡슐화

class Organization {
  _name;
  _country;

  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }
}

const classOrganization = new Organization({
  name: "Dabin Lim",
  country: "Korea",
});

console.log(classOrganization.name);

// 2. 중첩된 레코드 캡슐화하기

const customers = {
  1: {
    name: "Dabin Lim",
    location: "Korea",
    usages: {
      대충중첩된데이터: "대충중첩된데이터",
    },
  },

  2: {
    name: "Dabin Lim2",
    location: "North Korea",
    usages: {
      대충중첩된데이터: "대충중첩된데이터2",
    },
  },
};

// 2-1. 변수 캡슐화

function getRawDataOfCustomers() {
  return customers;
}

const customerId = 1;
console.log(getRawDataOfCustomers()[customerId].usages.대충중첩된데이터);

// 2-2. class로 캡슐화

class CustomerData {
  _data;

  constructor(data) {
    this._data = data;
  }

  setUsage(customerId, usage) {
    this._data[customerId].usages.대충중첩된데이터 = usage;
  }

  cloneDeep(data) {
    return JSON.parse(JSON.stringify(data));
  }

  get rawData() {
    return this.cloneDeep(this._data);
  }
}

const classCustomerData = new CustomerData(customers);
classCustomerData.setUsage("1", "대충중첩된데이터3");
