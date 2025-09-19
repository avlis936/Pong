window.onload = function() {
    const canvas = document.getElementById("pong");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 150, 100);
};


let reset = document.getElementById('resetPartie');

reset.addEventListener('click', resetGame);

function resetGame() {
    
    window.location.reload();
};

