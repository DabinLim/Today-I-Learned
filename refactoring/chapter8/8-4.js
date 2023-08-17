// 문장을 호출한 곳으로 옮기기

function before() {
  emitPhotoData(outStream);

  function emitPhotoData(outStream) {
    outStream.write(`<p>제목: ${photo.title}</p>\n`);
    outStream.write(`<p>위치: ${photo.location}</p>\n`);
  }
}

function after1() {
  emitPhotoData(outStream);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);

  function emitPhotoData(outStream) {
    outStream.write(`<p>제목: ${photo.title}</p>\n`);
  }
}
