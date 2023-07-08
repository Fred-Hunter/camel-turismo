let secondsPassed: number;
let oldTimeStamp: number;

function init() {
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp: number) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    window.requestAnimationFrame(gameLoop);
}

init();