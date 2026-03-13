// Static Bingo Game - Client-side logic for GitHub Pages
(function () {
  const QUESTIONS = [
    "bikes to work",
    "has lived in another country",
    "has a pet",
    "prefers tea over coffee",
    "plays an instrument",
    "speaks more than 2 languages",
    "has run a marathon",
    "was born in a different state",
    "has met a celebrity",
    "can juggle",
    "has been skydiving",
    "loves cooking",
    "has a garden",
    "has traveled to Asia",
    "is left-handed",
    "has a twin",
    "plays video games",
    "does yoga",
    "has a hidden talent",
    "loves spicy food",
    "has been on TV",
    "collects something unique",
    "has read a book this month",
    "knows sign language",
  ];

  const BOARD_SIZE = 5;
  const CENTER = 12;
  const FREE_SPACE = "FREE SPACE";

  const WINNING_LINES = [
    // rows
    ...[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4].map((c) => r * 5 + c)),
    // columns
    ...[0, 1, 2, 3, 4].map((c) => [0, 1, 2, 3, 4].map((r) => r * 5 + c)),
    // diagonals
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  let board = [];
  let hasBingo = false;
  let winningIds = new Set();
  let modalDismissed = false;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function generateBoard() {
    const picked = shuffle(QUESTIONS).slice(0, 24);
    let qi = 0;
    board = [];
    for (let i = 0; i < 25; i++) {
      if (i === CENTER) {
        board.push({ id: i, text: FREE_SPACE, marked: true, free: true });
      } else {
        board.push({ id: i, text: picked[qi++], marked: false, free: false });
      }
    }
    hasBingo = false;
    winningIds = new Set();
    modalDismissed = false;
  }

  function checkBingo() {
    for (const line of WINNING_LINES) {
      if (line.every((idx) => board[idx].marked)) {
        return line;
      }
    }
    return null;
  }

  function renderStartScreen() {
    const container = document.getElementById("game-container");
    container.innerHTML =
      '<div class="flex flex-col items-center justify-center min-h-full p-6 bg-gray-50">' +
      '  <div class="text-center max-w-sm">' +
      '    <h1 class="text-4xl font-bold text-gray-900 mb-2">Soc Ops</h1>' +
      '    <p class="text-lg text-gray-600 mb-8">Social Bingo</p>' +
      '    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">' +
      '      <h2 class="font-semibold text-gray-800 mb-3">How to play</h2>' +
      '      <ul class="text-left text-gray-600 text-sm space-y-2">' +
      "        <li>\u2022 Find people who match the questions</li>" +
      "        <li>\u2022 Tap a square when you find a match</li>" +
      "        <li>\u2022 Get 5 in a row to win!</li>" +
      "      </ul>" +
      "    </div>" +
      '    <button id="start-btn" class="w-full bg-accent text-white font-semibold py-4 px-8 rounded-lg text-lg active:bg-accent-light transition-colors">' +
      "      Start Game" +
      "    </button>" +
      "  </div>" +
      "</div>";
    document.getElementById("start-btn").addEventListener("click", function () {
      generateBoard();
      renderGame();
    });
  }

  function renderGame() {
    const container = document.getElementById("game-container");
    const winLine = checkBingo();
    if (winLine) {
      hasBingo = true;
      winningIds = new Set(winLine);
    }

    let html =
      '<div class="flex flex-col min-h-full bg-gray-50">' +
      '  <header class="flex items-center justify-between p-3 bg-white border-b border-gray-200">' +
      '    <button id="back-btn" class="text-gray-500 text-sm px-3 py-1.5 rounded active:bg-gray-100">\u2190 Back</button>' +
      '    <h1 class="font-bold text-gray-900">Soc Ops</h1>' +
      '    <div class="w-16"></div>' +
      "  </header>" +
      '  <p class="text-center text-gray-500 text-sm py-2 px-4">Tap a square when you find someone who matches it.</p>';

    if (hasBingo) {
      html += '<div class="bg-amber-100 text-amber-800 text-center py-2 font-semibold text-sm">\uD83C\uDF89 BINGO! You got a line!</div>';
    }

    html += '<div class="flex-1 flex items-center justify-center p-3">';
    html += '<div class="grid grid-cols-5 gap-1 w-full max-w-md mx-auto aspect-square">';

    for (const sq of board) {
      const isWin = winningIds.has(sq.id);
      let cls =
        "relative flex items-center justify-center p-1 text-center border border-gray-300 rounded transition-all duration-150 select-none min-h-[60px] text-xs leading-tight";
      if (sq.marked) {
        cls += isWin
          ? " bg-amber-200 border-amber-400 text-amber-900"
          : " bg-marked border-marked-border text-green-800";
      } else {
        cls += " bg-white text-gray-700 active:bg-gray-100";
      }
      if (sq.free) cls += " font-bold text-sm";

      const disabled = sq.free ? " disabled" : "";
      const check =
        sq.marked && !sq.free
          ? '<span class="absolute top-0.5 right-0.5 text-green-600 text-xs">\u2713</span>'
          : "";
      html +=
        "<button data-id=\"" + sq.id + "\"" + disabled +
        ' class="' + cls + '"' +
        ' aria-pressed="' + (sq.marked ? "true" : "false") + '"' +
        ' aria-label="' + (sq.free ? "Free space" : sq.text) + '">' +
        '<span class="wrap-break-word hyphens-auto">' + sq.text + "</span>" +
        check +
        "</button>";
    }

    html += "</div></div></div>";

    // Bingo modal
    if (hasBingo && !modalDismissed) {
      html +=
        '<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">' +
        '  <div class="bg-white rounded-xl p-6 max-w-xs w-full text-center shadow-xl animate-[bounce_0.5s_ease-out]">' +
        '    <div class="text-5xl mb-4">\uD83C\uDF89</div>' +
        '    <h2 class="text-3xl font-bold text-amber-500 mb-2">BINGO!</h2>' +
        '    <p class="text-gray-600 mb-6">You completed a line!</p>' +
        '    <button id="dismiss-btn" class="w-full bg-accent text-white font-semibold py-3 px-6 rounded-lg active:bg-accent-light transition-colors">Keep Playing</button>' +
        "  </div>" +
        "</div>";
    }

    container.innerHTML = html;

    // Bind events
    document.getElementById("back-btn").addEventListener("click", renderStartScreen);
    const dismissBtn = document.getElementById("dismiss-btn");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", function () {
        modalDismissed = true;
        renderGame();
      });
    }
    container.querySelectorAll("button[data-id]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        if (!board[id].free) {
          board[id].marked = !board[id].marked;
          renderGame();
        }
      });
    });
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", renderStartScreen);
})();
