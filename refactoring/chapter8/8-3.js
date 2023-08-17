// 문장을 함수로 옮기기

function before() {
  const result = [];
  result.push(`<p>제목: ${photo.title}</p>`);
  result.concat(photoData(aPhoto));

  function photoData(aPhoto) {
    return [
      `<p>위치: ${aPhoto.location}</p>`,
      `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
    ];
  }
}

function after1() {
  const result = [];

  result.concat(photoData(aPhoto));

  function photoData(aPhoto) {
    return [
      `<p>제목: ${photo.title}</p>`,
      `<p>위치: ${aPhoto.location}</p>`,
      `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
    ];
  }
}
