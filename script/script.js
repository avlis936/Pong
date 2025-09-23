let demarrerReset = document.getElementById('demarrerReset');
let fleches = document.querySelectorAll('.fleches');
let score = document.getElementById('score');


let partieLance = false;
let tailleRaquette = 80;
let positionRaquetteX = 0;
let duration = 3; 

window.onload = function() {
    const canvas = document.getElementById("pong");
    var ctx = canvas.getContext("2d");
    
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(canvas.width/2 - (tailleRaquette/2) + positionRaquetteX, canvas.height-(tailleRaquette/4), 
        tailleRaquette, tailleRaquette/10);

    
}

demarrerReset.addEventListener('click', () => {
    if(partieLance === true){
        resetGame();
        demarrerReset.innerText = "Démarrer la partie";
    } else {
        partieLance = true;
        startingGame();
        startTimer();
        demarrerReset.innerText = "Réinitialiser la partie";
    }
}); 

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

function startingGame() {
    apparitionBalle();
    compteARebours();
}

function startTimer(){
    let cpt = 0;
    let timer = setInterval(() => {
        cpt++;
        score.innerText = `Score : ${cpt}`;
    }, 1000);
}

function stopTimer(){
    clearInterval(timer);
}

function apparitionBalle(){

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
}

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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
}

function resetGame() {
    window.location.reload();
}





