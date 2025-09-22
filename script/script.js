let demarrerReset = document.getElementById('demarrerReset');
let partieLance = false;
let score = document.getElementById('score');
let tailleRaquette = 100;
let positionRaquette = 200;

window.onload = function() {
    const canvas = document.getElementById("pong");
    var ctx = canvas.getContext("2d");
    
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(canvas.width/2 - (tailleRaquette/2), canvas.height-(tailleRaquette/4), 
        tailleRaquette, tailleRaquette/10);
}


demarrerReset.addEventListener('click', () => {
    if(partieLance === true){
        resetGame();
    } else {
        partieLance = true;
        startingGame();
        startTimer();
    }
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
            }, 300);
        } else {
            drawNumber(current);
        }
    }, 1000);    
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





