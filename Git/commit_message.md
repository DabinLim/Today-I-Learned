# 커밋 메세지(Commit Convention)

- 모든 commit은 더 이상 쪼갤 수 없는 단위로 수행한다. 
- 하나의 commit에 변경되는 파일의 개수가 10개가 넘지 않는 것을 지향한다. 

<br>

## Commit 태그

| 태그 이름 | 설명 |
|------|----------------|
| feat | 새로운 기능을 추가할 경우 |
| fix | 버그를 고친 경우 |
| style | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| refactor | 리팩토링 하는 경우 |
| comment | 필요한 주석 추가 및 변경 |
| chore | package.json 변경이나 모듈을 변경했을 때 |
| docs | 문서를 수정한 경우 |
| test | 테스트 추가 |
| rename | 파일 혹은 폴더명을 수정하거나 옮기는 작업만을 하는 경우 |
| remove | 파일을 삭제하는 작업만 하는 경우 |

<br>

## Commit Message 예시

```
git commit -m "feat: 검색기능 추가"
git commit -m "fix: 페이지네이션 버그 수정"
git commit -m "docs: README 수정"
```

<br>

참조 : [wjdrbs96 님의 GitHub ](https://github.com/wjdrbs96/Today-I-Learn/edit/master/Git/%EC%BB%A4%EB%B0%8B%EB%A9%94%EC%84%B8%EC%A7%80.md)