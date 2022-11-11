# 적응자 (adaptor) 패턴

적응자 패턴은 코드의 추상화 레벨을 변경하는데 사용된다.<br>
새로운 요구사항으로 인한 새로운 인터페이스를 기존 코드에 적용할때 사용되는 패턴이다.<br><br>

호환되지 않는 인터페으스를 가진 객체들이 협업할 수 있도록 하는 구조적 디자인 패턴이다.<br><br>

110V 충전기를 사용하는 전자제품을 우리나라에서 충전하려고 220V로 전환해주는 어댑터를 활용하는 것과 같은 패턴이다.<br><br>

## 예시

아래 예시의 프린터는 텍스트만을 출력하는 프린트이다.<br>
이후 사진을 프린트한다거나 3D 프린트를 하려는 새로운 요구사항이 생기는 경우 대처하려면 print() 메소드 자체를 수정하거나 새로운 클래스를 만들어야 한다.

```js
class Printer {
    print() {
        console.log('print text');
    }
}
```

아래와 같이 어댑터를 통해 새로운 요구사항에 대응이 가능하다.<br>
```js
class Printer {
    constructor(printAdapter) {
        this.printer = printAdapter;
    }

    print() {
        this.printer.print();
    }
}

class ColorPhotoPrintAdapter {
    print() {
        console.log('print colorful photo');
    }
}

class _3DPrintAdapter {
    print() {
        console.log('print 3D product');
    }
}

const colorPrinter = new Printer(new ColorPhotoPrintAdapter());
const _3dPrinter = new Printer(new _3DPrintAdapter());

colorPrinter.print(); // print colorful photo
_3dPrinter.print(); // print 3D product
```