# 이미지 최적화

## 이미지 포맷

- 래스터 이미지
  - 일반 이미지
- 벡터 이미지

  - 텍스트 기반 이미지 (svg)
  - gzip이나 broth 같은 텍스트 압축 기법으로 최적화 가능

- 무손실
  - 원본 이미지 정보 손실을 허용하지 않음
  - Gif, png
- 손실
  - 원본 이미지 정보 손실
  - 100~75 품질의 손실압축
  - 75는 ux에 악영향 가능성
  - 85~80가 적당, 파일크기 50% 감소 가능
  - Web, jpeg…

### Png

알파채널, 배경 이미지 레이어 제거 가능 but 같은 품질 대비 파일 사이즈가 커짐, 투명 기능이 필요하지 않으면 jpeg사용이 유리

### Jpeg 2000

- iOS 계열 제외 대부분 지원하지 않음
- 무손실과 투명, 애니메이션 지원

### Webp

점진적 데이터 전송 기능이 빠짐
공격적 압축 방식, 25~35%

## Image Tool

### ImageMagicK

이미지 정보, 이미지 포맷 변환 기능

### Gif Tool

- Giflossy

  - 무손실, 손실 압축 지원, Animated gif 생성 및 최적화 등 gif 관련 기능

- Gifsicle

  - Gif 애니메이션 최적화

- Gif2webp converter
  - Gif -> webp

### Png Tool

- Pngcrush

  - 대표적인 png 최적화 도구, 효율이 적음, 스크립트 실행 적합

- Pngquant
  - 압축 지원 명령행 기반 도구

### JPEG Tool

- MozJPEG

  - 압축 라이브러리
  - 1~100사이 레벨의 품질로 변환
  - Progressive JPEG 변환 지원

- libJPEG

  - Jpeg 생성 변환 라이브러리, 이미지 메타정보 삭제

- Guetzli
  - 구글에서 배포한 jpeg 인코더
  - libJPEH 대비 파일크기 20~30%감소
  - Quality 옵션을 통해 품질 레벨 설정 가능

### Akami - 이미지 관리 솔루션
cdn을 통한 최적화

## 반응형 웹을 위한 이미지 최적화

### 내려받아 숨기기
- 리소스는 다운로드 받지만 렌더링 안함
- 불필요한 리소스 다운로드 필요한 단점 존재


### 반응형 이미지
- 미디어 쿼리를 활용한 이미지 파일 호출
  - 소스코드 무거워짐
- srcset
  - 
- 환경에 맞는 이미지 전송
- Picture 태그
  - 뷰포트 크기에 따른 반응형 이미지 최적화
  - img 태그는 적합한 이미지가 제공되지 않는 경우의 default source
```html
<picture>
  <source media="(min-width:650px)" srcset="img_pink_flowers.jpg">
  <source media="(min-width:465px)" srcset="img_white_flower.jpg">
  <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;">
</picture>
```
- Art direction
- 서버측 반응형 웹
  - Client Hints
    - Accept-CH: DPR, Width, Viewport-Width, Downlink, Save-Data
    - DPR(Device Pixel Ratio): 브라우저 디바이스 픽셀 비율
    - Width: 브라우저 창의 너비
    - Viewport-Width: 뷰포트 너비
    - Downlink: 사용자의 네트워크 속도
    - Save-Data: 사용자가 데이터 절약 모드 사용중인지 여부

