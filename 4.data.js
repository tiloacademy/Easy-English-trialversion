/* ==========================================================================
   FILE: data.js (FULL DATA: LESSONS 1-25 + INTONATION + VOCAB)
   ========================================================================== */
const LevelMap = [
    { id: 1, type: 'learn', label: 'Bài 1: /t/ & /d/', color: '#58cc02' },
    { id: 1, type: 'game',  label: 'Game /t/', color: '#ff9600', gameIndex: 0 },
    { id: 1, type: 'game',  label: 'Game /d/', color: '#a322ea', gameIndex: 1 },
    { id: 2, type: 'learn', label: 'Bài 2: /p/ & /b/', color: '#58cc02' },
    { id: 2, type: 'game',  label: 'Game /p/', color: '#ff9600', gameIndex: 0 },
    { id: 2, type: 'game',  label: 'Game /b/', color: '#a322ea', gameIndex: 1 },
    { id: 3, type: 'learn', label: 'Bài 3: /æ/ & /ɪ/', color: '#58cc02' },
    { id: 3, type: 'game',  label: 'Game /æ/', color: '#ff9600', gameIndex: 0 },
    { id: 3, type: 'game',  label: 'Game /ɪ/', color: '#a322ea', gameIndex: 1 },
    { id: 4, type: 'learn', label: 'Bài 4: /ʌ/ & /ɑ/', color: '#58cc02' },
    { id: 4, type: 'game',  label: 'Game /ʌ/', color: '#ff9600', gameIndex: 0 },
    { id: 4, type: 'game',  label: 'Game /ɑ/', color: '#a322ea', gameIndex: 1 },
    { id: 5, type: 'learn', label: 'Bài 5: /e/', color: '#58cc02' },
    { id: 5, type: 'game',  label: 'Game /e/', color: '#ff9600', gameIndex: 0 },
    { id: 6, type: 'learn', label: 'Bài 6: /k/ & /g/', color: '#58cc02' },
    { id: 6, type: 'game',  label: 'Game /k/', color: '#ff9600', gameIndex: 0 },
    { id: 6, type: 'game',  label: 'Game /g/', color: '#a322ea', gameIndex: 1 },
    { id: 7, type: 'learn', label: 'Bài 7: /f/ & /v/', color: '#58cc02' },
    { id: 7, type: 'game',  label: 'Game /f/', color: '#ff9600', gameIndex: 0 },
    { id: 7, type: 'game',  label: 'Game /v/', color: '#a322ea', gameIndex: 1 },
    { id: 8, type: 'learn', label: 'Bài 8: /s/ & /z/', color: '#58cc02' },
    { id: 8, type: 'game',  label: 'Game /s/', color: '#ff9600', gameIndex: 0 },
    { id: 8, type: 'game',  label: 'Game /z/', color: '#a322ea', gameIndex: 1 },
    { id: 9, type: 'learn', label: 'Bài 9: /ʃ/ & /ʒ/', color: '#58cc02' },
    { id: 9, type: 'game',  label: 'Game /ʃ/', color: '#ff9600', gameIndex: 0 },
    { id: 9, type: 'game',  label: 'Game /ʒ/', color: '#a322ea', gameIndex: 1 },
    { id: 10, type: 'learn', label: 'Bài 10: /tʃ/ & /dʒ/', color: '#58cc02' },
    { id: 10, type: 'game',  label: 'Game /tʃ/', color: '#ff9600', gameIndex: 0 },
    { id: 10, type: 'game',  label: 'Game /dʒ/', color: '#a322ea', gameIndex: 1 },
    { id: 11, type: 'learn', label: 'Bài 11: Ôn tập', color: '#ff9600' },
    { id: 12, type: 'learn', label: 'Bài 12: Âm /iː/', color: '#58cc02' },
    { id: 12, type: 'game',  label: 'Game /iː/', color: '#ff9600', gameIndex: 0 },
    { id: 13, type: 'learn', label: 'Bài 13: /ʊ/ & /uː/', color: '#58cc02' },
    { id: 13, type: 'game',  label: 'Game /ʊ/', color: '#ff9600', gameIndex: 0 },
    { id: 13, type: 'game',  label: 'Game /uː/', color: '#a322ea', gameIndex: 1 },
    { id: 14, type: 'learn', label: 'Bài 14: /ɑːr/ & /ɔːr/', color: '#58cc02' },
    { id: 14, type: 'game',  label: 'Game /ɑːr/', color: '#ff9600', gameIndex: 0 },
    { id: 14, type: 'game',  label: 'Game /ɔːr/', color: '#a322ea', gameIndex: 1 },
    { id: 15, type: 'learn', label: 'Bài 15: /ə/ & /ɜːr/', color: '#58cc02' },
    { id: 15, type: 'game',  label: 'Game /ə/', color: '#ff9600', gameIndex: 0 },
    { id: 15, type: 'game',  label: 'Game /ɜːr/', color: '#a322ea', gameIndex: 1 },
    { id: 16, type: 'learn', label: 'Bài 16: /ɪr/ & /er/', color: '#58cc02' },
    { id: 16, type: 'game',  label: 'Game /ɪr/', color: '#ff9600', gameIndex: 0 },
    { id: 16, type: 'game',  label: 'Game /er/', color: '#a322ea', gameIndex: 1 },
    { id: 17, type: 'learn', label: 'Bài 17: /aʊ/ & /oʊ/', color: '#58cc02' },
    { id: 17, type: 'game',  label: 'Game /aʊ/', color: '#ff9600', gameIndex: 0 },
    { id: 17, type: 'game',  label: 'Game /oʊ/', color: '#a322ea', gameIndex: 1 },
    { id: 18, type: 'learn', label: 'Bài 18: /eɪ/ & /aɪ/', color: '#58cc02' },
    { id: 18, type: 'game',  label: 'Game /eɪ/ (Mole)', gameType: 'mole', color: '#ff9600', gameIndex: 0 },
    { id: 18, type: 'game',  label: 'Game /aɪ/ (Mole)', gameType: 'mole', color: '#a322ea', gameIndex: 1 },
    { id: 19, type: 'learn', label: 'Bài 19: /ɔɪ/ & /t̬/', color: '#58cc02' },
    { id: 19, type: 'game',  label: 'Game /ɔɪ/ (Snake)', gameType: 'snake', color: '#ff9600', gameIndex: 0 },
    { id: 19, type: 'game',  label: 'Game /t̬/ (Snake)', gameType: 'snake', color: '#a322ea', gameIndex: 1 },
    { id: 20, type: 'learn', label: 'Bài 20: /m/ & /n/', color: '#58cc02' },
    { id: 20, type: 'game',  label: 'Game /m/', color: '#ff9600', gameIndex: 0 },
    { id: 20, type: 'game',  label: 'Game /n/', color: '#a322ea', gameIndex: 1 },
    { id: 21, type: 'learn', label: 'Bài 21: /ŋ/ & /h/', color: '#58cc02' },
    { id: 21, type: 'game',  label: 'Game /ŋ/', color: '#ff9600', gameIndex: 0 },
    { id: 21, type: 'game',  label: 'Game /h/', color: '#a322ea', gameIndex: 1 },
    { id: 22, type: 'learn', label: 'Bài 22: /r/ & /l/', color: '#58cc02' },
    { id: 22, type: 'game',  label: 'Game /r/', color: '#ff9600', gameIndex: 0 },
    { id: 22, type: 'game',  label: 'Game /l/', color: '#a322ea', gameIndex: 1 },
    { id: 23, type: 'learn', label: 'Bài 23: /j/ & /w/', color: '#58cc02' },
    { id: 23, type: 'game',  label: 'Game /j/', color: '#ff9600', gameIndex: 0 },
    { id: 23, type: 'game',  label: 'Game /w/', color: '#a322ea', gameIndex: 1 },
    { id: 24, type: 'learn', label: 'Bài 24: /θ/ & /ð/', color: '#58cc02' },
    { id: 24, type: 'game',  label: 'Game /θ/', color: '#ff9600', gameIndex: 0 },
    { id: 24, type: 'game',  label: 'Game /ð/', color: '#a322ea', gameIndex: 1 },
    { id: 25, type: 'learn', label: 'Bài 25: /ks/ & /kw/', color: '#58cc02' },
    { id: 25, type: 'game',  label: 'Game /ks/', color: '#ff9600', gameIndex: 1 },
    { id: 25, type: 'game',  label: 'Game /kw/', color: '#a322ea', gameIndex: 0 },
    { id: 26, type: 'learn', label: '  🎓   THI THỬ CUỐI KHÓA', color: '#e74c3c' }
];

const IPA_DATA = {
    "Single Vowels": ["sound_i", "sound_ii", "sound_u", "sound_uu", "sound_e", "sound_schwa", "sound_ae", "sound_uh", "sound_aa"],
    "Double Vowels": ["sound_ei", "sound_oi", "sound_ai", "sound_ou", "sound_au"],
    "R-controlled Vowels": ["sound_ur", "sound_or", "sound_ar", "sound_ir", "sound_er"],
    "Unvoiced Consonants": ["sound_p", "sound_f", "sound_th", "sound_t", "sound_s", "sound_sh", "sound_ch", "sound_k", "sound_h", "sound_ks"],
    "Voiced Consonants": ["sound_b", "sound_v", "sound_dh", "sound_d", "sound_z", "sound_zh", "sound_j", "sound_g", "sound_m", "sound_n", "sound_ng", "sound_w", "sound_l", "sound_r", "sound_y", "sound_kw", "sound_flapt"]
};

const DataEngine = {
    lesson1: [
        { img: "tap.jpg", speak: "tap", pre: "t", parts: [{t:"t"}, {i:"æ", t:"a"}, {t:"p"}] },
        { img: "top.jpg", speak: "top", pre: "t", parts: [{t:"t"}, {i:"ɑ", t:"o"}, {t:"p"}] },
        { img: "pot.jpg", speak: "pot", pre: "p", parts: [{t:"p"}, {i:"ɑ", t:"o"}, {t:"t"}] },
        { img: "to.jpg", speak: "to", pre: "t", parts: [{t:"t"}, {i:"uː", t:"o"}] },
        { img: "tin.jpg", speak: "tin", pre: "t", parts: [{t:"t"}, {i:"ɪ", t:"i"}, {t:"n"}] },
        { img: "dog.jpg", speak: "dog", pre: "d", parts: [{t:"d"}, {i:"ɑ", t:"o"}, {t:"g"}] },
        { img: "dad.jpg", speak: "dad", pre: "d", parts: [{t:"d"}, {i:"æ", t:"a"}, {t:"d"}] },
        { img: "dig.jpg", speak: "dig", pre: "d", parts: [{t:"d"}, {i:"ɪ", t:"i"}, {t:"g"}] },
        { img: "duck.jpg", speak: "duck", pre: "d", parts: [{t:"d"}, {i:"ʌ", t:"u"}, {i:"k", t:"ck"}] },
        { img: "do.jpg", speak: "do", pre: "d", parts: [{t:"d"}, {i:"uː", t:"o"}] },
        { type: "game", title: "Game /t/", pairs: ["tap", "top", "pot", "to", "tin"], img: "t_card.jpg" },
        { type: "game", title: "Game /d/", pairs: ["dog", "dad", "dig", "duck", "do"], img: "d_card.jpg" }
    ],
    lesson2: [
        { img: "pen.jpg", speak: "pen", pre: "p", parts: [{t:"p"}, {i:"e", t:"e"}, {t:"n"}] },
        { img: "pig.jpg", speak: "pig", pre: "p", parts: [{t:"p"}, {i:"ɪ", t:"i"}, {t:"g"}] },
        { img: "pot.jpg", speak: "pot", pre: "p", parts: [{t:"p"}, {i:"ɑ", t:"o"}, {t:"t"}] },
        { img: "pull.jpg", speak: "pull", pre: "p", parts: [{t:"p"}, {i:"ʊ", t:"u"}, {t:"ll"}] },
        { img: "pin.jpg", speak: "pin", pre: "p", parts: [{t:"p"}, {i:"ɪ", t:"i"}, {t:"n"}] },
        { img: "bag.jpg", speak: "bag", pre: "b", parts: [{t:"b"}, {i:"æ", t:"a"}, {t:"g"}] },
        { img: "book.jpg", speak: "book", pre: "b", parts: [{t:"b"}, {i:"ʊ", t:"oo"}, {t:"k"}] },
        { img: "bat.jpg", speak: "bat", pre: "b", parts: [{t:"b"}, {i:"æ", t:"a"}, {t:"t"}] },
        { img: "box.jpg", speak: "box", pre: "b", parts: [{t:"b"}, {i:"ɑ", t:"o"}, {i:"k s", t:"x"}] },
        { img: "bin.jpg", speak: "bin", pre: "b", parts: [{t:"b"}, {i:"ɪ", t:"i"}, {t:"n"}] },
        { type: "game", title: "Game /p/", pairs: ["pen", "pig", "pot", "pull", "pin"], img: "p_card.jpg" },
        { type: "game", title: "Game /b/", pairs: ["bag", "book", "bat", "box", "bin"], img: "b_card.jpg" }
    ],
    lesson3: [
        { img: "bat.jpg", speak: "bat", pre: "ae", parts: [{t:"b"}, {i:"æ", t:"a"}, {t:"t"}] },
        { img: "dad.jpg", speak: "dad", pre: "ae", parts: [{t:"d"}, {i:"æ", t:"a"}, {t:"d"}] },
        { img: "pat.jpg", speak: "pat", pre: "ae", parts: [{t:"p"}, {i:"æ", t:"a"}, {t:"t"}] },
        { img: "tap.jpg", speak: "tap", pre: "ae", parts: [{t:"t"}, {i:"æ", t:"a"}, {t:"p"}] },
        { img: "bad.jpg", speak: "bad", pre: "ae", parts: [{t:"b"}, {i:"æ", t:"a"}, {t:"d"}] },
        { img: "dip.jpg", speak: "dip", pre: "i", parts: [{t:"d"}, {i:"ɪ", t:"i"}, {t:"p"}] },
        { img: "bit.jpg", speak: "bit", pre: "i", parts: [{t:"b"}, {i:"ɪ", t:"i"}, {t:"t"}] },
        { img: "pit.jpg", speak: "pit", pre: "i", parts: [{t:"p"}, {i:"ɪ", t:"i"}, {t:"t"}] },
        { img: "tip.jpg", speak: "tip", pre: "i", parts: [{t:"t"}, {i:"ɪ", t:"i"}, {t:"p"}] },
        { img: "bib.jpg", speak: "bib", pre: "i", parts: [{t:"b"}, {i:"ɪ", t:"i"}, {t:"b"}] },
        { type: "game", title: "Game /æ/", pairs: ["bat", "dad", "pat", "tap", "bad"], img: "æ_card.jpg" },
        { type: "game", title: "Game /ɪ/", pairs: ["dip", "bit", "pit", "tip", "bib"], img: "ɪ_card.jpg" }
    ],
    lesson4: [
        { img: "duck.jpg", speak: "duck", pre: "uh", parts: [{t:"d"}, {i:"ʌ", t:"u"}, {i:"k", t:"ck"}] },
        { img: "but.jpg", speak: "but", pre: "uh", parts: [{t:"b"}, {i:"ʌ", t:"u"}, {t:"t"}] },
        { img: "tub.jpg", speak: "tub", pre: "uh", parts: [{t:"t"}, {i:"ʌ", t:"u"}, {t:"b"}] },
        { img: "cup.jpg", speak: "cup", pre: "uh", parts: [{i:"k", t:"c"}, {i:"ʌ", t:"u"}, {t:"p"}] },
        { img: "bud.jpg", speak: "bud", pre: "uh", parts: [{t:"b"}, {i:"ʌ", t:"u"}, {t:"d"}] },
        { img: "dot.jpg", speak: "dot", pre: "aa", parts: [{t:"d"}, {i:"ɑ", t:"o"}, {t:"t"}] },
        { img: "top.jpg", speak: "top", pre: "aa", parts: [{t:"t"}, {i:"ɑ", t:"o"}, {t:"p"}] },
        { img: "pot.jpg", speak: "pot", pre: "aa", parts: [{t:"p"}, {i:"ɑ", t:"o"}, {t:"t"}] },
        { img: "dog.jpg", speak: "dog", pre: "aa", parts: [{t:"d"}, {i:"ɑ", t:"o"}, {t:"g"}] },
        { img: "Bob.jpg", speak: "Bob", pre: "aa", parts: [{t:"B"}, {i:"ɑ", t:"o"}, {t:"b"}] },
        { type: "game", title: "Game /ʌ/", pairs: ["duck", "but", "tub", "cup", "bud"], img: "ʌ_card.jpg" },
        { type: "game", title: "Game /ɑ/", pairs: ["dot", "top", "pot", "dog", "Bob"], img: "ɑ_card.jpg" }
    ],
    lesson5: [
        { img: "Ted.jpg", speak: "Ted", pre: "e", parts: [{t:"T"}, {i:"e", t:"e"}, {t:"d"}] },
        { img: "pen.jpg", speak: "pen", pre: "e", parts: [{t:"p"}, {i:"e", t:"e"}, {t:"n"}] },
        { img: "ten.jpg", speak: "ten", pre: "e", parts: [{t:"t"}, {i:"e", t:"e"}, {t:"n"}] },
        { img: "bed.jpg", speak: "bed", pre: "e", parts: [{t:"b"}, {i:"e", t:"e"}, {t:"d"}] },
        { img: "pet.jpg", speak: "pet", pre: "e", parts: [{t:"p"}, {i:"e", t:"e"}, {t:"t"}] },
        { type: "game", title: "Game /e/", pairs: ["Ted", "pen", "ten", "bed", "pet"], img: "e_card.jpg" }
    ],
    lesson6: [
        { img: "cat.jpg", speak: "cat", pre: "k", parts: [{i:"k", t:"c"}, {i:"æ", t:"a"}, {t:"t"}] },
        { img: "kid.jpg", speak: "kid", pre: "k", parts: [{t:"k"}, {i:"ɪ", t:"i"}, {t:"d"}] },
        { img: "cap.jpg", speak: "cap", pre: "k", parts: [{i:"k", t:"c"}, {i:"æ", t:"a"}, {t:"p"}] },
        { img: "cot.jpg", speak: "cot", pre: "k", parts: [{i:"k", t:"c"}, {i:"ɑ", t:"o"}, {t:"t"}] },
        { img: "cup.jpg", speak: "cup", pre: "k", parts: [{i:"k", t:"c"}, {i:"ʌ", t:"u"}, {t:"p"}] },
        { img: "gap.jpg", speak: "gap", pre: "g", parts: [{t:"g"}, {i:"æ", t:"a"}, {t:"p"}] },
        { img: "got.jpg", speak: "got", pre: "g", parts: [{t:"g"}, {i:"ɑ", t:"o"}, {t:"t"}] },
        { img: "dig.jpg", speak: "dig", pre: "d", parts: [{t:"d"}, {i:"ɪ", t:"i"}, {t:"g"}] },
        { img: "dog.jpg", speak: "dog", pre: "d", parts: [{t:"d"}, {i:"ɑ", t:"o"}, {t:"g"}] },
        { img: "get.jpg", speak: "get", pre: "g", parts: [{t:"g"}, {i:"e", t:"e"}, {t:"t"}] },
        { type: "game", title: "Game /k/", pairs: ["cat", "gap", "kid", "got", "cup"], img: "k_card.jpg" },
        { type: "game", title: "Game /g/", pairs: ["gap", "got", "dig", "dog", "get"], img: "g_card.jpg" }
    ],
    lesson7: [
        { img: "fog.jpg", speak: "fog", pre: "f", parts: [{t:"f"}, {i:"ɑ", t:"o"}, {t:"g"}] },
        { img: "fit.jpg", speak: "fit", pre: "f", parts: [{t:"f"}, {i:"ɪ", t:"i"}, {t:"t"}] },
        { img: "fig.jpg", speak: "fig", pre: "f", parts: [{t:"f"}, {i:"ɪ", t:"i"}, {t:"g"}] },
        { img: "fat.jpg", speak: "fat", pre: "f", parts: [{t:"f"}, {i:"æ", t:"a"}, {t:"t"}] },
        { img: "fed.jpg", speak: "fed", pre: "f", parts: [{t:"f"}, {i:"e", t:"e"}, {t:"d"}] },
        { img: "vat.jpg", speak: "vat", pre: "v", parts: [{t:"v"}, {i:"æ", t:"a"}, {t:"t"}] },
        { img: "vet.jpg", speak: "vet", pre: "v", parts: [{t:"v"}, {i:"e", t:"e"}, {t:"t"}] },
        { img: "van.jpg", speak: "van", pre: "v", parts: [{t:"v"}, {i:"æ", t:"a"}, {t:"n"}] },
        { type: "sent", img: "sentence_fed.jpg", speak: "Bob fed a fat dog", parts: [{t:"B"}, {i:"ɑ", t:"o"}, {t:"b"}, {t:" "}, {t:"f"}, {i:"e", t:"e"}, {t:"d"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"f"}, {i:"æ", t:"a"}, {t:"t"}, {t:" "}, {t:"d"}, {i:"ɑ", t:"o"}, {t:"g."}] },
        { type: "sent", img: "sentence_cat.jpg", speak: "A cat got a big cap", parts: [{i:"ə", t:"A"}, {t:" "}, {i:"k", t:"c"}, {i:"æ", t:"a"}, {t:"t"}, {t:" "}, {t:"g"}, {i:"ɑ", t:"o"}, {t:"t"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"b"}, {i:"ɪ", t:"i"}, {t:"g"}, {t:" "}, {i:"k", t:"c"}, {i:"æ", t:"a"}, {t:"p."}] },
        { type: "game", title: "Game /f/", pairs: ["fog", "vat", "fit", "vet", "fat"], img: "f_card.jpg" },
        { type: "game", title: "Game /v/", pairs: ["vat", "vet", "van"], img: "v_card.jpg" }
    ],
    lesson8: [
        { img: "bus.jpg", speak: "bus", pre: "s", parts: [{t:"b"}, {i:"ʌ", t:"u"}, {t:"s"}] },
        { img: "kiss.jpg", speak: "kiss", pre: "s", parts: [{t:"k"}, {i:"ɪ", t:"i"}, {t:"ss"}] },
        { img: "sick.jpg", speak: "sick", pre: "s", parts: [{t:"s"}, {i:"ɪ", t:"i"}, {i:"k", t:"ck"}] },
        { img: "sock.jpg", speak: "sock", pre: "s", parts: [{t:"s"}, {i:"ɑ", t:"o"}, {i:"k", t:"ck"}] },
        { img: "sit.jpg", speak: "sit", pre: "s", parts: [{t:"s"}, {i:"ɪ", t:"i"}, {t:"t"}] },
        { img: "zip.jpg", speak: "zip", pre: "z", parts: [{t:"z"}, {i:"ɪ", t:"i"}, {t:"p"}] },
        { img: "zigzag.jpg", speak: "zigzag", pre: "z", parts: [{t:"z"}, {i:"ɪ", t:"i"}, {t:"g"}, {t:"z"}, {i:"æ", t:"a"}, {t:"g"}] },
        { img: "bugs.jpg", speak: "bugs", pre: "z", parts: [{t:"b"}, {i:"ʌ", t:"u"}, {t:"g"}, {i:"z", t:"s"}] },
        { img: "dogs.jpg", speak: "dogs", pre: "z", parts: [{t:"d"}, {i:"ɑ", t:"o"}, {t:"g"}, {i:"z", t:"s"}] },
        { img: "is.jpg", speak: "is", pre: "z", parts: [{i:"ɪ", t:"i"}, {i:"z", t:"s"}] },
        { type: "sent", img: "sentence_pig.jpg", speak: "A pig gets a cup", parts: [{i:"ə", t:"A"}, {t:" "}, {t:"p"}, {i:"ɪ", t:"i"}, {t:"g"}, {t:" "}, {t:"g"}, {i:"e", t:"e"}, {t:"t"}, {t:"s"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {i:"k", t:"c"}, {i:"ʌ", t:"u"}, {t:"p."}] },
        { type: "sent", img: "sentence_duck.jpg", speak: "A duck sits on the bed", parts: [{i:"ə", t:"A"}, {t:" "}, {t:"d"}, {i:"ʌ", t:"u"}, {i:"k", t:"ck"}, {t:" "}, {t:"s"}, {i:"ɪ", t:"i"}, {t:"t"}, {t:"s"}, {t:" "}, {i:"ɑ", t:"o"}, {t:"n"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"b"}, {i:"e", t:"e"}, {t:"d."}] },
        { type: "sent", img: "sentence_dad.jpg", speak: "Dad digs a pit", parts: [{t:"D"}, {i:"æ", t:"a"}, {t:"d"}, {t:" "}, {t:"d"}, {i:"ɪ", t:"i"}, {t:"g"}, {i:"z", t:"s"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"p"}, {i:"ɪ", t:"i"}, {t:"t."}] },
        { type: "game", title: "Game /s/", pairs: ["bus", "kiss", "sick", "sock", "sit"], img: "s_card.jpg" },
        { type: "game", title: "Game /z/", pairs: ["zip", "zigzag", "bugs", "dogs", "is"], img: "z_card.jpg" }
    ],
    lesson9: [
        { img: "shop.jpg", speak: "shop", pre: "sh", parts: [{i:"ʃ", t:"sh"}, {i:"ɑ", t:"o"}, {t:"p"}] },
        { img: "ship.jpg", speak: "ship", pre: "sh", parts: [{i:"ʃ", t:"sh"}, {i:"ɪ", t:"i"}, {t:"p"}] },
        { img: "fish.jpg", speak: "fish", pre: "sh", parts: [{t:"f"}, {i:"ɪ", t:"i"}, {i:"ʃ", t:"sh"}] },
        { img: "dish.jpg", speak: "dish", pre: "sh", parts: [{t:"d"}, {i:"ɪ", t:"i"}, {i:"ʃ", t:"sh"}] },
        { img: "measure.jpg", speak: "measure", pre: "zh", parts: [{t:"m"}, {i:"e", t:"ea"}, {i:"ʒ", t:"s"}, {i:"ər", t:"ure"}] },
        { img: "treasure.jpg", speak: "treasure", pre: "zh", parts: [{t:"t"}, {t:"r"}, {i:"e", t:"ea"}, {i:"ʒ", t:"s"}, {i:"ər", t:"ure"}] },
        { img: "vision.jpg", speak: "vision", pre: "zh", parts: [{t:"v"}, {i:"ɪ", t:"i"}, {i:"ʒ", t:"s"}, {i:"ən", t:"ion"}] },
        { type: "sent", img: "sentence_shells.jpg", speak: "She sells seashells on the seashore", parts: [{i:"ʃ", t:"Sh"}, {i:"iː", t:"e"}, {t:" "}, {t:"s"}, {i:"e", t:"e"}, {t:"ll"}, {i:"z", t:"s"}, {t:" "}, {t:"s"}, {i:"iː", t:"ea"}, {i:"ʃ", t:"sh"}, {i:"e", t:"e"}, {t:"ll"}, {i:"z", t:"s"}, {t:" "}, {i:"ɑ", t:"o"}, {t:"n"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"s"}, {i:"iː", t:"ea"}, {i:"ʃ", t:"sh"}, {i:"ɔːr", t:"ore."}] },
        { type: "sent", img: "sentence_fish.jpg", speak: "A fat fish sits on a treasure bag", parts: [{i:"ə", t:"A"}, {t:" "}, {t:"f"}, {i:"æ", t:"a"}, {t:"t"}, {t:" "}, {t:"f"}, {i:"ɪ", t:"i"}, {i:"ʃ", t:"sh"}, {t:" "}, {t:"s"}, {i:"ɪ", t:"i"}, {t:"t"}, {i:"z", t:"s"}, {t:" "}, {i:"ɑ", t:"o"}, {t:"n"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"t"}, {t:"r"}, {i:"e", t:"ea"}, {i:"ʒ", t:"s"}, {i:"ər", t:"ure"}, {t:" "}, {t:"b"}, {i:"æ", t:"a"}, {t:"g."}] },
        { type: "game", title: "Game /ʃ/", pairs: ["shop", "ship", "fish", "dish"], img: "ʃ_card.jpg" },
        { type: "game", title: "Game /ʒ/", pairs: ["measure", "treasure", "vision"], img: "ʒ_card.jpg" }
    ],
    lesson10: [
        { img: "chick.jpg", speak: "chick", pre: "ch", parts: [{i:"tʃ", t:"ch"}, {i:"ɪ", t:"i"}, {i:"k", t:"ck"}] },
        { img: "chop.jpg", speak: "chop", pre: "ch", parts: [{i:"tʃ", t:"ch"}, {i:"ɑ", t:"o"}, {t:"p"}] },
        { img: "chin.jpg", speak: "chin", pre: "ch", parts: [{i:"tʃ", t:"ch"}, {i:"ɪ", t:"i"}, {t:"n"}] },
        { img: "chip.jpg", speak: "chip", pre: "ch", parts: [{i:"tʃ", t:"ch"}, {i:"ɪ", t:"i"}, {t:"p"}] },
        { img: "chat.jpg", speak: "chat", pre: "ch", parts: [{i:"tʃ", t:"ch"}, {i:"æ", t:"a"}, {t:"t"}] },
        { img: "jam.jpg", speak: "jam", pre: "j", parts: [{i:"dʒ", t:"j"}, {i:"æ", t:"a"}, {t:"m"}] },
        { img: "jet.jpg", speak: "jet", pre: "j", parts: [{i:"dʒ", t:"j"}, {i:"e", t:"e"}, {t:"t"}] },
        { img: "jug.jpg", speak: "jug", pre: "j", parts: [{i:"dʒ", t:"j"}, {i:"ʌ", t:"u"}, {t:"g"}] },
        { img: "Jack.jpg", speak: "Jack", pre: "j", parts: [{i:"dʒ", t:"J"}, {i:"æ", t:"a"}, {i:"k", t:"ck"}] },
        { img: "job.jpg", speak: "job", pre: "j", parts: [{i:"dʒ", t:"j"}, {i:"ɑ", t:"o"}, {t:"b"}] },
        { type: "sent", img: "sentence_cheerful.jpg", speak: "Cheerful children chase chatty chicks", parts: [{i:"tʃ", t:"Ch"}, {i:"ɪr", t:"eer"}, {t:"f"}, {i:"ə", t:"u"}, {t:"l"}, {t:" "}, {i:"tʃ", t:"ch"}, {i:"ɪ", t:"i"}, {t:"l"}, {t:"d"}, {t:"r"}, {i:"ə", t:"e"}, {t:"n"}, {t:" "}, {i:"tʃ", t:"ch"}, {i:"eɪ", t:"a"}, {t:"s"}, {i:"_", t:"e"}, {t:" "}, {i:"tʃ", t:"ch"}, {i:"æ", t:"a"}, {t:"tt"}, {i:"i", t:"y"}, {t:" "}, {i:"tʃ", t:"ch"}, {i:"ɪ", t:"i"}, {i:"k", t:"ck"}, {t:"s."}] },
        { type: "sent", img: "sentence_jack_jill.jpg", speak: "Jack and Jill juggle juicy ginger jars", parts: [{i:"dʒ", t:"J"}, {i:"æ", t:"a"}, {i:"k", t:"ck"}, {t:" "}, {i:"æ", t:"a"}, {t:"n"}, {t:"d"}, {t:" "}, {i:"dʒ", t:"J"}, {i:"ɪ", t:"i"}, {t:"ll"}, {t:" "}, {i:"dʒ", t:"j"}, {i:"ʌ", t:"u"}, {t:"gg"}, {t:"l"}, {i:"_", t:"e"}, {t:" "}, {i:"dʒ", t:"j"}, {i:"uː", t:"ui"}, {i:"s", t:"c"}, {i:"i", t:"y"}, {t:" "}, {i:"dʒ", t:"g"}, {i:"ɪ", t:"in"}, {t:"n"}, {i:"dʒ", t:"g"}, {i:"ər", t:"er"}, {t:" "}, {i:"dʒ", t:"j"}, {i:"ɑːr", t:"ar"}, {i:"z", t:"s."}] },
        { type: "sent", img: "sentence_chick.jpg", speak: "The chick checks the jam", parts: [{i:"ð", t:"Th"}, {i:"ə", t:"e"}, {t:" "}, {i:"tʃ", t:"ch"}, {i:"ɪ", t:"i"}, {i:"k", t:"ck"}, {t:" "}, {i:"tʃ", t:"ch"}, {i:"e", t:"e"}, {i:"k", t:"ck"}, {t:"s"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {i:"dʒ", t:"j"}, {i:"æ", t:"a"}, {t:"m."}] },
        { type: "game", title: "Game /tʃ/", pairs: ["chick", "chop", "chin", "chip", "chat"], img: "tʃ_card.jpg" },
        { type: "game", title: "Game /dʒ/", pairs: ["jam", "jet", "jug", "Jack", "job"], img: "dʒ_card.jpg" }
    ],
    lesson11: [
        { type: "sent", img: "sentence_Jack.jpg", speak: "Jack got a fish on the dish", parts: [{i:"dʒ", t:"J"}, {i:"æ", t:"a"}, {i:"k", t:"ck"}, {t:" "}, {t:"g"}, {i:"ɑ", t:"o"}, {t:"t"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"f"}, {i:"ɪ", t:"i"}, {i:"ʃ", t:"sh"}, {t:" "}, {i:"ɑ", t:"o"}, {t:"n"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"d"}, {i:"ɪ", t:"i"}, {i:"ʃ", t:"sh."}] },
        { type: "sent", img: "sentence_vet.jpg", speak: "The vet fed the chick on a big ship", parts: [{i:"ð", t:"Th"}, {i:"ə", t:"e"}, {t:" "}, {t:"v"}, {i:"e", t:"e"}, {t:"t"}, {t:" "}, {t:"f"}, {i:"e", t:"e"}, {t:"d"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {i:"tʃ", t:"ch"}, {i:"ɪ", t:"i"}, {i:"k", t:"ck"}, {t:" "}, {i:"ɑ", t:"o"}, {t:"n"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"b"}, {i:"ɪ", t:"i"}, {t:"g"}, {t:" "}, {i:"ʃ", t:"sh"}, {i:"ɪ", t:"i"}, {t:"p."}] },
        { type: "sent", img: "sentence_bugs.jpg", speak: "Cats and dogs catch bugs on a big bus", parts: [{i:"k", t:"C"}, {i:"æ", t:"a"}, {t:"t"}, {t:"s"}, {t:" "}, {i:"æ", t:"a"}, {t:"n"}, {t:"d"}, {t:" "}, {t:"d"}, {i:"ɑ", t:"o"}, {t:"g"}, {i:"z", t:"s"}, {t:" "}, {i:"k", t:"c"}, {i:"æ", t:"a"}, {i:"tʃ", t:"tch"}, {t:" "}, {t:"b"}, {i:"ʌ", t:"u"}, {t:"g"}, {i:"z", t:"s"}, {t:" "}, {i:"ɑ", t:"o"}, {t:"n"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"b"}, {i:"ɪ", t:"i"}, {t:"g"}, {t:" "}, {t:"b"}, {i:"ʌ", t:"u"}, {t:"s."}] }
    ],
    lesson12: [
        { img: "sea.jpg", speak: "sea", pre: "ii", parts: [{t:"s"}, {i:"iː", t:"ea"}] },
        { img: "sheep.jpg", speak: "sheep", pre: "ii", parts: [{i:"ʃ", t:"sh"}, {i:"iː", t:"eep"}] },
        { img: "feet.jpg", speak: "feet", pre: "ii", parts: [{t:"f"}, {i:"iː", t:"ee"}, {t:"t"}] },
        { img: "bee.jpg", speak: "bee", pre: "ii", parts: [{t:"b"}, {i:"iː", t:"ee"}] },
        { img: "eat.jpg", speak: "eat", pre: "ii", parts: [{i:"iː", t:"ea"}, {t:"t"}] },
        { type: "sent", img: "sentence_sheep.jpg", speak: "The sheep sees a bee", parts: [{i:"ð", t:"Th"}, {i:"ə", t:"e"}, {t:" "}, {i:"ʃ", t:"sh"}, {i:"iː", t:"eep"}, {t:" "}, {t:"s"}, {i:"iː", t:"ee"}, {i:"z", t:"s"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"b"}, {i:"iː", t:"ee."}] },
        { type: "sent", img: "sentence_she.jpg", speak: "She keeps a big seed", parts: [{i:"ʃ", t:"Sh"}, {i:"iː", t:"e"}, {t:" "}, {t:"k"}, {i:"iː", t:"ee"}, {t:"p"}, {t:"s"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"b"}, {i:"ɪ", t:"i"}, {t:"g"}, {t:" "}, {t:"s"}, {i:"iː", t:"ee"}, {t:"d."}] },
        { type: "game", title: "Game /iː/", pairs: ["sea", "sheep", "feet", "bee", "eat"], img: "iː_card.jpg" }
    ],
    lesson13: [
        { img: "put.jpg", speak: "put", pre: "u", parts: [{t:"p"}, {i:"ʊ", t:"u"}, {t:"t"}] },
        { img: "bush.jpg", speak: "bush", pre: "u", parts: [{t:"b"}, {i:"ʊ", t:"u"}, {i:"ʃ", t:"sh"}] },
        { img: "book.jpg", speak: "book", pre: "u", parts: [{t:"b"}, {i:"ʊ", t:"oo"}, {t:"k"}] },
        { img: "foot.jpg", speak: "foot", pre: "u", parts: [{t:"f"}, {i:"ʊ", t:"oo"}, {t:"t"}] },
        { img: "cook.jpg", speak: "cook", pre: "u", parts: [{i:"k", t:"c"}, {i:"ʊ", t:"oo"}, {t:"k"}] },
        { img: "boot.jpg", speak: "boot", pre: "uu", parts: [{t:"b"}, {i:"uː", t:"oo"}, {t:"t"}] },
        { img: "food.jpg", speak: "food", pre: "uu", parts: [{t:"f"}, {i:"uː", t:"oo"}, {t:"d"}] },
        { img: "goose.jpg", speak: "goose", pre: "uu", parts: [{t:"g"}, {i:"uː", t:"oo"}, {t:"s"}, {i:"_", t:"e"}] },
        { img: "zoo.jpg", speak: "zoo", pre: "uu", parts: [{t:"z"}, {i:"uː", t:"oo"}] },
        { img: "shoot.jpg", speak: "shoot", pre: "uu", parts: [{i:"ʃ", t:"sh"}, {i:"uː", t:"oo"}, {t:"t"}] },
        { type: "sent", img: "sentence_book.jpg", speak: "Bob put the book in the bush", parts: [{t:"B"}, {i:"ɑ", t:"o"}, {t:"b"}, {t:" "}, {t:"p"}, {i:"ʊ", t:"u"}, {t:"t"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"b"}, {i:"ʊ", t:"oo"}, {t:"k"}, {t:" "}, {i:"ɪ", t:"i"}, {t:"n"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"b"}, {i:"ʊ", t:"u"}, {i:"ʃ", t:"sh."}] },
        { type: "sent", img: "sentence_goose.jpg", speak: "The goose eats food at the zoo", parts: [{i:"ð", t:"Th"}, {i:"ə", t:"e"}, {t:" "}, {t:"g"}, {i:"uː", t:"oo"}, {t:"s"}, {i:"_", t:"e"}, {t:" "}, {i:"iː", t:"ea"}, {t:"t"}, {t:"s"}, {t:" "}, {t:"f"}, {i:"uː", t:"oo"}, {t:"d"}, {t:" "}, {i:"æ", t:"a"}, {t:"t"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"z"}, {i:"uː", t:"oo."}] },
        { type: "game", title: "Game /ʊ/", pairs: ["put", "bush", "book", "foot", "cook"], img: "ʊ_card.jpg" },
        { type: "game", title: "Game /uː/", pairs: ["boot", "food", "goose", "zoo", "shoot"], img: "uː_card.jpg" }
    ],
    lesson14: [
        { img: "shark.jpg", speak: "shark", pre: "ar", parts: [{i:"ʃ", t:"sh"}, {i:"ɑːr", t:"ar"}, {t:"k"}] },
        { img: "star.jpg", speak: "star", pre: "ar", parts: [{t:"s"}, {t:"t"}, {i:"ɑːr", t:"ar"}] },
        { img: "cart.jpg", speak: "cart", pre: "ar", parts: [{i:"k", t:"c"}, {i:"ɑːr", t:"ar"}, {t:"t"}] },
        { img: "car.jpg", speak: "car", pre: "ar", parts: [{i:"k", t:"c"}, {i:"ɑːr", t:"ar"}] },
        { img: "park.jpg", speak: "park", pre: "ar", parts: [{t:"p"}, {i:"ɑːr", t:"ar"}, {t:"k"}] },
        { img: "torch.jpg", speak: "torch", pre: "or", parts: [{t:"t"}, {i:"ɔːr", t:"or"}, {i:"tʃ", t:"ch"}] },
        { img: "shorts.jpg", speak: "shorts", pre: "or", parts: [{i:"ʃ", t:"sh"}, {i:"ɔːr", t:"or"}, {t:"t"}, {t:"s"}] },
        { img: "board.jpg", speak: "board", pre: "or", parts: [{t:"b"}, {i:"ɔːr", t:"oar"}, {t:"d"}] },
        { img: "door.jpg", speak: "door", pre: "or", parts: [{t:"d"}, {i:"ɔːr", t:"oor"}] },
        { img: "fork.jpg", speak: "fork", pre: "or", parts: [{t:"f"}, {i:"ɔːr", t:"or"}, {t:"k"}] },
        { type: "sent", img: "sentence_shark.jpg", speak: "A shark put a star in the jar", parts: [{i:"ə", t:"A"}, {t:" "}, {i:"ʃ", t:"sh"}, {i:"ɑːr", t:"ar"}, {t:"k"}, {t:" "}, {t:"p"}, {i:"ʊ", t:"u"}, {t:"t"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"s"}, {t:"t"}, {i:"ɑːr", t:"ar"}, {t:" "}, {i:"ɪ", t:"i"}, {t:"n"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {i:"dʒ", t:"j"}, {i:"ɑːr", t:"ar."}] },
        { type: "sent", img: "sentence_fork.jpg", speak: "A short fork drops on the floor", parts: [{i:"ə", t:"A"}, {t:" "}, {i:"ʃ", t:"sh"}, {i:"ɔːr", t:"or"}, {t:"t"}, {t:" "}, {t:"f"}, {i:"ɔːr", t:"or"}, {t:"k"}, {t:" "}, {t:"d"}, {t:"r"}, {i:"ɑ", t:"o"}, {t:"p"}, {t:"s"}, {t:" "}, {i:"ɑ", t:"o"}, {t:"n"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"f"}, {t:"l"}, {i:"ɔːr", t:"oor."}] },
        { type: "game", title: "Game /ɑːr/", pairs: ["shark", "torch", "star", "door", "car"], img: "ɑːr_card.jpg" },
        { type: "game", title: "Game /ɔːr/", pairs: ["torch", "shorts", "board", "door", "fork"], img: "ɔːr_card.jpg" }
    ],
    lesson15: [
        { img: "salad.jpg", speak: "salad", pre: "schwa", parts: [{t:"s"}, {i:"æ", t:"a"}, {t:"l"}, {i:"ə", t:"a"}, {t:"d"}] },
        { img: "lemon.jpg", speak: "lemon", pre: "schwa", parts: [{t:"l"}, {i:"e", t:"e"}, {t:"m"}, {i:"ə", t:"o"}, {t:"n"}] },
        { img: "chicken.jpg", speak: "chicken", pre: "schwa", parts: [{i:"tʃ", t:"ch"}, {i:"ɪ", t:"i"}, {i:"k", t:"ck"}, {i:"ə", t:"e"}, {t:"n"}] },
        { img: "kitchen.jpg", speak: "kitchen", pre: "schwa", parts: [{t:"k"}, {i:"ɪ", t:"i"}, {i:"tʃ", t:"tch"}, {i:"ə", t:"e"}, {t:"n"}] },
        { img: "panda.jpg", speak: "panda", pre: "schwa", parts: [{t:"p"}, {i:"æ", t:"a"}, {t:"n"}, {t:"d"}, {i:"ə", t:"a"}] },
        { img: "banana.jpg", speak: "banana", pre: "schwa", parts: [{t:"b"}, {i:"ə", t:"a"}, {t:"n"}, {i:"æ", t:"a"}, {t:"n"}, {i:"ə", t:"a"}] },
        { img: "badminton.jpg", speak: "badminton", pre: "schwa", parts: [{t:"b"}, {i:"æ", t:"a"}, {t:"d"}, {t:"m"}, {i:"ɪ", t:"i"}, {t:"n"}, {t:"t"}, {i:"ə", t:"o"}, {t:"n"}] },
        { img: "elephant.jpg", speak: "elephant", pre: "schwa", parts: [{i:"e", t:"e"}, {t:"l"}, {i:"ə", t:"e"}, {i:"f", t:"ph"}, {i:"ə", t:"a"}, {t:"n"}, {t:"t"}] },
        { img: "teacher.jpg", speak: "teacher", pre: "ur", parts: [{t:"t"}, {i:"iː", t:"ea"}, {i:"tʃ", t:"ch"}, {i:"ər", t:"er"}] },
        { img: "doctor.jpg", speak: "doctor", pre: "ur", parts: [{t:"d"}, {i:"ɑ", t:"o"}, {i:"k", t:"c"}, {t:"t"}, {i:"ər", t:"or"}] },
        { img: "burger.jpg", speak: "burger", pre: "ur", parts: [{t:"b"}, {i:"ɜːr", t:"ur"}, {t:"g"}, {i:"ər", t:"er"}] },
        { img: "sister.jpg", speak: "sister", pre: "ur", parts: [{t:"s"}, {i:"ɪ", t:"i"}, {t:"s"}, {t:"t"}, {i:"ər", t:"er"}] },
        { img: "rubber.jpg", speak: "rubber", pre: "ur", parts: [{t:"r"}, {i:"ʌ", t:"u"}, {t:"bb"}, {i:"ər", t:"er"}] },
        { img: "lizard.jpg", speak: "lizard", pre: "ur", parts: [{t:"l"}, {i:"ɪ", t:"i"}, {t:"z"}, {i:"ər", t:"ar"}, {t:"d"}] },
        { img: "under.jpg", speak: "under", pre: "ur", parts: [{i:"ʌ", t:"u"}, {t:"n"}, {t:"d"}, {i:"ər", t:"er"}] },
        { img: "superman.jpg", speak: "superman", pre: "ur", parts: [{t:"s"}, {i:"uː", t:"u"}, {t:"p"}, {i:"ər", t:"er"}, {t:"m"}, {i:"æ", t:"a"}, {t:"n"}] },
        { type: "game", title: "Game /ə/", pairs: ["salad", "lemon", "chicken", "kitchen", "panda"], img: "ə_card.jpg" },
        { type: "game", title: "Game /ɜːr/", pairs: ["teacher", "doctor", "burger", "sister", "rubber"], img: "ɜːr_card.jpg" }
    ],
   lesson16: [
        { img: "gear.jpg", speak: "gear", pre: "ir", parts: [{t:"g"}, {i:"ɪr", t:"ear"}] },
        { img: "deer.jpg", speak: "deer", pre: "ir", parts: [{t:"d"}, {i:"ɪr", t:"eer"}] },
        { img: "cheer.jpg", speak: "cheer", pre: "ir", parts: [{i:"tʃ", t:"ch"}, {i:"ɪr", t:"eer"}] },
        
        // --- SỬA LỖI ĐỌC TỪ "TEAR" ---
        // Hiển thị (parts): Vẫn là chữ "t" + "ear"
        // Đọc (speak): Đổi thành "tier" để máy luôn đọc âm /tɪr/
        { img: "tear.jpg", speak: "tier", pre: "ir", parts: [{t:"t"}, {i:"ɪr", t:"ear"}] },
        
        { img: "ear.jpg", speak: "ear", pre: "ir", parts: [{i:"ɪr", t:"ear"}] },
        
        // Các từ âm /er/
        { img: "bear.jpg", speak: "bear", pre: "er", parts: [{t:"b"}, {i:"er", t:"ear"}] },
        { img: "pear.jpg", speak: "pear", pre: "er", parts: [{t:"p"}, {i:"er", t:"ear"}] },
        { img: "share.jpg", speak: "share", pre: "er", parts: [{i:"ʃ", t:"sh"}, {i:"er", t:"are"}] },
        { img: "stair.jpg", speak: "stair", pre: "er", parts: [{t:"s"}, {t:"t"}, {i:"er", t:"air"}] },
        { img: "chair.jpg", speak: "chair", pre: "er", parts: [{i:"tʃ", t:"ch"}, {i:"er", t:"air"}] },
        
        // Câu
        { type: "sent", img: "sentence_deer.jpg", speak: "The deer is near the chair", parts: [{i:"ð", t:"Th"}, {i:"ə", t:"e"}, {t:" "}, {t:"d"}, {i:"ɪr", t:"eer"}, {t:" "}, {i:"ɪ", t:"i"}, {i:"z", t:"s"}, {t:" "}, {t:"n"}, {i:"ɪr", t:"ear"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {i:"tʃ", t:"ch"}, {i:"er", t:"air."}] },
        { type: "sent", img: "sentence_bear.jpg", speak: "The bear shares the pear", parts: [{i:"ð", t:"Th"}, {i:"ə", t:"e"}, {t:" "}, {t:"b"}, {i:"er", t:"ear"}, {t:" "}, {i:"ʃ", t:"sh"}, {i:"er", t:"are"}, {i:"z", t:"s"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"p"}, {i:"er", t:"ear."}] },
        
        // Game
        { type: "game", title: "Game /ɪr/", pairs: ["gear", "deer", "cheer", "tear", "ear"], img: "ɪr_card.jpg" },
        { type: "game", title: "Game /er/", pairs: ["bear", "pear", "share", "stair", "chair"], img: "er_card.jpg" }
    ],
    lesson17: [
        { img: "shower.jpg", speak: "shower", pre: "au", parts: [{i:"ʃ", t:"sh"}, {i:"aʊ", t:"ow"}, {i:"ər", t:"er"}] },
        { img: "shout.jpg", speak: "shout", pre: "au", parts: [{i:"ʃ", t:"sh"}, {i:"aʊ", t:"ou"}, {t:"t"}] },
        { img: "cow.jpg", speak: "cow", pre: "au", parts: [{i:"k", t:"c"}, {i:"aʊ", t:"ow"}] },
        { img: "brown.jpg", speak: "brown", pre: "au", parts: [{t:"b"}, {t:"r"}, {i:"aʊ", t:"ow"}, {t:"n"}] },
        { img: "tower.jpg", speak: "tower", pre: "au", parts: [{t:"t"}, {i:"aʊ", t:"ow"}, {i:"ər", t:"er"}] },
        { img: "toe.jpg", speak: "toe", pre: "ou", parts: [{t:"t"}, {i:"oʊ", t:"oe"}] },
        { img: "boat.jpg", speak: "boat", pre: "ou", parts: [{t:"b"}, {i:"oʊ", t:"oa"}, {t:"t"}] },
        { img: "coat.jpg", speak: "coat", pre: "ou", parts: [{i:"k", t:"c"}, {i:"oʊ", t:"oa"}, {t:"t"}] },
        { img: "phone.jpg", speak: "phone", pre: "ou", parts: [{i:"f", t:"ph"}, {i:"oʊ", t:"o"}, {t:"n"}, {i:"_", t:"e"}] },
        { img: "goat.jpg", speak: "goat", pre: "ou", parts: [{t:"g"}, {i:"oʊ", t:"oa"}, {t:"t"}] },
        { type: "sent", img: "sentence_cow.jpg", speak: "The brown cow shouts at the mouse", parts: [{i:"ð", t:"Th"}, {i:"ə", t:"e"}, {t:" "}, {t:"b"}, {t:"r"}, {i:"aʊ", t:"ow"}, {t:"n"}, {t:" "}, {i:"k", t:"c"}, {i:"aʊ", t:"ow"}, {t:" "}, {i:"ʃ", t:"sh"}, {i:"aʊ", t:"ou"}, {t:"t"}, {t:"s"}, {t:" "}, {i:"æ", t:"a"}, {t:"t"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"m"}, {i:"aʊ", t:"ou"}, {t:"s"}, {i:"_", t:"e."}] },
        { type: "sent", img: "sentence_joe.jpg", speak: "Joe shows the slow goat the soap", parts: [{i:"dʒ", t:"J"}, {i:"oʊ", t:"oe"}, {t:" "}, {i:"ʃ", t:"sh"}, {i:"oʊ", t:"ow"}, {i:"z", t:"s"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"s"}, {t:"l"}, {i:"oʊ", t:"ow"}, {t:" "}, {t:"g"}, {i:"oʊ", t:"oa"}, {t:"t"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"s"}, {i:"oʊ", t:"oa"}, {t:"p."}] },
        { type: "game", title: "Game /aʊ/", pairs: ["cow", "brown", "shout", "tower", "shower"], img: "aʊ_card.jpg" },
        { type: "game", title: "Game /oʊ/", pairs: ["toe", "boat", "coat", "phone", "goat"], img: "oʊ_card.jpg" }
    ],
    lesson18: [
        { img: "face.jpg", speak: "face", pre: "ei", parts: [{t:"f"}, {i:"eɪ", t:"a"}, {i:"s", t:"c"}, {i:"_", t:"e"}] },
        { img: "cake.jpg", speak: "cake", pre: "ei", parts: [{i:"k", t:"c"}, {i:"eɪ", t:"a"}, {t:"k"}, {i:"_", t:"e"}] },
        { img: "cave.jpg", speak: "cave", pre: "ei", parts: [{i:"k", t:"c"}, {i:"eɪ", t:"a"}, {t:"v"}, {i:"_", t:"e"}] },
        { img: "baby.jpg", speak: "baby", pre: "ei", parts: [{t:"b"}, {i:"eɪ", t:"a"}, {t:"b"}, {i:"i", t:"y"}] },
        { img: "baker.jpg", speak: "baker", pre: "ei", parts: [{t:"b"}, {i:"eɪ", t:"a"}, {t:"k"}, {i:"ər", t:"er"}] },
        { img: "kite.jpg", speak: "kite", pre: "ai", parts: [{t:"k"}, {i:"aɪ", t:"i"}, {t:"t"}, {i:"_", t:"e"}] },
        { img: "bike.jpg", speak: "bike", pre: "ai", parts: [{t:"b"}, {i:"aɪ", t:"i"}, {t:"k"}, {i:"_", t:"e"}] },
        { img: "tie.jpg", speak: "tie", pre: "ai", parts: [{t:"t"}, {i:"aɪ", t:"ie"}] },
        { img: "pine.jpg", speak: "pine", pre: "ai", parts: [{t:"p"}, {i:"aɪ", t:"i"}, {t:"n"}, {i:"_", t:"e"}] },
        { img: "cry.jpg", speak: "cry", pre: "ai", parts: [{i:"k", t:"c"}, {t:"r"}, {i:"aɪ", t:"y"}] },
        { type: "sent", img: "sentence_vase.jpg", speak: "Kate paints a vase", parts: [{t:"K"}, {i:"eɪ", t:"a"}, {t:"t"}, {i:"_", t:"e"}, {t:" "}, {t:"p"}, {i:"eɪ", t:"ai"}, {t:"n"}, {t:"t"}, {t:"s"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"v"}, {i:"eɪ", t:"a"}, {t:"s"}, {i:"_", t:"e."}] },
        { type: "sent", img: "sentence_tiger.jpg", speak: "A tiger bites a kite", parts: [{i:"ə", t:"A"}, {t:" "}, {t:"t"}, {i:"aɪ", t:"i"}, {t:"g"}, {i:"ər", t:"er"}, {t:" "}, {t:"b"}, {i:"aɪ", t:"i"}, {t:"t"}, {i:"_", t:"e"}, {t:"s"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"k"}, {i:"aɪ", t:"i"}, {t:"t"}, {i:"_", t:"e."}] },
        { type: "game", title: "Game /eɪ/ (Mole)", gameType: 'mole', phoneme: "eɪ", img: "eɪ_card.jpg" },
        { type: "game", title: "Game /aɪ/ (Mole)", gameType: 'mole', phoneme: "aɪ", img: "aɪ_card.jpg" }
    ],
    lesson19: [
        // Âm /ɔɪ/ -> pre: "oi" (Hệ thống sẽ tìm file sound_oi.wav)
        { img: "coin.jpg", speak: "coin", pre: "oi", parts: [{i:"k", t:"c"}, {i:"ɔɪ", t:"oin"}] },
        { img: "point.jpg", speak: "point", pre: "oi", parts: [{t:"p"}, {i:"ɔɪ", t:"oi"}, {t:"n"}, {t:"t"}] },
        { img: "joy.jpg", speak: "joy", pre: "oi", parts: [{i:"dʒ", t:"j"}, {i:"ɔɪ", t:"oy"}] },
        { img: "boy.jpg", speak: "boy", pre: "oi", parts: [{t:"b"}, {i:"ɔɪ", t:"oy"}] },
        { img: "toy.jpg", speak: "toy", pre: "oi", parts: [{t:"t"}, {i:"ɔɪ", t:"oy"}] },

        // Âm /t̬/ (Flap T) -> pre: "flapt" (Hệ thống sẽ tìm file sound_flapt.wav)
        { img: "otter.jpg", speak: "otter", pre: "flapt", parts: [{i:"ɑ", t:"o"}, {i:"t̬", t:"tt"}, {i:"ər", t:"er"}] },
        { img: "butter.jpg", speak: "butter", pre: "flapt", parts: [{t:"b"}, {i:"ʌ", t:"u"}, {i:"t̬", t:"tt"}, {i:"ər", t:"er"}] },
        { img: "kitty.jpg", speak: "kitty", pre: "flapt", parts: [{t:"k"}, {i:"ɪ", t:"i"}, {i:"t̬", t:"tt"}, {i:"i", t:"y"}] },
        { img: "party.jpg", speak: "party", pre: "flapt", parts: [{t:"p"}, {i:"ɑːr", t:"ar"}, {i:"t̬", t:"t"}, {i:"i", t:"y"}] },
        { img: "city.jpg", speak: "city", pre: "flapt", parts: [{i:"s", t:"c"}, {i:"ɪ", t:"i"}, {i:"t̬", t:"t"}, {i:"i", t:"y"}] },

        // Câu (Giữ nguyên)
        { type: "sent", img: "sentence_boy.jpg", speak: "A boy drops a coin and a toy", parts: [{i:"ə", t:"A"}, {t:" "}, {t:"b"}, {i:"ɔɪ", t:"oy"}, {t:" "}, {t:"d"}, {t:"r"}, {i:"ɑ", t:"o"}, {t:"p"}, {t:"s"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {i:"k", t:"c"}, {i:"ɔɪ", t:"oi"}, {t:"n"}, {t:" "}, {i:"æ", t:"a"}, {t:"n"}, {t:"d"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"t"}, {i:"ɔɪ", t:"oy."}] },
        { type: "sent", img: "sentence_peter.jpg", speak: "Peter got butter in the party", parts: [{t:"P"}, {i:"iː", t:"e"}, {i:"t̬", t:"t"}, {i:"ər", t:"er"}, {t:" "}, {t:"g"}, {i:"ɑ", t:"o"}, {t:"t"}, {t:" "}, {t:"b"}, {i:"ʌ", t:"u"}, {i:"t̬", t:"tt"}, {i:"ər", t:"er"}, {t:" "}, {i:"ɪ", t:"i"}, {t:"n"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"p"}, {i:"ɑːr", t:"ar"}, {i:"t̬", t:"t"}, {i:"i", t:"y."}] },

        // Game (Giữ nguyên)
        { type: "game", title: "Game /ɔɪ/ (Snake)", gameType: 'snake', phoneme: "ɔɪ", img: "ɔɪ_card.jpg" },
        { type: "game", title: "Game /t̬/ (Snake)", gameType: 'snake', phoneme: "t̬", img: "t̬_card.jpg" }
    ],
    lesson20: [
        { img: "mat.jpg", speak: "mat", pre: "m", parts: [{t:"m"}, {i:"æ", t:"a"}, {t:"t"}] },
        { img: "game.jpg", speak: "game", pre: "m", parts: [{t:"g"}, {i:"eɪ", t:"a"}, {t:"m"}, {i:"_", t:"e"}] },
        { img: "mad.jpg", speak: "mad", pre: "m", parts: [{t:"m"}, {i:"æ", t:"a"}, {t:"d"}] },
        { img: "time.jpg", speak: "time", pre: "m", parts: [{t:"t"}, {i:"aɪ", t:"i"}, {t:"m"}, {i:"_", t:"e"}] },
        { img: "mouse.jpg", speak: "mouse", pre: "m", parts: [{t:"m"}, {i:"aʊ", t:"ou"}, {t:"s"}, {i:"_", t:"e"}] },
        { img: "net.jpg", speak: "net", pre: "n", parts: [{t:"n"}, {i:"e", t:"e"}, {t:"t"}] },
        { img: "sun.jpg", speak: "sun", pre: "n", parts: [{t:"s"}, {i:"ʌ", t:"u"}, {t:"n"}] },
        { img: "note.jpg", speak: "note", pre: "n", parts: [{t:"n"}, {i:"oʊ", t:"o"}, {t:"t"}, {i:"_", t:"e"}] },
        { img: "nine.jpg", speak: "nine", pre: "n", parts: [{t:"n"}, {i:"aɪ", t:"i"}, {t:"n"}, {i:"_", t:"e"}] },
        { img: "fun.jpg", speak: "fun", pre: "n", parts: [{t:"f"}, {i:"ʌ", t:"u"}, {t:"n"}] },
        { type: "sent", img: "sentence_mom.jpg", speak: "Mom is sick. Mika makes milk for mom", parts: [{t:"M"}, {i:"ɑ", t:"o"}, {t:"m"}, {t:" "}, {i:"ɪ", t:"i"}, {t:"s"}, {t:" "}, {t:"s"}, {i:"ɪ", t:"i"}, {i:"k", t:"ck."}, {t:" "}, {t:"M"}, {i:"iː", t:"i"}, {t:"k"}, {i:"ə", t:"a"}, {t:" "}, {t:"m"}, {i:"eɪ", t:"a"}, {t:"k"}, {i:"_", t:"e"}, {t:"s"}, {t:" "}, {t:"m"}, {i:"ɪ", t:"i"}, {t:"l"}, {t:"k"}, {t:" "}, {t:"f"}, {i:"ɔːr", t:"or"}, {t:" "}, {t:"m"}, {i:"ɑ", t:"o"}, {t:"m."}] },
        { type: "sent", img: "sentence_nina.jpg", speak: "Nina can run fast and she never gives up", parts: [{t:"N"}, {i:"iː", t:"i"}, {t:"n"}, {i:"ə", t:"a"}, {t:" "}, {i:"k", t:"c"}, {i:"æ", t:"a"}, {t:"n"}, {t:" "}, {t:"r"}, {i:"ʌ", t:"u"}, {t:"n"}, {t:" "}, {t:"f"}, {i:"æ", t:"a"}, {t:"s"}, {t:"t"}, {t:" "}, {i:"æ", t:"a"}, {t:"n"}, {t:"d"}, {t:" "}, {i:"ʃ", t:"sh"}, {i:"iː", t:"e"}, {t:" "}, {t:"n"}, {i:"e", t:"e"}, {t:"v"}, {i:"ər", t:"er"}, {t:" "}, {t:"g"}, {i:"ɪ", t:"i"}, {t:"v"}, {i:"_", t:"e"}, {i:"z", t:"s"}, {t:" "}, {i:"ʌ", t:"u"}, {t:"p."}] },
        { type: "game", title: "Game /m/", pairs: ["mat", "game", "mad", "time", "mouse"], img: "m_card.jpg" },
        { type: "game", title: "Game /n/", pairs: ["net", "sun", "note", "nine", "fun"], img: "n_card.jpg" }
    ],
    lesson21: [
        { img: "sing.jpg", speak: "sing", pre: "ng", parts: [{t:"s"}, {i:"ɪ ŋ", t:"ing"}] },
        { img: "finger.jpg", speak: "finger", pre: "ng", parts: [{t:"f"}, {i:"ɪ ŋ", t:"in"}, {t:"g"}, {i:"ər", t:"er"}] },
        { img: "king.jpg", speak: "king", pre: "ng", parts: [{t:"k"}, {i:"ɪ ŋ", t:"ing"}] },
        { img: "kingfisher.jpg", speak: "kingfisher", pre: "ng", parts: [{t:"k"}, {i:"ɪ ŋ", t:"ing"}, {t:"f"}, {i:"ɪ", t:"i"}, {i:"ʃ", t:"sh"}, {i:"ər", t:"er"}] },
        { img: "monkey.jpg", speak: "monkey", pre: "ng", parts: [{t:"m"}, {i:"ʌ ŋ", t:"on"}, {t:"k"}, {i:"i", t:"ey"}] },
        { img: "hat.jpg", speak: "hat", pre: "h", parts: [{t:"h"}, {i:"æ", t:"a"}, {t:"t"}] },
        { img: "hen.jpg", speak: "hen", pre: "h", parts: [{t:"h"}, {i:"e", t:"e"}, {t:"n"}] },
        { img: "hippo.jpg", speak: "hippo", pre: "h", parts: [{t:"h"}, {i:"ɪ", t:"i"}, {t:"pp"}, {i:"oʊ", t:"o"}] },
        { img: "heart.jpg", speak: "heart", pre: "h", parts: [{t:"h"}, {i:"ɑ:r", t:"ear"}, {t:"t"}] },
        { img: "horse.jpg", speak: "horse", pre: "h", parts: [{t:"h"}, {i:"ɔ:r", t:"or"}, {t:"s"}, {i:"_", t:"e"}] },
        { type: "sent", img: "sentence_monkey.jpg", speak: "The monkey is making an amazing gift for the flamingo", parts: [{i:"ð", t:"Th"}, {i:"ə", t:"e"}, {t:" "}, {t:"m"}, {i:"ʌ ŋ", t:"on"}, {t:"k"}, {i:"i", t:"ey"}, {t:" "}, {i:"ɪ", t:"i"}, {i:"z", t:"s"}, {t:" "}, {t:"m"}, {i:"eɪ", t:"a"}, {t:"k"}, {i:"ɪ ŋ", t:"ing"}, {t:" "}, {i:"ə", t:"a"}, {t:"n"}, {t:" "}, {i:"ə", t:"a"}, {t:"m"}, {i:"eɪ", t:"a"}, {t:"z"}, {i:"ɪ ŋ", t:"ing"}, {t:" "}, {t:"g"}, {i:"ɪ", t:"i"}, {t:"f"}, {t:"t"}, {t:" "}, {t:"f"}, {i:"ɔːr", t:"or"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"f"}, {t:"l"}, {i:"ə", t:"a"}, {t:"m"}, {i:"ɪ ŋ", t:"in"}, {t:"g"}, {i:"oʊ", t:"o."}] },
        { type: "sent", img: "sentence_he.jpg", speak: "He hopes his sister is happy", parts: [{t:"H"}, {i:"iː", t:"e"}, {t:" "}, {t:"h"}, {i:"oʊ", t:"o"}, {t:"p"}, {i:"_", t:"e"}, {t:"s"}, {t:" "}, {t:"h"}, {i:"ɪ", t:"i"}, {t:"s"}, {t:" "}, {t:"s"}, {i:"ɪ", t:"i"}, {t:"s"}, {t:"t"}, {i:"ər", t:"er"}, {t:" "}, {i:"ɪ", t:"i"}, {i:"z", t:"s"}, {t:" "}, {t:"h"}, {i:"æ", t:"a"}, {t:"pp"}, {i:"i", t:"y."}] },
        { type: "game", title: "Game /ŋ/", pairs: ["sing", "finger", "king", "kingfisher", "monkey"], img: "ŋ_card.jpg" },
        { type: "game", title: "Game /h/", pairs: ["hat", "hen", "hippo", "heart", "horse"], img: "h_card.jpg" }
    ],
    lesson22: [
        { img: "red.jpg", speak: "red", pre: "r", parts: [{t:"r"}, {i:"e", t:"e"}, {t:"d"}] },
        { img: "run.jpg", speak: "run", pre: "r", parts: [{t:"r"}, {i:"ʌ", t:"u"}, {t:"n"}] },
        { img: "carrot.jpg", speak: "carrot", pre: "r", parts: [{i:"k", t:"c"}, {i:"æ", t:"a"}, {t:"rr"}, {i:"ə", t:"o"}, {t:"t"}] },
        { img: "ring.jpg", speak: "ring", pre: "r", parts: [{t:"r"}, {i:"ɪ ŋ", t:"ing"}] },
        { img: "rabbit.jpg", speak: "rabbit", pre: "r", parts: [{t:"r"}, {i:"æ", t:"a"}, {t:"bb"}, {i:"ɪ", t:"i"}, {t:"t"}] },
        { img: "lion.jpg", speak: "lion", pre: "l", parts: [{t:"l"}, {i:"aɪ", t:"i"}, {i:"ə", t:"o"}, {t:"n"}] },
        { img: "ladder.jpg", speak: "ladder", pre: "l", parts: [{t:"l"}, {i:"æ", t:"a"}, {t:"dd"}, {i:"ər", t:"er"}] },
        { img: "ball.jpg", speak: "ball", pre: "l", parts: [{t:"b"}, {i:"ɑː", t:"a"}, {t:"ll"}] },
        { img: "lips.jpg", speak: "lips", pre: "l", parts: [{t:"l"}, {i:"ɪ", t:"i"}, {t:"p"}, {t:"s"}] },
        { img: "lamp.jpg", speak: "lamp", pre: "l", parts: [{t:"l"}, {i:"æ", t:"a"}, {t:"m"}, {t:"p"}] },
        { type: "sent", img: "sentence_rick.jpg", speak: "Rick is ready to read a good story for Sarah", parts: [{t:"R"}, {i:"ɪ", t:"i"}, {i:"k", t:"ck"}, {t:" "}, {i:"ɪ", t:"i"}, {i:"z", t:"s"}, {t:" "}, {t:"r"}, {i:"e", t:"ea"}, {t:"d"}, {i:"i", t:"y"}, {t:" "}, {t:"t"}, {i:"uː", t:"o"}, {t:" "}, {t:"r"}, {i:"iː", t:"ea"}, {t:"d"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"g"}, {i:"ʊ", t:"oo"}, {t:"d"}, {t:" "}, {t:"s"}, {t:"t"}, {i:"ɔːr", t:"or"}, {i:"i", t:"y"}, {t:" "}, {t:"f"}, {i:"ɔːr", t:"or"}, {t:" "}, {t:"S"}, {i:"æ", t:"a"}, {t:"r"}, {i:"ə", t:"a"}, {i:"_", t:"h."}] },
        { type: "sent", img: "sentence_lily.jpg", speak: "Lily likes to look at her Mom smiling", parts: [{t:"L"}, {i:"ɪ", t:"i"}, {t:"l"}, {i:"i", t:"y"}, {t:" "}, {t:"l"}, {i:"aɪ", t:"i"}, {t:"k"}, {i:"_", t:"e"}, {t:"s"}, {t:" "}, {t:"t"}, {i:"uː", t:"o"}, {t:" "}, {t:"l"}, {i:"ʊ", t:"oo"}, {t:"k"}, {t:" "}, {i:"æ", t:"a"}, {t:"t"}, {t:" "}, {t:"h"}, {i:"ər", t:"er"}, {t:" "}, {t:"M"}, {i:"ɑ", t:"o"}, {t:"m"}, {t:" "}, {t:"s"}, {t:"m"}, {i:"aɪ", t:"i"}, {t:"l"}, {i:"ɪ ŋ", t:"ing."}] },
        { type: "game", title: "Game /r/", pairs: ["red", "run", "carrot", "ring", "rabbit"], img: "r_card.jpg" },
        { type: "game", title: "Game /l/", pairs: ["lion", "ladder", "ball", "lips", "lamp"], img: "l_card.jpg" }
    ],
    lesson23: [
        { img: "yellow.jpg", speak: "yellow", pre: "y", parts: [{i:"j", t:"y"}, {i:"e", t:"e"}, {t:"ll"}, {i:"oʊ", t:"ow"}] },
        { img: "yoyo.jpg", speak: "yoyo", pre: "y", parts: [{i:"j", t:"y"}, {i:"oʊ", t:"o"}, {i:"j", t:"y"}, {i:"oʊ", t:"o"}] },
        { img: "yogurt.jpg", speak: "yogurt", pre: "y", parts: [{i:"j", t:"y"}, {i:"oʊ", t:"o"}, {t:"g"}, {i:"ər", t:"ur"}, {t:"t"}] },
        { img: "yam.jpg", speak: "yam", pre: "y", parts: [{i:"j", t:"y"}, {i:"æ", t:"a"}, {t:"m"}] },
        { img: "yak.jpg", speak: "yak", pre: "y", parts: [{i:"j", t:"y"}, {i:"æ", t:"a"}, {t:"k"}] },
        { img: "web.jpg", speak: "web", pre: "w", parts: [{t:"w"}, {i:"e", t:"e"}, {t:"b"}] },
        { img: "wolf.jpg", speak: "wolf", pre: "w", parts: [{t:"w"}, {i:"ʊ", t:"o"}, {t:"l"}, {t:"f"}] },
        { img: "walk.jpg", speak: "walk", pre: "w", parts: [{t:"w"}, {i:"ɑː", t:"a"}, {i:"_", t:"l"}, {t:"k"}] },
        { img: "winter.jpg", speak: "winter", pre: "w", parts: [{t:"w"}, {i:"ɪ", t:"i"}, {t:"n"}, {t:"t"}, {i:"ər", t:"er"}] },
        { img: "water.jpg", speak: "water", pre: "w", parts: [{t:"w"}, {i:"ɑː", t:"a"}, {i:"t̬", t:"t"}, {i:"ər", t:"er"}] },
        { type: "sent", img: "sentence_your.jpg", speak: "Your kindness makes you a young hero", parts: [{i:"J", t:"Y"}, {i:"ɔːr", t:"our"}, {t:" "}, {t:"k"}, {i:"aɪ", t:"i"}, {t:"n"}, {t:"d"}, {t:"n"}, {i:"ə", t:"e"}, {t:"ss"}, {t:" "}, {t:"m"}, {i:"eɪ", t:"a"}, {t:"k"}, {i:"_", t:"e"}, {t:"s"}, {t:" "}, {i:"j", t:"y"}, {i:"uː", t:"ou"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {i:"j", t:"y"}, {i:"ʌ ŋ", t:"oung"}, {t:" "}, {t:"h"}, {i:"ɪ", t:"e"}, {t:"r"}, {i:"oʊ", t:"o."}] },
        { type: "sent", img: "sentence_we.jpg", speak: "We work well to win the race", parts: [{t:"W"}, {i:"iː", t:"e"}, {t:" "}, {t:"w"}, {i:"ɜːr", t:"or"}, {t:"k"}, {t:" "}, {t:"w"}, {i:"e", t:"e"}, {t:"ll"}, {t:" "}, {t:"t"}, {i:"uː", t:"o"}, {t:" "}, {t:"w"}, {i:"ɪ", t:"i"}, {t:"n"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"r"}, {i:"eɪ", t:"a"}, {i:"s", t:"c"}, {i:"_", t:"e."}] },
        { type: "game", title: "Game /j/", pairs: ["yellow", "web", "yoyo", "wolf", "yogurt"], img: "j_card.jpg" },
        { type: "game", title: "Game /w/", pairs: ["web", "wolf", "walk", "winter", "water"], img: "w_card.jpg" }
    ],
    lesson24: [
        { img: "thin.jpg", speak: "thin", pre: "th", parts: [{i:"θ", t:"th"}, {i:"ɪ", t:"i"}, {t:"n"}] },
        { img: "teeth.jpg", speak: "teeth", pre: "t", parts: [{t:"t"}, {i:"iː", t:"ee"}, {i:"θ", t:"th"}] },
        { img: "thumb.jpg", speak: "thumb", pre: "th", parts: [{i:"θ", t:"th"}, {i:"ʌ", t:"u"}, {t:"m"}, {i:"_", t:"b"}] },
        { img: "earth.jpg", speak: "earth", pre: "th", parts: [{i:"ɜːr", t:"ear"}, {i:"θ", t:"th"}] },
        { img: "birthday.jpg", speak: "birthday", pre: "th", parts: [{t:"b"}, {i:"ɜːr", t:"ir"}, {i:"θ", t:"th"}, {t:"d"}, {i:"eɪ", t:"ay"}] },
        { img: "father.jpg", speak: "father", pre: "dh", parts: [{t:"f"}, {i:"ɑː", t:"a"}, {i:"ð", t:"th"}, {i:"ər", t:"er"}] },
        { img: "together.jpg", speak: "together", pre: "dh", parts: [{t:"t"}, {i:"ə", t:"o"}, {t:"g"}, {i:"e", t:"e"}, {i:"ð", t:"th"}, {i:"ər", t:"er"}] },
        { img: "clothing.jpg", speak: "clothing", pre: "dh", parts: [{i:"k", t:"c"}, {t:"l"}, {i:"oʊ", t:"o"}, {i:"ð", t:"th"}, {i:"ɪ ŋ", t:"ing"}] },
        { img: "feather.jpg", speak: "feather", pre: "dh", parts: [{t:"f"}, {i:"e", t:"ea"}, {i:"ð", t:"th"}, {i:"ər", t:"er"}] },
        { img: "weather.jpg", speak: "weather", pre: "dh", parts: [{t:"w"}, {i:"e", t:"ea"}, {i:"ð", t:"th"}, {i:"ər", t:"er"}] },
        { type: "sent", img: "sentence_think.jpg", speak: "Think good things and say thank you to have a happy heart", parts: [{i:"θ", t:"Th"}, {i:"ɪ ŋ", t:"in"}, {t:"k"}, {t:" "}, {t:"g"}, {i:"ʊ", t:"oo"}, {t:"d"}, {t:" "}, {i:"θ", t:"th"}, {i:"ɪ ŋ", t:"ing"}, {i:"z", t:"s"}, {t:" "}, {i:"æ", t:"a"}, {t:"n"}, {t:"d"}, {t:" "}, {t:"s"}, {i:"eɪ", t:"ay"}, {t:" "}, {i:"θ", t:"th"}, {i:"æ", t:"a"}, {i:"ŋ", t:"n"}, {t:"k"}, {t:" "}, {i:"j", t:"y"}, {i:"uː", t:"ou"}, {t:" "}, {t:"t"}, {i:"u:", t:"o"}, {t:" "}, {t:"h"}, {i:"æ", t:"a"}, {t:"v"}, {i:"_", t:"e"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"h"}, {i:"æ", t:"a"}, {t:"pp"}, {i:"i", t:"y"}, {t:" "}, {t:"h"}, {i:"ɑːr", t:"ear"}, {t:"t."}] },
        { type: "sent", img: "sentence_they.jpg", speak: "They help their mother with the dishes", parts: [{i:"ð", t:"Th"}, {i:"eɪ", t:"ey"}, {t:" "}, {t:"h"}, {i:"e", t:"e"}, {t:"l"}, {t:"p"}, {t:" "}, {i:"ð", t:"th"}, {i:"e", t:"ei"}, {t:"r"}, {t:" "}, {t:"m"}, {i:"ʌ", t:"o"}, {i:"ð", t:"th"}, {i:"ər", t:"er"}, {t:" "}, {t:"w"}, {i:"ɪ", t:"i"}, {i:"ð", t:"th"}, {t:" "}, {i:"ð", t:"th"}, {i:"ə", t:"e"}, {t:" "}, {t:"d"}, {i:"ɪ", t:"i"}, {i:"ʃ", t:"sh"}, {i:"ɪ", t:"e"}, {i:"z", t:"s."}] },
        { type: "game", title: "Game /θ/", pairs: ["thin", "father", "thumb", "feather", "teeth"], img: "θ_card.jpg" },
        { type: "game", title: "Game /ð/", pairs: ["father", "together", "clothing", "feather", "weather"], img: "ð_card.jpg" }
    ],
    lesson25: [
        { img: "queen.jpg", speak: "queen", pre: "kw", parts: [{i:"k w", t:"qu"}, {i:"iː", t:"een"}] },
        { img: "question.jpg", speak: "question", pre: "kw", parts: [{i:"k w", t:"qu"}, {i:"e", t:"es"}, {i:"tʃ ə", t:"tio"}, {t:"n"}] },
        { img: "quiet.jpg", speak: "quiet", pre: "kw", parts: [{i:"k w", t:"qu"}, {i:"aɪ", t:"i"}, {i:"ə", t:"e"}, {t:"t"}] },
        { img: "quail.jpg", speak: "quail", pre: "kw", parts: [{i:"k w", t:"qu"}, {i:"eɪ", t:"ail"}] },
        { img: "quill.jpg", speak: "quill", pre: "kw", parts: [{i:"k w", t:"qu"}, {i:"ɪ", t:"i"}, {t:"ll"}] },
        { img: "axe.jpg", speak: "axe", pre: "ks", parts: [{i:"æ", t:"a"}, {i:"k s", t:"x"}, {i:"_", t:"e"}] },
        { img: "taxi.jpg", speak: "taxi", pre: "ks", parts: [{t:"t"}, {i:"æ", t:"a"}, {i:"k s", t:"x"}, {i:"i", t:"i"}] },
        { img: "six.jpg", speak: "six", pre: "ks", parts: [{t:"s"}, {i:"ɪ", t:"i"}, {i:"k s", t:"x"}] },
        { img: "box.jpg", speak: "box", pre: "ks", parts: [{t:"b"}, {i:"ɑ", t:"o"}, {i:"k s", t:"x"}] },
        { img: "fox.jpg", speak: "fox", pre: "ks", parts: [{t:"f"}, {i:"ɑ", t:"o"}, {i:"k s", t:"x"}] },
        { type: "sent", img: "sentence_quiet.jpg", speak: "Be quiet and ask a quick question to learn", parts: [{t:"B"}, {i:"i:", t:"e"}, {t:" "}, {i:"k w", t:"qu"}, {i:"aɪ", t:"i"}, {i:"ə", t:"e"}, {t:"t"}, {t:" "}, {i:"æ", t:"a"}, {t:"n"}, {t:"d"}, {t:" "}, {i:"æ", t:"a"}, {t:"s"}, {t:"k"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {i:"k w", t:"qu"}, {i:"ɪ", t:"i"}, {i:"k", t:"ck"}, {t:" "}, {i:"k w", t:"qu"}, {i:"e", t:"es"}, {i:"tʃ ə", t:"tio"}, {t:"n"}, {t:" "}, {t:"t"}, {i:"u:", t:"o"}, {t:" "}, {t:"l"}, {i:"ɜːr", t:"ear"}, {t:"n."}] },
        { type: "sent", img: "sentence_six.jpg", speak: "Six kids and one fox relax around a box of toys", parts: [{t:"S"}, {i:"ɪ", t:"i"}, {i:"k s", t:"x"}, {t:" "}, {t:"k"}, {i:"ɪ", t:"i"}, {t:"d"}, {i:"z", t:"s"}, {t:" "}, {i:"æ", t:"a"}, {t:"n"}, {t:"d"}, {t:" "}, {i:"w ʌ n", t:"one"}, {t:" "}, {t:"f"}, {i:"ɑ", t:"o"}, {i:"k s", t:"x"}, {t:" "}, {t:"r"}, {i:"ɪ", t:"e"}, {t:"l"}, {i:"æ", t:"a"}, {i:"k s", t:"x"}, {t:" "}, {i:"ə", t:"a"}, {t:"r"}, {i:"aʊ", t:"ou"}, {t:"n"}, {t:"d"}, {t:" "}, {i:"ə", t:"a"}, {t:" "}, {t:"b"}, {i:"ɑ", t:"o"}, {i:"k s", t:"x"}, {t:" "}, {i:"ʌ", t:"o"}, {t:"f"}, {t:" "}, {t:"t"}, {i:"ɔɪ", t:"oy"}, {i:"z", t:"s."}] },
        { type: "game", title: "Game /kw/", pairs: ["queen", "question", "quiet", "quail", "quill"], img: "kw_card.jpg" },
        { type: "game", title: "Game /ks/", pairs: ["axe", "taxi", "six", "box", "fox"], img: "ks_card.jpg" }
    ],
/* --- HÀM TẠO ĐỀ THI NGẪU NHIÊN (40 CÂU) --- */
    getMockTest: function() {
        let testSet = [];
        
        // 1. Lấy 10 hình IPA ngẫu nhiên từ biến IPA_DATA
        let allIPAs = [];
        for (const key in IPA_DATA) {
            IPA_DATA[key].forEach(sound => {
                allIPAs.push({ 
                    type: 'exam-ipa', 
                    img: sound + ".jpg", 
                    speak: sound + ".wav", 
                    text: "" 
                });
            });
        }
        allIPAs.sort(() => 0.5 - Math.random());
        testSet = testSet.concat(allIPAs.slice(0, 10));

        // 2. Lấy 25 từ ngẫu nhiên
        let allWords = [];
        for (let i=1; i<=25; i++) {
            let lesson = this["lesson"+i];
            if(lesson) {
                let words = lesson.filter(item => item.img && item.type !== 'game' && item.type !== 'sent');
                allWords = allWords.concat(words);
            }
        }
        allWords.sort(() => 0.5 - Math.random());
        testSet = testSet.concat(allWords.slice(0, 25));

        // 3. Lấy 5 câu ngẫu nhiên
        let allSents = [];
        for (let i=1; i<=25; i++) {
            let lesson = this["lesson"+i];
            if(lesson) {
                let sents = lesson.filter(item => item.type === 'sent');
                allSents = allSents.concat(sents);
            }
        }
        allSents.sort(() => 0.5 - Math.random());
        testSet = testSet.concat(allSents.slice(0, 5));

        return testSet;
    },

    getLesson: function(num) {
        if (num === 26) return this.getMockTest(); 
        if(this["lesson" + num]) return this["lesson" + num];
        return [];
    }

};


/* --- PART 2: INTONATION (Shadowing Movies) --- */
const IntonationData = [
    {
        id: 1,
        title: "Frozen: Anna meets Olaf (Full Scene)",
        img: "frozen.jpg", 
        youtubeId: "Zvgt-yPEmxs", // ID VIDEO MỚI CỦA BẠN
        segments: [
            { start: 0.0, end: 3.36, text: "I never knew winter could be so beautiful.", parts: [{t:"I", i:"aɪ"}, {t:"never", i:"ˈnɛv.ər"}, {t:"knew", i:"njuː"}, {t:"winter", i:"ˈwɪn.tər"}, {t:"could", i:"kʊd"}, {t:"be", i:"biː"}, {t:"so", i:"soʊ"}, {t:"beautiful.", i:"ˈbjuː.tɪ.fəl"}] },
            { start: 4.23, end: 8.26, text: "Yeah, it really is beautiful, isn't it?", parts: [{t:"Yeah,", i:"jɛə"}, {t:"it", i:"ɪt"}, {t:"really", i:"ˈrɪə.li"}, {t:"is", i:"ɪz"}, {t:"beautiful,", i:"ˈbjuː.tɪ.fəl"}, {t:"isn't", i:"ˈɪz.ənt"}, {t:"it?", i:"ɪt"}] },
            { start: 8.26, end: 10.0, text: "But it's so white.", parts: [{t:"But", i:"bʌt"}, {t:"it's", i:"ɪts"}, {t:"so", i:"soʊ"}, {t:"white.", i:"waɪt"}] },
            { start: 10.0, end: 15.26, text: "You know, I have a little color. I'm thinking like maybe some crimson, chartreuse...", parts: [{t:"You", i:"juː"}, {t:"know,", i:"noʊ"}, {t:"I", i:"aɪ"}, {t:"have", i:"hæv"}, {t:"a", i:"ə"}, {t:"little", i:"ˈlɪt.əl"}, {t:"color.", i:"ˈkʌl.ər"}, {t:"I'm", i:"aɪm"}, {t:"thinking", i:"ˈθɪŋ.kɪŋ"}, {t:"like", i:"laɪk"}, {t:"maybe", i:"ˈmeɪ.bi"}, {t:"some", i:"sʌm"}, {t:"crimson,", i:"ˈkrɪm.zən"}, {t:"chartreuse...", i:"ʃɑːrˈtruːz"}] },
            { start: 15.3, end: 17.2, text: "How about yellow?", parts: [{t:"How", i:"haʊ"}, {t:"about", i:"əˈbaʊt"}, {t:"yellow?", i:"ˈjɛl.oʊ"}] },
            { start: 17.2, end: 21.1, text: "No, not yellow. Yellow and snow? No go.", parts: [{t:"No,", i:"noʊ"}, {t:"not", i:"nɑːt"}, {t:"yellow.", i:"ˈjɛl.oʊ"}, {t:"Yellow", i:"ˈjɛl.oʊ"}, {t:"and", i:"ænd"}, {t:"snow?", i:"snoʊ"}, {t:"No", i:"noʊ"}, {t:"go.", i:"goʊ"}] },
            { start: 24.23, end: 26.0, text: "Am I right?", parts: [{t:"Am", i:"æm"}, {t:"I", i:"aɪ"}, {t:"right?", i:"raɪt"}] },
            { start: 26.0, end: 28.03, text: "Ah! Hi! You're creepy. Wow.", parts: [{t:"Ah!", i:"ɑː"}, {t:"Hi!", i:"haɪ"}, {t:"You're", i:"jʊr"}, {t:"creepy.", i:"ˈkriː.pi"}, {t:"Wow.", i:"waʊ"}] },
            { start: 28.03, end: 29.06, text: "I don't want it. Wow.", parts: [{t:"I", i:"aɪ"}, {t:"don't", i:"doʊnt"}, {t:"want", i:"wɑːnt"}, {t:"it.", i:"ɪt"}, {t:"Wow.", i:"waʊ"}] },
            { start: 29.06, end: 29.56, text: "Back at you.", parts: [{t:"Back", i:"bæk"}, {t:"at", i:"æt"}, {t:"you.", i:"juː"}] },
            { start: 29.56, end: 30.46, text: "Please don't drop me.", parts: [{t:"Please", i:"pliːz"}, {t:"don't", i:"doʊnt"}, {t:"drop", i:"drɑːp"}, {t:"me.", i:"miː"}] },
            { start: 30.46, end: 31.76, text: "Come on, it's just a head. No!", parts: [{t:"Come", i:"kʌm"}, {t:"on,", i:"ɑːn"}, {t:"it's", i:"ɪts"}, {t:"just", i:"dʒʌst"}, {t:"a", i:"ə"}, {t:"head.", i:"hɛd"}, {t:"No!", i:"noʊ"}] },
            { start: 31.76, end: 34.4, text: "Alright, we got off to a bad start. Ew, ew, the body!", parts: [{t:"Alright,", i:"ɔːlˈraɪt"}, {t:"we", i:"wiː"}, {t:"got", i:"gɑːt"}, {t:"off", i:"ɔːf"}, {t:"to", i:"tuː"}, {t:"a", i:"ə"}, {t:"bad", i:"bæd"}, {t:"start.", i:"stɑːrt"}, {t:"Ew,", i:"uː"}, {t:"the", i:"ðə"}, {t:"body!", i:"ˈbɑː.di"}] },
            { start: 38.3, end: 41.96, text: "Wait, what am I looking at right now? Why are you hanging off the earth like a bat?", parts: [{t:"Wait,", i:"weɪt"}, {t:"what", i:"wʌt"}, {t:"am", i:"æm"}, {t:"I", i:"aɪ"}, {t:"looking", i:"ˈlʊk.ɪŋ"}, {t:"at", i:"æt"}, {t:"right", i:"raɪt"}, {t:"now?", i:"naʊ"}, {t:"Why", i:"waɪ"}, {t:"are", i:"ɑːr"}, {t:"you", i:"juː"}, {t:"hanging", i:"ˈhæŋ.ɪŋ"}, {t:"off", i:"ɔːf"}, {t:"the", i:"ðə"}, {t:"earth", i:"ɜːrθ"}, {t:"like", i:"laɪk"}, {t:"a", i:"ə"}, {t:"bat?", i:"bæt"}] },
            { start: 42.9, end: 44.2, text: "Alright, wait one second.", parts: [{t:"Alright,", i:"ɔːlˈraɪt"}, {t:"wait", i:"weɪt"}, {t:"one", i:"wʌn"}, {t:"second.", i:"ˈsɛk.ənd"}] },
            { start: 46.16, end: 48.9, text: "Oh, thank you. You're welcome.", parts: [{t:"Oh,", i:"oʊ"}, {t:"thank", i:"θæŋk"}, {t:"you.", i:"juː"}, {t:"You're", i:"jʊr"}, {t:"welcome.", i:"ˈwɛl.kəm"}] },
            { start: 48.9, end: 50.06, text: "Now I'm perfect.", parts: [{t:"Now", i:"naʊ"}, {t:"I'm", i:"aɪm"}, {t:"perfect.", i:"ˈpɝː.fɪkt"}] },
            { start: 50.9, end: 54.86, text: "Well, almost. It was like my whole life got turned upside down.", parts: [{t:"Well,", i:"wɛl"}, {t:"almost.", i:"ˈɔːl.moʊst"}, {t:"It", i:"ɪt"}, {t:"was", i:"wʌz"}, {t:"like", i:"laɪk"}, {t:"my", i:"maɪ"}, {t:"whole", i:"hoʊl"}, {t:"life", i:"laɪf"}, {t:"got", i:"gɑːt"}, {t:"turned", i:"tɜːrnd"}, {t:"upside", i:"ˈʌp.saɪd"}, {t:"down.", i:"daʊn"}] },
            { start: 55.0, end: 58.6, text: "Oh! Too hard. I'm sorry! I was just... Are you OK?", parts: [{t:"Oh!", i:"oʊ"}, {t:"Too", i:"tuː"}, {t:"hard.", i:"hɑːrd"}, {t:"I'm", i:"aɪm"}, {t:"sorry!", i:"ˈsɔː.ri"}, {t:"I", i:"aɪ"}, {t:"was", i:"wʌz"}, {t:"just...", i:"dʒʌst"}, {t:"Are", i:"ɑːr"}, {t:"you", i:"juː"}, {t:"OK?", i:"oʊˈkeɪ"}] },
            { start: 58.63, end: 63.86, text: "Are you kidding me? I am wonderful! I've always wanted a nose.", parts: [{t:"Are", i:"ɑːr"}, {t:"you", i:"juː"}, {t:"kidding", i:"ˈkɪd.ɪŋ"}, {t:"me?", i:"miː"}, {t:"I", i:"aɪ"}, {t:"am", i:"æm"}, {t:"wonderful!", i:"ˈwʌn.dər.fəl"}, {t:"I've", i:"aɪv"}, {t:"always", i:"ˈɔːl.weɪz"}, {t:"wanted", i:"ˈwɑːn.tɪd"}, {t:"a", i:"ə"}, {t:"nose.", i:"noʊz"}] },
            { start: 64.86, end: 67.66, text: "It's like a little baby unicorn. What?", parts: [{t:"It's", i:"ɪts"}, {t:"like", i:"laɪk"}, {t:"a", i:"ə"}, {t:"little", i:"ˈlɪt.əl"}, {t:"baby", i:"ˈbeɪ.bi"}, {t:"unicorn.", i:"ˈjuː.nɪ.kɔːrn"}, {t:"What?", i:"wʌt"}] },
            { start: 67.66, end: 72.16, text: "Hey! Whoa! Oh, I love it even more! Huh.", parts: [{t:"Hey!", i:"heɪ"}, {t:"Whoa!", i:"woʊ"}, {t:"Oh,", i:"oʊ"}, {t:"I", i:"aɪ"}, {t:"love", i:"lʌv"}, {t:"it", i:"ɪt"}, {t:"even", i:"ˈiː.vən"}, {t:"more!", i:"mɔːr"}, {t:"Huh.", i:"hʌ"}] },
            { start: 72.26, end: 78.13, text: "Alright, let's start this thing over. Hi everyone, I'm Olaf and I like warm hugs.", parts: [{t:"Alright,", i:"ɔːlˈraɪt"}, {t:"let's", i:"lɛts"}, {t:"start", i:"stɑːrt"}, {t:"this", i:"ðɪs"}, {t:"thing", i:"θɪŋ"}, {t:"over.", i:"ˈoʊ.vər"}, {t:"Hi", i:"haɪ"}, {t:"everyone,", i:"ˈɛv.ri.wʌn"}, {t:"I'm", i:"aɪm"}, {t:"Olaf", i:"ˈoʊ.læf"}, {t:"and", i:"ænd"}, {t:"I", i:"aɪ"}, {t:"like", i:"laɪk"}, {t:"warm", i:"wɔːrm"}, {t:"hugs.", i:"hʌgz"}] },
            { start: 79.2, end: 85.7, text: "Olaf? That's right, Olaf.", parts: [{t:"Olaf?", i:"ˈoʊ.læf"}, {t:"That's", i:"ðæts"}, {t:"right,", i:"raɪt"}, {t:"Olaf.", i:"ˈoʊ.læf"}] },
            { start: 86.46, end: 89.13, text: "And you are...?", parts: [{t:"And", i:"ænd"}, {t:"you", i:"juː"}, {t:"are...?", i:"ɑːr"}] },
            { start: 89.13, end: 90.96, text: "Oh, um... I'm Anna.", parts: [{t:"Oh,", i:"oʊ"}, {t:"um...", i:"ʌm"}, {t:"I'm", i:"aɪm"}, {t:"Anna.", i:"ˈæn.ə"}] },
            { start: 90.96, end: 94.86, text: "And who's the funky looking donkey over there? That's Sven.", parts: [{t:"And", i:"ænd"}, {t:"who's", i:"huːz"}, {t:"the", i:"ðə"}, {t:"funky", i:"ˈfʌŋ.ki"}, {t:"looking", i:"ˈlʊk.ɪŋ"}, {t:"donkey", i:"ˈdɔŋ.ki"}, {t:"over", i:"ˈoʊ.vər"}, {t:"there?", i:"ðɛr"}, {t:"That's", i:"ðæts"}, {t:"Sven.", i:"svɛn"}] },
            { start: 94.86, end: 98.13, text: "Uh-huh. And who's the reindeer? ...Sven.", parts: [{t:"Uh-huh.", i:"ʌ-hʌ"}, {t:"And", i:"ænd"}, {t:"who's", i:"huːz"}, {t:"the", i:"ðə"}, {t:"reindeer?", i:"ˈreɪn.dɪr"}, {t:"...", i:""}, {t:"Sven.", i:"svɛn"}] },
            { start: 98.13, end: 101.8, text: "Oh. Oh okay. Make things easier for me.", parts: [{t:"Oh.", i:"oʊ"}, {t:"Oh", i:"oʊ"}, {t:"okay.", i:"oʊˈkeɪ"}, {t:"Make", i:"meɪk"}, {t:"things", i:"θɪŋz"}, {t:"easier", i:"ˈiː.zi.ər"}, {t:"for", i:"fɔːr"}, {t:"me.", i:"miː"}] },
            { start: 102.6, end: 105.83, text: "Aw, look at him trying to kiss my nose. I like you too!", parts: [{t:"Aw,", i:"ɔː"}, {t:"look", i:"lʊk"}, {t:"at", i:"æt"}, {t:"him", i:"hɪm"}, {t:"trying", i:"ˈtraɪ.ɪŋ"}, {t:"to", i:"tuː"}, {t:"kiss", i:"kɪs"}, {t:"my", i:"maɪ"}, {t:"nose.", i:"noʊz"}, {t:"I", i:"aɪ"}, {t:"like", i:"laɪk"}, {t:"you", i:"juː"}, {t:"too!", i:"tuː"}] },
            { start: 105.83, end: 107.9, text: "Olaf. Did Elsa build you?", parts: [{t:"Olaf.", i:"ˈoʊ.læf"}, {t:"Did", i:"dɪd"}, {t:"Elsa", i:"ˈɛl.sə"}, {t:"build", i:"bɪld"}, {t:"you?", i:"juː"}] },
            { start: 107.96, end: 108.5, text: "Yeah, why?", parts: [{t:"Yeah,", i:"jɛə"}, {t:"why?", i:"waɪ"}] },
            { start: 108.5, end: 110.1, text: "Do you know where she is?", parts: [{t:"Do", i:"duː"}, {t:"you", i:"juː"}, {t:"know", i:"noʊ"}, {t:"where", i:"wɛr"}, {t:"she", i:"ʃiː"}, {t:"is?", i:"ɪz"}] },
            { start: 110.3, end: 110.8, text: "Yeah, why?", parts: [{t:"Yeah,", i:"jɛə"}, {t:"why?", i:"waɪ"}] },
            { start: 110.8, end: 113.13, text: "Do you think you could show us the way?", parts: [{t:"Do", i:"duː"}, {t:"you", i:"juː"}, {t:"think", i:"θɪŋk"}, {t:"you", i:"juː"}, {t:"could", i:"kʊd"}, {t:"show", i:"ʃoʊ"}, {t:"us", i:"ʌs"}, {t:"the", i:"ðə"}, {t:"way?", i:"weɪ"}] },
            { start: 113.13, end: 113.66, text: "Yeah, why?", parts: [{t:"Yeah,", i:"jɛə"}, {t:"why?", i:"waɪ"}] },
            { start: 113.66, end: 118.63, text: "How does this work? Aw, stop it Sven... Yeah, why?", parts: [{t:"How", i:"haʊ"}, {t:"does", i:"dʌz"}, {t:"this", i:"ðɪs"}, {t:"work?", i:"wɜːrk"}, {t:"Aw,", i:"ɔː"}, {t:"stop", i:"stɑːp"}, {t:"it,", i:"ɪt"}, {t:"Sven...", i:"svɛn"}, {t:"Yeah,", i:"jɛə"}, {t:"why?", i:"waɪ"}] },
            { start: 118.63, end: 121.93, text: "I'll tell you why. We need Elsa to bring back summer.", parts: [{t:"I'll", i:"aɪl"}, {t:"tell", i:"tɛl"}, {t:"you", i:"juː"}, {t:"why.", i:"waɪ"}, {t:"We", i:"wiː"}, {t:"need", i:"niːd"}, {t:"Elsa", i:"ˈɛl.sə"}, {t:"to", i:"tuː"}, {t:"bring", i:"brɪŋ"}, {t:"back", i:"bæk"}, {t:"summer.", i:"ˈsʌm.ər"}] },
            { start: 122.23, end: 125.2, text: "Summer? Uh-huh. Oh, I don't know why.", parts: [{t:"Summer?", i:"ˈsʌm.ər"}, {t:"Uh-huh.", i:"ʌ-hʌ"}, {t:"Oh,", i:"oʊ"}, {t:"I", i:"aɪ"}, {t:"don't", i:"doʊnt"}, {t:"know", i:"noʊ"}, {t:"why.", i:"waɪ"}] },
            { start: 125.2, end: 132.33, text: "But I've always loved the idea of summer, and sun, and all things hot.", parts: [{t:"But", i:"bʌt"}, {t:"I've", i:"aɪv"}, {t:"always", i:"ˈɔːl.weɪz"}, {t:"loved", i:"lʌvd"}, {t:"the", i:"ðə"}, {t:"idea", i:"aɪˈdiː.ə"}, {t:"of", i:"ʌv"}, {t:"summer,", i:"ˈsʌm.ər"}, {t:"and", i:"ænd"}, {t:"sun,", i:"sʌn"}, {t:"and", i:"ænd"}, {t:"all", i:"ɔːl"}, {t:"things", i:"θɪŋz"}, {t:"hot.", i:"hɑːt"}] },
            { start: 132.33, end: 133.33, text: "Really?", parts: [{t:"Really?", i:"ˈrɪə.li"}] },
            { start: 133.46, end: 135.7, text: "I'm guessing you don't have much experience with heat.", parts: [{t:"I'm", i:"aɪm"}, {t:"guessing", i:"ˈgɛs.ɪŋ"}, {t:"you", i:"juː"}, {t:"don't", i:"doʊnt"}, {t:"have", i:"hæv"}, {t:"much", i:"mʌtʃ"}, {t:"experience", i:"ɪkˈspɪr.i.əns"}, {t:"with", i:"wɪð"}, {t:"heat.", i:"hiːt"}] },
            { start: 136.2, end: 137.0, text: "Nope!", parts: [{t:"Nope!", i:"noʊp"}] }
        ]
    }
];

/* --- PART 3: VOCABULARY & READING --- */
const VocabData = [
    {
        id: 1,
        topic: "Animals",
        color: "#FF9800",
        vocab: [
            { img: "cat.jpg", speak: "cat", mean: "Cat" },
            { img: "dog.jpg", speak: "dog", mean: "Dog" },
            { img: "duck.jpg", speak: "duck", mean: "Duck" },
            { img: "pig.jpg", speak: "pig", mean: "Pig" }
        ],
        reading: {
            title: "My Pet",
            text: "I have a cat. It is fat. It likes to sleep.",
            audio: "reading_animals.mp3"
        },
        quiz: [
            { question: "What does the cat like?", options: ["Run", "Sleep", "Eat"], answer: 1 }
        ]
    }
];

/* --- PART 3: VOCABULARY & READING (Unit 1: Colors - Theo PDF) --- */
const VocabData = [
    {
        id: 1,
        topic: "Unit 1: Colors",
        color: "#FF9800",
        vocab: [
            // 1. Blue /u:/ [cite: 819]
            { img: "blue.jpg", speak: "blue", parts: [{t:"b"}, {t:"l"}, {i:"uː", t:"ue"}] },
            // 2. Yellow /e ǝʊ/ [cite: 822]
            { img: "yellow.jpg", speak: "yellow", parts: [{i:"j", t:"y"}, {i:"e", t:"e"}, {t:"ll"}, {i:"oʊ", t:"ow"}] },
            // 3. Red /e/ [cite: 823, 832]
            { img: "red.jpg", speak: "red", parts: [{t:"r"}, {i:"e", t:"e"}, {t:"d"}] },
            // 4. Green /i:/ [cite: 824]
            { img: "green.jpg", speak: "green", parts: [{t:"gr"}, {i:"iː", t:"ee"}, {t:"n"}] },
            // 5. Purple /3:r/ [cite: 825]
            { img: "purple.jpg", speak: "purple", parts: [{t:"p"}, {i:"ɜːr", t:"ur"}, {t:"p"}, {i:"əl", t:"le"}] },
            // 6. Brown /au/ [cite: 827] (PDF ghi /au/ nhưng IPA chuẩn là /aʊ/)
            { img: "brown.jpg", speak: "brown", parts: [{t:"br"}, {i:"aʊ", t:"own"}] },
            // 7. Pink /ɪ ŋ/ [cite: 828]
            { img: "pink.jpg", speak: "pink", parts: [{t:"p"}, {i:"ɪ", t:"i"}, {i:"ŋ k", t:"nk"}] },
            // 8. Black /æ/ [cite: 829]
            { img: "black.jpg", speak: "black", parts: [{t:"bl"}, {i:"æ", t:"a"}, {i:"k", t:"ck"}] },
            // 9. Orange /ɔːr/ [cite: 831]
            { img: "orange.jpg", speak: "orange", parts: [{i:"ɔːr", t:"or"}, {i:"ɪ", t:"a"}, {i:"n dʒ", t:"nge"}] },
            // 10. White /aɪ/ [cite: 834]
            { img: "white.jpg", speak: "white", parts: [{t:"wh"}, {i:"aɪ", t:"i"}, {t:"t"}, {i:"_", t:"e"}] },
            // 11. Grey /eɪ/ [cite: 838]
            { img: "grey.jpg", speak: "grey", parts: [{t:"gr"}, {i:"eɪ", t:"ey"}] }
        ],
        reading: { title: "Colors", text: "I see a blue bird.", audio: "reading_colors.mp3" }
    }
];
