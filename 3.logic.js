/* ==========================================================================
   FILE: 3.logic.js (FINAL COMBINED: New Shadowing + Old Snake)
   ========================================================================== */

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
    win: function() { this.stop(); AudioEngine.playEffect('win'); AudioEngine.playTTS("Excellent job!"); document.getElementById('win-msg').innerText = "Time: " + document.getElementById('timer').innerText; document.getElementById('final-score').innerText = this.score; document.getElementById('win-modal').style.display = 'flex'; }
};

/* --- SNAKE ENGINE (OLD ORIGINAL CODE RESTORED) --- */
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
        const itemsToSpawn = [{ ...correctWord, isCorrect: true, icon: '🍎' }, { ...wrongWords[0], isCorrect: false, icon: '🍄' }];
        if (wrongWords[1]) itemsToSpawn.push({ ...wrongWords[1], isCorrect: false, icon: '💣' });
        itemsToSpawn.forEach(item => {
            let pos; do { 
                pos = { x: Math.floor(Math.random() * (this.boardSize - 2)) + 1, y: Math.floor(Math.random() * (this.boardSize - 2)) + 1 }; 
                let isSafeZone = (pos.y >= 11 && pos.x >= 4 && pos.x <= 10);
                if (isSafeZone) continue; 
                let isTooClose = this.foods.some(f => Math.abs(f.x - pos.x) <= 1 && Math.abs(f.y - pos.y) <= 1);
                if (isTooClose) continue; 
            } while (this.isOccupied(pos) || this.foods.some(f => Math.abs(f.x - pos.x) <= 1 && Math.abs(f.y - pos.y) <= 1));
            this.foods.push({ x: pos.x, y: pos.y, img: item.img, word: item.speak, isCorrect: item.isCorrect, icon: item.icon });
        });
        let ipaHtml = "";
        if (correctWord.type !== 'sent' && correctWord.speak.split(' ').length < 2) {
             let ipaStr = "";
             if (correctWord.parts) { ipaStr = correctWord.parts.map(p => p.i).join("").replace(/&nbsp;/g, ""); }
             ipaHtml = `<div style="color:red; font-size:14px;">/${ipaStr}/</div>`;
        }
        let fontSize = (correctWord.type === 'sent') ? '18px' : '24px';
        document.getElementById('snake-target-content').innerHTML = 
            `${ipaHtml}<div style="color:#d35400; font-size:${fontSize}; font-weight:900;">${correctWord.speak}</div>`;
    },
    isOccupied: function(pos) { if (this.snake.some(s => s.x === pos.x && s.y === pos.y)) return true; if (this.foods.some(f => f.x === pos.x && f.y === pos.y)) return true; const head = this.snake[0]; if (Math.abs(pos.x - head.x) < 3 && Math.abs(pos.y - head.y) < 3) return true; return false; },
    draw: function() {
        const cells = document.querySelectorAll('.grid-cell'); cells.forEach(c => { c.className = 'grid-cell'; c.innerHTML = ''; });
        this.foods.forEach(f => {
            const idx = f.y * this.boardSize + f.x;
            if (cells[idx]) { 
                const zIndex = 10; 
                cells[idx].innerHTML = `<div class="food-item" style="z-index:${zIndex}"><img class="food-img" src="${f.img}" onerror="this.style.display='none'"><div class="food-core">${f.icon}</div></div>`; 
            }
        });
        this.snake.forEach((part, index) => {
            const idx = part.y * this.boardSize + part.x;
            if (cells[idx]) {
                const div = document.createElement('div'); div.classList.add('snake-part');
                if (index === 0) {
                    div.classList.add('snake-head');
                    if (this.direction.y === -1) div.classList.add('head-down'); else if (this.direction.y === 1) div.classList.add('head-up'); else if (this.direction.x === -1) div.classList.add('head-left'); else if (this.direction.x === 1) div.classList.add('head-right');
                }
                cells[idx].appendChild(div);
            }
        });
    },
    changeDirection: function(newDirName) {
        if (this.paused) return; 
        let newDir = {x:0, y:0};
        if (newDirName === 'up') newDir = {x: 0, y: -1}; if (newDirName === 'down') newDir = {x: 0, y: 1};
        if (newDirName === 'left') newDir = {x: -1, y: 0}; if (newDirName === 'right') newDir = {x: 1, y: 0};
        if (this.direction.x + newDir.x === 0 && this.direction.y + newDir.y === 0) return;
        this.nextDirection = newDir;
    },
    showGameOver: function(msg) { this.stop(); AudioEngine.playTTS("Game Over!"); document.getElementById('win-msg').innerText = msg; document.getElementById('final-score').innerText = this.score; document.getElementById('win-modal').style.display = 'flex'; },
    win: function() { this.stop(); AudioEngine.playEffect('win'); AudioEngine.playTTS("You Win!"); document.getElementById('win-msg').innerText = "Awesome!"; document.getElementById('final-score').innerText = this.score; document.getElementById('win-modal').style.display = 'flex'; }
};

/* --- LEARNING ENGINE (UPDATED) --- */
const LearningEngine = {
    currentData: [], idx: 0, currentLessonId: 0, listenTimeout: null, 
    initLesson: function(lessonNum) { this.currentLessonId = lessonNum; this.currentData = DataEngine.getLesson(lessonNum); this.idx = 0; this.preload(); },
    preload: function() { this.currentData.forEach(item => { if(item.img) new Image().src = item.img; }); },
    render: function() {
        const item = this.currentData[this.idx]; if(!item) return; AudioEngine.stopCurrentSound();
        document.getElementById('game-screen').style.display = 'none'; document.getElementById('learning-screen').style.display = 'flex'; document.getElementById('win-modal').style.display = 'none'; document.getElementById('stars').innerText = "☆☆☆☆☆"; document.getElementById('stars').classList.remove('active'); document.getElementById('feedback').innerText = "...";
        const imgEl = document.getElementById('learn-img'); const btnContainer = document.getElementById('action-container'); const infoDisplay = document.getElementById('info-display');
        if(item.type === 'game') {
            imgEl.src = item.img || 'https://img.icons8.com/color/500/controller.png';
            let titleColor = item.title.includes("GAME 1") ? "#e67e22" : (item.title.includes("GAME 2") ? "#9b59b6" : "#333");
            infoDisplay.innerHTML = `<h2 class="word-display" style="font-size:28px; color:${titleColor}; font-weight:900;">${item.title}</h2>`;
            btnContainer.innerHTML = `<button class="btn-action btn-game-entry" onclick="App.enterGame()">  🚀   Play Now</button>`;
        } else {
            imgEl.src = item.img; btnContainer.innerHTML = ` <button class="btn-action btn-mic" id="mic-btn" onclick="LearningEngine.startListening()">  🎤   Read Now</button> <button class="btn-action btn-listen" id="btn-replay" onclick="LearningEngine.onUserClickSpeak()">  🔊   Listen</button> `;
            let html = ''; let currentWordBuffer = [];
            item.parts.forEach((p, index) => { if (p.t === " ") { if (currentWordBuffer.length > 0) { html += `<div class="word-group">`; currentWordBuffer.forEach(subP => { const ipaHtml = subP.i || "&nbsp;"; html += `<div class="char-block"><div class="${(item.type === 'sent') ? 'sent-ipa' : 'cb-ipa'}">${ipaHtml}</div><div class="${(item.type === 'sent') ? 'sent-text' : 'cb-text'}">${subP.t}</div></div>`; }); html += `</div>`; currentWordBuffer = []; } } else { currentWordBuffer.push(p); } });
            if (currentWordBuffer.length > 0) { html += `<div class="word-group">`; currentWordBuffer.forEach(subP => { const ipaHtml = subP.i || "&nbsp;"; html += `<div class="char-block"><div class="${(item.type === 'sent') ? 'sent-ipa' : 'cb-ipa'}">${ipaHtml}</div><div class="${(item.type === 'sent') ? 'sent-text' : 'cb-text'}">${subP.t}</div></div>`; }); html += `</div>`; }
            infoDisplay.innerHTML = html;
        }
    },
    nav: function(d) { if(this.idx + d >= 0 && this.idx + d < this.currentData.length) { this.idx += d; this.render(); } }, nextItem: function() { this.nav(1); },
    onUserClickSpeak: function() { 
        const item = this.currentData[this.idx]; if(item && item.type !== 'game') { let soundFile = null; let textToRead = item.speak; if(item.pre && item.type !== 'sent') { soundFile = "sound_" + item.pre + ".wav"; } if(item.type === 'exam-ipa') { soundFile = item.speak; textToRead = null; } if (soundFile) { AudioEngine.playSequence(soundFile, textToRead); } else { AudioEngine.playTTS(textToRead); } } 
    },
    startListening: function() { 
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SpeechRecognition) return alert("Device not supported"); 
        const btn = document.getElementById('mic-btn'); btn.disabled = true; btn.innerText = "  👂   Listening..."; btn.style.backgroundColor = "#e74c3c"; 
        const currentItem = this.currentData[this.idx]; const wordCount = currentItem.speak.trim().split(/\s+/).length; const isSentence = (currentItem.type === 'sent') || (wordCount >= 2); const waitTime = isSentence ? 15000 : 5000; 
        const recognition = new SpeechRecognition(); recognition.lang = 'en-US'; recognition.continuous = false; recognition.interimResults = false; recognition.start(); 
        if(this.listenTimeout) clearTimeout(this.listenTimeout); this.listenTimeout = setTimeout(() => { if(btn.disabled) recognition.stop(); }, waitTime);
        recognition.onresult = (e) => { let heard = []; for(let i=0; i<e.results[0].length; i++) heard.push(e.results[0][i].transcript.toLowerCase()); this.checkResult(heard); }; 
        recognition.onerror = () => { this.resetMic(); }; recognition.onend = () => { if(btn.disabled) this.resetMic(); }; 
    },
    resetMic: function() { if(this.listenTimeout) clearTimeout(this.listenTimeout); const btn = document.getElementById('mic-btn'); if(btn) { btn.disabled = false; btn.innerText = "  🎤   Read Now"; btn.style.backgroundColor = "#27ae60"; } },
    checkResult: function(heardArray) { 
        const item = this.currentData[this.idx]; const normalize = (str) => str.toLowerCase().replace(/[.,!?;:]/g, "").trim(); const targetRaw = normalize(item.speak);
        let validTargets = [targetRaw]; if (item.pre) validTargets.push(normalize(item.pre + " " + item.speak));
        const wordCount = targetRaw.split(/\s+/).length; const isSentence = (item.type === 'sent') || (wordCount >= 2); let bestAccuracy = 0;
        for (let text of heardArray) {
            let userText = normalize(text);
            for (let target of validTargets) {
                if (isSentence) { const targetWords = target.split(/\s+/); const userWords = userText.split(/\s+/); let matchCount = 0; targetWords.forEach(w => { if (userWords.includes(w)) matchCount++; }); let accuracy = (matchCount / targetWords.length) * 100; if (accuracy > bestAccuracy) bestAccuracy = accuracy; } 
                else { if (userText.includes(target)) bestAccuracy = 100; }
            }
        }
        let finalStars = 1; let msg = "Try again!";
        if (bestAccuracy >= 100) { finalStars = 5; msg = "Excellent! 🎉"; AudioEngine.playEffect('win'); } else if (bestAccuracy >= 75) { finalStars = 4; msg = "Very Good! 🎉"; AudioEngine.playEffect('win'); } else if (bestAccuracy >= 50) { finalStars = 3; msg = "Good try!"; AudioEngine.playEffect('correct'); } else { finalStars = 1; msg = "Try again!"; AudioEngine.playEffect('wrong'); }
        let s = ""; for(let i=0; i<5; i++) s += (i < finalStars) ? "  ⭐  " : "☆"; document.getElementById('stars').innerText = s; document.getElementById('stars').className = (finalStars >= 3) ? "stars active" : "stars"; document.getElementById('feedback').innerText = msg; this.resetMic(); 
    }
};

/* --- VOCAB ENGINE (HỌC & GAME) --- */
const VocabEngine = {
    currentTopic: null,
    idx: 0, 
    
    // Biến cho Game
    gameQueue: [],     
    retryQueue: [],    
    currentQuestion: null,
    score: 0,
    streak: 0, // <-- Biến đếm chuỗi đúng liên tiếp
    isProcessing: false, 

    // Khởi tạo
    init: function(topicData) {
        this.currentTopic = topicData;
        document.getElementById('vocab-title').innerText = topicData.topic;
        document.getElementById('vocab-mode-menu').style.display = 'flex';
        document.getElementById('vocab-learn-container').style.display = 'none';
        document.getElementById('vocab-game-container').style.display = 'none';
    },

    // --- CHẾ ĐỘ 1: HỌC TỪ ---
    startLearn: function() {
        document.getElementById('vocab-mode-menu').style.display = 'none';
        document.getElementById('vocab-learn-container').style.display = 'flex';
        this.idx = 0;
        this.renderLearnCard();
    },

    renderLearnCard: function() {
        const item = this.currentTopic.vocab[this.idx];
        document.getElementById('v-learn-img').src = item.img;
        document.getElementById('v-stars').innerText = "☆☆☆☆☆";
        document.getElementById('v-stars').className = "stars";
        document.getElementById('v-feedback').innerText = "...";

        let html = '<div class="word-group">';
        if (item.parts) {
            item.parts.forEach(p => {
                const ipa = p.i || "&nbsp;";
                html += `<div class="char-block"><div class="cb-ipa" style="font-size:18px;">${ipa}</div><div class="cb-text" style="font-size:32px;">${p.t}</div></div>`;
            });
        }
        html += '</div>';
        document.getElementById('v-info-display').innerHTML = html;
        setTimeout(() => this.playCurrentWord(), 300);
    },

    playCurrentWord: function() {
        const item = this.currentTopic.vocab[this.idx];
        const audioSrc = item.speak + ".mp3"; 
        AudioEngine.playSequence(audioSrc, null); 
    },

    nav: function(d) {
        if (this.idx + d >= 0 && this.idx + d < this.currentTopic.vocab.length) {
            this.idx += d;
            this.renderLearnCard();
        }
    },

    startListening: function() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return alert("Device not supported");
        const btn = document.getElementById('v-mic-btn');
        btn.disabled = true; btn.innerText = "👂 Listening..."; btn.style.backgroundColor = "#e74c3c";
        
        const currentItem = this.currentTopic.vocab[this.idx];
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = (e) => {
            const heard = e.results[0][0].transcript.toLowerCase();
            const target = currentItem.speak.toLowerCase();
            if (heard.includes(target)) {
                document.getElementById('v-stars').innerText = "⭐⭐⭐⭐⭐";
                document.getElementById('v-stars').className = "stars active";
                document.getElementById('v-feedback').innerText = "Correct: " + heard;
                AudioEngine.playEffect('correct');
            } else {
                document.getElementById('v-stars').innerText = "⭐☆☆☆☆";
                document.getElementById('v-feedback').innerText = "Heard: " + heard;
                AudioEngine.playEffect('wrong');
            }
            this.resetMic();
        };
        recognition.onerror = () => this.resetMic();
        recognition.onend = () => this.resetMic();
    },
    resetMic: function() {
        const btn = document.getElementById('v-mic-btn');
        btn.disabled = false; btn.innerText = "🎤 Read"; btn.style.backgroundColor = "#27ae60";
    },

    // --- CHẾ ĐỘ 2: GAME (COMBO & TRỘN ĐỀ) ---
    startGame: function() {
        document.getElementById('vocab-mode-menu').style.display = 'none';
        document.getElementById('vocab-game-container').style.display = 'flex';
        
        // 1. COPY và TRỘN ngẫu nhiên
        this.gameQueue = [...this.currentTopic.vocab];
        this.gameQueue.sort(() => 0.5 - Math.random()); 

        this.retryQueue = []; 
        this.score = 0;
        this.streak = 0; // Reset chuỗi thắng
        this.updateScore();
        this.nextQuestion();
    },

    nextQuestion: function() {
        this.isProcessing = false;
        
        if (this.gameQueue.length === 0) {
            if (this.retryQueue.length > 0) {
                alert("Reviewing wrong answers! 💪");
                this.gameQueue = [...this.retryQueue];
                this.retryQueue = [];
                this.gameQueue.sort(() => 0.5 - Math.random());
            } else {
                AudioEngine.playEffect('win');
                alert(`GAME OVER! \n🏆 Final Score: ${this.score}`);
                App.openPart(3); 
                return;
            }
        }

        this.currentQuestion = this.gameQueue.shift(); 
        this.renderGameGrid();
        setTimeout(() => this.playQuestion(), 500);
    },

    renderGameGrid: function() {
        const grid = document.getElementById('vocab-grid');
        grid.innerHTML = '';
        
        let options = [this.currentQuestion];
        let distractors = this.currentTopic.vocab.filter(v => v.speak !== this.currentQuestion.speak);
        distractors.sort(() => 0.5 - Math.random());
        options = options.concat(distractors.slice(0, 5));
        options.sort(() => 0.5 - Math.random());

        options.forEach(item => {
            const div = document.createElement('div');
            div.className = 'v-card-game';
            div.innerHTML = `<img src="${item.img}">`;
            div.onclick = (e) => this.checkAnswer(item, div, e);
            grid.appendChild(div);
        });
    },

    playQuestion: function() {
        const stemAudio = new Audio("sound_stem_find.mp3");
        
        stemAudio.onended = () => {
            const wordAudio = new Audio(this.currentQuestion.speak + ".mp3");
            wordAudio.play();
        };
        stemAudio.onerror = () => {
            const wordAudio = new Audio(this.currentQuestion.speak + ".mp3");
            wordAudio.play();
        };
        stemAudio.play().catch(e => {
            const wordAudio = new Audio(this.currentQuestion.speak + ".mp3");
            wordAudio.play();
        });
    },

    checkAnswer: function(selectedItem, divElement, event) {
        if (this.isProcessing) return;
        
        if (selectedItem.speak === this.currentQuestion.speak) {
            // --- ĐÚNG ---
            this.isProcessing = true;
            divElement.classList.add('correct');
            AudioEngine.playEffect('correct');
            
            // Tính điểm Combo
            this.streak++;
            const bonus = this.streak * 10; // 10, 20, 30...
            this.score += bonus;
            
            // Hiệu ứng bay số điểm
            let comboText = this.streak > 1 ? " Combo!" : "";
            this.showFloatingText(event.clientX, event.clientY, `+${bonus}${comboText}`, "#4CAF50");

            this.updateScore();
            setTimeout(() => this.nextQuestion(), 1500);
        } else {
            // --- SAI ---
            divElement.classList.add('wrong');
            AudioEngine.playEffect('wrong');
            
            // Trừ điểm và mất chuỗi
            this.score -= 10;
            if (this.score < 0) this.score = 0;
            this.streak = 0;
            
            // Hiệu ứng trừ điểm
            this.showFloatingText(event.clientX, event.clientY, `-10`, "#F44336");
            this.updateScore();

            if (!this.retryQueue.find(i => i.speak === this.currentQuestion.speak)) {
                this.retryQueue.push(this.currentQuestion);
            }
        }
    },

    showFloatingText: function(x, y, text, color) {
        const el = document.createElement('div');
        el.className = 'floating-text';
        el.innerText = text;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.color = color;
        el.style.fontSize = "30px"; // To hơn chút
        el.style.zIndex = "9999";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 800);
    },

    updateScore: function() {
        let fire = this.streak > 1 ? "🔥 x" + this.streak : "";
        document.getElementById('game-status').innerHTML = `Score: ${this.score} <span style="color:orange; margin-left:10px;">${fire}</span>`;
    }
};

/* --- APP CONTROLLER --- */
const App = {
    currentPart: 0, 
    init: function() {
        AudioEngine.stopAllAndBlock();
        document.getElementById('landing-screen').style.display = 'flex';
        document.getElementById('menu-screen').style.display = 'none';
        document.getElementById('main-container').style.display = 'none';
        document.getElementById('ipa-screen').style.display = 'none';
        document.getElementById('shadowing-screen').style.display = 'none';
    },
    openPart: function(partId) {
        this.currentPart = partId; AudioEngine.unlock(); 
        document.getElementById('landing-screen').style.display = 'none'; document.getElementById('shadowing-screen').style.display = 'none'; document.getElementById('menu-screen').style.display = 'none';
        if (partId === 1) { this.initPronunMenu(); } else if (partId === 2) { this.initIntonationMenu(); } else if (partId === 3) { this.initVocabMenu(); }
    },
    initPronunMenu: function() {
        const menuContainer = document.getElementById('menu-screen'); menuContainer.style.display = 'flex'; menuContainer.innerHTML = '';
        const btnBack = document.createElement('button'); btnBack.className = 'btn-menu'; btnBack.innerText = "🏠  Home"; btnBack.style.borderColor = "#7f8c8d"; btnBack.style.color = "#7f8c8d"; btnBack.onclick = function() { App.goHome(); }; menuContainer.appendChild(btnBack);
        const btnIPA = document.createElement('button'); btnIPA.className = 'btn-menu'; btnIPA.innerText = "🔠  IPA Chart"; btnIPA.style.borderColor = "#9C27B0"; btnIPA.style.color = "#9C27B0"; btnIPA.onclick = function() { App.openIPA(); }; menuContainer.appendChild(btnIPA);
        if(typeof LevelMap !== 'undefined') { LevelMap.forEach(level => { if (level.type === 'learn') { const btn = document.createElement('button'); btn.className = 'btn-menu'; btn.innerText = level.label; if (level.label.includes("Ôn tập")) { btn.style.borderColor = "#ff9600"; btn.style.color = "#d35400"; } if (level.label.includes("THI THỬ")) { btn.style.borderColor = "#e74c3c"; btn.style.color = "#c0392b"; btn.style.borderWidth = "4px"; } btn.onclick = function() { App.startLesson(level.id); }; menuContainer.appendChild(btn); } }); } else { alert("Error: LevelMap data not found in 4.data.js"); }
    },
    initIntonationMenu: function() {
        const menuContainer = document.getElementById('menu-screen'); menuContainer.style.display = 'flex'; menuContainer.innerHTML = '<div class="menu-title">Movie Shadowing</div>';
        const btnBack = document.createElement('button'); btnBack.className = 'btn-menu'; btnBack.innerText = "🏠  Home"; btnBack.style.borderColor = "#7f8c8d"; btnBack.style.color = "#7f8c8d"; btnBack.onclick = function() { App.goHome(); }; menuContainer.appendChild(btnBack);
        if(typeof IntonationData !== 'undefined') { IntonationData.forEach(item => { const btn = document.createElement('button'); btn.className = 'btn-menu'; btn.innerText = "🎬 " + item.title; btn.style.borderColor = "#2980b9"; btn.style.color = "#2980b9"; btn.onclick = function() { App.startShadowing(item); }; menuContainer.appendChild(btn); }); }
    },
    startShadowing: function(movieData) { document.getElementById('menu-screen').style.display = 'none'; document.getElementById('shadowing-screen').style.display = 'flex'; ShadowingEngine.init(movieData); },
    initVocabMenu: function() {
        const menuContainer = document.getElementById('menu-screen'); menuContainer.style.display = 'flex'; menuContainer.innerHTML = '<div class="menu-title">Vocabulary Topics</div>';
        const btnBack = document.createElement('button'); btnBack.className = 'btn-menu'; btnBack.innerText = "🏠  Home"; btnBack.style.borderColor = "#7f8c8d"; btnBack.style.color = "#7f8c8d"; btnBack.onclick = function() { App.goHome(); }; menuContainer.appendChild(btnBack);
        if(typeof VocabData !== 'undefined') { VocabData.forEach(topic => { const btn = document.createElement('button'); btn.className = 'btn-menu'; btn.innerText = "📖 " + topic.topic; btn.style.borderColor = topic.color; btn.style.color = topic.color; btn.onclick = function() { alert("Opening Topic: " + topic.topic + "\n(Vocab exercises coming soon)"); }; menuContainer.appendChild(btn); }); } else { menuContainer.innerHTML += "<div>No Vocab Data Found</div>"; }
    },
    openIPA: function() {
        document.getElementById('menu-screen').style.display = 'none'; document.getElementById('ipa-screen').style.display = 'flex'; const content = document.getElementById('ipa-content'); content.innerHTML = ''; 
        for (const [sectionName, soundFiles] of Object.entries(IPA_DATA)) { const secTitle = document.createElement('div'); secTitle.className = 'ipa-sec-title'; secTitle.innerText = sectionName; if (sectionName.includes("Vowels")) secTitle.classList.add("bg-blue"); else secTitle.classList.add("bg-green"); content.appendChild(secTitle); const grid = document.createElement('div'); grid.className = 'ipa-grid'; soundFiles.forEach(fileName => { const item = document.createElement('div'); item.className = 'ipa-item'; item.innerHTML = `<img src="${fileName}.jpg" onerror="this.style.display='none'">`; item.onclick = function() { const audio = new Audio(fileName + ".wav"); audio.play(); this.style.transform = "scale(0.9)"; setTimeout(() => this.style.transform = "scale(1)", 150); }; grid.appendChild(item); }); content.appendChild(grid); content.appendChild(document.createElement('br')); }
    },
    closeIPA: function() { document.getElementById('ipa-screen').style.display = 'none'; document.getElementById('menu-screen').style.display = 'flex'; },
    startLesson: function(num) { AudioEngine.unlock(); document.getElementById('menu-screen').style.display = 'none'; document.getElementById('main-container').style.display = 'block'; LearningEngine.initLesson(num); LearningEngine.render(); },
    enterGame: function() { 
        document.getElementById('learning-screen').style.display = 'none'; 
        document.getElementById('game-screen').style.display = 'flex'; 
        const item = LearningEngine.currentData[LearningEngine.idx]; 
        let vocabList = []; 
        for(let i=1; i<=25; i++) { 
            if(!DataEngine["lesson"+i]) continue; 
            const lesson = DataEngine.getLesson(i); 
            if (lesson.includes(item)) { vocabList = lesson.filter(l => l.img && l.type !== 'game'); break; } 
        } 
        GameEngine.start(item, vocabList); 
    },
    exitGame: function() { GameEngine.stop(); LearningEngine.render(); },
    goHome: function() { AudioEngine.stopAllAndBlock(); GameEngine.stop(); ShadowingEngine.stopLoop(); document.getElementById('main-container').style.display = 'none'; document.getElementById('menu-screen').style.display = 'none'; document.getElementById('ipa-screen').style.display = 'none'; document.getElementById('shadowing-screen').style.display = 'none'; document.getElementById('landing-screen').style.display = 'flex'; }
};

window.onload = function() { App.init(); };

// --- RESTORED ORIGINAL EVENT LISTENER (NO FANCY CHECKS) ---
window.addEventListener('keydown', (e) => { 
    if (!SnakeEngine.active) return; 
    if (e.key === 'ArrowUp') SnakeEngine.changeDirection('up'); 
    else if (e.key === 'ArrowDown') SnakeEngine.changeDirection('down'); 
    else if (e.key === 'ArrowLeft') SnakeEngine.changeDirection('left'); 
    else if (e.key === 'ArrowRight') SnakeEngine.changeDirection('right'); 
});

