const storyData = {
    start: {
        text: "You are the best Train Driver in town! Today is the Mayor's birthday, and you need to deliver the giant birthday cake to the party. Which train will you drive?",
        image: "assets/train_choice.png",
        choices: [
            { text: "The Sturdy Steam Engine", next: "steam_mountains", sound: "whistle" },
            { text: "The Super-Fast Bullet Train", next: "bullet_valley", sound: "swoosh" }
        ]
    },
    steam_mountains: {
        text: "Chugga chugga! You chose the classic Steam Engine. You puff towards the stormy mountains. The tracks split into two paths ahead!",
        image: "assets/steam_path.png",
        choices: [
            { text: "Take the Old Wooden Bridge", next: "steam_bridge", sound: "chug" },
            { text: "Take the Dark Mining Tunnel", next: "steam_tunnel", sound: "chug" }
        ]
    },
    steam_bridge: {
        text: "You rumble onto the creaky bridge... Oh no! A friendly cow has wandered onto the tracks! She's blocking the way, chewing grass.",
        image: "assets/bridge_cow.png",
        choices: [
            { text: "Blow the Loud Train Whistle!", next: "steam_bridge_whistle", sound: "whistle" },
            { text: "Slam the Brakes!", next: "steam_bridge_brakes", sound: "brake" }
        ]
    },
    steam_bridge_whistle: {
        text: "TOOT TOOT! The loud whistle surprises the cow, and she happily trots off the bridge. You speed ahead to the town on time!",
        image: "assets/intro_station.png",
        choices: [
            { text: "Play Again", next: "start", sound: "magic" }
        ]
    },
    steam_bridge_brakes: {
        text: "SCREEECH! You stop just in time to save the cow! But the sudden stop makes the giant cake slide forward and get a bit squished.",
        image: "assets/intro_station.png",
        choices: [
            { text: "Play Again", next: "start", sound: "magic" }
        ]
    },
    steam_tunnel: {
        text: "It's pitch black inside the tunnel. You turn on the big headlamp. Look out! Some rocks have fallen on the tracks ahead!",
        image: "assets/tunnel_rocks.png",
        choices: [
            { text: "Speed Up to push the rocks!", next: "steam_tunnel_speed", sound: "chug" },
            { text: "Reverse slowly and go around", next: "steam_tunnel_reverse", sound: "brake" }
        ]
    },
    steam_tunnel_speed: {
        text: "CRASH! BAM! You plow right through the rocks! Your train is completely covered in dust and mud, and the cake got slightly squished, but you made it!",
        image: "assets/intro_station.png",
        choices: [
            { text: "Play Again", next: "start", sound: "magic" }
        ]
    },
    steam_tunnel_reverse: {
        text: "You safely back up and take the long way around the mountain. It takes a long time, but you deliver the cake completely safe and sound!",
        image: "assets/intro_station.png",
        choices: [
            { text: "Play Again", next: "start", sound: "magic" }
        ]
    },
    bullet_valley: {
        text: "Whoosh! You chose the sleek Bullet Train! You zoom into a green valley, but it's raining heavily and the tracks ahead are flooded!",
        image: "assets/bullet_valley_rain.svg",
        choices: [
            { text: "Power through the deep water!", next: "bullet_valley_power", sound: "swoosh" },
            { text: "Switch to the high Monorail track", next: "bullet_valley_monorail", sound: "swoosh" }
        ]
    },
    bullet_valley_power: {
        text: "SPLASH! You plow into the water. Oh no! The deep water short-circuits the electronics. You have to get towed, and arrive late and muddy!",
        image: "assets/bullet_power_puddle.svg",
        choices: [
            { text: "Play Again", next: "start", sound: "magic" }
        ]
    },
    bullet_valley_monorail: {
        text: "You smoothly transition to the elevated monorail. But the tracks are wet and slippery! The train starts skidding sideways!",
        image: "assets/bullet_path.png",
        choices: [
            { text: "Deploy Aerodynamic Flaps!", next: "bullet_monorail_flaps", sound: "swoosh" },
            { text: "Drop speed carefully", next: "bullet_monorail_slow", sound: "brake" }
        ]
    },
    bullet_monorail_flaps: {
        text: "ZOOOM! The high-tech flaps stabilize the train. You look incredibly cool as you glide perfectly into town, arriving early with a perfect cake!",
        image: "assets/intro_station.png",
        choices: [
            { text: "Play Again", next: "start", sound: "magic" }
        ]
    },
    bullet_monorail_slow: {
        text: "You slow the train down safely. It's a bumpy ride, and the cake wobbles a tiny bit, but you arrive safely to a huge cheering crowd!",
        image: "assets/intro_station.png",
        choices: [
            { text: "Play Again", next: "start", sound: "magic" }
        ]
    }
};

let soundEnabled = true;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Simple Web Audio API synthesizers for train sounds
function playSound(type) {
    if (!soundEnabled) return;
    initAudio();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'whistle') {
        // High pitched train whistle
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.5);
        
        // Second harmony oscillator for the chord
        const osc2 = audioCtx.createOscillator();
        osc2.type = 'triangle';
        osc2.connect(gainNode);
        osc2.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.5);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.8);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
        
    } else if (type === 'chug') {
        // Low rhythmic chug
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
        
        // Add a second chug slightly delayed
        setTimeout(() => {
            if(!soundEnabled) return;
            const o2 = audioCtx.createOscillator();
            const g2 = audioCtx.createGain();
            o2.type = 'square';
            o2.connect(g2);
            g2.connect(audioCtx.destination);
            o2.frequency.setValueAtTime(110, audioCtx.currentTime);
            o2.frequency.linearRampToValueAtTime(60, audioCtx.currentTime + 0.3);
            g2.gain.setValueAtTime(0, audioCtx.currentTime);
            g2.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
            g2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            o2.start();
            o2.stop(audioCtx.currentTime + 0.3);
        }, 300);

    } else if (type === 'swoosh') {
        // High speed wind/swoosh for bullet train
        // Using noise would be better, but low freq oscillator sweep works okay
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 1.0);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.0);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 1.0);
        
    } else if (type === 'brake') {
        // High pitched screech for brake
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 1.2);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
        
    } else if (type === 'magic') {
        // Magic sparkle for victory
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        osc.frequency.setValueAtTime(1800, audioCtx.currentTime + 0.1);
        osc.frequency.setValueAtTime(2400, audioCtx.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }
}

// DOM Elements
const imageContainer = document.getElementById('image-container');
const sceneImage = document.getElementById('scene-image');
const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const soundToggle = document.getElementById('sound-toggle');

// Event Listeners
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
    if (soundEnabled) initAudio();
});

function renderScene(sceneKey) {
    const scene = storyData[sceneKey];
    if (!scene) return;

    // Reset animations
    sceneImage.style.animation = 'none';
    storyText.style.animation = 'none';
    sceneImage.offsetHeight; /* trigger reflow */
    storyText.offsetHeight;  /* trigger reflow */
    
    // Update content
    sceneImage.src = scene.image;
    sceneImage.style.display = 'block';
    sceneImage.style.animation = 'fadeIn 0.8s ease-in-out';
    
    storyText.textContent = scene.text;
    storyText.style.animation = 'slideUp 0.5s ease';

    // Update buttons
    choicesContainer.innerHTML = '';
    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.onclick = () => {
            if (choice.sound) playSound(choice.sound);
            // Slight delay before next scene for impact
            setTimeout(() => {
                renderScene(choice.next);
            }, 300);
        };
        choicesContainer.appendChild(btn);
    });
}

// Start game initially but don't play sound until first interaction due to browser policies
renderScene('start');
