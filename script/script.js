let demarrerReset = document.getElementById('demarrerReset');
let fleches = document.querySelectorAll('.fleches');
let score = document.getElementById('score');
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");


let partieLance = false;
let tailleRaquette = 80;
let positionRaquetteX = 0;
let duration = 3; 

demarrerReset.addEventListener('click', () => {
    if(partieLance === true){
        resetGame();
    } else {
        startingGame();
        startTimer();
        demarrerReset.innerText = "Réinitialiser la partie";
    }
}); 

function startingGame() {
    compteARebours();
    gameLoop();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function startTimer(){
    let cpt = 0;
    let timer = setInterval(() => {
        cpt++;
        score.innerText = `${cpt}`;
    }, 1000);
}

function stopTimer(){
    clearInterval(timer);
}

function compteARebours() {
    let current = duration;
    drawNumber(current);

    const id = setInterval(() => {
        current--;
        if (current <= 0) {
            clearInterval(id);
            drawText("GO");
            setTimeout(() => {
                if (typeof onEnd === "function") onEnd();
            }, duration * 1000);
        } else {
            drawNumber(current);
        }
    }, 1000);
    partieLance = true;
}

fleches.forEach(fleche => {
    fleche.addEventListener('click', () => {
        if(partieLance === true){
            const choixDirection = fleche.id;
            console.log(choixDirection);
            if(choixDirection === "gauche"){
                positionRaquetteX -= 10;
            } else if(choixDirection === "droite"){
                positionRaquetteX += 10;
            }
        }
    });
});



function drawText(text) {
    ctx.fillStyle = "darkblue";
    ctx.font = "100px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 50);
}

function drawNumber(number) {
    ctx.fillStyle = "darkblue";
    ctx.font = "100px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(number, canvas.width / 2, canvas.height / 2 - 50);
}

function update() {

}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(canvas.width/2 - (tailleRaquette/2) + positionRaquetteX, canvas.height-(tailleRaquette/4), 
        tailleRaquette, tailleRaquette/10);
}

function resetGame() {
    window.location.reload();
}





