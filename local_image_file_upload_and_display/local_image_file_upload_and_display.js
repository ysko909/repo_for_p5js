let file = document.getElementById('file');
let canvas = document.getElementById('canvas');
let result = document.getElementById('result');

// canvasが長方形であるため画像のサイズによっては一部が欠落する
const CANVAS_W = 400;
const CANVAS_H = 300;

canvas.width = CANVAS_W;
canvas.height = CANVAS_H;
let ctx = canvas.getContext('2d');

loadImage = e => {
  // ファイル情報を取得する
  let selectedFile = e.target.files[0];

  // PNGファイル以外はエラー扱い
  if (!selectedFile.type.match('image/png')) {
    alert('Select PNG Image.');
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // 子要素が存在する場合は削除する
    if (result.hasChildNodes()) {
      result.removeChild(result.firstChild);
    }

    return;
  }

  // ファイル読み込み
  let reader = new FileReader();
  
  // canvasに描画する
  reader.onload = () => {
    canvasDraw(reader.result);
  };

  reader.readAsDataURL(selectedFile);
};

// ファイルが指定されたらloadImage()を実行する
file.addEventListener('change', loadImage, false);

// canvasに描画する関数
function canvasDraw(img) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  // canvasに画像を表示する
  let loadedImg = new Image();
  loadedImg.src = img;
  loadedImg.onload = function () {
    ctx.drawImage(
      loadedImg,
      0,
      0,
      CANVAS_W,
      this.height * (CANVAS_W / this.width)
    );

    // 文字列を描画する
    addText('foo, bar, baz');

    // canvasを画像に変換する
    let data = canvas.toDataURL();

    // ダウンロード用URLを生成する
    let downloadLink = document.createElement('a');
    downloadLink.href = data;
    downloadLink.download = 'hoge.png';
    downloadLink.innerText = 'Download';

    // ダウンロード用URLを追加する
    result.appendChild(downloadLink);
  };
}

// canvasに文字列を表示する関数
const addText = text => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(10, 10, 140, 30);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000000';
  ctx.fillText(text, 80, 25);
};
