// --- STATE MANAGER ---
function switchState(targetId) {
    document.querySelectorAll('.screen-state').forEach(s => s.classList.add('hidden'));
    document.getElementById(targetId).classList.remove('hidden');
}

// --- LOGIN ENGINE ---
function initializeSystem() {
    const id = document.getElementById('op-id').value.toUpperCase();
    if(!id) return;
    
    document.getElementById('boot-log').innerText = "VERIFYING IDENTITY...";
    setTimeout(() => {
        switchState('dashboard');
        const msg = new SpeechSynthesisUtterance(`Welcome, Operator ${id}. Systems live.`);
        window.speechSynthesis.speak(msg);
        startDashboard();
    }, 1200);
}

// --- DASHBOARD & JAVA SIM ---
function startDashboard() {
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;

    function animate() {
        ctx.fillStyle = 'rgba(0, 5, 16, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = varColor();
        for(let i=0; i<10; i++){
            ctx.beginPath();
            ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, 1, 0, Math.PI*2);
            ctx.fill();
        }
        requestAnimationFrame(animate);
    }
    animate();

    setInterval(() => {
        const stream = document.getElementById('xml-stream');
        stream.innerHTML = `<div>&lt;telemetry pulse="${Math.floor(Math.random()*100)}"/&gt;</div>` + stream.innerHTML;
    }, 1000);
}

function varColor() { return document.documentElement.style.getPropertyValue('--primary') || '#00f2ff'; }

// --- TERMINAL COMMANDS ---
function handleCommand(e) {
    if(e.key === 'Enter') {
        const cmd = e.target.value.toUpperCase();
        const logs = document.getElementById('term-logs');
        let res = "UNKNOWN_CMD";

        if(cmd === "VALENTINE") {
            switchState('valentine-screen');
            res = "SWITCHING TO AFFECTION_ENGINE...";
        } else if(cmd === "OVERRIDE") {
            document.documentElement.style.setProperty('--primary', '#ff0033');
            res = "EMERGENCY_OVERRIDE_ACTIVE";
        } else {
            res = "STATUS: NOMINAL";
        }

        logs.innerHTML = `<div>> ${cmd}</div><div style="color:white">${res}</div>` + logs.innerHTML;
        e.target.value = "";
    }
}

// --- VALENTINE LOGIC ---
function generateValentine() {
    const name = document.getElementById('target-name').value.toUpperCase();
    const msg = `CORE_SYNC: ${name}, YOU ARE THE ONLY SIGNAL IN MY NOISE. END_LINK.`;
    document.getElementById('message-content').innerText = msg;
    document.getElementById('output-module').classList.remove('hidden');
}

function shareToWhatsApp() {
    const msg = encodeURIComponent(`*AETHER-OS AFFECTION PACKET*\n${document.getElementById('message-content').innerText}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
}

function downloadPacket() {
    const data = `<packet><to>${document.getElementById('target-name').value}</to><body>${document.getElementById('message-content').innerText}</body></packet>`;
    const blob = new Blob([data], {type: 'text/xml'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "affection_packet.xml";
    link.click();
}