// 클래스 인라인하기

(function before() {
  class TrackingInformation {
    get shippingCompany() {
      return this._shippingCompany;
    }
    set shippingCompany(arg) {
      this._shippingCompany = arg;
    }
    get trackingNumber() {
      return this._trackingNumber;
    }
    set trackingNumber(arg) {
      this._trackingNumber = arg;
    }
    get display() {
      return `${this.shippingCompany}: ${this.trackingNumber}`;
    }
  }

  class Shipment {
    get trackingInfo() {
      return this._trackingInformation.display;
    }
    get trackingInformation() {
      return this._trackingInformation;
    }
    set trackingInformation(aTrackingInformation) {
      this._trackingInformation = aTrackingInformation;
    }
  }

  const shipment = new Shipment();
  shipment.trackingInformation.shippingCompany = request.vendor;
})();

// 위임 함수 만들기 및 클라리언트는 위임 함수 호출
(function after1() {
  class Shipment {
    get trackingInfo() {
      return this._trackingInformation.display;
    }
    get trackingInformation() {
      return this._trackingInformation;
    }
    set trackingInformation(aTrackingInformation) {
      this._trackingInformation = aTrackingInformation;
    }
    get shippingCompany() {
      return this._trackingInformation.shippingCompany;
    }
    set shippingCompany(arg) {
      this._trackingInformation.shippingCompany = arg;
    }
  }
  const shipment = new Shipment();
  shipment.shippingCompany = request.vendor;
})();

// display 메소드 인라인, shippingCompany 프로퍼티 인라인
(function after2() {
  class Shipment {
    get trackingInfo() {
      return `${this._shippingCompany}: ${this._trackingNumber}`;
    }
    get trackingInformation() {
      return this._trackingInformation;
    }
    set trackingInformation(aTrackingInformation) {
      this._trackingInformation = aTrackingInformation;
    }

    get trackingNumber() {
      return this._trackingNumber;
    }
    set trackingNumber(arg) {
      this._trackingNumber = arg;
    }

    get shippingCompany() {
      return this._shippingCompany;
    }

    set shippingCompany(arg) {
      this._shippingCompany = arg;
    }
  }
  const shipment = new Shipment();
  shipment.shippingCompany = request.vendor;
})();



// trackingInformation 클래스 삭제
(function after3() {
    class Shipment {
      get trackingInfo() {
        return `${this._shippingCompany}: ${this._trackingNumber}`;
      }
  
      get trackingNumber() {
        return this._trackingNumber;
      }
      set trackingNumber(arg) {
        this._trackingNumber = arg;
      }
  
      get shippingCompany() {
        return this._shippingCompany;
      }
  
      set shippingCompany(arg) {
        this._shippingCompany = arg;
      }
    }
    const shipment = new Shipment();
    shipment.shippingCompany = request.vendor;
  })();
  