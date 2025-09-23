let demarrerReset = document.getElementById('demarrerReset');
let fleches = document.querySelectorAll('.fleches');
let score = document.getElementById('score');
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");


let partieLance = false;
let tailleBalle = 5;
let tailleRaquette = 80;
let positionBalleX = canvas.width/2;
let positionBalleY = canvas.height-(tailleRaquette/2);
let positionRaquetteX = 0;
let duration = 3; 

demarrerReset.addEventListener('click', () => {
    if(partieLance === true){
        resetGame();
    } else {
        //compteARebours();
        startingGame();
        partieLance = true;
        demarrerReset.innerText = "Réinitialiser la partie";
    }
}); 

function startingGame() {
    gameLoop();
    startTimer();
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}


function startTimer(){
    let cpt = 0;
    let timer = setInterval(() => {
        cpt++;
        score.innerText = `${Math.trunc(cpt/60)} min ${cpt%60}`;
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
        clearCanvas();
        if (current === 0 || current < -1) {
            clearInterval(id);
            drawText("GO");
            setTimeout(() => {
                if (typeof onEnd === "function") onEnd();
            }, duration * 1000);
        } else {
            drawNumber(current);
        }
        if(current === -1){
            partieLance = true;
            clearCanvas();
            startingGame();
        }
    }, 1000);    
}

fleches.forEach(fleche => {
    fleche.addEventListener('click', () => {
        if(partieLance === true){
            const choixDirection = fleche.id;
            if(choixDirection === "gauche"){
                if(positionRaquetteX > -(canvas.width/2 - tailleRaquette/2)){
                    positionRaquetteX -= 10;
                }
            } else if(choixDirection === "droite"){
                if(positionRaquetteX + tailleRaquette/2 < canvas.width/2){
                    positionRaquetteX += 10;
                }
            }
        }
    });
});

document.addEventListener('keydown', (event) => {
    if(partieLance === true){
        const keyName = event.key;
        if(keyName === "ArrowLeft"){
            if(positionRaquetteX > -(canvas.width/2 - tailleRaquette/2)){
                positionRaquetteX -= 10;
            }
        } else if(keyName === "ArrowRight"){
            if(positionRaquetteX + tailleRaquette/2 < canvas.width/2){
                positionRaquetteX += 10;
            }
        }
    }
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

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 5;
    //contour du canvas
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    //raquette
    ctx.fillRect(canvas.width/2 - (tailleRaquette/2) + positionRaquetteX, canvas.height-(tailleRaquette/4), 
        tailleRaquette, tailleRaquette/10);
    //balle
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(positionBalleX, positionBalleY, tailleBalle, 0, Math.PI * 2);
    ctx.stroke();
}

// Fonction pour la balle
function moveBall() {
    
}

function resetGame() {
    window.location.reload();
}





