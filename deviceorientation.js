function ClickRequestDeviceSensor() {
  // ユーザーに「許可」を求めるダイアログを表示
  deviceOrientationEvent.requestPermisson().then(function(response) {
    if (response === 'granted') {
      // 許可された場合のみイベントハンドラを追加できる
      window.addEventListener("deviceorientation", deviceOrientation);
      // 画面上部のボタンを消す
      $('#sensorrequest').css('display', 'none');
    }
  }).catch(function(e) {
    console.log(e);
  });
}

// DeviceOrientationEvent オブジェクトが有効な環境か？をチェック
if(window.DeviceOrientationEvent) {
  // iOS13以上であればDeviceOrientationEvent.requestPermission関数が定義されているのでここで条件分岐
  if (DeviceOrientationEvento.requestPermission && typeof
  DeviceOrientationEvent.requestPermission === 'function') {
    // iOS13以上の場合
    // 画面上部に「センサーの有効化：ボタンを追加
    var banner = '<div style="z-index: 1; position: absolute; width: 100%; background-color: rgb(0, 0, 0);"
    onclick="ClickRequestDeviceSensor();" id="sensorrequest"><p style="color: rgb(0, 0, 255);">センサーの有効化</p></div>';
    $('body').prepend(banner);
  } else {
    // AndroidまたはiOS13未満の場合
    // DeviceOrientationEventオブジェクトが有効な場合のみ
    deviceorientationイベント発生時にdeviceOrientation関数がハンドリングするよう登録
    window.addEventListener("deviceorientation", deviceOrientation);
  }
}


  var ball   = document.querySelector('.ball');
  var garden = document.querySelector('.garden');
  var output = document.querySelector('.output');

  var maxX = garden.clientWidth  - ball.clientWidth;
  var maxY = garden.clientHeight - ball.clientHeight;

  function handleOrientation(event) {
    var x = event.beta;  // -180 から 180 の範囲で角度を示す
    var y = event.gamma; // -90 から 90 の範囲で角度を示す

    output.innerHTML  = "beta : " + x + "\n";
    output.innerHTML += "gamma: " + y + "\n";

    // デバイスをひっくり返したくはないため、
    // x の値を -90 から 90 の範囲に制限する
    if (x >  90) { x =  90};
    if (x < -90) { x = -90};

    // 計算を容易にするため、x および y の値の範囲を
    // 0 から 180 に変換する
    x += 90;
    y += 90;

    // 10 は、ボールのサイズの半分である。
    // これにより、配置場所をボールの中心に合わせる
    ball.style.top  = (maxX*x/180 - 10) + "px";
    ball.style.left = (maxY*y/180 - 10) + "px";
  }

  window.addEventListener('deviceorientation', handleOrientation);
