# intersection

union과 반대로 모든 것을 합한 성격을 같는다 (and)

```
type Student = {
    name: string;
    score: number;
};

type Worker = {
    employeeId: number;
    work: () => void;
};

function internWork(person: Student & Worker) {
    console.log(person.name, person.employeeId, person.work());
}

internWork({
    name:'dabin',
    score:1,
    employeeId: 123,
    work: () => {},
});
```

> 다양한 타입을 하나로 묶어서 사용할 수 있으며 인자로 주어진 타입의 모든 값을 인자로 주어야 한다.
