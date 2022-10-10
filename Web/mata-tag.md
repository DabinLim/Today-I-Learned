# `<meta>`

메타 태그는 `<base>`, `<link>`, `<script>`, `<style>`, `<title>` 과 같은 다른 메타관련 요소로 나타낼 수 없는 메타데이터를 나타낸다.

## 메타 데이터
데이터를 설명하는 데이터를 말한다.<br>
데이터에 관한 구조화된 데이터로, 다른 데이터를 설명해 주는 데이터이다.<br>
대량의 정보 가운데에서 찾고 있는 정보를 효율적으로 찾아내서 이용하기 위해 일정한 규칙에 따라 콘텐츠에 대하여 부여되는 데이터이다.<br>
어떤 데이터 즉 구조화된 정보를 분석, 분류하고 부가적 정보를 추가하기 위해 그 데이터 뒤에 함께 따라가는 정보를 말한다.<br>
[위키백과 - 메타데이터](https://ko.wikipedia.org/wiki/%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0)

## meta 태그가 제공하는 메타데이터
1. name : 전체 페이지에 적요되는 문서 레벨 메타데이터 제공
2. http-equiv : content 속성에 명시된 값에 대한 HTTP 헤더를 제공한다. 반드시 content 속성과 함께 사용된다.
3. charset : 문서 인코딩에 사용한 문자 인코딩을 나타내는 문자 집합 선언
4. itemprop : 사용자 정의 메타데이터 제공

### 

## 종류

작성된 종류 외에도 여러가지 종류가 있으나 

### 검색 엔진에 의해 검색되는 단어 지정
```html
<meta name="Keywords" content="Web, html, 웹 표준" />
```

### 검색 결과에 표시되는 문자를 지정
```html
<meta name="Description" content="Web, html, 웹 표준" />
```

### 검색 로봇 제어
```html
<meta name="Robots" content="noindex, nofollow" />
```

1. All(기본값): 'index, follow'와 같다.
2. None: 'noindex, nofollow'와 같다.
3. Index: 페이지를 수집 대상으로 한다.
4. Follow: 페이지를 포함해 링크가 걸린 곳을 수집 대상으로 한다.
5. Noindex: 페이지를 수집 대상에서 제외한다.
6. Nofollow: 페이지를 포함해 링크가 걸린 곳 을 수집 대상에서 제외한다.

### 문자 코드의 종류 설정

```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
```

- EUC-KR / ISO-2022-KR : 한국어 문자 인코딩
- EUC-JP / ISO-2022-JP : 일본어 문자 인코딩
- GB2312 : 중국어 문자 인코딩
- ISO-8859-1 : 북미, 서부유럽, 라틴 아메리카, 카리브해, 캐나다, 아프리카
- ISO-8859-2 : 동유럽
- ISO-8859-3 : 남동유럽, 에스페란토
- ISO-8859-4 : 스칸디나비아, 발트 연안국
- ISO-8859-5 : 불가리아어, 벨로루시어, 러시아어, 마케도니아
- ISO-8859-6 : 아랍문자
- ISO-8859-7 : 현대 그리스문자 언어뿐 만 아니라 수학 기호
- ISO-8859-8 : 히브리어 문자를 사용하는 언어
- ISO-8859-9 : 터키어
- ISO-8859-10 : 에스키모, 북유럽 언어
- UTF-8, UTF-16, UTF-32  : 모든 언어의 문자를 지원하는 인코딩

### 제작일
```html
<meta name="Date" content="2022-10-09T00:00:00+09:00" />
```

### 웹페이지에 쓰인 언어 지정
```html
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
```

### 브라우저 호환성 지정
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```

### 홈페이지 주제 지정
```html
<meta http-equiv="Subject" content="웹 표준을 위한 사이트" />
```

### 뷰포트 설정
width=device-width 는 장치의 화면 너비를 따르도록 페이지 너비를 설정,<br>
initial-scale=1.0은 브라우저에서 페이지를 처음 로드할 때 초기 확대/축소 수준을 설정한다.
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```