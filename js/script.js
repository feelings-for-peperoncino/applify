// グローバル変数と初期設定
let correctAnswer = 0;
let secondNumber = 0;
let questionCount = 0;
const usedQuestions = new Set(); // 出題済みの問題を記録するSet
const levelRanges = { 1: 4, 2: 7, 3: 9 }; // 各レベルごとの問題範囲
let currentLevel = 1; // デフォルトレベル1

// レベルボタンにイベントリスナーを設定
document.querySelector('#level1').addEventListener('click', () => {
  currentLevel = 1;
  questionCount = 0;
  usedQuestions.clear();
  document.querySelector('#top-view').classList.add('d-none');
  document.querySelector('#question-view').classList.remove('d-none');
  document.getElementById('level-header-img').src = 'img/level1-header.png'; // レベル1の画像に変更
  generateMultiplicationQuestion(currentLevel);
});

document.querySelector('#level2').addEventListener('click', () => {
  currentLevel = 2;
  questionCount = 0;
  usedQuestions.clear();
  document.querySelector('#top-view').classList.add('d-none');
  document.querySelector('#question-view').classList.remove('d-none');
  document.getElementById('level-header-img').src = 'img/level2-header.png'; // レベル2の画像に変更
  generateMultiplicationQuestion(currentLevel);
});

document.querySelector('#level3').addEventListener('click', () => {
  currentLevel = 3;
  questionCount = 0;
  usedQuestions.clear();
  document.querySelector('#top-view').classList.add('d-none');
  document.querySelector('#question-view').classList.remove('d-none');
  document.getElementById('level-header-img').src = 'img/level3-header.png'; // レベル3の画像に変更
  generateMultiplicationQuestion(currentLevel);
});

// カスタムダイアログを作成する関数
function showDialog(imageSrc, audioSrc, message) {
  const dialog = document.createElement('div');
  dialog.className = 'custom-dialog';

  const image = document.createElement('img');
  image.src = imageSrc;
  dialog.appendChild(image);

  const text = document.createElement('p');
  text.innerText = message;
  dialog.appendChild(text);

  // サウンドの再生
  const audio = new Audio(audioSrc);
  audio.play();

  // 閉じるボタン
  const closeButton = document.createElement('button');
  closeButton.innerText = '閉じる';
  closeButton.onclick = () => document.body.removeChild(dialog);
  dialog.appendChild(closeButton);

  document.body.appendChild(dialog);
}

// レベルに基づいて問題を生成する関数
function generateMultiplicationQuestion(level) {
  const range = levelRanges[level];
  let num1, num2;

  // 新しい問題を生成するまでループ
  do {
    num1 = Math.floor(Math.random() * range) + 1; // num1は1からrangeまで
    num2 = Math.floor(Math.random() * range) + 1; // num2も1からrangeまで
  } while (usedQuestions.has(`${num1}x${num2}`)); // 既出の問題かチェック

  usedQuestions.add(`${num1}x${num2}`); // 出題済みとして記録

  // スケールに表示する合計の重さ
  let totalWeight = num1 * num2;
  document.getElementById('resultText').innerText = totalWeight;

  // りんごの数に応じてyellow appleを表示
  let appleContainer = document.getElementById('appleContainer');
  appleContainer.innerHTML = ''; // 以前のりんご画像をクリア
  for (let i = 0; i < num1; i++) {
    let img = document.createElement('img');
    img.src = 'img/yellow-apple.png';
    img.alt = 'yellow apple';
    img.className = 'yellow-apple';
    appleContainer.appendChild(img);
  }

  // 正解の重さを設定 (ユーザーが答えるべき値)
  correctAnswer = num2;

  // ユーザーアンサーをクリア
  document.getElementById('userAnswer').innerText = '';
}

function inputNumber(num) {
  let currentAnswer = document.getElementById('userAnswer').innerText;
  document.getElementById('userAnswer').innerText = currentAnswer + num;
}

function clearAnswer() {
  document.getElementById('userAnswer').innerText = '';
}

function checkAnswer() {
  let userAnswer = parseInt(document.getElementById('userAnswer').innerText);
  if (userAnswer === correctAnswer) {
    questionCount++;
    if (questionCount < 3) {
      showDialog('img/good-apple.png', 'sound/correct.mp3', 'Good!');
      clearAnswer();
      generateMultiplicationQuestion(currentLevel); // 現在のレベルに基づいて問題を再生成
    } else {
      showDialog('img/good-apple.png', 'sound/correct.mp3', 'すべて正解しました！');
      clearAnswer();
      questionCount = 0;
      usedQuestions.clear(); // 出題済みの問題をリセット
      generateMultiplicationQuestion(currentLevel); // 最初の問題に戻る
    }
  } else {
    showDialog('img/oops-apple.png', 'sound/oops.mp3', 'Try again');
  }
}

// 初期化
generateMultiplicationQuestion(currentLevel);

// レベルボタンにイベントリスナーを設定
document.querySelector('#level1').addEventListener('click', () => {
  currentLevel = 1;
  questionCount = 0;
  usedQuestions.clear();
  document.querySelector('#top-view').classList.add('d-none');
  document.querySelector('#question-view').classList.remove('d-none');
  generateMultiplicationQuestion(currentLevel);
});

document.querySelector('#level2').addEventListener('click', () => {
  currentLevel = 2;
  questionCount = 0;
  usedQuestions.clear();
  document.querySelector('#top-view').classList.add('d-none');
  document.querySelector('#question-view').classList.remove('d-none');
  generateMultiplicationQuestion(currentLevel);
});

document.querySelector('#level3').addEventListener('click', () => {
  currentLevel = 3;
  questionCount = 0;
  usedQuestions.clear();
  document.querySelector('#top-view').classList.add('d-none');
  document.querySelector('#question-view').classList.remove('d-none');
  generateMultiplicationQuestion(currentLevel);
});
