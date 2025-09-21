let reset = document.getElementById('reset');

window.onload = function() {
    const canvas = document.getElementById("pong");
    var ctx = canvas.getContext("2d");
    
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    start = document.createElement("button");
    start.id = "start";
    start.textContent = "Start";
    start.style.position = 'absolute';
    start.style.top = canvas.height / 2 + 50 + 'px';
    start.style.left = canvas.width / 2 - 40 + 'px';
    document.body.appendChild(start);
}


reset.addEventListener('click', () => {
    resetGame();
});

function startingGame() {
    compteARebours();
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





