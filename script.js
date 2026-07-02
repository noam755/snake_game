const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 20
let appleIndex = 0
let timerId = 0
let interValTime = 200
function createBoard(){
    for (let i = 0; i < 400; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();
startGame();
function endGame(){
    return clearInterval(timerId);
}
function move(){
    const hitBottom=(currentSnake[0]+20>=400 && direction === 20);
    const hitTop = (currentSnake[0]-20<0 && direction === -20);
    const hitRight = (currentSnake[0]%20 === 19 && direction === 1);
    const hitLeft = (currentSnake[0]%20 === 0 && direction === -1);
    const hitSelf = squares[currentSnake[0]+direction]?.classList.contains('snake');
    if (hitRight||hitBottom||hitTop|| hitLeft||hitSelf){
       return endGame();


    }
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    const newHead = currentSnake[0] + direction;

    if (squares[newHead].classList.contains('apple')){
        squares[newHead].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++;
        scoreDisplay.textContent = score;

        generateApple();
}
currentSnake.unshift(newHead);

squares[newHead].classList.add('snake');
    document.addEventListener('touched', (e) => {
    touchEndx= e.changedTouches[0].screenX;
     touchEndy= e.changedTouches[0].screenY;
     handleSwipe();
    
},false);
}
function startGame(){
        currentSnake.forEach(index=> squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(timerId);
        currentSnake = [2, 1, 0];
        score = 0; direction = 1; interValTime = 200;
        scoreDisplay.textContent = score;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        generateApple();
        timerId = setInterval(move, interValTime)
    }

function generateApple(){
    do {
    appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'))
    squares [appleIndex].classList.add('apple');
}

function changeDir(newDir){
    if (direction + newDir !== 0){
        direction=newDir;
    }
}


document.addEventListener('keydown',(e)=>{
    if (e.key === 'ArrowUp') changeDir(-20);
     if (e.key === 'ArrowDown') changeDir(20);
     if (e.key === 'ArrowLeft') changeDir(-1);
     if (e.key === 'ArrowRight') changeDir(1);
})
