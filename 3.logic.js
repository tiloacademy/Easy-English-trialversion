/* ==========================================================================
   FILE: 3.logic.js (BẢN FIX LỖI MÀN HÌNH TRẮNG & HOÀN CHỈNH)
   ========================================================================== */

/* --- STORAGE & QUEST ENGINE --- */
const StorageEngine = {
    setUserName: (name) => localStorage.setItem('eng_username', name),
    getUserName: () => localStorage.getItem('eng_username'),
    setGems: (val) => localStorage.setItem('eng_gems', val),
    getGems: () => parseInt(localStorage.getItem('eng_gems') || '0'),
    
    saveHighScore: function(gameId, currentScore) {
        let highScores = JSON.parse(localStorage.getItem('eng_highscores') || '{}');
        let isNewRecord = false;
        if (!highScores[gameId] || currentScore > highScores[gameId]) {
            highScores[gameId] = currentScore;
            localStorage.setItem('eng_highscores', JSON.stringify(highScores));
            isNewRecord = true;
        }
        return { highScore: highScores[gameId], isNewRecord: isNewRecord };
    },
    saveLessonProgress: (lessonId, itemIdx) => {
        let progress = JSON.parse(localStorage.getItem('eng_lesson_map') || '{}');
        if (!progress[lessonId]) progress[lessonId] = [];
        if (!progress[lessonId].includes(itemIdx)) {
            progress[lessonId].push(itemIdx);
            localStorage.setItem('eng_lesson_map', JSON.stringify(progress));
        }
    },
    getLessonProgress: (lessonId, totalItems) => {
        let progress = JSON.parse(localStorage.getItem('eng_lesson_map') || '{}');
        let completed = progress[lessonId] ? progress[lessonId].length : 0;
        return Math.floor((completed / totalItems) * 100);
    }
};

const QuestEngine = {
    updateWeeklyQuest: () => {
        let quest = JSON.parse(localStorage.getItem('eng_weekly_quest') || '{"count":0}');
        quest.count++;
        localStorage.setItem('eng_weekly_quest', JSON.stringify(quest));
        if(typeof App !== 'undefined') App.renderQuests();
        if(quest.count === 5) {
            setTimeout(() => alert("🎉 Wow! You completed the weekly quest!\n(Tuyệt vời! Bạn đã hoàn thành nhiệm vụ tuần!) +100 Gems 💎"), 500);
            StorageEngine.setGems(StorageEngine.getGems() + 100);
            if(typeof App !== 'undefined') App.updateGemDisplay();
        }
    }
};

/* --- AUDIO ENGINE --- */
const AudioEngine = {
    isAudioAllowed: false, audioWin: new Audio("win.mp3"), audioCorrect: new Audio("correct.mp3"), audioWrong: new Audio("wrong.mp3"),
    unlock: function() { this.isAudioAllowed = true; if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(''); window.speechSynthesis.speak(u); window.speechSynthesis.cancel(); } },
    stopAllAndBlock: function() { this.isAudioAllowed = false; if('speechSynthesis' in window) window.speechSynthesis.cancel(); this.audioWin.pause(); this.audioWin.currentTime = 0; this.audioCorrect.pause(); this.audioCorrect.currentTime = 0; this.audioWrong.pause(); this.audioWrong.currentTime = 0; },
    stopCurrentSound: function() { if('speechSynthesis' in window) window.speechSynthesis.cancel(); },
    playTTS: function(text) { if (!this.isAudioAllowed) return; this.stopCurrentSound(); if ('speechSynthesis' in window) { window.currentUtterance = new SpeechSynthesisUtterance(text); window.currentUtterance.lang = 'en-US'; window.currentUtterance.rate = 0.9; window.speechSynthesis.speak(window.currentUtterance); } },
    playSequence: function(soundFile, textToRead) { if (!this.isAudioAllowed) return; this.stopCurrentSound(); const audio = new Audio(soundFile); audio.onended = () => { if (textToRead) setTimeout(() => { this.playTTS(textToRead); }, 300); }; audio.onerror = () => { if (textToRead) this.playTTS(textToRead); }; audio.play().catch(e => { if (textToRead) this.playTTS(textToRead); }); },
    playEffect: function(type) { if (!this.isAudioAllowed) return; if (type === 'correct') this.audioCorrect.play().catch(e=>{}); if (type === 'wrong') this.audioWrong.play().catch(e=>{}); if (type === 'win') this.audioWin.play().catch(e=>{}); }
};

/* --- SHADOWING ENGINE --- */
const ShadowingEngine = {
    player: null, currentData: null, loopInterval: null, isPlayingSegment: false, currentTarget: null, 
    init: function(movieData) { this.currentData = movieData; const mt = document.getElementById('movie-title'); if(mt) mt.innerText = movieData.title; this.renderSegments(); if (!this.player) { this.player = new YT.Player('youtube-player', { height: '100%', width: '100%', videoId: movieData.youtubeId, playerVars: { 'playsinline': 1, 'controls': 1, 'rel': 0, 'cc_load_policy': 0 } }); } else { this.player.loadVideoById(movieData.youtubeId); } },
    changeSpeed: function(rate) { if (this.player && this.player.setPlaybackRate) { this.player.setPlaybackRate(rate); document.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active')); document.querySelectorAll('.speed-btn').forEach(b => { const txt = b.innerText; if (rate === 1 && txt === 'Normal') { b.classList.add('active'); } else if (parseFloat(txt) === rate) { b.classList.add('active'); } }); } },
    renderSegments: function() { const list = document.getElementById('segment-list'); if(!list) return; list.innerHTML = ''; this.currentData.segments.forEach((seg, index) => { const div = document.createElement('div'); div.className = 'segment-card'; div.id = `seg-${index}`; let ipaHtml = '<div class="seg-text-area">'; seg.parts.forEach(p => { const ipa = p.i || "&nbsp;"; ipaHtml += `<div class="seg-word-group"><div class="seg-ipa">${ipa}</div><div class="seg-txt">${p.t}</div></div>`; }); ipaHtml += '</div>'; div.innerHTML = `<div class="seg-controls"><div style="display:flex; align-items:center;"><span class="seg-number">#${index+1}</span></div><button class="btn-play-seg" onclick="ShadowingEngine.toggleLoop(${index}, this)">▶ Listen & Loop</button></div>${ipaHtml}`; list.appendChild(div); }); },
    toggleLoop: function(index, btn) { if (this.isPlayingSegment && this.currentIndex === index) { this.stopLoop(); return; } this.stopLoop(); this.currentIndex = index; this.isPlayingSegment = true; this.currentTarget = this.currentData.segments[index]; btn.innerHTML = "⏹ Stop Loop"; btn.classList.add('stop'); document.getElementById(`seg-${index}`).classList.add('playing'); this.player.seekTo(this.currentTarget.start); this.player.playVideo(); if (this.loopInterval) clearInterval(this.loopInterval); this.loopInterval = setInterval(() => { if (!this.player || !this.player.getCurrentTime) return; const curr = this.player.getCurrentTime(); if (curr >= this.currentTarget.end) { this.player.seekTo(this.currentTarget.start); } }, 50); },
    stopLoop: function() { this.isPlayingSegment = false; this.currentTarget = null; if (this.loopInterval) clearInterval(this.loopInterval); if (this.player && this.player.pauseVideo) this.player.pauseVideo(); document.querySelectorAll('.btn-play-seg').forEach(b => { b.innerHTML = "▶ Listen & Loop"; b.classList.remove('stop'); }); document.querySelectorAll('.segment-card').forEach(c => c.classList.remove('playing')); }
};

/* --- GAME ENGINE --- */
const GameEngine = {
    active: false, moleLoop: null, moleAudioLoop: null, hammerTimeout: null, timerInt: null, score: 0, sec: 0, moles: [], moleRemainingWords: [], moleTarget: null, currentConfig: null, currentDataPool: [], WINNING_SCORE: 1000, 
    start: function(config, dataPool) {
        this.currentConfig = config; this.currentDataPool = dataPool;
        if (config.gameType === 'snake') { SnakeEngine.start(config, dataPool); return; }
        if (config.gameType === 'mole') { this.startMoleGame(); return; } 
        this.startFlipGame();
    },
    restart: function() { if(this.currentConfig) this.start(this.currentConfig, this.currentDataPool); },
    stop: function() { this.active = false; clearInterval(this.moleAudioLoop); clearTimeout(this.moleLoop); clearInterval(this.timerInt); clearTimeout(this.hammerTimeout); document.querySelectorAll('.mole').forEach(m => m.classList.remove('up', 'bonked')); const hammer = document.getElementById('cursor-hammer'); if(hammer) hammer.classList.remove('active'); SnakeEngine.stop(); },
    startMoleGame: function() { this.stop(); this.active = true; this.score = 0; this.sec = 0; this.updateScore(0); this.moles = document.querySelectorAll('.mole'); App.setDisplay('tower', 'none'); App.setDisplay('whack-wrapper', 'flex'); App.setDisplay('win-modal', 'none'); App.setDisplay('snake-game-container', 'none'); this.refillMoleWords(); if(this.moleRemainingWords.length === 0) return alert("No words!"); this.startTimer(); this.nextMoleRound(); },
    refillMoleWords: function() { const tP = this.currentConfig.phoneme; this.moleRemainingWords = this.currentDataPool.filter(w => w.parts && w.parts.some(p => p.i && p.i.includes(tP))).sort(() => 0.5 - Math.random()); },
    nextMoleRound: function() { if (!this.active) return; if (this.score >= this.WINNING_SCORE) { this.win(); return; } if (this.moleRemainingWords.length === 0) { this.refillMoleWords(); } this.moleTarget = this.moleRemainingWords.pop(); let html = ''; this.moleTarget.parts.forEach(p => { const ipaHtml = p.i ? p.i : "&nbsp;"; html += `<div class="target-char"><div class="target-ipa">${ipaHtml}</div><div class="target-txt">${p.t}</div></div>`; }); const tc = document.getElementById('target-word-container'); if(tc) tc.innerHTML = html; AudioEngine.playTTS(this.moleTarget.speak); clearInterval(this.moleAudioLoop); this.moleAudioLoop = setInterval(() => { if(this.active) AudioEngine.playTTS(this.moleTarget.speak); }, 2000); this.peep(); },
    peep: function() { if (!this.active) return; let speed = Math.max(600, 1500 - (this.score * 0.8)); const time = speed + Math.random() * 400; const hole = this.moles[Math.floor(Math.random() * this.moles.length)]; let isTarget = Math.random() < 0.4; let mData = isTarget ? this.moleTarget : this.currentDataPool[Math.floor(Math.random() * this.currentDataPool.length)]; const imgEl = hole.querySelector('img'); if(imgEl) imgEl.src = mData.img; hole.dataset.speak = mData.speak; hole.classList.add('up'); this.moleLoop = setTimeout(() => { hole.classList.remove('up'); if (this.active) this.peep(); }, time); },
    bonk: function(moleEl, event) { if(!moleEl.classList.contains('up') || !this.active) return; let touchX = event.clientX || event.pageX; let touchY = event.clientY || event.pageY; this.spawnHammer(touchX, touchY); const clickedWord = moleEl.dataset.speak; if (clickedWord === this.moleTarget.speak) { AudioEngine.playEffect('correct'); moleEl.classList.add('bonked'); this.updateScore(100); this.showFloatingText(touchX, touchY, "+100", "yellow"); setTimeout(() => { moleEl.classList.remove('up', 'bonked'); clearTimeout(this.moleLoop); this.nextMoleRound(); }, 300); } else { AudioEngine.playEffect('wrong'); moleEl.classList.remove('up'); this.updateScore(-50); this.showFloatingText(touchX, touchY, "-50", "red"); } },
    spawnHammer: function(x, y) { const hammer = document.getElementById('cursor-hammer'); if(!hammer) return; hammer.style.left = (x - 60) + 'px'; hammer.style.top = (y - 70) + 'px'; hammer.classList.remove('active'); void hammer.offsetWidth; hammer.classList.add('active'); clearTimeout(this.hammerTimeout); this.hammerTimeout = setTimeout(() => { hammer.classList.remove('active'); }, 150); },
    startFlipGame: function() { this.stop(); this.active = true; this.sec = 0; this.matches = 0; App.setDisplay('tower', 'flex'); App.setDisplay('whack-wrapper', 'none'); App.setDisplay('win-modal', 'none'); App.setDisplay('snake-game-container', 'none'); const tower = document.getElementById('tower'); if(!tower) return; tower.innerHTML = ''; let cards = []; let validItems = []; this.currentConfig.pairs.forEach(key => { let original = this.currentDataPool.find(d => { if(d.type === 'game' || d.type === 'sent') return false; let fullWord = d.parts.map(p => p.t).join(""); return fullWord === key; }); if(original) validItems.push(original); }); validItems.sort(() => 0.5 - Math.random()); validItems = validItems.slice(0, 5); validItems.forEach(original => { cards.push({ id: original.speak, type: 'img', content: `<img src="${original.img}">`, speak: original.speak }); let htmlText = `<div class="game-card-text">`; original.parts.forEach(p => { htmlText += `<div class="gc-block"><div class="gc-ipa">${p.i || "&nbsp;"}</div><div class="gc-word">${p.t}</div></div>`; }); htmlText += `</div>`; cards.push({ id: original.speak, type: 'text', content: htmlText, speak: original.speak }); }); cards.sort(() => 0.5 - Math.random()); let cCount = 0; let num = 1; const rows = [3, 2, 3, 2]; rows.forEach(cnt => { const rowDiv = document.createElement('div'); rowDiv.className = 'tower-row'; for(let k=0; k<cnt; k++) { if(cCount >= cards.length) break; const c = cards[cCount]; const el = document.createElement('div'); el.className = 'card-flip'; el.dataset.speak = c.speak; el.dataset.id = c.id; el.innerHTML = `<div class="card-inner"><div class="face front">${num}</div><div class="face back">${c.content}</div></div>`; el.onclick = function() { GameEngine.cardClick(this); }; rowDiv.appendChild(el); cCount++; num++; } tower.appendChild(rowDiv); }); this.startTimer(); },
    cardClick: function(el) { if(el.classList.contains('flipped') || el.classList.contains('matched')) return; el.classList.add('flipped'); AudioEngine.playTTS(el.dataset.speak); if(!this.c1) { this.c1 = el; } else { this.c2 = el; if(this.c1.dataset.id === this.c2.dataset.id) { setTimeout(() => { this.c1.classList.add('matched'); this.c2.classList.add('matched'); this.c1 = null; this.c2 = null; this.matches++; AudioEngine.playEffect('correct'); if(this.matches === 5) this.win(); }, 600); } else { setTimeout(() => { this.c1.classList.remove('flipped'); this.c2.classList.remove('flipped'); this.c1 = null; this.c2 = null; AudioEngine.playEffect('wrong'); }, 1000); } } },
    startTimer: function() { clearInterval(this.timerInt); const t = document.getElementById('timer'); if(t) t.innerText = "00:00"; this.timerInt = setInterval(() => { this.sec++; let m=Math.floor(this.sec/60).toString().padStart(2,'0'); let s=(this.sec%60).toString().padStart(2,'0'); if(t) t.innerText = `${m}:${s}`; }, 1000); },
    updateScore: function(val) { this.score += val; if(this.score < 0) this.score = 0; const s = document.getElementById('score-display'); if(s) s.innerText = this.score; },
    showFloatingText: function(x, y, text, color) { const el = document.createElement('div'); el.className = 'floating-text'; el.innerText = text; el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.color = color; document.body.appendChild(el); setTimeout(() => el.remove(), 800); },
    win: function() { 
        this.stop(); AudioEngine.playEffect('win'); AudioEngine.playTTS("Excellent job!"); 
        const wm = document.getElementById('win-msg'); const t = document.getElementById('timer');
        if(wm) wm.innerText = "Time (Thời gian): " + (t ? t.innerText : "00:00"); 
        const fs = document.getElementById('final-score'); if(fs) fs.innerText = this.score; 

        const gameId = this.currentConfig.gameType || 'flip'; 
        const recordData = StorageEngine.saveHighScore(gameId, this.score);
        const hsd = document.getElementById('high-score-display'); if(hsd) hsd.innerText = "🏆 High Score (Kỷ lục): " + recordData.highScore;
        const nrm = document.getElementById('new-record-msg'); if(nrm) nrm.style.display = recordData.isNewRecord ? 'block' : 'none';

        if (App.currentPart === 1 && typeof LearningEngine !== 'undefined') {
            StorageEngine.saveLessonProgress(LearningEngine.currentLessonId, LearningEngine.idx);
            LearningEngine.checkLessonComplete();
        }
        App.setDisplay('win-modal', 'flex'); 
    }
};

/* --- SNAKE ENGINE --- */
const SnakeEngine = {
    active: false, paused: false, gameLoopId: null, audioLoopId: null, boardSize: 15, snake: [], direction: {x: 0, y: 0}, nextDirection: {x: 0, y: 0}, 
    foods: [], score: 0, speed: 300, targetPhoneme: "", currentTargetWord: null, poolCorrect: [], poolWrong: [], lives: 3,
    start: function(config, dataPool) {
        this.stop(); this.active = true; this.paused = false; this.score = 0; this.speed = 550; this.lives = 3; this.targetPhoneme = config.phoneme;
        this.poolCorrect = dataPool.filter(w => w.parts && w.parts.some(p => p.i && p.i.includes(this.targetPhoneme)));
        this.poolWrong = dataPool.filter(w => !w.parts || !w.parts.some(p => p.i && p.i.includes(this.targetPhoneme)));
        if (this.poolCorrect.length === 0) return alert("Missing data for /" + this.targetPhoneme + "/");
        App.setDisplay('tower', 'none'); App.setDisplay('whack-wrapper', 'none'); App.setDisplay('win-modal', 'none'); App.setDisplay('pause-modal', 'none'); App.setDisplay('snake-game-container', 'flex');
        const ss = document.getElementById('snake-score'); if(ss) ss.innerText = this.score;
        this.updateLivesUI();
        const center = Math.floor(this.boardSize / 2);
        this.snake = [{x: center, y: center}, {x: center, y: center + 1}, {x: center, y: center + 2}];
        this.direction = {x: 0, y: -1}; this.nextDirection = {x: 0, y: -1};
        this.createBoard(); this.spawnFoods(); this.gameLoop(); this.startAudioLoop();
    },
    stop: function() { this.active = false; clearTimeout(this.gameLoopId); clearInterval(this.audioLoopId); },
    togglePause: function() { if (!this.active) return; this.paused = !this.paused; const modal = document.getElementById('pause-modal'); if(!modal) return; if (this.paused) { modal.style.display = 'flex'; clearInterval(this.audioLoopId); } else { modal.style.display = 'none'; this.gameLoop(); this.startAudioLoop(); } },
    startAudioLoop: function() { clearInterval(this.audioLoopId); if(this.currentTargetWord) AudioEngine.playTTS(this.currentTargetWord.speak); this.audioLoopId = setInterval(() => { if (this.active && !this.paused && this.currentTargetWord) { AudioEngine.playTTS(this.currentTargetWord.speak); } }, 4000); },
    createBoard: function() { const board = document.getElementById('snake-board'); if(!board) return; board.innerHTML = ''; board.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`; board.style.gridTemplateRows = `repeat(${this.boardSize}, 1fr)`; for(let i=0; i < this.boardSize * this.boardSize; i++) { const cell = document.createElement('div'); cell.className = 'grid-cell'; board.appendChild(cell); } },
    updateLivesUI: function() { let hearts = ""; for(let i=0; i<this.lives; i++) hearts += "❤️"; for(let i=this.lives; i<3; i++) hearts += "🖤"; const sl = document.getElementById('snake-lives'); if(sl) sl.innerText = hearts; },
    handleDeath: function(msg) { this.lives--; this.updateLivesUI(); AudioEngine.playEffect('wrong'); if (this.lives <= 0) { this.showGameOver(msg + " Hết mạng!"); } else { const center = Math.floor(this.boardSize / 2); this.snake = [{x: center, y: center}, {x: center, y: center + 1}, {x: center, y: center + 2}]; this.direction = {x: 0, y: -1}; this.nextDirection = {x: 0, y: -1}; } },
    gameLoop: function() { if (!this.active || this.paused) return; this.direction = this.nextDirection; const head = { ...this.snake[0] }; head.x += this.direction.x; head.y += this.direction.y; if (this.isCollision(head)) { this.handleDeath("Rắn đụng tường!"); if(this.lives > 0) { this.draw(); this.gameLoopId = setTimeout(() => { if(this.active) this.gameLoop(); }, this.speed); return; } else return; } this.snake.unshift(head); let ate = false; const foodIndex = this.foods.findIndex(f => f.x === head.x && f.y === head.y); if (foodIndex !== -1) { const food = this.foods[foodIndex]; if (food.isCorrect) { ate = true; this.score += 10; const ss = document.getElementById('snake-score'); if(ss) ss.innerText = this.score; AudioEngine.playEffect('correct'); if (this.speed > 150) this.speed -= 20; this.foods.splice(foodIndex, 1); this.spawnFoods(); this.startAudioLoop(); if (this.score >= 100) { this.win(); return; } } else { this.handleDeath(`Sai rồi! "${food.word}"!`); if(this.lives > 0) { this.foods.splice(foodIndex, 1); this.snake.pop(); this.draw(); this.gameLoopId = setTimeout(() => { if(this.active) this.gameLoop(); }, this.speed); return; } else return; } } if (!ate) this.snake.pop(); this.draw(); this.gameLoopId = setTimeout(() => { if(this.active) this.gameLoop(); }, this.speed); },
    isCollision: function(pos) { if (pos.x < 0 || pos.x >= this.boardSize || pos.y < 0 || pos.y >= this.boardSize) return true; for (let i = 1; i < this.snake.length; i++) if (pos.x === this.snake[i].x && pos.y === this.snake[i].y) return true; return false; },
    spawnFoods: function() { this.foods = []; const correctWord = this.poolCorrect[Math.floor(Math.random() * this.poolCorrect.length)]; this.currentTargetWord = correctWord; const validWrongPool = this.poolWrong.filter(w => !w.img.includes("card.jpg")); const wrongWords = validWrongPool.sort(() => 0.5 - Math.random()).slice(0, 2); const itemsToSpawn = [{ ...correctWord, isCorrect: true, icon: '🍎' }, { ...wrongWords[0], isCorrect: false, icon: '🍄' }]; if (wrongWords[1]) itemsToSpawn.push({ ...wrongWords[1], isCorrect: false, icon: '💣' }); itemsToSpawn.forEach(item => { let pos; do { pos = { x: Math.floor(Math.random() * (this.boardSize - 2)) + 1, y: Math.floor(Math.random() * (this.boardSize - 2)) + 1 }; let isSafeZone = (pos.y >= 11 && pos.x >= 4 && pos.x <= 10); if (isSafeZone) continue; let isTooClose = this.foods.some(f => Math.abs(f.x - pos.x) <= 1 && Math.abs(f.y - pos.y) <= 1); if (isTooClose) continue; } while (this.isOccupied(pos) || this.foods.some(f => Math.abs(f.x - pos.x) <= 1 && Math.abs(f.y - pos.y) <= 1)); this.foods.push({ x: pos.x, y: pos.y, img: item.img, word: item.speak, isCorrect: item.isCorrect, icon: item.icon }); }); let ipaHtml = ""; if (correctWord.type !== 'sent' && correctWord.speak.split(' ').length < 2) { let ipaStr = ""; if (correctWord.parts) { ipaStr = correctWord.parts.map(p => p.i).join("").replace(/&nbsp;/g, ""); } ipaHtml = `<div style="color:red; font-size:14px;">/${ipaStr}/</div>`; } let fontSize = (correctWord.type === 'sent') ? '18px' : '24px'; const stc = document.getElementById('snake-target-content'); if(stc) stc.innerHTML = `${ipaHtml}<div style="color:#d35400; font-size:${fontSize}; font-weight:900;">${correctWord.speak}</div>`; },
    isOccupied: function(pos) { if (this.snake.some(s => s.x === pos.x && s.y === pos.y)) return true; if (this.foods.some(f => f.x === pos.x && f.y === pos.y)) return true; const head = this.snake[0]; if (Math.abs(pos.x - head.x) < 3 && Math.abs(pos.y - head.y) < 3) return true; return false; },
    draw: function() { const cells = document.querySelectorAll('.grid-cell'); cells.forEach(c => { c.className = 'grid-cell'; c.innerHTML = ''; }); this.foods.forEach(f => { const idx = f.y * this.boardSize + f.x; if (cells[idx]) { cells[idx].innerHTML = `<div class="food-item" style="z-index:10"><img class="food-img" src="${f.img}" onerror="this.style.display='none'"><div class="food-core">${f.icon}</div></div>`; } }); this.snake.forEach((part, index) => { const idx = part.y * this.boardSize + part.x; if (cells[idx]) { const div = document.createElement('div'); div.classList.add('snake-part'); if (index === 0) { div.classList.add('snake-head'); if (this.direction.y === -1) div.classList.add('head-down'); else if (this.direction.y === 1) div.classList.add('head-up'); else if (this.direction.x === -1) div.classList.add('head-left'); else if (this.direction.x === 1) div.classList.add('head-right'); } cells[idx].appendChild(div); } }); },
    changeDirection: function(newDirName) { if (this.paused) return; let newDir = {x:0, y:0}; if (newDirName === 'up') newDir = {x: 0, y: -1}; if (newDirName === 'down') newDir = {x: 0, y: 1}; if (newDirName === 'left') newDir = {x: -1, y: 0}; if (newDirName === 'right') newDir = {x: 1, y: 0}; if (this.direction.x + newDir.x === 0 && this.direction.y + newDir.y === 0) return; this.nextDirection = newDir; },
    endGame: function(msg, isWin) { 
        this.stop(); if(isWin) { AudioEngine.playEffect('win'); AudioEngine.playTTS("You Win!"); } else { AudioEngine.playTTS("Game Over!"); }
        const wm = document.getElementById('win-msg'); if(wm) wm.innerText = msg; 
        const fs = document.getElementById('final-score'); if(fs) fs.innerText = this.score; 
        const recordData = StorageEngine.saveHighScore('snake', this.score);
        const hsd = document.getElementById('high-score-display'); if(hsd) hsd.innerText = "🏆 High Score (Kỷ lục): " + recordData.highScore;
        const nrm = document.getElementById('new-record-msg'); if(nrm) nrm.style.display = recordData.isNewRecord ? 'block' : 'none';
        
        if (isWin && App.currentPart === 1 && typeof LearningEngine !== 'undefined') {
            StorageEngine.saveLessonProgress(LearningEngine.currentLessonId, LearningEngine.idx);
            LearningEngine.checkLessonComplete();
        }
        App.setDisplay('win-modal', 'flex'); 
    },
    showGameOver: function(msg) { this.endGame(msg + " (Thử lại nhé!)", false); },
    win: function() { this.endGame("Awesome! (Tuyệt vời!)", true); }
};

/* --- LEARNING ENGINE --- */
const LearningEngine = {
    currentData: [], idx: 0, currentLessonId: 0, listenTimeout: null, 
    checkLessonComplete: function() {
        let totalItems = this.currentData.length;
        let currentProgress = StorageEngine.getLessonProgress(this.currentLessonId, totalItems);
        if (currentProgress >= 100) {
            if(!this.currentData.completedFlag) {
                this.currentData.completedFlag = true;
                QuestEngine.updateWeeklyQuest();
                StorageEngine.setGems(StorageEngine.getGems() + 20); 
                if(typeof App !== 'undefined') App.updateGemDisplay();
            }
        }
    },
    initLesson: function(lessonNum) { this.currentLessonId = lessonNum; if(typeof DataEngine !== 'undefined') this.currentData = DataEngine.getLesson(lessonNum); this.idx = 0; this.preload(); },
    preload: function() { this.currentData.forEach(item => { if(item.img) new Image().src = item.img; }); },
    render: function() {
        const item = this.currentData[this.idx]; if(!item) return; AudioEngine.stopCurrentSound();
        App.setDisplay('game-screen', 'none'); App.setDisplay('learning-screen', 'flex'); App.setDisplay('win-modal', 'none'); 
        const s = document.getElementById('stars'); if(s){ s.innerText = "☆☆☆☆☆"; s.classList.remove('active'); }
        const fb = document.getElementById('feedback'); if(fb) fb.innerText = "...";
        
        let progressData = JSON.parse(localStorage.getItem('eng_lesson_map') || '{}');
        let completedSet = progressData[this.currentLessonId] || [];
        const dotsContainer = document.getElementById('lesson-dots-container');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            this.currentData.forEach((_, i) => {
                const dot = document.createElement('div'); dot.className = 'lesson-dot';
                if (completedSet.includes(i)) dot.classList.add('completed');
                if (i === this.idx) dot.classList.add('active');
                dot.onclick = () => { this.idx = i; this.render(); }; 
                dotsContainer.appendChild(dot);
            });
        }

        const imgEl = document.getElementById('learn-img'); const btnContainer = document.getElementById('action-container'); const infoDisplay = document.getElementById('info-display');
        if(item.type === 'game') {
            if(imgEl) imgEl.src = item.img || 'https://img.icons8.com/color/500/controller.png';
            let titleColor = item.title.includes("GAME 1") ? "#e67e22" : (item.title.includes("GAME 2") ? "#9b59b6" : "#333");
            if(infoDisplay) infoDisplay.innerHTML = `<h2 class="word-display" style="font-size:28px; color:${titleColor}; font-weight:900;">${item.title}</h2>`;
            if(btnContainer) btnContainer.innerHTML = `<button class="btn-action btn-game-entry" onclick="App.enterGame()">  🚀   Play Now</button>`;
        } else {
            if(imgEl) imgEl.src = item.img; 
            if(btnContainer) btnContainer.innerHTML = ` <button class="btn-action btn-mic" id="mic-btn" onclick="LearningEngine.startListening()">  🎤   Read Now</button> <button class="btn-action btn-listen" id="btn-replay" onclick="LearningEngine.onUserClickSpeak()">  🔊   Listen</button> `;
            let html = ''; let currentWordBuffer = [];
            item.parts.forEach((p, index) => { if (p.t === " ") { if (currentWordBuffer.length > 0) { html += `<div class="word-group">`; currentWordBuffer.forEach(subP => { const ipaHtml = subP.i || "&nbsp;"; html += `<div class="char-block"><div class="${(item.type === 'sent') ? 'sent-ipa' : 'cb-ipa'}">${ipaHtml}</div><div class="${(item.type === 'sent') ? 'sent-text' : 'cb-text'}">${subP.t}</div></div>`; }); html += `</div>`; currentWordBuffer = []; } } else { currentWordBuffer.push(p); } });
            if (currentWordBuffer.length > 0) { html += `<div class="word-group">`; currentWordBuffer.forEach(subP => { const ipaHtml = subP.i || "&nbsp;"; html += `<div class="char-block"><div class="${(item.type === 'sent') ? 'sent-ipa' : 'cb-ipa'}">${ipaHtml}</div><div class="${(item.type === 'sent') ? 'sent-text' : 'cb-text'}">${subP.t}</div></div>`; }); html += `</div>`; }
            if(infoDisplay) infoDisplay.innerHTML = html;
        }
    },
    nav: function(d) { if(this.idx + d >= 0 && this.idx + d < this.currentData.length) { this.idx += d; this.render(); } }, nextItem: function() { this.nav(1); },
    onUserClickSpeak: function() { const item = this.currentData[this.idx]; if(item && item.type !== 'game') { let soundFile = null; let textToRead = item.speak; if(item.pre && item.type !== 'sent') { soundFile = "sound_" + item.pre + ".wav"; } if(item.type === 'exam-ipa') { soundFile = item.speak; textToRead = null; } if (soundFile) { AudioEngine.playSequence(soundFile, textToRead); } else { AudioEngine.playTTS(textToRead); } } },
    startListening: function() { 
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SpeechRecognition) return alert("Device not supported"); 
        const btn = document.getElementById('mic-btn'); if(btn) { btn.disabled = true; btn.innerText = "  👂   Listening..."; btn.style.backgroundColor = "#e74c3c"; }
        const currentItem = this.currentData[this.idx]; const wordCount = currentItem.speak.trim().split(/\s+/).length; const isSentence = (currentItem.type === 'sent') || (wordCount >= 2); const waitTime = isSentence ? 15000 : 5000; 
        const recognition = new SpeechRecognition(); recognition.lang = 'en-US'; recognition.continuous = false; recognition.interimResults = false; recognition.start(); 
        if(this.listenTimeout) clearTimeout(this.listenTimeout); this.listenTimeout = setTimeout(() => { if(btn && btn.disabled) recognition.stop(); }, waitTime);
        recognition.onresult = (e) => { let heard = []; for(let i=0; i<e.results[0].length; i++) heard.push(e.results[0][i].transcript.toLowerCase()); this.checkResult(heard); }; 
        recognition.onerror = () => { this.resetMic(); }; recognition.onend = () => { if(btn && btn.disabled) this.resetMic(); }; 
    },
    resetMic: function() { if(this.listenTimeout) clearTimeout(this.listenTimeout); const btn = document.getElementById('mic-btn'); if(btn) { btn.disabled = false; btn.innerText = "  🎤   Read Now"; btn.style.backgroundColor = "#27ae60"; } },
    checkResult: function(heardArray) { 
        const item = this.currentData[this.idx]; const normalize = (str) => str.toLowerCase().replace(/[.,!?;:]/g, "").trim(); const targetRaw = normalize(item.speak);
        let validTargets = [targetRaw]; if (item.pre) validTargets.push(normalize(item.pre + " " + item.speak));
        const wordCount = targetRaw.split(/\s+/).length; const isSentence = (item.type === 'sent') || (wordCount >= 2); let bestAccuracy = 0;
        for (let text of heardArray) { let userText = normalize(text); for (let target of validTargets) { if (isSentence) { const targetWords = target.split(/\s+/); const userWords = userText.split(/\s+/); let matchCount = 0; targetWords.forEach(w => { if (userWords.includes(w)) matchCount++; }); let accuracy = (matchCount / targetWords.length) * 100; if (accuracy > bestAccuracy) bestAccuracy = accuracy; } else { if (userText.includes(target)) bestAccuracy = 100; } } }
        let finalStars = 1; let msg = "Try again! (Thử lại nhé!)";
        if (bestAccuracy >= 100) { finalStars = 5; msg = "Excellent! 🎉 (Tuyệt vời!)"; AudioEngine.playEffect('win'); } else if (bestAccuracy >= 75) { finalStars = 4; msg = "Very Good! 🎉 (Rất tốt!)"; AudioEngine.playEffect('win'); } else if (bestAccuracy >= 50) { finalStars = 3; msg = "Good try! (Cố lên nhé!)"; AudioEngine.playEffect('correct'); } else { finalStars = 1; msg = "Try again! (Thử lại nhé!)"; AudioEngine.playEffect('wrong'); }

        if (finalStars >= 3) {
            StorageEngine.saveLessonProgress(this.currentLessonId, this.idx);
            StorageEngine.setGems(StorageEngine.getGems() + 2);
            if(typeof App !== 'undefined') App.updateGemDisplay();
            this.checkLessonComplete();
        }

        let s = ""; for(let i=0; i<5; i++) s += (i < finalStars) ? "  ⭐  " : "☆"; 
        const st = document.getElementById('stars'); if(st) { st.innerText = s; st.className = (finalStars >= 3) ? "stars active" : "stars"; }
        const fb = document.getElementById('feedback'); if(fb) fb.innerText = msg; 
        this.resetMic(); 
    }
};

/* --- VOCAB ENGINE --- */
const VocabEngine = {
    currentTopic: null, idx: 0, gameQueue: [], retryQueue: [], currentQuestion: null, score: 0, streak: 0, isProcessing: false, 
    
    init: function(topicData) {
        this.currentTopic = topicData;
        const vt = document.getElementById('vocab-title'); if(vt) vt.innerText = topicData.topic;
        App.setDisplay('vocab-part-menu', 'flex'); App.setDisplay('vocab-learn-container', 'none'); App.setDisplay('vocab-pacman-container', 'none'); App.setDisplay('vocab-reading-container', 'none');
    },

    startPart1: function() { App.setDisplay('vocab-part-menu', 'none'); App.setDisplay('vocab-learn-container', 'flex'); this.idx = 0; this.renderLearnCard(); },
    startPart2: function() { App.setDisplay('vocab-part-menu', 'none'); App.setDisplay('vocab-pacman-container', 'flex'); alert("Sẵn sàng cho Game Pac-man nhé? Mình sẽ thiết kế ở bước tiếp theo!"); },
    startPart3: function() { App.setDisplay('vocab-part-menu', 'none'); App.setDisplay('vocab-reading-container', 'flex'); ReadingEngine.init(this.currentTopic.reading); },

    renderLearnCard: function() {
        const item = this.currentTopic.vocab[this.idx];
        const vi = document.getElementById('v-learn-img'); if(vi) vi.src = item.img;
        const vs = document.getElementById('v-stars'); if(vs) { vs.innerText = "☆☆☆☆☆"; vs.className = "stars"; }
        const vf = document.getElementById('v-feedback'); if(vf) vf.innerText = "...";
        
        // --- VẼ THANH CHẤM TRÒN ---
        let progressData = JSON.parse(localStorage.getItem('eng_lesson_map') || '{}');
        let completedSet = progressData[this.currentTopic.id] || []; // Lấy ID của Unit
        const dotsContainer = document.getElementById('vocab-dots-container');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            this.currentTopic.vocab.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = 'lesson-dot';
                if (completedSet.includes(i)) dot.classList.add('completed');
                if (i === this.idx) dot.classList.add('active');
                dot.onclick = () => { this.idx = i; this.renderLearnCard(); }; 
                dotsContainer.appendChild(dot);
            });
        }

        // Vẽ 2 dòng (Từ & Câu)
        const renderParts = (partsArray, isSentence) => {
            if (!partsArray) return '';
            let html = ''; let currentWordBuffer = [];
            partsArray.forEach(p => { if (p.t === " ") { if (currentWordBuffer.length > 0) { html += `<div class="word-group">`; currentWordBuffer.forEach(subP => { const ipaHtml = subP.i || "&nbsp;"; html += `<div class="char-block"><div class="${isSentence ? 'sent-ipa' : 'cb-ipa'}">${ipaHtml}</div><div class="${isSentence ? 'sent-text' : 'cb-text'}">${subP.t}</div></div>`; }); html += `</div>`; currentWordBuffer = []; } } else { currentWordBuffer.push(p); } });
            if (currentWordBuffer.length > 0) { html += `<div class="word-group">`; currentWordBuffer.forEach(subP => { const ipaHtml = subP.i || "&nbsp;"; html += `<div class="char-block"><div class="${isSentence ? 'sent-ipa' : 'cb-ipa'}">${ipaHtml}</div><div class="${isSentence ? 'sent-text' : 'cb-text'}">${subP.t}</div></div>`; }); html += `</div>`; }
            return html;
        };

        let html = '';
        html += '<div style="display:flex; justify-content:center; width:100%; margin-bottom: 25px;">' + renderParts(item.wordParts, false) + '</div>';
        html += '<div style="display:flex; justify-content:center; width:100%; flex-wrap: wrap;">' + renderParts(item.sentParts, true) + '</div>';

        const vid = document.getElementById('v-info-display'); if(vid) vid.innerHTML = html;
        setTimeout(() => this.playCurrentWord(), 300);
    },

    playCurrentWord: function() { 
        const item = this.currentTopic.vocab[this.idx]; 
        const wordAudio = new Audio(item.audio);
        wordAudio.onended = () => { if (item.exampleAudio) { setTimeout(() => { const exampleAudio = new Audio(item.exampleAudio); exampleAudio.play().catch(e => console.log("Missing example audio")); }, 500); } };
        wordAudio.play().catch(e => console.log("Missing word audio"));
    },
    
    nav: function(d) { if (this.idx + d >= 0 && this.idx + d < this.currentTopic.vocab.length) { this.idx += d; this.renderLearnCard(); } },
    
    startListening: function() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SpeechRecognition) return alert("Device not supported");
        const btn = document.getElementById('v-mic-btn'); if(btn){ btn.disabled = true; btn.innerText = "👂 Listening..."; btn.style.backgroundColor = "#e74c3c"; }
        const currentItem = this.currentTopic.vocab[this.idx]; const recognition = new SpeechRecognition(); recognition.lang = 'en-US'; recognition.start();
        
        recognition.onresult = (e) => {
            const heard = e.results[0][0].transcript.toLowerCase(); const target = currentItem.speak.toLowerCase();
            const vs = document.getElementById('v-stars'); const vf = document.getElementById('v-feedback');
            
            if (heard.includes(target)) { 
                if(vs) {vs.innerText = "⭐⭐⭐⭐⭐"; vs.className = "stars active";} 
                if(vf) vf.innerText = "Correct: " + heard; 
                AudioEngine.playEffect('correct'); 
                
                // LƯU TIẾN ĐỘ VÀ CỘNG GEM
                StorageEngine.saveLessonProgress(this.currentTopic.id, this.idx);
                StorageEngine.setGems(StorageEngine.getGems() + 2);
                if(typeof App !== 'undefined') App.updateGemDisplay();
                
                // Kiểm tra xem đã hoàn thành 100% chưa
                let totalItems = this.currentTopic.vocab.length;
                let currentProgress = StorageEngine.getLessonProgress(this.currentTopic.id, totalItems);
                if (currentProgress >= 100 && !this.currentTopic.completedFlag) {
                    this.currentTopic.completedFlag = true;
                    QuestEngine.updateWeeklyQuest();
                    StorageEngine.setGems(StorageEngine.getGems() + 20); // Thưởng hoàn thành
                    if(typeof App !== 'undefined') App.updateGemDisplay();
                }

            } else { 
                if(vs) vs.innerText = "⭐☆☆☆☆"; 
                if(vf) vf.innerText = "Heard: " + heard; 
                AudioEngine.playEffect('wrong'); 
            }
            this.resetMic();
        };
        recognition.onerror = () => this.resetMic(); recognition.onend = () => this.resetMic();
    },
    
    resetMic: function() { const btn = document.getElementById('v-mic-btn'); if(btn){ btn.disabled = false; btn.innerText = "🎤 Read"; btn.style.backgroundColor = "#27ae60"; } }
};

/* --- READING ENGINE (CHẤM LỖI TỰ LUẬN & TRẮC NGHIỆM) --- */
const ReadingEngine = {
    currentData: null,
    quizList: [],
    currentQIdx: 0,
    score: 0,
    audio: null,

    init: function(readingData) {
        this.currentData = readingData;
        this.quizList = readingData.quiz;
        this.currentQIdx = 0;
        this.score = 0;

        document.getElementById('read-title').innerText = readingData.title;
        document.getElementById('read-img').src = readingData.img;
        document.getElementById('read-text').innerText = readingData.text;

        this.audio = new Audio(readingData.audio);

        this.renderQuestion();
    },

    readAloud: function() {
        if (this.audio) {
            this.audio.play().catch(e => alert("Không tìm thấy file audio: " + this.currentData.audio));
        }
    },

    renderQuestion: function() {
        if (this.currentQIdx >= this.quizList.length) {
            // Hoàn thành bài Đọc
            AudioEngine.playEffect('win');
            alert(`🎉 CHÚC MỪNG! Bạn đã hoàn thành bài đọc.\nĐiểm của bạn: ${this.score}/${this.quizList.length}`);
            StorageEngine.setGems(StorageEngine.getGems() + (this.score * 5)); // Cộng 5 gem cho mỗi câu đúng
            App.updateGemDisplay();
            App.openPart(3); // Quay lại menu chính
            return;
        }

        const qData = this.quizList[this.currentQIdx];
        document.getElementById('quiz-status').innerText = `Question ${this.currentQIdx + 1}/${this.quizList.length}`;
        document.getElementById('quiz-question').innerText = qData.q;
        
        const feedbackEl = document.getElementById('quiz-feedback');
        feedbackEl.innerText = "";
        feedbackEl.style.color = "#333";

        const interactiveArea = document.getElementById('quiz-interactive-area');
        interactiveArea.innerHTML = '';

        if (qData.type === "yesno") {
            interactiveArea.innerHTML = `
                <button class="btn-menu" style="width: 120px; border-color: #27ae60; color: #27ae60;" onclick="ReadingEngine.checkYesNo('yes')">YES</button>
                <button class="btn-menu" style="width: 120px; border-color: #e74c3c; color: #e74c3c;" onclick="ReadingEngine.checkYesNo('no')">NO</button>
            `;
        } else if (qData.type === "write") {
            interactiveArea.innerHTML = `
                <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                    <input type="text" id="write-answer-input" placeholder="Type your answer here..." style="font-size: 20px; padding: 10px; width: 90%; max-width: 400px; border-radius: 10px; border: 2px solid #3498db; margin-bottom: 10px; text-align: center;">
                    <button class="btn-action btn-listen" style="width: 200px; border-radius: 20px;" onclick="ReadingEngine.checkWrite()">Submit</button>
                </div>
            `;
        }
    },

    checkYesNo: function(userChoice) {
        const qData = this.quizList[this.currentQIdx];
        const feedbackEl = document.getElementById('quiz-feedback');
        
        if (userChoice === qData.a.toLowerCase()) {
            AudioEngine.playEffect('correct');
            feedbackEl.innerText = "Tuyệt vời! Chính xác 100%. 🎉";
            feedbackEl.style.color = "#27ae60";
            this.score++;
            setTimeout(() => { this.currentQIdx++; this.renderQuestion(); }, 1500);
        } else {
            AudioEngine.playEffect('wrong');
            feedbackEl.innerText = "Chưa đúng rồi. Bạn thử đọc lại đoạn văn nhé!";
            feedbackEl.style.color = "#e74c3c";
        }
    },

    checkWrite: function() {
        const inputEl = document.getElementById('write-answer-input');
        const userInput = inputEl.value;
        const qData = this.quizList[this.currentQIdx];
        const feedbackEl = document.getElementById('quiz-feedback');

        const result = this.analyzeWrittenAnswer(userInput, qData.a);

        if (result.status === "correct") {
            AudioEngine.playEffect('correct');
            feedbackEl.innerText = result.msg;
            feedbackEl.style.color = "#27ae60";
            this.score++;
            inputEl.disabled = true;
            setTimeout(() => { this.currentQIdx++; this.renderQuestion(); }, 2000);
        } else {
            AudioEngine.playEffect('wrong');
            feedbackEl.innerText = result.msg;
            feedbackEl.style.color = "#e74c3c";
            inputEl.style.animation = "shake 0.5s";
            setTimeout(() => inputEl.style.animation = "", 500);
        }
    },

    analyzeWrittenAnswer: function(userInput, acceptedAnswersArray) {
        // BƯỚC 1: Làm sạch (Xóa dấu câu, in thường, bỏ khoảng trắng thừa)
        const clean = (str) => str.toLowerCase().replace(/[.,?!]/g, "").trim().replace(/\s+/g, " ");
        const cleanInput = clean(userInput);
        
        if (cleanInput === "") return { status: "wrong", msg: "Bạn chưa nhập câu trả lời kìa!" };
        const cleanAccepted = acceptedAnswersArray.map(a => clean(a));

        // BƯỚC 2: Chấm đúng tuyệt đối
        if (cleanAccepted.includes(cleanInput)) {
            return { status: "correct", msg: "Tuyệt vời! Bạn viết đúng 100%. 🎉" };
        }

        // BƯỚC 3: Tìm đáp án mục tiêu gần giống nhất
        let bestMatch = cleanAccepted[0];
        let maxOverlap = -1;
        let inputWords = cleanInput.split(" ");
        
        for (let ans of cleanAccepted) {
            let ansWords = ans.split(" ");
            let overlap = 0;
            for (let w of inputWords) { if (ansWords.includes(w)) overlap++; }
            if (overlap > maxOverlap) { maxOverlap = overlap; bestMatch = ans; }
        }

        let targetWords = bestMatch.split(" ");

        // BƯỚC 4: Bắt lỗi chi tiết
        // 4.1 Lỗi thiếu từ
        if (inputWords.length < targetWords.length) {
            let missingWord = targetWords.find(w => !inputWords.includes(w));
            if (missingWord) return { status: "wrong", msg: `Oops! Bạn đang viết thiếu từ '${missingWord}' rồi.` };
            return { status: "wrong", msg: `Bạn đang viết thiếu từ, hãy kiểm tra lại nhé.` };
        }

        // 4.2 Lỗi dư từ
        if (inputWords.length > targetWords.length) {
            let extraWord = inputWords.find(w => !targetWords.includes(w));
            if (extraWord) return { status: "wrong", msg: `Bạn đang viết thừa từ '${extraWord}' ở đâu đó.` };
            return { status: "wrong", msg: `Câu của bạn đang bị dư từ rồi.` };
        }

        // 4.3 Lỗi sai chính tả
        for (let i = 0; i < targetWords.length; i++) {
            if (inputWords[i] !== targetWords[i]) {
                return { status: "wrong", msg: `Chữ '${inputWords[i]}' sai rồi. Bạn sửa lại thành '${targetWords[i]}' xem!` };
            }
        }

        return { status: "wrong", msg: "Chưa chính xác. Thử lại nhé!" };
    }
};

/* --- APP CONTROLLER (CHỐNG LỖI CSS & BẢO VỆ GIAO DIỆN) --- */
const App = {
    currentPart: 0, 
    init: function() {
        AudioEngine.stopAllAndBlock();
        const name = StorageEngine.getUserName();
        const onboardScreen = document.getElementById('onboarding-screen');
        const nameDisplay = document.getElementById('display-user-name');

        if (!name) {
            if (onboardScreen) {
                onboardScreen.style.display = 'flex';
            } else {
                setTimeout(() => {
                    let pName = prompt("Welcome! 👋 Chào mừng bạn! \nVui lòng nhập tên của bạn:");
                    if (pName && pName.trim() !== "") {
                        StorageEngine.setUserName(pName.trim());
                        if (nameDisplay) nameDisplay.innerText = pName.trim();
                        this.updateGemDisplay();
                        this.renderQuests();
                    }
                }, 500);
            }
        } else {
            if (onboardScreen) onboardScreen.style.display = 'none';
            if (nameDisplay) nameDisplay.innerText = name;
            this.updateGemDisplay();
            this.renderQuests();
        }
        
        this.setDisplay('landing-screen', 'flex'); 
        this.setDisplay('menu-screen', 'none');
        this.setDisplay('main-container', 'none');
        this.setDisplay('ipa-screen', 'none');
        this.setDisplay('shadowing-screen', 'none');
        this.setDisplay('vocab-screen', 'none');
    },
    
    // HÀM QUAN TRỌNG: Không ép về Flex nữa, cho phép tuỳ chỉnh thuộc tính
    setDisplay: function(id, val) {
        const el = document.getElementById(id);
        if (el) el.style.display = val;
    },

    saveUserName: function() {
        const input = document.getElementById('user-name-input');
        if (input) {
            const val = input.value.trim();
            if (val) { StorageEngine.setUserName(val); this.init(); }
        }
    },
    updateGemDisplay: function() { 
        const gemDisplay = document.getElementById('total-gems');
        if (gemDisplay) gemDisplay.innerText = StorageEngine.getGems(); 
    },
    renderQuests: function() {
        let quest = JSON.parse(localStorage.getItem('eng_weekly_quest') || '{"count":0}');
        let percent = (quest.count / 5) * 100;
        const qBar = document.getElementById('quest-bar');
        const qStatus = document.getElementById('quest-status');
        if (qBar) qBar.style.width = Math.min(percent, 100) + "%";
        if (qStatus) qStatus.innerText = `${quest.count}/5 lessons (bài học)`;
    },
    openPart: function(partId) { 
        this.currentPart = partId; 
        AudioEngine.unlock(); 
        this.setDisplay('landing-screen', 'none');
        this.setDisplay('shadowing-screen', 'none');
        this.setDisplay('menu-screen', 'none');
        
        if (partId === 1) { this.initPronunMenu(); } 
        else if (partId === 2) { this.initIntonationMenu(); } 
        else if (partId === 3) { this.initVocabMenu(); }
    },
    initPronunMenu: function() {
        const menuContainer = document.getElementById('menu-screen'); 
        if(!menuContainer) return;
        menuContainer.style.display = 'flex'; menuContainer.innerHTML = '';
        const btnBack = document.createElement('button'); btnBack.className = 'btn-menu'; btnBack.innerText = "🏠  Home (Trang chủ)"; btnBack.style.borderColor = "#7f8c8d"; btnBack.style.color = "#7f8c8d"; btnBack.onclick = function() { App.goHome(); }; menuContainer.appendChild(btnBack);
        const btnIPA = document.createElement('button'); btnIPA.className = 'btn-menu'; btnIPA.innerText = "🔠  IPA Chart (Bảng phiên âm)"; btnIPA.style.borderColor = "#9C27B0"; btnIPA.style.color = "#9C27B0"; btnIPA.onclick = function() { App.openIPA(); }; menuContainer.appendChild(btnIPA);
        
        if(typeof LevelMap !== 'undefined' && typeof DataEngine !== 'undefined') { 
            LevelMap.forEach(level => { 
                if (level.type === 'learn') { 
                    const btn = document.createElement('button'); 
                    btn.className = 'btn-menu'; 
                    const totalItems = DataEngine.getLesson(level.id).length;
                    const percent = StorageEngine.getLessonProgress(level.id, totalItems);

                    btn.innerHTML = `
                        ${level.label}
                        <span class="lesson-progress-text">${percent}% completed (hoàn thành)</span>
                        <div class="menu-btn-progress"><div class="menu-btn-fill" style="width:${percent}%"></div></div>
                    `;

                    if (level.label.includes("Ôn tập")) { btn.style.borderColor = "#ff9600"; btn.style.color = "#d35400"; } 
                    if (level.label.includes("THI THỬ")) { btn.style.borderColor = "#e74c3c"; btn.style.color = "#c0392b"; btn.style.borderWidth = "4px"; } 
                    btn.onclick = function() { App.startLesson(level.id); }; 
                    menuContainer.appendChild(btn); 
                } 
            }); 
        }
    },
    initIntonationMenu: function() {
        const menuContainer = document.getElementById('menu-screen'); 
        if(!menuContainer) return;
        menuContainer.style.display = 'flex'; menuContainer.innerHTML = '<div class="menu-title">Movie Shadowing</div>';
        const btnBack = document.createElement('button'); btnBack.className = 'btn-menu'; btnBack.innerText = "🏠  Home"; btnBack.style.borderColor = "#7f8c8d"; btnBack.style.color = "#7f8c8d"; btnBack.onclick = function() { App.goHome(); }; menuContainer.appendChild(btnBack);
        if(typeof IntonationData !== 'undefined') { IntonationData.forEach(item => { const btn = document.createElement('button'); btn.className = 'btn-menu'; btn.innerText = "🎬 " + item.title; btn.style.borderColor = "#2980b9"; btn.style.color = "#2980b9"; btn.onclick = function() { App.startShadowing(item); }; menuContainer.appendChild(btn); }); }
    },
    startShadowing: function(movieData) { 
        this.setDisplay('menu-screen', 'none');
        this.setDisplay('shadowing-screen', 'flex');
        ShadowingEngine.init(movieData); 
    },
    initVocabMenu: function() { 
        const menuContainer = document.getElementById('menu-screen'); 
        if(!menuContainer) return;
        menuContainer.style.display = 'flex'; 
        menuContainer.innerHTML = '<div class="menu-title">Fluency Journey</div>'; 
        const btnBack = document.createElement('button'); btnBack.className = 'btn-menu'; btnBack.innerText = "🏠  Home"; btnBack.style.borderColor = "#7f8c8d"; btnBack.style.color = "#7f8c8d"; btnBack.onclick = function() { App.goHome(); }; menuContainer.appendChild(btnBack); 
        
        if(typeof VocabData !== 'undefined') { 
            VocabData.forEach(topic => { 
                const btn = document.createElement('button'); 
                btn.className = 'btn-menu'; 
                
                // TÍNH TOÁN % TIẾN ĐỘ
                const totalItems = topic.vocab.length;
                const percent = StorageEngine.getLessonProgress(topic.id, totalItems);

                btn.innerHTML = `
                    💬 ${topic.topic}
                    <span class="lesson-progress-text">${percent}% completed (hoàn thành)</span>
                    <div class="menu-btn-progress"><div class="menu-btn-fill" style="width:${percent}%"></div></div>
                `;
                
                btn.style.borderColor = topic.color; btn.style.color = topic.color; 
                btn.onclick = function() { 
                    App.setDisplay('menu-screen', 'none');
                    App.setDisplay('vocab-screen', 'flex');
                    if(typeof VocabEngine !== 'undefined') VocabEngine.init(topic); 
                }; 
                menuContainer.appendChild(btn); 
            }); 
        } 
    },
    openIPA: function() {
        this.setDisplay('menu-screen', 'none');
        this.setDisplay('ipa-screen', 'flex');
        const content = document.getElementById('ipa-content'); 
        if(!content) return;
        content.innerHTML = ''; 
        for (const [sectionName, soundFiles] of Object.entries(IPA_DATA)) { const secTitle = document.createElement('div'); secTitle.className = 'ipa-sec-title'; secTitle.innerText = sectionName; if (sectionName.includes("Vowels")) secTitle.classList.add("bg-blue"); else secTitle.classList.add("bg-green"); content.appendChild(secTitle); const grid = document.createElement('div'); grid.className = 'ipa-grid'; soundFiles.forEach(fileName => { const item = document.createElement('div'); item.className = 'ipa-item'; item.innerHTML = `<img src="${fileName}.jpg" onerror="this.style.display='none'">`; item.onclick = function() { const audio = new Audio(fileName + ".wav"); audio.play(); this.style.transform = "scale(0.9)"; setTimeout(() => this.style.transform = "scale(1)", 150); }; grid.appendChild(item); }); content.appendChild(grid); content.appendChild(document.createElement('br')); }
    },
    closeIPA: function() { 
        this.setDisplay('ipa-screen', 'none');
        this.setDisplay('menu-screen', 'flex');
    },
    startLesson: function(num) { 
        AudioEngine.unlock(); 
        this.setDisplay('menu-screen', 'none');
        
        // --- CHÌA KHÓA NẰM Ở ĐÂY: Trả lại 'block' cho main-container ---
        this.setDisplay('main-container', 'block'); 
        
        if(typeof LearningEngine !== 'undefined') { LearningEngine.initLesson(num); LearningEngine.render(); }
    },
    enterGame: function() { 
        this.setDisplay('learning-screen', 'none');
        this.setDisplay('game-screen', 'flex');
        if(typeof LearningEngine !== 'undefined') {
            const item = LearningEngine.currentData[LearningEngine.idx]; 
            let vocabList = []; 
            for(let i=1; i<=25; i++) { 
                if(!DataEngine["lesson"+i]) continue; 
                const lesson = DataEngine.getLesson(i); 
                if (lesson.includes(item)) { vocabList = lesson.filter(l => l.img && l.type !== 'game'); break; } 
            } 
            GameEngine.start(item, vocabList); 
        }
    },
    exitGame: function() { GameEngine.stop(); if(typeof LearningEngine !== 'undefined') LearningEngine.render(); },
    goHome: function() { 
        AudioEngine.stopAllAndBlock(); GameEngine.stop(); ShadowingEngine.stopLoop(); 
        this.setDisplay('main-container', 'none');
        this.setDisplay('menu-screen', 'none');
        this.setDisplay('ipa-screen', 'none');
        this.setDisplay('shadowing-screen', 'none');
        this.setDisplay('vocab-screen', 'none');
        this.setDisplay('landing-screen', 'flex');
    }
};

window.onload = function() { App.init(); };

window.addEventListener('keydown', (e) => { 
    if (typeof SnakeEngine !== 'undefined' && !SnakeEngine.active) return; 
    if (e.key === 'ArrowUp') SnakeEngine.changeDirection('up'); 
    else if (e.key === 'ArrowDown') SnakeEngine.changeDirection('down'); 
    else if (e.key === 'ArrowLeft') SnakeEngine.changeDirection('left'); 
    else if (e.key === 'ArrowRight') SnakeEngine.changeDirection('right'); 
});
