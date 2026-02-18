// --- CẤU HÌNH ---
const FINALE_DURATION = 110000; 

// --- ÂM THANH SYSTEM ---
const AUDIO = {
    bgIntro: new Audio('res/sound/bg_intro.mp3'),
    bgFinale: new Audio('res/sound/bg_finale.mp3'),
    bgLetter: new Audio('res/sound/bg_letter.mp3'),
    count5: new Audio('res/sound/count_5.mp3'),
    count4: new Audio('res/sound/count_4.mp3'),
    count3: new Audio('res/sound/count_3.mp3'),
    count2: new Audio('res/sound/count_2.mp3'),
    count1: new Audio('res/sound/count_1.mp3'),
    whistle: new Audio('res/sound/whistle.mp3'),
    boom: new Audio('res/sound/boom.mp3')
};

AUDIO.bgIntro.loop = true; AUDIO.bgIntro.volume = 0.4;
AUDIO.bgFinale.loop = true; AUDIO.bgFinale.volume = 0.8;
AUDIO.bgLetter.loop = true; AUDIO.bgLetter.volume = 0.7;

AUDIO.count5.volume = 1.0; AUDIO.count4.volume = 1.0;
AUDIO.count3.volume = 1.0; AUDIO.count2.volume = 1.0;
AUDIO.count1.volume = 1.0; AUDIO.whistle.volume = 1.0; AUDIO.boom.volume = 1.0;

function playCountSound(num) {
    [AUDIO.count5, AUDIO.count4, AUDIO.count3, AUDIO.count2, AUDIO.count1].forEach(a => {
        a.pause(); a.currentTime = 0;
    });
    if(num === 5) AUDIO.count5.play();
    if(num === 4) AUDIO.count4.play();
    if(num === 3) AUDIO.count3.play();
    if(num === 2) AUDIO.count2.play();
    if(num === 1) AUDIO.count1.play();
}

function fadeOutAudio(audio, duration = 1500) {
    if (audio.paused) return;
    const originalVolume = audio.volume;
    const stepTime = 50;
    const step = originalVolume / (duration / stepTime);
    
    const fadeInterval = setInterval(() => {
        if (audio.volume > step) {
            audio.volume -= step;
        } else {
            audio.volume = 0;
            audio.pause();
            audio.currentTime = 0;
            audio.volume = originalVolume; 
            clearInterval(fadeInterval);
        }
    }, stepTime);
}

// --- DỮ LIỆU ---
const MESSAGES = [
    "🌸 Happy New Year 2026 Linh xinh đẹp! 🌸",
    "Năm mới chúc Linh mãi rạng ngời như ánh ban mai ☀️",
    "Linh ơi, năm nay phải thật hạnh phúc nhé! ❤️",
    "Chúc Linh tiền về đầy túi, tình đầy tim 💰",
    "Luôn giữ nụ cười tỏa nắng ấy nhé Linh 😊",
    "Năm 2026 bùng nổ nhan sắc nha cô gái! 💃",
    "Chúc Linh vạn sự như ý, tỉ sự như mơ 🌟",
    "Mỗi ngày của Linh đều là một ngày vui 🎉",
    "Cảm ơn vì Linh đã luôn ở bên tớ 💕",
    "Năm mới bớt lo âu, thêm thật nhiều niềm vui 😄",
    "Linh là cô gái tuyệt vời nhất tớ từng gặp 🌹",
    "Chúc Linh sự nghiệp thăng tiến vù vù 🚀",
    "Đi đâu cũng gặp may mắn nha Linh ơi 🍀",
    "Chúc Linh ăn mãi không béo, luôn xinh tươi 🍕",
    "Năm mới, thành công mới rực rỡ nhé Linh! 🏆",
    "Mãi là bông hoa xinh đẹp nhất nhé 🌺",
    "Chúc Linh tìm được hạnh phúc trọn vẹn 💖",
    "Linh ơi, mạnh mẽ và kiên cường lên nhé 💪",
    "Năm nay hứa hẹn nhiều điều tuyệt vời với Linh ✨",
    "Chúc Linh luôn được yêu thương và che chở ☂️",
    "Sức khỏe dồi dào để đi khắp thế giới 🌏",
    "Năm mới bình an, tâm hồn thư thái nhé Linh 🍃",
    "Chúc Linh luôn tự tin và tỏa sáng 💎",
    "Mong mọi ước mơ của Linh thành hiện thực 🌈",
    "Năm 2026 rực rỡ sắc màu nhé Linh! 🎨",
    "Lúc nào mệt mỏi, nhớ là có tớ ở đây 🤝",
    "Chúc Linh xinh đẹp bất chấp thời gian ⏳",
    "Tình duyên phơi phới nhé cô nàng xinh đẹp 💕",
    "Linh cười lên là thế giới bừng sáng đấy 😁",
    "Chúc mừng năm mới người bạn đặc biệt! 🥂",
    "Năm nay nhất định phải giàu to nhé Linh 💸",
    "Hạnh phúc ngập tràn, yêu thương lai láng 🥰",
    "Chúc Linh một năm đáng nhớ nhất thanh xuân 📸",
    "Luôn giữ vững đam mê cháy bỏng nhé 🔥",
    "Năm mới, khởi đầu mới thật thuận lợi 🍀",
    "Chúc Linh gặp được người trân trọng mình ❤️",
    "Mỗi sáng thức dậy đều là niềm vui mới ☀️",
    "Linh xứng đáng với những điều tốt đẹp nhất 🎁",
    "Năm mới sang chảnh, thần thái ngút ngàn 👑",
    "Chúc Linh luôn yêu đời, yêu người 💗",
    "Mọi khó khăn sẽ qua, chỉ còn niềm vui ở lại 🌈",
    "Linh là điều ngọt ngào của năm mới 🍬",
    "Chúc Linh công việc hanh thông, thuận lợi 📈",
    "Năm nay đi du lịch thật nhiều nhé Linh ✈️",
    "Mãi bên nhau bạn nhé! 💞",
    "Chúc Linh ngủ ngon, mơ đẹp mỗi tối 🌙",
    "Năm mới chúc Linh luôn an nhiên tự tại 🌼",
    "Gửi ngàn nụ hôn gió tới Linh 😘",
    "Yêu thương Linh rất nhiều! 💖",
    "Happy New Year 2026 - Năm của Linh! 🎆"
];

const BASE_IMAGES = ["res/image/love1.png", "res/image/love2.jpg", "res/image/back.png"];
const NL_IMAGES = [];
for (let i = 1; i <= 50; i++) {
    NL_IMAGES.push(`res/image/NL${i}.jpg`);
}

const IMAGES = [...BASE_IMAGES, ...NL_IMAGES];
const FLOATING_IMAGES = NL_IMAGES;

const LETTER_MESSAGES = [
    "Hi Linh,\nNăm mới sắp đến rồi, và hôm nay lại còn là Valentine nữa. Có lẽ đây là một dịp rất đặc biệt để mình viết cho bạn những dòng cảm xúc này – với tất cả sự chân thành trong lòng ☺️🥹😘.",
    
    "Thật ra, để nói được những lời này hôm nay, mình đã phải nghĩ lại rất nhiều về những ngày đầu chúng ta quen nhau – về khoảnh khắc mình bắt đầu chú ý đến bạn từ khi nào 😳.",
    
    "Ờm nên bắt đầu từ đâu nhỉ? Có lẽ là từ lần đầu gặp bạn ở lớp Thiết kế số. Khi đó mình đã để ý đến bạn, vì bạn hay được thầy An hỏi bài các thứ. Mình thấy bạn thường ngồi cạnh và nói chuyện khá thân với một bạn nam – sau này mình mới biết đó là Bảo. Khi ấy mình còn nghĩ hai người là người yêu nên thỉnh thoảng cũng tò mò xem hai bạn nói chuyện gì với nhau 😃. Nghĩ lại thấy mình cũng buồn cười thật 😆.",
    
    "Rồi đến hôm gặp bạn ở phòng thực hành – lần đầu tiên mình nói chuyện với bạn. Nếu lúc đó mình có hơi “chảnh” thì mong bạn thông cảm 😅, vì lâu rồi mình không nói chuyện với con gái nên hơi ngượng một chút. Khi ấy mình chỉ nghĩ đơn giản là bạn bè nói chuyện trên lớp thôi nên cũng không để ý nhiều.",
    
    "Nhưng rồi về nhà, mình nhận ra bạn thường là người chủ động nhắn tin trước để mở đầu câu chuyện. Chính từ những tin nhắn ấy, mình đã bắt đầu có chút rung động 😚. Mình cũng đã hỏi dò xem bạn có người yêu chưa, nhưng thật ra lúc đó mình chưa nghĩ đến chuyện sẽ tìm hiểu bạn một cách nghiêm túc 🫠.",
    
    "Phải đến khi nghe bạn nói về việc bạn phải đi mổ, nghe bạn chia sẻ về những khó khăn trong quá khứ, về hoàn cảnh gia đình… và đặc biệt là qua những buổi nói chuyện trực tiếp với bạn ở công viên, mình mới thực sự cảm nhận được tình cảm của mình rõ ràng hơn. Bạn kể chuyện rất chân thành, và dù là chuyện vui hay buồn, bạn vẫn luôn nở một nụ cười trên môi. Chính điều đó khiến mình thấy bạn thật đặc biệt 😳.",
    
    "Càng về sau này, mình càng được trò chuyện với bạn nhiều hơn, hiểu sâu hơn về tính cách và con người của bạn. Mình nhận ra bạn là một người rất nhiệt huyết, lạc quan và thật lòng. Mình cảm nhận được bạn coi mình như một người thân trong nhà, và điều đó khiến mình trân trọng vô cùng 😊.",
    
    "Rồi đến một ngày được nghe bạn kể về những mối quan hệ cũ, hay nhắc đến một bạn trai khác, mặc dù những lần trước thì không sao, nhưng lần này mình lại thấy trong lòng có chút khó chịu và hụt hẫng khó tả 😞. Có lẽ đó là cảm giác ghen😳. Hay những lúc bạn giận mình, mình luôn cảm thấy phải xin lỗi và tìm mọi cách để níu lại mối quan hệ này. Mình sợ bạn buồn, sợ bạn giận và không chơi với mình nữa 😥. Những cảm giác ấy thật sự khiến mình cảm thấy tồi tệ, không thể tập trung vào việc gì cả...",
    
    "Và rồi mình nhận ra: có lẽ mình đã \"thích\" bạn từ lúc nào mà chính mình cũng không hay 🥺.",
    
    "Cho đến tận bây giờ, mình rất thích bạn 😳. Không chỉ vì bạn xinh, mà vì cách bạn cười – rất tự nhiên và ấm áp. Vì sự chân thành và lạc quan của bạn trong từng câu nói. Vì cảm giác được ở bên bạn, cùng học, cùng chia sẻ, cùng theo đuổi ước mơ của riêng mình 😊.",
    
    "Đó là tất cả những cảm xúc thật lòng mà mình muốn chia sẻ với bạn. Vì vậy, Valentine này – cũng là dịp năm mới đang đến – mình muốn nói với bạn rằng:",
    
    "Mình thật sự thích cậu, Linh à!❤️",
    
    "Mình không mong bạn phải trả lời ngay, cũng không muốn bạn cảm thấy áp lực. Mình chỉ hy vọng rằng, nếu có thể, chúng ta thử cho nhau một cơ hội nhỏ – bước thêm một bước từ bạn thân trở thành một mối quan hệ đặc biệt hơn 😳.",
    
    "Nếu bạn chưa sẵn sàng, mình vẫn luôn trân trọng bạn và tình bạn này ☺️. Lá thư này chỉ là cầu nối để bạn hiểu rõ hơn về những gì mình đang cảm nhận, và để mình không phải giấu tình cảm đó nữa.",
    
    "Dù câu trả lời của bạn là gì, mình vẫn cảm ơn bạn vì đã xuất hiện trong cuộc sống của mình, làm cho những ngày bình thường trở nên ý nghĩa hơn.",
    
    "Chúc Linh một mùa Valentine ấm áp và một năm mới thật nhiều niềm vui, bình an 🎉🍀☺️.",
    
    "Thương bạn – theo một cách chân thành nhất,\nHiếu ❤️"
];

// --- GLOBAL VARIABLES & SELECTORS ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
const overlayCanvas = document.getElementById('camera-overlay');
const overlayCtx = overlayCanvas.getContext('2d');
const videoElement = document.getElementsByClassName('input_video')[0];
const landingScreen = document.getElementById('landing-screen');
const startBtn = document.getElementById('start-btn');
const loadingText = document.getElementById('loading');
const bgLayer = document.getElementById('bg-image-layer');
const cameraBox = document.getElementById('camera-box');
const uiLayer = document.getElementById('ui-layer');
const countDisplay = document.getElementById('countdown-number');
const greetingBox = document.getElementById('greeting-box');
const guideText = document.getElementById('guide-text');
const floatContainer = document.getElementById('floating-container');
const finaleTimer = document.getElementById('finale-timer'); 

const letterContainer = document.getElementById('letter-container');
const theBook = document.getElementById('the-book');
const letterControls = document.getElementById('letter-controls');
const btnOpenLetter = document.getElementById('btn-open-letter');
const btnNextMsg = document.getElementById('btn-next-msg');
const btnCloseLetter = document.getElementById('btn-close-letter');
const btnResetGame = document.getElementById('btn-reset-game');
const letterText = document.getElementById('letter-text');
const letterPageRight = document.getElementById('letter-content-page'); 

let appState = 'LANDING'; 
let targetNumber = 5; 
let fireworks = [];
let stars = [];
let floatInterval;
let finaleTimerInterval; 
let floatIndex = 0;
let finaleOngoing = false;
let isResetting = false;
let shuffledImages = [];
let cameraRef = null; 

// --- TẠO TÚI CHỨA VỊ TRÍ ĐỂ PHÂN PHỐI ĐỀU ---
let imgZones = []; 
let msgZones = []; 

let screenFlash = 0; 
let flashColor = '255, 105, 180';
let currentLetterPage = 0;
let heartInterval;

// --- INIT & RESIZE ---
function resize() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    overlayCanvas.width = 160; overlayCanvas.height = 120;
}
window.addEventListener('resize', resize);
resize();

// --- CLASS HIỆU ỨNG ---
class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2; this.alpha = Math.random(); this.blink = Math.random() * 0.02;
    }
    draw() { ctx.fillStyle = `rgba(255,255,255,${this.alpha})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill(); }
    update() { this.alpha += this.blink; if(this.alpha <= 0 || this.alpha >= 1) this.blink *= -1; }
}
for(let i=0; i<150; i++) stars.push(new Star());

class Firework {
    constructor(startX, startY, targetY, type = 'normal') {
        this.x = startX; this.y = startY; this.targetY = targetY; this.type = type;
        
        if (type === 'big-opener') { 
            this.speed = 3.2; 
        } else { 
            this.speed = Math.random() * 2 + 3; // Tốc độ 3-5 (Vừa vặn)
        }
        
        this.particles = []; this.exploded = false;
        
        if(type === 'big-opener') {
            this.hue = 340; 
            AUDIO.whistle.currentTime = 0; AUDIO.whistle.play().catch(e => console.log(e));
        } else if (type === 'finale-round') {
            this.hue = Math.random() * 360; 
        } else { this.hue = Math.random() * 360; }
    }
    update() {
        if(!this.exploded) {
            this.y -= this.speed; 
            
            if (this.type === 'big-opener') { 
                this.speed *= 0.998; 
            } else { 
                this.speed *= 0.995; // Giữ đà bay lên cao
            }
            
            if(this.type === 'big-opener') { ctx.fillStyle = 'rgba(255,100,150,0.8)'; ctx.beginPath(); ctx.arc(this.x, this.y + 10, 3, 0, Math.PI*2); ctx.fill(); }
            
            if(this.y <= this.targetY || this.speed <= 0.5) this.explode();
        } else {
            this.particles.forEach((p,i) => { p.update(); if(p.alpha <= 0) this.particles.splice(i,1); });
        }
    }
    explode() {
        this.exploded = true;
        if(this.type === 'finale-round' || this.type === 'big-opener') {
            screenFlash = 5;
            const flashColors = [ '255, 20, 147', '255, 0, 0', '148, 0, 211', '255, 105, 180' ];
            flashColor = flashColors[Math.floor(Math.random() * flashColors.length)];
        }
        
        if (this.type === 'big-opener') {
            AUDIO.boom.currentTime = 0; AUDIO.boom.play().catch(e => console.log(e));
            
            const particleCount = 1500; 
            for(let i=0; i < particleCount; i++) {
                const t = (Math.PI * 2 * i) / particleCount;
                const dx = 16 * Math.pow(Math.sin(t), 3);
                const dy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                
                const hue = 320 + Math.random() * 40; 
                const p = new Particle(this.x, this.y, hue, 0); 
                
                const scale = 1.0 + Math.random() * 0.4; 
                p.vx = dx * scale; 
                p.vy = (dy - 5) * scale;
                
                p.gravity = 0.03; 
                p.friction = 0.95; 
                p.decay = Math.random() * 0.001 + 0.001; 
                p.sparkle = true;  
                p.isHeart = true; 
                
                this.particles.push(p);
            }
        } else {
            let count = (this.type === 'finale-round') ? 300 : 40; 
            
            // --- SỬA ĐỔI Ở ĐÂY: TĂNG ĐỘ LOE (SPREAD) ---
            // Cũ: 4 -> Mới: 9 (Sẽ bung rộng gấp đôi, bao phủ màn hình tốt hơn)
            let spread = (this.type === 'finale-round') ? 9 : 3;
            
            for(let i=0; i<count; i++) this.particles.push(new Particle(this.x, this.y, this.hue, spread));
        }
    }
    draw() {
        if(!this.exploded) { ctx.fillStyle = (this.type === 'big-opener') ? '#fff' : `hsl(${this.hue}, 100%, 60%)`; ctx.beginPath(); ctx.arc(this.x, this.y, 4, 0, Math.PI*2); ctx.fill(); }
        else { this.particles.forEach(p => p.draw()); }
    }
}

class Particle {
    constructor(x, y, hue, spreadSpeed) {
        this.x = x; this.y = y;
        const angle = Math.random() * Math.PI * 2; const speed = Math.random() * spreadSpeed + 1; 
        this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed;
        this.alpha = 1; 
        
        this.friction = 0.95; 
        this.gravity = 0.015; // Giữ trọng lực siêu nhẹ để lơ lửng
        
        this.decay = Math.random() * 0.005 + 0.003; 

        this.hue = hue; this.sparkle = Math.random() < 0.5; 
    }
    update() {
        this.vx *= this.friction; this.vy *= this.friction;
        this.x += this.vx; this.y += this.vy; this.vy += this.gravity; this.alpha -= this.decay;
    }
    draw() {
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        let currentAlpha = this.alpha; 
        if(this.sparkle) {
            currentAlpha *= (0.4 + Math.random() * 0.6); 
        }
        
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${currentAlpha})`;

        if (this.isHeart) {
            const size = 2.0; 
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-size, -size, -size*2, -size/2, -size*2, 0);
            ctx.bezierCurveTo(-size*2, size, 0, size*2, 0, size*2);
            ctx.bezierCurveTo(0, size*2, size*2, size, size*2, 0);
            ctx.bezierCurveTo(size*2, -size/2, size, -size, 0, 0);
            ctx.fill();
        } else {
            ctx.beginPath(); 
            ctx.arc(this.x, this.y, 2, 0, Math.PI*2); 
            ctx.fill(); 
        }
        
        ctx.restore();
    }
}

function animateCanvas() {
    if (screenFlash > 0) {
        ctx.fillStyle = `rgba(${flashColor}, ${screenFlash * 0.015})`; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        screenFlash--;
    } else {
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if(appState !== 'LANDING') stars.forEach(s => { s.update(); s.draw(); });
    if(appState === 'COUNTDOWN' && Math.random() < 0.05) {
        fireworks.push(new Firework(Math.random() * canvas.width, canvas.height, Math.random() * (canvas.height * 0.5), 'normal'));
    }
    
    if(finaleOngoing && Math.random() < 0.03) { 
        fireworks.push(new Firework(
            Math.random() * canvas.width, 
            canvas.height, 
            canvas.height * 0.1 + Math.random() * (canvas.height * 0.5), 
            'finale-round'
        ));
    }

    fireworks.forEach((fw, i) => {
        fw.update(); fw.draw(); if(fw.exploded && fw.particles.length === 0) fireworks.splice(i,1);
    });
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

let imagesLoaded = 0;
let totalImages = 0;

function preloadAllImages() {
    totalImages = IMAGES.length;
    return new Promise((resolve) => {
        if (totalImages === 0) resolve();
        IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imagesLoaded++;
                loadingText.innerText = `Đang tải tài nguyên... ${Math.floor((imagesLoaded / totalImages) * 100)}%`;
                if (imagesLoaded === totalImages) resolve();
            };
            img.onerror = () => { imagesLoaded++; if (imagesLoaded === totalImages) resolve(); };
        });
    });
}

startBtn.addEventListener('click', async () => {
    AUDIO.bgIntro.play().catch(e => console.log("Cần tương tác người dùng để phát nhạc"));
    landingScreen.style.opacity = 0; 
    setTimeout(() => landingScreen.style.display = 'none', 500);
    
    loadingText.style.display = 'block';
    loadingText.innerText = "Đang khởi động Camera & Tải ảnh...";

    await Promise.all([initCamera(), preloadAllImages()]);
    
    loadingText.style.display = 'none'; 
    cameraBox.style.display = 'block';
    cameraBox.style.opacity = '0.7'; 

    appState = 'WAITING'; 
    guideText.innerText = "Giơ 5 ngón tay để bắt đầu...";
});

async function initCamera() {
    if (!cameraRef) {
        const hands = new Hands({locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`});
        hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.6, minTrackingConfidence: 0.6 });
        hands.onResults(onResults);
        
        cameraRef = new Camera(videoElement, {
            onFrame: async () => { 
                if (videoElement.srcObject && videoElement.srcObject.active) {
                    await hands.send({image: videoElement}); 
                }
            }, 
            width: 640, height: 480
        });
    }
    await cameraRef.start();
}

function countFingers(landmarks) {
    let count = 0;
    if (landmarks[8].y < landmarks[6].y) count++;
    if (landmarks[12].y < landmarks[10].y) count++;
    if (landmarks[16].y < landmarks[14].y) count++;
    if (landmarks[20].y < landmarks[18].y) count++;
    const isRight = landmarks[17].x > landmarks[5].x;
    if ((isRight && landmarks[4].x < landmarks[3].x) || (!isRight && landmarks[4].x > landmarks[3].x)) count++;
    return count;
}

function onResults(results) {
    overlayCtx.clearRect(0,0,overlayCanvas.width, overlayCanvas.height);
    if(appState === 'FINALE' || appState === 'LETTER') return;

    if(results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const lm = results.multiHandLandmarks[0];
        drawConnectors(overlayCtx, lm, HAND_CONNECTIONS, {color: '#00ff00', lineWidth: 2});
        drawLandmarks(overlayCtx, lm, {color: '#ff0000', lineWidth: 1});
        const fingers = countFingers(lm);
        processGameLogic(fingers);
    } else {
        if(appState === 'COUNTDOWN') {
            if (!isResetting) resetGame();
        }
    }
}

function processGameLogic(fingers) {
    if (isResetting) return; 
    if (appState === 'WAITING') {
        if(fingers === 5) startCountdown();
    } 
    else if (appState === 'COUNTDOWN') {
        if(fingers === targetNumber - 1) {
            targetNumber = fingers;
            if(targetNumber > 0) {
                updateCountdownDisplay(targetNumber);
            } else {
                startFinaleSequence();
            }
        }
    }
}

function startCountdown() {
    appState = 'COUNTDOWN'; targetNumber = 5;
    bgLayer.style.opacity = 0;
    guideText.style.bottom = '10%'; guideText.innerText = "Giữ tay và đếm ngược dần xuống...";
    greetingBox.style.display = 'block'; countDisplay.style.display = 'block';
    updateCountdownDisplay(5);
}

function updateCountdownDisplay(num) {
    countDisplay.innerText = num;
    countDisplay.classList.remove('pop-anim'); void countDisplay.offsetWidth; countDisplay.classList.add('pop-anim');
    playCountSound(num);
}

function startFinaleSequence() {
    if(appState === 'FINALE') return;
    appState = 'FINALE';
    
    fadeOutAudio(AUDIO.bgIntro);
    
    cameraBox.style.opacity = 0;
    setTimeout(() => {
        cameraBox.style.display = 'none';
        if(videoElement.srcObject) {
            const stream = videoElement.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject = null;
        }
    }, 1500);

    greetingBox.classList.add('fade-out-transition');
    countDisplay.classList.add('fade-out-transition');
    guideText.classList.add('fade-out-transition');

    setTimeout(() => {
        greetingBox.style.display = 'none';
        countDisplay.style.display = 'none';
        greetingBox.classList.remove('fade-out-transition');
        countDisplay.classList.remove('fade-out-transition');
        guideText.classList.remove('fade-out-transition');
        guideText.innerText = "Hãy tận hưởng khoảnh khắc này..."; 
        setTimeout(() => guideText.style.opacity = 0, 5000);
    }, 1500);

    fireworks = []; 

    setTimeout(() => {
        fireworks.push(new Firework(canvas.width / 2, canvas.height, canvas.height * 0.35, 'big-opener'));
        setTimeout(() => {
            AUDIO.bgFinale.play().catch(e => console.log(e));
            
            floatContainer.style.display = 'block';
            floatContainer.style.opacity = '1';
            
            spawnFloatingItem(); 
            if(floatInterval) clearInterval(floatInterval);
            floatInterval = setInterval(spawnFloatingItem, 2500);
            finaleOngoing = true; 

            let remainingSeconds = Math.floor(FINALE_DURATION / 1000);
            finaleTimer.style.display = 'block';
            finaleTimer.style.opacity = 1;
            finaleTimer.innerText = `Tận hưởng nhé bạn yêu: ${remainingSeconds}s`;

            if(finaleTimerInterval) clearInterval(finaleTimerInterval);
            finaleTimerInterval = setInterval(() => {
                remainingSeconds--;
                if(remainingSeconds > 0) {
                    finaleTimer.innerText = `Tận hưởng nhé bạn yêu: ${remainingSeconds}s`;
                } else {
                    finaleTimer.innerText = `Tận hưởng nhé bạn yêu: 0s`;
                    clearInterval(finaleTimerInterval);
                }
            }, 1000);

            setTimeout(endFinaleAndStartLetter, FINALE_DURATION);

        }, 4000); 
    }, 2000); 
}

function endFinaleAndStartLetter() {
    finaleOngoing = false; 
    if(floatInterval) clearInterval(floatInterval); 
    if(finaleTimerInterval) clearInterval(finaleTimerInterval); 
    
    finaleTimer.style.opacity = 0;
    setTimeout(() => finaleTimer.style.display = 'none', 1000);

    fadeOutAudio(AUDIO.bgFinale, 3000);
    
    floatContainer.style.opacity = '0';
    setTimeout(() => {
        floatContainer.innerHTML = ''; 
        floatContainer.style.display = 'none';
    }, 3000);

    setTimeout(() => {
        showLetterSequence();
    }, 5000); 
}

function showLetterSequence() {
    appState = 'LETTER';
    letterContainer.style.display = 'flex'; 
    letterControls.style.opacity = 1;
    
    theBook.classList.remove('open');
    currentLetterPage = 0;
    
    btnOpenLetter.style.display = 'block';
    btnOpenLetter.innerText = "Mở Thiệp 💌"; 
    btnResetGame.style.display = 'none';
}

function spawnHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = Math.random() < 0.5 ? '❤️' : '💗';
    heart.style.left = (Math.random() * 90) + '%';
    heart.style.setProperty('--rotation', (Math.random() * 60 - 30) + 'deg');
    letterPageRight.appendChild(heart);
    setTimeout(() => { if (heart.parentNode) heart.remove(); }, 3500);
}

btnOpenLetter.addEventListener('click', () => {
    btnOpenLetter.style.display = 'none'; 
    theBook.classList.add('open'); 
    
    if(AUDIO.bgLetter.paused) {
        AUDIO.bgLetter.play().catch(e=>console.log(e));
    }
    
    currentLetterPage = 0;
    letterText.innerText = LETTER_MESSAGES[0];
    btnNextMsg.style.display = 'inline-block';
    btnCloseLetter.style.display = 'none';

    if (heartInterval) clearInterval(heartInterval);
    spawnHeart(); 
    heartInterval = setInterval(spawnHeart, 800); 
});

btnNextMsg.addEventListener('click', () => {
    currentLetterPage++;
    
    letterText.style.opacity = 0;

    setTimeout(() => {
        if (currentLetterPage < LETTER_MESSAGES.length) {
            letterText.innerText = LETTER_MESSAGES[currentLetterPage];
            letterText.scrollTop = 0; 
            letterText.style.opacity = 1;
        }

        if (currentLetterPage >= LETTER_MESSAGES.length - 1) { 
            btnNextMsg.style.display = 'none';
            btnCloseLetter.style.display = 'inline-block';
        }
    }, 300);
});

btnCloseLetter.addEventListener('click', () => {
    theBook.classList.remove('open'); 
    if (heartInterval) clearInterval(heartInterval);
    const existingHearts = document.querySelectorAll('.heart-particle');
    existingHearts.forEach(h => h.remove());

    setTimeout(() => {
        btnOpenLetter.style.display = 'block';
        btnOpenLetter.innerText = "Mở lại 💌";
        btnResetGame.style.display = 'block'; 
    }, 1000); 
});

btnResetGame.addEventListener('click', () => {
    fadeOutAudio(AUDIO.bgLetter, 1000);
    resetGame();
});

function resetGame() {
    if (isResetting) return;
    isResetting = true; 
    
    if (heartInterval) clearInterval(heartInterval);
    const existingHearts = document.querySelectorAll('.heart-particle');
    existingHearts.forEach(h => h.remove());

    letterContainer.style.display = 'none';
    letterControls.style.opacity = 0;
    floatContainer.style.opacity = '0';
    
    finaleTimer.style.opacity = 0;
    finaleTimer.style.display = 'none';
    if(finaleTimerInterval) clearInterval(finaleTimerInterval);

    if(!AUDIO.bgFinale.paused) fadeOutAudio(AUDIO.bgFinale, 500);

    setTimeout(() => {
        appState = 'WAITING';
        targetNumber = 5;
        finaleOngoing = false;
        
        if(floatInterval) clearInterval(floatInterval);
        floatContainer.innerHTML = '';
        floatContainer.style.display = 'none';
        fireworks = [];
        
        bgLayer.style.opacity = 1;
        
        greetingBox.classList.remove('fade-out-transition');
        countDisplay.classList.remove('fade-out-transition');
        guideText.classList.remove('fade-out-transition');
        guideText.style.opacity = 1; 
        
        greetingBox.style.display = 'none'; 
        countDisplay.style.display = 'none';
        guideText.innerText = "Giơ 5 ngón tay để bắt đầu...";
        guideText.style.bottom = '15%';

        cameraBox.style.display = 'block';
        cameraBox.style.opacity = 0;
        
        initCamera().then(() => {
            setTimeout(() => {
                cameraBox.style.opacity = 0.7;
            }, 500); 
        });

        AUDIO.bgIntro.currentTime = 0;
        AUDIO.bgIntro.volume = 0.4; 
        AUDIO.bgIntro.play().catch(e => console.log("User interaction needed"));

        isResetting = false; 
    }, 1000);
}

function getNextZone(bag) {
    if (bag.length === 0) {
        bag.push(0, 1, 2);
        for (let i = bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bag[i], bag[j]] = [bag[j], bag[i]];
        }
    }
    return bag.pop();
}

function spawnFloatingItem() {
    if(appState !== 'FINALE') return;

    if (shuffledImages.length === 0) {
        let indices = Array.from({length: FLOATING_IMAGES.length}, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        shuffledImages = indices;
    }

    const uniqueIndex = shuffledImages.pop();
    
    const imgEl = document.createElement('div'); 
    imgEl.classList.add('float-item', 'img-box');
    const img = document.createElement('img');
    img.src = FLOATING_IMAGES[uniqueIndex];
    imgEl.appendChild(img);

    if (img.naturalWidth > img.naturalHeight) {
        imgEl.classList.add('landscape');
    }
    
    const zoneImg = getNextZone(imgZones);
    let leftMin, leftMax;
    
    if (zoneImg === 0) { leftMin = 2; leftMax = 25; }      
    else if (zoneImg === 1) { leftMin = 30; leftMax = 50; } 
    else { leftMin = 55; leftMax = 70; }                    

    const randomLeftImg = leftMin + Math.random() * (leftMax - leftMin);
    imgEl.style.left = randomLeftImg + '%';
    
    floatContainer.appendChild(imgEl);
    
    const msgEl = document.createElement('div'); 
    msgEl.classList.add('float-item', 'msg-box');
    msgEl.innerText = MESSAGES[floatIndex % MESSAGES.length];
    
    const zoneMsg = getNextZone(msgZones);
    let mLeftMin, mLeftMax;

    if (zoneMsg === 0) { mLeftMin = 5; mLeftMax = 30; }
    else if (zoneMsg === 1) { mLeftMin = 35; mLeftMax = 60; }
    else { mLeftMin = 65; mLeftMax = 80; }

    const randomLeftMsg = mLeftMin + Math.random() * (mLeftMax - mLeftMin);
    msgEl.style.left = randomLeftMsg + '%';
    
    floatContainer.appendChild(msgEl);
    
    floatIndex++;
    
    imgEl.addEventListener('animationend', () => { if(imgEl.parentNode) imgEl.remove(); });
    msgEl.addEventListener('animationend', () => { if(msgEl.parentNode) msgEl.remove(); });
}