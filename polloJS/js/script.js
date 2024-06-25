//board
let board;
let boardWidth = 360;
let boardHeigth = 640;
let context;


//Pollo
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8; // divide el boardWidth en 8 //posición del pollo en horizontal
let birdY = boardHeigth/2; // divide el boardHeigth en 2 //posición del pollo en vertical
let birdImg;

//Pájaro
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//Tuberías (pipes)
let pipeArray = []; //Aquí se pintaran las tuberías
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth; //cogemos como referencia el marco externo de la pantalla
let pipeY = 0; //lo pegamos arriba

let topPipeImg;
let bottomPipeImg;

//Fisicas
let velocityX = -2; //Las tuberías viajan de dch a izq, por eso es negativa.
let velocityY = 0; //Es la velocidad vertical del pájaro (salto del pájaro).
let gravity = 0.4; //Aplicamos gravedad al pájaro.


//Lógica de juego
let gameOver = false;
let score = 0;


window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeigth;
    board.width = boardWidth;
    context = board.getContext("2d") //Esto nos permite escribir en el canvas

    //Dibuja el espacio del pollo
    // context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height); //fillRect es un rectangulo y le hemos dados las propiedades de x, y, width, height que están declaradas más abrriba

    //Cargar la imagen
    birdImg = new Image();
    birdImg.src = "img/pixelcat2.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "img/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "img/bottompipe.png";

    requestAnimationFrame(update);

    //Generamos el intervalo de las tuberías
    setInterval(placePipes, 1500) //generamos tuberías cada segundo y medio.

    document.addEventListener("keydown", moveBird);
}

//Función para actualizar el estado del entorno
function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height); //Borra el pájaro

    //Pájaro
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //Aplicamos el impulso y limitamos al pájaro para que no se salga de la pantalla,
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height); //pinta el pájaro 

    if (bird.y > board.height) {
        gameOver = true;
    }

    // Generamos tuberías con un bucle
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray [i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    //Eliminar tuberías
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //Eliminamos las primeras tuberías.
    }

    //Puntuación
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 175, 55);

    //Texto Game Over
    if (gameOver) {
        context.fillText('GAME OVER', 50, 320)
    }
}

//Generador de tuberías
function placePipes() {
    if (gameOver) {
        return;
    }
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2); //restamos al alto de la img 1/4 del tamaño total de la img (128px) y ahora lo multiplicamos por la mitad de la altura.

    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg, 
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);
    

    let bottompipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottompipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        //Si pulsas espacio o la tecla arriba el pollo salta.
        velocityY = -6;

        //Reinicio del juego
        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0; 
            gameOver = false;
        }
    }
}

//Detector de colisiones
function detectCollision(a, b) {
    return a.x < b.x + b.width && 
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;

}



