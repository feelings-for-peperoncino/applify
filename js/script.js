// グローバル変数と初期設定
let correctAnswer = 0;
let questionCount = 0;
const usedQuestions = new Set(); // 出題済みの問題を記録するSet
const levelRanges = { 1: 4, 2: 7, 3: 9 }; // 各レベルごとの問題範囲
let currentLevel = 1; // デフォルトレベル1
let timerInterval; // タイマーのための変数
let startTime; // タイマー開始時間

// レベルボタンにイベントリスナーを設定
document.querySelector('#level1').addEventListener('click', () => startGame(1));
document.querySelector('#level2').addEventListener('click', () => startGame(2));
document.querySelector('#level3').addEventListener('click', () => startGame(3));

// ゲーム開始の設定
function startGame(level) {
  currentLevel = level;
  questionCount = 0;
  usedQuestions.clear();
  document.querySelector('#top-view').classList.add('d-none');
  document.querySelector('#question-view').classList.remove('d-none');
  document.getElementById('level-header-img').src = `img/level${level}-header.png`; // レベルの画像を変更
  startTimer(); // タイマー開始
  generateMultiplicationQuestion(currentLevel);
}

// タイマーの設定
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
    const seconds = (elapsedTime % 60).toString().padStart(2, '0');
    document.getElementById('time').textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

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

  document.body.appendChild(dialog);

  // 1秒後に自動でダイアログを消す
  setTimeout(() => {
    document.body.removeChild(dialog);
  }, 1000);
}

// レベルに基づいて問題を生成する関数
function generateMultiplicationQuestion(level) {
  const range = levelRanges[level];
  let num1, num2;

  // レベルに応じて2の段以下の問題を出題しない
  const minRange = level > 1 ? 3 : 1;

  // 新しい問題を生成するまでループ
  do {
    num1 = Math.floor(Math.random() * (range - minRange + 1)) + minRange; // num1はminRangeからrangeまで
    num2 = Math.floor(Math.random() * (range - minRange + 1)) + minRange; // num2もminRangeからrangeまで
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

  // 問題番号の更新
  document.getElementById('question-count').innerText = `Question ${questionCount + 1}`;

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
    if (questionCount < 10) {
      showDialog('img/good-apple.png', 'sound/correct.mp3', 'Good!');
      clearAnswer();
      generateMultiplicationQuestion(currentLevel); // 現在のレベルに基づいて問題を再生成
    } else {
      showDialog('img/good-apple.png', 'sound/correct.mp3', 'すべて正解しました！');
      clearAnswer();
      stopTimer(); // タイマー停止
    }
  } else {
    showDialog('img/oops-apple.png', 'sound/oops.mp3', 'Try again');
  }
}

// 初期化
generateMultiplicationQuestion(currentLevel);

