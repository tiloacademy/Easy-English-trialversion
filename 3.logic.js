/* ==========================================================================
   FILE: 3.logic.js (BẢN HOÀN CHỈNH - SẠCH LỖI 100%)
   ========================================================================== */

/* --- STORAGE & QUEST ENGINE --- */
const StorageEngine = {
    setUserName: (name) => localStorage.setItem('eng_username', name),
    getUserName: () => localStorage.getItem('eng_username'),
    setGems: (val) => localStorage.setItem('eng_gems', val),
    getGems: () => parseInt(localStorage.getItem('eng_gems') || '0'),
    
    // Lưu Kỷ lục game
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

    // Lưu % bài học
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
        App.renderQuests();
        if(quest.count === 5) {
            setTimeout(() => alert("🎉 Wow! You completed the weekly quest!\n(Tuyệt vời! Bạn đã hoàn thành nhiệm vụ tuần!) +100 Gems 💎"), 500);
            StorageEngine.setGems(StorageEngine.getGems() + 100);
            App.updateGemDisplay();
        }
    }
};

/* --- AUDIO ENGINE --- */
const AudioEngine = {
    isAudioAllowed: false, audioWin: new Audio("win.mp3"), audioCorrect: new Audio("correct.mp3"), audioWrong: new Audio("wrong.mp3"),
    unlock: function() { this.isAudioAllowed = true; if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(''); window.speechSynthesis.speak(u); window.speechSynthesis.cancel(); } },
    stopAllAndBlock: function() { this.isAudioAllowed = false; window.speechSynthesis.cancel(); this.audioWin.pause(); this.audioWin.currentTime = 0; this.audioCorrect.pause(); this.audioCorrect.currentTime = 0; this.audioWrong.pause(); this.audioWrong.currentTime = 0; },
    stopCurrentSound: function() { window.speechSynthesis.cancel(); },
    playTTS: function(text) { if (!this.isAudioAllowed) return; this.stopCurrentSound(); if ('speechSynthesis' in window) { window.currentUtterance = new SpeechSynthesisUtterance(text); window.currentUtterance.lang = 'en-US'; window.currentUtterance.rate = 0.9; window.speechSynthesis.speak(window.currentUtterance); } },
    playSequence: function(soundFile, textToRead) { if (!this.isAudioAllowed) return; this.stopCurrentSound(); const audio = new Audio(soundFile); audio.onended = () => { if (textToRead) setTimeout(() => { this.playTTS(textToRead); }, 300); }; audio.onerror = () => { if (textToRead) this.playTTS(textToRead); }; audio.play().catch(e => { if (textToRead) this.playTTS(textToRead); }); },
    playEffect: function(type) { if (!this.isAudioAllowed) return; if (type === 'correct') this.audioCorrect.play().catch(e=>{}); if (type === 'wrong') this.audioWrong.play().catch(e=>{}); if (type === 'win') this.audioWin.play().catch(e=>{}); }
};

/* --- SHADOWING ENGINE --- */
const ShadowingEngine = {
    player: null, currentData: null, loopInterval: null, isPlayingSegment: false, currentTarget: null, 
    init: function(movieData) { this.currentData = movieData; document.getElementById('movie-title').innerText = movieData.title; this.renderSegments(); if (!this.player) { this.player = new YT.Player('youtube-player', { height: '100%', width: '100%', videoId: movieData.youtubeId, playerVars: { 'playsinline': 1, 'controls': 1, 'rel': 0, 'cc_load_policy': 0 }, events: { 'onStateChange': this.onPlayerStateChange } }); } else { this.player.loadVideoById(movieData.youtubeId); } },
    changeSpeed: function(rate) { if (this.player && this.player.setPlaybackRate) { this.player.setPlaybackRate(rate); document.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active')); const btns = document.querySelectorAll('.speed-btn'); btns.forEach(b => { const txt = b.innerText; if (rate === 1 && txt === 'Normal') { b.classList.add('active'); } else if (parseFloat(txt) === rate) { b.classList.add('active'); } }); } },
    renderSegments: function() { const list = document.getElementById('segment-list'); list.innerHTML = ''; this.currentData.segments.forEach((seg, index) => { const div = document.createElement('div'); div.className = 'segment-card'; div.id = `seg-${index}`; let ipaHtml = '<div class="seg-text-area">'; seg.parts.forEach(p => { const ipa = p.i || "&nbsp;"; ipaHtml += `<div class="seg-word-group"><div class="seg-ipa">${ipa}</div><div class="seg-txt">${p.t}</div></div>`; }); ipaHtml += '</div>'; div.innerHTML = `<div class="seg-controls"><div style="display:flex; align-items:center;"><span class="seg-number">#${index+1}</span></div><button class="btn-play-seg" onclick="ShadowingEngine.toggleLoop(${index}, this)">▶ Listen & Loop</button></div>${ipaHtml}`; list.appendChild(div); }); },
    toggleLoop: function(index, btn) { if (this.isPlayingSegment && this.currentIndex === index) { this.stopLoop(); return; } this.stopLoop(); this.currentIndex = index; this.isPlayingSegment = true; this.currentTarget = this.currentData.segments[index]; btn.innerHTML = "⏹ Stop Loop"; btn.classList.add('stop'); document.getElementById(`seg-${index}`).classList.add('playing'); this.player.seekTo(this.currentTarget.start); this.player.playVideo(); if (this.loopInterval) clearInterval(this.loopInterval); this.loopInterval = setInterval(() => { if (!this.player || !this.player.getCurrentTime) return; const curr = this.player.getCurrentTime(); if (curr >= this.currentTarget.end) { this.player.seekTo(this.currentTarget.start); } }, 50); },
    stopLoop: function() { this.isPlayingSegment = false; this.currentTarget = null; if (this.loopInterval) clearInterval(this.loopInterval); if (this.player && this.player.pauseVideo) this.player.pauseVideo(); document.querySelectorAll('.btn-play-seg').forEach(b => { b.innerHTML = "▶ Listen & Loop"; b.classList.remove('stop'); }); document.querySelectorAll('.segment-card').forEach(c => c.classList.remove('playing')); },
    onPlayerStateChange: function(event) {}
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
    stop: function() { this.active = false; clearInterval(this.moleAudioLoop); clearTimeout(this.moleLoop); clearInterval(this.timerInt); clearTimeout(this.hammerTimeout); const allMoles = document.querySelectorAll('.mole'); allMoles.forEach(m => m.classList.remove('up', 'bonked')); const hammer = document.getElementById('cursor-hammer'); if(hammer) hammer.classList.remove('active'); SnakeEngine.stop(); },
    startMoleGame: function() { this.stop(); this.active = true; this.score = 0; this.sec = 0; this.updateScore(0); this.moles = document.querySelectorAll('.mole'); document.getElementById('tower').style.display = 'none'; document.getElementById('whack-wrapper').style.display = 'flex'; document.getElementById('win-modal').style.display = 'none'; document.getElementById('snake-game-container').style.display = 'none'; this.refillMoleWords(); if(this.moleRemainingWords.length === 0) return alert("No words available!"); this.startTimer(); this.nextMoleRound(); },
    refillMoleWords: function() { const targetPhoneme = this.currentConfig.phoneme; this.moleRemainingWords = this.currentDataPool.filter(w => w.parts && w.parts.some(p => p.i && p.i.includes(targetPhoneme))).sort(() => 0.5 - Math.random()); },
    nextMoleRound: function() { if (!this.active) return; if (this.score >= this.WINNING_SCORE) { this.win(); return; } if (this.moleRemainingWords.length === 0) { this.refillMoleWords(); } this.moleTarget = this.moleRemainingWords.pop(); let html = ''; this.moleTarget.parts.forEach(p => { const ipaHtml = p.i ? p.i : "&nbsp;"; html += `<div class="target-char"><div class="target-ipa">${ipaHtml}</div><div class="target-txt">${p.t}</div></div>`; }); document.getElementById('target-word-container').innerHTML = html; AudioEngine.playTTS(this.moleTarget.speak); clearInterval(this.moleAudioLoop); this.moleAudioLoop = setInterval(() => { if(this.active) AudioEngine.playTTS(this.moleTarget.speak); }, 2000); this.peep(); },
    peep: function() { if (!this.active) return; let speed = Math.max(600, 1500 - (this.score * 0.8)); const time = speed + Math.random() * 400; const hole = this.moles[Math.floor(Math.random() * this.moles.length)]; let isTarget = Math.random() < 0.4; let moleImgData = isTarget ? this.moleTarget : this.currentDataPool[Math.floor(Math.random() * this.currentDataPool.length)]; const imgEl = hole.querySelector('img'); imgEl.src = moleImgData.img; hole.dataset.speak = moleImgData.speak; hole.classList.add('up'); this.moleLoop = setTimeout(() => { hole.classList.remove('up'); if (this.active) this.peep(); }, time); },
    bonk: function(moleEl, event) { if(!moleEl.classList.contains('up') || !this.active) return; let touchX = event.clientX || event.pageX; let touchY = event.clientY || event.pageY; this.spawnHammer(touchX, touchY); const clickedWord = moleEl.dataset.speak; if (clickedWord === this.moleTarget.speak) { AudioEngine.playEffect('correct'); moleEl.classList.add('bonked'); this.updateScore(100); this.showFloatingText(touchX, touchY, "+100", "yellow"); setTimeout(() => { moleEl.classList.remove('up', 'bonked'); clearTimeout(this.moleLoop); this.nextMoleRound(); }, 300); } else { AudioEngine.playEffect('wrong'); moleEl.classList.remove('up'); this.updateScore(-50); this.showFloatingText(touchX, touchY, "-50", "red"); } },
    spawnHammer: function(x, y) { const hammer = document.getElementById('cursor-hammer'); hammer.style.left = (x - 60) + 'px'; hammer.style.top = (y - 70) + 'px'; hammer.classList.remove('active'); void hammer.offsetWidth; hammer.classList.add('active'); clearTimeout(this.hammerTimeout); this.hammerTimeout = setTimeout(() => { hammer.classList.remove('active'); }, 150); },
    startFlipGame: function() { this.stop(); this.active = true; this.sec = 0; this.matches = 0; document.getElementById('tower').style.display = 'flex'; document.getElementById('whack-wrapper').style.display = 'none'; document.getElementById('win-modal').style.display = 'none'; document.getElementById('snake-game-container').style.display = 'none'; const tower = document.getElementById('tower'); tower.innerHTML = ''; let cards = []; let validItems = []; this.currentConfig.pairs.forEach(key => { let original = this.currentDataPool.find(d => { if(d.type === 'game' || d.type === 'sent') return false; let fullWord = d.parts.map(p => p.t).join(""); return fullWord === key; }); if(original) validItems.push(original); }); validItems.sort(() => 0.5 - Math.random()); validItems = validItems.slice(0, 5); validItems.forEach(original => { cards.push({ id: original.speak, type: 'img', content: `<img src="${original.img}">`, speak: original.speak }); let htmlText = `<div class="game-card-text">`; original.parts.forEach(p => { htmlText += `<div class="gc-block"><div class="gc-ipa">${p.i || "&nbsp;"}</div><div class="gc-word">${p.t}</div></div>`; }); htmlText += `</div>`; cards.push({ id: original.speak, type: 'text', content: htmlText, speak: original.speak }); }); cards.sort(() => 0.5 - Math.random()); let cCount = 0; let num = 1; const rows = [3, 2, 3, 2]; rows.forEach(cnt => { const rowDiv = document.createElement('div'); rowDiv.className = 'tower-row'; for(let k=0; k<cnt; k++) { if(cCount >= cards.length) break; const c = cards[cCount]; const el = document.createElement('div'); el.className = 'card-flip'; el.dataset.speak = c.speak; el.dataset.id = c.id; el.innerHTML = `<div class="card-inner"><div class="face front">${num}</div><div class="face back">${c.content}</div></div>`; el.onclick = function() { GameEngine.cardClick(this); }; rowDiv.appendChild(el); cCount++; num++; } tower.appendChild(rowDiv); }); this.startTimer(); },
    cardClick: function(el) { if(el.classList.contains('flipped') || el.classList.contains('matched')) return; el.classList.add('flipped'); AudioEngine.playTTS(el.dataset.speak); if(!this.c1) { this.c1 = el; } else { this.c2 = el; if(this.c1.dataset.id === this.c2.dataset.id) { setTimeout(() => { this.c1.classList.add('matched'); this.c2.classList.add('matched'); this.c1 = null; this.c2 = null; this.matches++; AudioEngine.playEffect('correct'); if(this.matches === 5) this.win(); }, 600); } else { setTimeout(() => { this.c1.classList.remove('flipped'); this.c2.classList.remove('flipped'); this.c1 = null; this.c2 = null; AudioEngine.playEffect('wrong'); }, 1000); } } },
    startTimer: function() { clearInterval(this.timerInt); document.getElementById('timer').innerText = "00:00"; this.timerInt = setInterval(() => { this.sec++; let m=Math.floor(this.sec/60).toString().padStart(2,'0'); let s=(this.sec%60).toString().padStart(2,'0'); document.getElementById('timer').innerText = `${m}:${s}`; }, 1000); },
    updateScore: function(val) { this.score += val; if(this.score < 0) this.score = 0; document.getElementById('score-display').innerText = this.score; },
    showFloatingText: function(x, y, text, color) { const el = document.createElement('div'); el.className = 'floating-text'; el.innerText = text; el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.color = color; document.body.appendChild(el); setTimeout(() => el.remove(), 800); },
    win: function() { 
        this.stop(); 
        AudioEngine.playEffect('win'); 
        AudioEngine.playTTS("Excellent job!"); 
        document.getElementById('win-msg').innerText = "Time (Thời gian): " + document.getElementById('timer').innerText; 
        document.getElementById('final-score').innerText = this.score; 

        // Xử lý kỷ lục
        const gameId = this.currentConfig.gameType || 'flip'; 
        const recordData = StorageEngine.saveHighScore(gameId, this.score);
        document.getElementById('high-score-display').innerText = "🏆 High Score (Kỷ lục): " + recordData.highScore;
        document.getElementById('new-record-msg').style.display = recordData.isNewRecord ? 'block' : 'none';

        // --- LƯU PHẦN TRĂM BÀI HỌC KHI THẮNG GAME ---
        if (App.currentPart === 1) {
            StorageEngine.saveLessonProgress(LearningEngine.currentLessonId, LearningEngine.idx);
            LearningEngine.checkLessonComplete();
        }

        document.getElementById('win-modal').style.display = 'flex'; 
    }
};

/* --- SNAKE ENGINE --- */
const SnakeEngine = {
    active: false, paused: false, gameLoopId: null, audioLoopId: null, boardSize: 15, snake: [], direction: {x: 0, y: 0}, nextDirection: {x: 0, y: 0}, 
    foods: [], score: 0, speed: 300, targetPhoneme: "", currentTargetWord: null, poolCorrect: [], poolWrong: [],
    lives: 3,

    start: function(config, dataPool) {
        this.stop(); this.active = true; this.paused = false; this.score = 0; this.speed = 550; this.lives = 3; this.targetPhoneme = config.phoneme;
        this.poolCorrect = dataPool.filter(w => w.parts && w.parts.some(p => p.i && p.i.includes(this.targetPhoneme)));
        this.poolWrong = dataPool.filter(w => !w.parts || !w.parts.some(p => p.i && p.i.includes(this.targetPhoneme)));
        if (this.poolCorrect.length === 0) return alert("Missing data for /" + this.targetPhoneme + "/");

        document.getElementById('tower').style.display = 'none'; document.getElementById('whack-wrapper').style.display = 'none'; document.getElementById('snake-game-container').style.display = 'flex'; document.getElementById('win-modal').style.display = 'none'; document.getElementById('pause-modal').style.display = 'none'; document.getElementById('snake-score').innerText = this.score;
        this.updateLivesUI();
        
        const center = Math.floor(this.boardSize / 2);
        this.snake = [{x: center, y: center}, {x: center, y: center + 1}, {x: center, y: center + 2}];
        this.direction = {x: 0, y: -1}; this.nextDirection = {x: 0, y: -1};
        this.createBoard(); this.spawnFoods(); this.gameLoop(); this.startAudioLoop();
    },
    stop: function() { this.active = false; clearTimeout(this.gameLoopId); clearInterval(this.audioLoopId); },
    togglePause: function() { if (!this.active) return; this.paused = !this.paused; const modal = document.getElementById('pause-modal'); if (this.paused) { modal.style.display = 'flex'; clearInterval(this.audioLoopId); } else { modal.style.display = 'none'; this.gameLoop(); this.startAudioLoop(); } },
    startAudioLoop: function() { clearInterval(this.audioLoopId); if(this.currentTargetWord) AudioEngine.playTTS(this.currentTargetWord.speak); this.audioLoopId = setInterval(() => { if (this.active && !this.paused && this.currentTargetWord) { AudioEngine.playTTS(this.currentTargetWord.speak); } }, 4000); },
    createBoard: function() { const board = document.getElementById('snake-board'); board.innerHTML = ''; board.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`; board.style.gridTemplateRows = `repeat(${this.boardSize}, 1fr)`; for(let i=0; i < this.boardSize * this.boardSize; i++) { const cell = document.createElement('div'); cell.className = 'grid-cell'; board.appendChild(cell); } },
    updateLivesUI: function() {
        let hearts = "";
        for(let i=0; i<this.lives; i++) hearts += "❤️";
        for(let i=this.lives; i<3; i++) hearts += "🖤";
        document.getElementById('snake-lives').innerText = hearts;
    },
    handleDeath: function(msg) {
        this.lives--;
        this.updateLivesUI();
        AudioEngine.playEffect('wrong');
        if (this.lives <= 0) { this.showGameOver(msg + " Hết mạng rồi!"); } 
        else {
            const center = Math.floor(this.boardSize / 2);
            this.snake = [{x: center, y: center}, {x: center, y: center + 1}, {x: center, y: center + 2}];
            this.direction = {x: 0, y: -1}; this.nextDirection = {x: 0, y: -1};
        }
    },
    gameLoop: function() {
        if (!this.active || this.paused) return;
        this.direction = this.nextDirection;
        const head = { ...this.snake[0] }; head.x += this.direction.x; head.y += this.direction.y;
        if (this.isCollision(head)) { 
            this.handleDeath("Rắn đụng tường!"); 
            if(this.lives > 0) { this.draw(); this.gameLoopId = setTimeout(() => { if(this.active) this.gameLoop(); }, this.speed); return; }
            else return;
        }
        this.snake.unshift(head);
        let ate = false;
        const foodIndex = this.foods.findIndex(f => f.x === head.x && f.y === head.y);
        if (foodIndex !== -1) {
            const food = this.foods[foodIndex];
            if (food.isCorrect) {
                ate = true; this.score += 10; document.getElementById('snake-score').innerText = this.score;
                AudioEngine.playEffect('correct'); 
                if (this.speed > 150) this.speed -= 20; 
                this.foods.splice(foodIndex, 1); this.spawnFoods(); this.startAudioLoop();
                if (this.score >= 100) { this.win(); return; }
            } else { 
                this.handleDeath(`Sai rồi! "${food.word}" không phải từ cần tìm!`);
                if(this.lives > 0) {
                     this.foods.splice(foodIndex, 1);
                     this.snake.pop(); this.draw();
                     this.gameLoopId = setTimeout(() => { if(this.active) this.gameLoop(); }, this.speed); 
                     return;
                } else return;
            }
        }
        if (!ate) this.snake.pop();
        this.draw();
        this.gameLoopId = setTimeout(() => { if(this.active) this.gameLoop(); }, this.speed);
    },
    isCollision: function(pos) { if (pos.x < 0 || pos.x >= this.boardSize || pos.y < 0 || pos.y >= this.boardSize) return true; for (let i = 1; i < this.snake.length; i++) if (pos.x === this.snake[i].x && pos.y === this.snake[i].y) return true; return false; },
    spawnFoods: function() {
        this.foods = [];
        const correctWord = this.poolCorrect[Math.floor(Math.random() * this.poolCorrect.length)];
        this.currentTargetWord = correctWord; 
        const validWrongPool = this.poolWrong.filter(w => !w.img.includes("card.jpg"));
        const wrongWords = validWrongPool.sort(() => 0.5 - Math.random()).slice(0, 2); 
        const itemsToSpawn = [{ ...correctWord, isCorrect: true, icon: '🍎' }, { ...
