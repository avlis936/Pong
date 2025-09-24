let demarrerReset = document.getElementById('demarrerReset');
let fleches = document.querySelectorAll('.fleches');
let score = document.getElementById('score');
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");


let partieLance = false;
let tailleBalle = 5;
let tailleRaquette = 80;
let vitesseBalleX = 0;
let vitesseBalleY = 0;
let positionBalleX = canvas.width/2;
let positionBalleY = canvas.height-(tailleRaquette/2);
let positionRaquetteX = 0;
let duration = 3; 
let timer;
let directionRaquette = 0; // -1 gauche, 1 droite, 0 immobile
let gameOver = false;

demarrerReset.addEventListener('click', () => {
    if(partieLance === true){
        resetGame();
    } else if(gameOver === false){
        clearCanvas();
        compteARebours();
        demarrerReset.disabled = true;
        demarrerReset.innerText = "Réinitialiser la partie";
    } else{
        resetGame();
    }
}); 

function startingGame() {
    if(gameLoop() === 1){
        return;
    }
    startTimer();
    vitesseBalleX = Math.floor(Math.random() * 3) + 1;
    vitesseBalleY = -Math.abs(Math.floor(Math.random() * 3) + 1);
}

function gameLoop() {
    moveBall();
    deplacementRaquette();
    if(bounceBall() === 1){
        return 1;
    }
    draw();
    requestAnimationFrame(gameLoop);
}


function startTimer(){
    let cpt = 0;
    timer = setInterval(() => {
        cpt++;
        score.innerText = `${Math.trunc(cpt/60)} min ${cpt%60}`;
    }, 1000);
}


function stopTimer(){
    clearInterval(timer);
}

function compteARebours() {
    let current = duration;
    drawNumber(current, 100);

    const id = setInterval(() => {
        current--;
        clearCanvas();
        if (current <= -1) {
            clearInterval(id);
        } else {
            drawNumber(current, 100);
        }
        if(current === 0){
            partieLance = true;
            clearCanvas();
            demarrerReset.disabled = false;
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

function deplacementRaquette(){
    if(directionRaquette === -1){
        if(positionRaquetteX > -(canvas.width/2 - tailleRaquette/2)){
            positionRaquetteX -= 10;
        }
    } else if(directionRaquette === 1){
        if(positionRaquetteX + tailleRaquette/2 < canvas.width/2){
            positionRaquetteX += 10;
        }
    }
}

fleches.forEach(fleche => {
    fleche.addEventListener('touchstart', () => {
        if(partieLance === true){
            const choixDirection = fleche.id;
            if(choixDirection === "gauche"){
                directionRaquette = -1;
            } else if(choixDirection === "droite"){
                directionRaquette = 1;
            }
        }
    }); 
});

fleches.forEach(fleche => {
    fleche.addEventListener('touchend', () => {
        if(partieLance === true){
            directionRaquette = 0;
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
        } else if(keyName === "q"){
            if(positionRaquetteX > -(canvas.width/2 - tailleRaquette/2)){
                positionRaquetteX -= 10;
            }
        } else if(keyName === "d"){
            if(positionRaquetteX + tailleRaquette/2 < canvas.width/2){
                positionRaquetteX += 10;
            }
        }
    }
});

function drawText(text, taille) {
    ctx.fillStyle = "darkblue";
    ctx.font = taille + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 50);
}

function drawNumber(number, taille) {
    ctx.fillStyle = "darkblue";
    ctx.font = taille + "px Arial";
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
    positionBalleX += vitesseBalleX;
    positionBalleY += vitesseBalleY;
}

function bounceBall(){
    //rebond sur les rebords du canvas
    if(positionBalleX + tailleBalle/2 > canvas.width || positionBalleX - tailleBalle/2 < 0){
        vitesseBalleX = -vitesseBalleX;
        improveSpeed();
    }
    if(positionBalleY - tailleBalle/2 < 0){
        vitesseBalleY = -vitesseBalleY;
        improveSpeed();
    }
    //rebond sur la raquette
    if(positionBalleY + tailleBalle/2 > canvas.height - (tailleRaquette/4) &&
       positionBalleX > canvas.width/2 - (tailleRaquette/2) + positionRaquetteX &&
       positionBalleX < canvas.width/2 + (tailleRaquette/2) + positionRaquetteX){
        vitesseBalleY = -vitesseBalleY;
    }
    //perte de la partie
    if(positionBalleY + tailleBalle/2 > canvas.height){
        gameOver = true;
        stopTimer();
        partieLance = false;
        drawText("GAME OVER", 60);
        demarrerReset.innerText = "Démarrer une nouvelle partie";
        vitesseBalleX = 0;
        vitesseBalleY = 0;
        return 1;
    }
}

function improveSpeed(){
    if(Math.abs(vitesseBalleX) < 10){
        if(vitesseBalleX > 0){
            vitesseBalleX += 0.3;
        } else {
            vitesseBalleX -= 0.3;
        }
    }
    if(Math.abs(vitesseBalleY) < 10){
        if(vitesseBalleY > 0){
            vitesseBalleY += 0.3;
        } else {
            vitesseBalleY -= 0.3;
        }
    }
}

function resetGame() {
    window.location.reload();
}





