let secondsPassed: number;
let oldTimeStamp: number;

let racingService: RaceService;

function init() {
    racingService = new RaceService();
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp: number) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    window.requestAnimationFrame(gameLoop);
}

window.onload = () => { init() };