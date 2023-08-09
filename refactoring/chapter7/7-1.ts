type OrganizationType = { name: string; country: string };

const organization = { name: "Dabin Lim", country: "Korea" };

// 1. 간단한 캡슐화
// 1-1. 상수 캡슐화

function getRawDataOfOrganization() {
  return organization;
}

console.log(getRawDataOfOrganization().name);

// 1-2. class로 캡슐화

class Organization {
  private _name: string;
  private _country: string;

  constructor(data: OrganizationType) {
    this._name = data.name;
    this._country = data.country;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
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
  "1": {
    name: "Dabin Lim",
    location: "Korea",
    usages: {
      대충중첩된데이터: "대충중첩된데이터",
    },
  },

  "2": {
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
  private _data: any;

  constructor(data: any) {
    this._data = data;
  }

  setUsage(customerId: string, usage: string) {
    this._data[customerId].usages.대충중첩된데이터 = usage;
  }

  get rawData() {
    // 사실 얘는 cloneDeep(this._data)임 ㅋ
    return this._data;
  }
}

const classCustomerData = new CustomerData(customers);
classCustomerData.setUsage("1", "대충중첩된데이터3");
