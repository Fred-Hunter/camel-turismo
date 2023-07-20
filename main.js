"use strict";
// Game state
let race;
// Navigation TODO should not be available globally
let navigatorService;
// Components
// Recruitment
let recruitmentService;
// Camel management
let camelSkillComponent;
let camelManagementSelectComponent;
// Race
let raceSelection;
let raceComponent;
let raceCamelSelectComponent;
// Loading
let loadingScreen;
function init() {
    navigatorService = new NavigatorService();
    const musicService = new MusicService();
    const startup = new Startup(musicService, navigatorService);
    startup.createCanvases();
    startup.registerComponents();
    startup.registerAudio();
    navigatorService.doNavigation();
    window.requestAnimationFrame(gameLoop);
}
function gameLoop(timeStamp) {
    try {
        GameState.secondsPassed = Math.min((timeStamp - GameState.oldTimeStamp) / 1000, 0.1);
        GameState.oldTimeStamp = timeStamp;
        navigatorService.doNavigation();
        raceComponent.handleRaceLoop(timeStamp);
    }
    catch (exception) {
        console.error(exception);
    }
    finally {
        window.requestAnimationFrame(gameLoop);
    }
}
window.onload = () => { init(); };
class MusicService {
    HomeScreenAudio;
    RaceAudio;
    currentAudio = "HomeScreenAudio";
    constructor() {
        this.HomeScreenAudio = new Audio("audio/Mii Camel.mp3");
        this.RaceAudio = new Audio("audio/Camel Mall.mp3");
        this.HomeScreenAudio.loop = true;
        this.RaceAudio.loop = true;
    }
    startAudio() {
        if (this.currentAudio == "HomeScreenAudio") {
            this.RaceAudio.pause();
            this.RaceAudio.currentTime = 0;
            this.HomeScreenAudio.play();
        }
        else if (this.currentAudio == "RaceAudio") {
            this.HomeScreenAudio.pause();
            this.HomeScreenAudio.currentTime = 0;
            this.RaceAudio.play();
        }
        else {
            this.HomeScreenAudio.pause();
            this.HomeScreenAudio.currentTime = 0;
            this.RaceAudio.pause();
            this.RaceAudio.currentTime = 0;
        }
    }
    setAudio(audioName) {
        this.currentAudio = audioName;
    }
}
class CanvasBtnService {
    canvas;
    _navigator;
    constructor(canvas, _navigator) {
        this.canvas = canvas;
        this._navigator = _navigator;
    }
    eventListeners = [];
    getMousePosition(event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }
    isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
    }
    drawBackButton(targetPage) {
        const maxX = this.canvas.width / GlobalStaticConstants.devicePixelRatio;
        const maxY = this.canvas.height / GlobalStaticConstants.devicePixelRatio;
        this.createBtn(maxX / 40, maxY - 100, 100, 50, 0, '#cc807a', '#f2ada7', '#fff', () => this._navigator.requestPageNavigation(targetPage), 'Back');
    }
    drawBtn = (context, rect, radius, backgroundColour, borderColour, fontColour, text) => {
        context.save();
        context.beginPath();
        context.roundRect(rect.x, rect.y, rect.width, rect.height, radius);
        context.fillStyle = backgroundColour;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = borderColour;
        context.stroke();
        context.closePath();
        context.font = '30pt Garamond';
        context.fillStyle = fontColour;
        context.textAlign = "center";
        context.fillText(text, rect.x + rect.width / 2, rect.y + 3 * rect.height / 4, rect.width - 10);
        context.restore();
    };
    displayHoverState = (context, rect, radius, borderColour, fontColour, text) => {
        this.drawBtn(context, rect, radius, borderColour, borderColour, fontColour, text);
    };
    createBtn(xStart, yStart, width, height, radius, backgroundColour, borderColour, fontColour, onclickFunction, text) {
        var rect = {
            x: xStart,
            y: yStart,
            width: width,
            height: height
        };
        // Binding the click event on the canvas
        var context = this.canvas.getContext('2d');
        const handler = (event) => {
            let mousePos = this.getMousePosition(event);
            if (this.isInside(mousePos, rect)) {
                onclickFunction();
            }
        };
        this.eventListeners.push(handler);
        this.canvas.addEventListener('click', handler, false);
        this.canvas.addEventListener('mousemove', (event) => {
            let mousePos = this.getMousePosition(event);
            if (this.isInside(mousePos, rect)) {
                this.displayHoverState(context, rect, radius, borderColour, fontColour, text);
            }
            else {
                this.drawBtn(context, rect, radius, backgroundColour, borderColour, fontColour, text);
            }
        }, false);
        this.drawBtn(context, rect, radius, backgroundColour, borderColour, fontColour, text);
    }
    removeEventListeners() {
        this.eventListeners.forEach(o => {
            this.canvas.removeEventListener('click', o, false);
        });
        this.eventListeners = [];
    }
}
class CanvasCamelService {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
        this._cubeService = new CubeService(ctx);
    }
    _cubeService;
    drawCamelIsoCoords(xCoord, yCoord, size, colour, height = 0) {
        const scaleFactor = GlobalStaticConstants.baseCubeSize * 4 / 5;
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1.5, 0, Math.round(-10 * size / scaleFactor));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 0, 0, Math.round(-6 * size / scaleFactor));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, Math.round(-6 * size / scaleFactor));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, Math.round(-2 * size / scaleFactor));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 2, 0, Math.round(-2 * size / scaleFactor));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 0, 0, Math.round(2 * size / scaleFactor));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, Math.round(2 * size / scaleFactor));
    }
    drawCamelScreenCoords(xCoord, yCoord, size, colour) {
        const isoCoords = ImportantService.ConvertRealToCoord(xCoord, yCoord, size);
        this.drawCamelIsoCoords(isoCoords.x2, isoCoords.y2, size, colour);
    }
}
class CanvasNames {
    static Recruitment = 'recruitmentCanvas';
    static RaceBackground = 'race-background';
    static RaceCamel = 'race-camel';
    static RaceSelection = 'race-selection';
    static MapOverview = 'map-overview';
    static GymCamel = 'gym-camel';
    static GymBackground = 'gym-background';
    static PopupCanvas = 'popup';
    static Countdown = 'countdown';
    static CamelManagement = 'camel-management';
    static LoadingScreen = 'loading-screen';
}
class CanvasService {
    static createCanvas(zIndex, name = "default") {
        const canvas = document.createElement('canvas');
        canvas.setAttribute("id", `canvas-${name}`);
        document.body.appendChild(canvas);
        const width = GlobalStaticConstants.innerWidth;
        const height = GlobalStaticConstants.innerHeight;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.position = 'absolute';
        canvas.style.zIndex = zIndex;
        // Set actual size in memory (scaled to account for extra pixel density).
        var scale = GlobalStaticConstants.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);
        const ctx = canvas.getContext('2d');
        // Normalize coordinate system to use css pixels.
        ctx.scale(scale, scale);
        return canvas;
    }
    static getCurrentCanvas() {
        return Array.from(document.querySelectorAll("canvas")).sort(c => +c.style.zIndex)[0];
    }
    static setCanvasZIndex(canvasName, zIndex) {
        this.getCanvasByName(canvasName).style.zIndex = `${zIndex}`;
    }
    static bringCanvasToTop(canvasName) {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        const getMax = (a, b) => Math.max(a, b);
        const maxZIndex = allCanvases?.map(c => +c.style.zIndex).reduce(getMax, 0);
        this.setCanvasZIndex(canvasName, maxZIndex + 1);
    }
    static resetCanvases() {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => this.setCanvasZIndex(c.id, 0));
    }
    static hideCanvas(canvasName) {
        this.getCanvasByName(canvasName).style.display = "none";
    }
    static hideAllCanvas() {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => c.style.display = "none");
    }
    static showAllCanvas() {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => c.style.display = "initial");
    }
    static showCanvas(canvasName) {
        this.getCanvasByName(canvasName).style.display = "initial";
    }
    static getCanvasByName(canvasName) {
        const canvas = document.querySelector(`#canvas-${canvasName}`);
        if (!canvas) {
            throw "`No canvas found with name: ${canvasName}`";
        }
        return canvas;
    }
}
class CashMoneyService {
    static drawCashMoney(ctx) {
        var img = new Image();
        img.src = './assets/egyptian-pound.jpg';
        img.onload = function () {
            ctx.drawImage(img, GlobalStaticConstants.innerWidth - 450, GlobalStaticConstants.innerHeight - 150, 400, 125);
            ctx.fillStyle = '#e8be9e';
            ctx.fillRect(GlobalStaticConstants.innerWidth - 375, GlobalStaticConstants.innerHeight - 125, 250, 25);
            ctx.font = '30pt Garamond';
            ctx.fillStyle = '#000';
            ctx.textAlign = "center";
            ctx.fillText('Cash money: ' + GameState.cashMoney, GlobalStaticConstants.innerWidth - 250, GlobalStaticConstants.innerHeight - 102, 250);
        };
    }
}
class CubeService {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
    }
    drawCube(coordX, coordY, sideLength, colour, height = 0, xStart = 0, yStart = 0) {
        const { x, y } = ImportantService.ConvertCoordToReal(coordX, coordY, sideLength, height, xStart, yStart);
        // left
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x - sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 10);
        this.ctx.fill();
        // right
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x + sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 0);
        this.ctx.fill();
        // top
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 20);
        this.ctx.fill();
        this.ctx.fillStyle = '#000000';
        // this.ctx.fillText(coordX + ',' + coordY, x, y);
    }
    drawDebugGrid(sideLength, height = 0, xStart = 0, yStart = 0) {
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 1;
        const gridExtent = Array.from(Array(15).fill(1).map((x, i) => i));
        this.ctx.beginPath();
        gridExtent.forEach(x => {
            const start = ImportantService.ConvertCoordToReal(x, 0, sideLength, height, xStart, yStart);
            this.ctx.moveTo(start.x, start.y);
            this.ctx.fillText(`(${x},${0})`, start.x, start.y);
            this.ctx.fillText(`(${start.x}, ${start.y})`, start.x, start.y + 8);
            const end = ImportantService.ConvertCoordToReal(x, 15, sideLength, height, xStart, yStart);
            this.ctx.lineTo(end.x, end.y);
        });
        this.ctx.stroke();
        this.ctx.beginPath();
        gridExtent.forEach(y => {
            const start = ImportantService.ConvertCoordToReal(0, y, sideLength, height, xStart, yStart);
            this.ctx.moveTo(start.x, start.y);
            this.ctx.fillText(`(${0},${y})`, start.x, start.y);
            this.ctx.fillText(`(${start.x}, ${start.y})`, start.x, start.y + 8);
            const end = ImportantService.ConvertCoordToReal(15, y, sideLength, height, xStart, yStart);
            this.ctx.lineTo(end.x, end.y);
        });
        this.ctx.stroke();
    }
    shadeColor(colour, percent) {
        colour = colour.substring(1);
        const num = parseInt(colour, 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}
class GameState {
    // Update this whenever a new gamestate version is created
    static _version = 0;
    // Camel
    static camel;
    static camels = [];
    static secondsPassed = 0; // done
    static oldTimeStamp = 0; // done
    // Recruitment
    static lastUsedId = 0; // done
    static cashMoney = 100; // done
    static Save() {
        const gameStateObject = {
            camel: GameState.camel,
            camels: GameState.camels,
            secondsPassed: GameState.secondsPassed,
            oldTimeStamp: GameState.oldTimeStamp,
            lastUsedId: GameState.lastUsedId,
            cashMoney: GameState.cashMoney
        };
        const gameStateString = JSON.stringify(gameStateObject);
        localStorage.setItem(this.getItemKey(), gameStateString);
    }
    static Reset() {
        localStorage.removeItem(this.getItemKey());
    }
    static GetExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        if (!gameStateString || gameStateString === undefined)
            return;
        const gameState = JSON.parse(gameStateString);
        return !!gameState.camel;
    }
    static LoadIfExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        if (!gameStateString || gameStateString === undefined)
            return;
        const gameState = JSON.parse(gameStateString);
        if (gameState.camel === undefined)
            return;
        // Load camel
        gameState.camels.forEach(camel => this.loadCamel(camel));
        if (gameState.camels.length > 0) {
            GameState.camel = GameState.camels[0];
        }
        // Load game state
        GameState.secondsPassed = gameState.secondsPassed;
        GameState.oldTimeStamp = gameState.oldTimeStamp;
        GameState.lastUsedId = gameState.lastUsedId;
        GameState.cashMoney = gameState.cashMoney;
    }
    static loadCamel(serialisedCamel) {
        const camel = new Camel(serialisedCamel.id, InitCamelQuality.None);
        camel.colour = serialisedCamel.colour;
        camel.name = serialisedCamel.name;
        camel.temperament = serialisedCamel.temperament;
        camel.unspentXp = serialisedCamel.unspentXp;
        camel.agility.addXp(serialisedCamel.agility.currentXp);
        camel.sprintSpeed.addXp(serialisedCamel.sprintSpeed.currentXp);
        camel.stamina.addXp(serialisedCamel.stamina.currentXp);
        GameState.camels.push(camel);
    }
    static getItemKey() {
        return GameState.name + this._version;
    }
}
class GlobalStaticConstants {
    static backgroundColour = "#e8d7a7";
    static highlightColour = "#432818";
    static mediumColour = "#bb9457";
    static innerWidth = window.innerWidth;
    static innerHeight = window.innerHeight;
    static devicePixelRatio = window.devicePixelRatio;
    static baseCubeSize = Math.round(window.innerWidth / 30);
}
class ImportantService {
    static ConvertCoordToReal(coordX, coordY, sideLength, height = 0, xStart = 0, yStart = 0) {
        const xOffset = GlobalStaticConstants.innerWidth / 2;
        coordX = coordX * GlobalStaticConstants.baseCubeSize / sideLength;
        coordY = coordY * GlobalStaticConstants.baseCubeSize / sideLength;
        const xScaleFactor = GlobalStaticConstants.baseCubeSize / 5;
        const yScaleFactor = xScaleFactor / 2;
        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * xScaleFactor;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * yScaleFactor;
        return { x, y };
    }
    static ConvertRealToCoord(x, y, sideLength, height = 0, xStart = 0, yStart = 0) {
        const xOffset = GlobalStaticConstants.innerWidth / 2;
        const coordX = (2 * height * sideLength - 20 * xStart + x - xOffset + 2 * y - 200) / (2 * sideLength);
        const coordY = (2 * height * sideLength - 20 * yStart - x + xOffset + 2 * y - 200) / (2 * sideLength);
        const x2 = coordX * sideLength / GlobalStaticConstants.baseCubeSize;
        const y2 = coordY * sideLength / GlobalStaticConstants.baseCubeSize;
        return { x2, y2 };
    }
}
class PopupService {
    constructor() {
    }
    static drawAlertPopup(text, navigateBackToMap = true) {
        const canvas = CanvasService.getCanvasByName(CanvasNames.PopupCanvas);
        CanvasService.bringCanvasToTop(CanvasNames.PopupCanvas);
        CanvasService.showCanvas(CanvasNames.PopupCanvas);
        const ctx = canvas?.getContext('2d');
        if (!ctx)
            return;
        const width = 400;
        const height = 120;
        const x = (canvas.width / GlobalStaticConstants.devicePixelRatio) / 2 - width / 2;
        const y = GlobalStaticConstants.innerHeight / 2 - height / 4;
        const bgColour = GlobalStaticConstants.backgroundColour;
        const textColour = GlobalStaticConstants.highlightColour;
        const highlightColour = GlobalStaticConstants.highlightColour;
        // Draw the background rectangle
        const backgroundRect = [
            x,
            y,
            width,
            height
        ];
        ctx.beginPath();
        ctx.strokeStyle = highlightColour;
        ctx.lineWidth = 3;
        ctx.fillStyle = bgColour;
        ctx.rect(...backgroundRect);
        ctx.fill();
        ctx.stroke();
        // Draw the popup content
        const textLines = this.getLines(ctx, text, width / 2 - 30);
        let textOffset = 0;
        ctx.fillStyle = textColour;
        ctx.font = 'bold 20px Arial';
        textLines.forEach((t) => {
            ctx.fillText(t, x + 20, y + backgroundRect[3] / 3 + textOffset);
            textOffset += 30;
        });
        // Draw the close button
        ctx.fillStyle = highlightColour;
        ctx.fillRect(x + backgroundRect[2] - 60, y, 60, 30);
        ctx.fillStyle = "#fff";
        ctx.font = '14px Arial';
        ctx.fillText('Close', x + backgroundRect[2] - 55, y + 20, backgroundRect[3]);
        // Add an event listener to handle the close button click
        canvas.addEventListener('click', function (event) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = event.clientX - rect.left;
            var mouseY = event.clientY - rect.top;
            if (mouseX >= backgroundRect[0] &&
                mouseX <= backgroundRect[0] + backgroundRect[2] &&
                mouseY >= backgroundRect[1] &&
                mouseY <= backgroundRect[1] + backgroundRect[3]) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                CanvasService.hideCanvas(CanvasNames.PopupCanvas);
                if (navigateBackToMap) {
                    navigatorService.requestPageNavigation(Page.mapOverview);
                }
            }
        });
    }
    static showLoading() {
        this.clearPopups();
        const canvas = CanvasService.getCanvasByName(CanvasNames.PopupCanvas);
        CanvasService.bringCanvasToTop(CanvasNames.PopupCanvas);
        CanvasService.showCanvas(CanvasNames.PopupCanvas);
        const ctx = canvas?.getContext('2d');
        if (!ctx)
            return;
        const width = 140;
        const height = 40;
        const x = (canvas.width / GlobalStaticConstants.devicePixelRatio) / 2 - width / 2;
        const y = GlobalStaticConstants.innerHeight / 2 - height / 4;
        const bgColour = GlobalStaticConstants.backgroundColour;
        const textColour = GlobalStaticConstants.highlightColour;
        const highlightColour = GlobalStaticConstants.highlightColour;
        // Draw the background rectangle
        const backgroundRect = [
            x,
            y,
            width,
            height
        ];
        ctx.strokeStyle = highlightColour;
        ctx.lineWidth = 3;
        ctx.fillStyle = bgColour;
        ctx.beginPath();
        ctx.rect(...backgroundRect);
        ctx.fill();
        ctx.stroke();
        // Draw the popup content
        ctx.fillStyle = textColour;
        ctx.font = 'bold 20px Arial';
        ctx.fillText("Loading...", x + 20, y + 25);
    }
    static clearPopups() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.PopupCanvas);
        const ctx = canvas?.getContext('2d');
        if (!ctx)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        CanvasService.hideCanvas(CanvasNames.PopupCanvas);
    }
    static drawTwoOptionPopup(canvas, x, y, option1Text, option2Text, option1Callback, option2Callback) {
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
    }
    static getLines(ctx, text, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            }
            else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
}
class Startup {
    _musicService;
    _navigatorService;
    constructor(_musicService, _navigatorService) {
        this._musicService = _musicService;
        this._navigatorService = _navigatorService;
    }
    registerComponents() {
        const racingStartup = new RacingStartup(this._musicService, this._navigatorService);
        racingStartup.registerComponents();
        const managementStartup = new ManagementStartup(this._musicService, this._navigatorService);
        managementStartup.registerComponents();
        recruitmentService = new RecruitmentService(navigatorService);
        loadingScreen = new LoadingScreen(navigatorService);
    }
    registerAudio() {
        window.addEventListener('keydown', () => {
            this._musicService.startAudio();
        });
    }
    createCanvases() {
        CanvasService.createCanvas('3', CanvasNames.Recruitment);
        CanvasService.createCanvas('1', CanvasNames.RaceBackground);
        CanvasService.createCanvas('2', CanvasNames.RaceCamel);
        CanvasService.createCanvas('4', CanvasNames.MapOverview);
        CanvasService.createCanvas('1', CanvasNames.GymCamel);
        CanvasService.createCanvas('0', CanvasNames.GymBackground);
        CanvasService.createCanvas('0', CanvasNames.PopupCanvas);
        CanvasService.createCanvas('5', CanvasNames.RaceSelection);
        CanvasService.createCanvas('6', CanvasNames.Countdown);
        CanvasService.createCanvas('7', CanvasNames.CamelManagement);
        CanvasService.createCanvas('8', CanvasNames.LoadingScreen);
    }
}
class GymDrawing {
    _navigatorService;
    constructor(_navigatorService) {
        this._navigatorService = _navigatorService;
        this._camelCanvas = CanvasService.getCanvasByName(CanvasNames.GymCamel);
        this._backgroundCanvas = CanvasService.getCanvasByName(CanvasNames.GymBackground);
        this.backgroundCubeService = new CubeService(this._backgroundCanvas.getContext("2d"));
        this.camelCubeService = new CubeService(this._camelCanvas.getContext("2d"));
    }
    _camelCanvas;
    _backgroundCanvas;
    backgroundCubeService;
    camelCubeService;
    _trainSession = null;
    drawGym() {
        const ctx = this._backgroundCanvas.getContext("2d");
        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        this.drawFloor();
        this.drawTreadmill();
        const buttonService = new CanvasBtnService(this._camelCanvas, this._navigatorService);
        buttonService.createBtn((this._camelCanvas.width / GlobalStaticConstants.devicePixelRatio) / 2, GlobalStaticConstants.innerHeight / 2, 550, 50, 25, GlobalStaticConstants.backgroundColour, GlobalStaticConstants.mediumColour, "black", () => this._trainSession = Gym.getTreadmillSession(GameState.camel), "Start session");
        buttonService.createBtn((this._camelCanvas.width / GlobalStaticConstants.devicePixelRatio) / 2, GlobalStaticConstants.innerHeight / 2 + 100, 550, 50, 25, GlobalStaticConstants.backgroundColour, GlobalStaticConstants.mediumColour, "black", () => { this.exitGym(this._trainSession); }, "Back to map");
    }
    exitGym(trainSession) {
        if (trainSession) {
            trainSession.endSession();
        }
        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();
    }
    drawFloor() {
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                // if (race.track.filter(o => o[0] === i && o[1] === j).length > 0) {
                //     this.backgroundCubeService.drawCube(i, j, 50, '#5892a1', -0.2);
                // } else {
                const canvasColour = '#C2B280';
                this.backgroundCubeService.drawCube(i, j, 50, canvasColour);
                // }
            }
        }
    }
    drawTreadmill() {
        // Horizontal lines
        this.drawTreadmillHorizontalLine(7.1, '#999999');
        this.drawTreadmillHorizontalLine(7.2, '#999999');
        this.drawTreadmillHorizontalLine(7.3, '#444444');
        this.drawTreadmillHorizontalLine(7.4, '#999999');
        this.drawTreadmillHorizontalLine(7.5, '#999999');
        this.drawTreadmillHorizontalLine(7.6, '#444444');
        this.drawTreadmillHorizontalLine(7.7, '#999999');
        this.drawTreadmillHorizontalLine(7.8, '#999999');
        this.drawTreadmillHorizontalLine(7.9, '#444444');
        // Left bar
        this.drawTreadmillVerticalLine(7.1, '#000000');
        // Front bar
        this.drawTreadmillHorizontalLine(7, '#000000');
        // Right bar
        this.drawTreadmillVerticalLine(7.8, '#000000');
        this.drawTreadmillUppyDownyLine(7.1, 7, '#000000');
        this.drawTreadmillTopBar('#000000');
        this.drawTreadmillUppyDownyLine(7.8, 7, '#000000');
    }
    drawTreadmillUppyDownyLine(alongth, downth, colour) {
        for (let i = 1; i < 10; i++) {
            this.backgroundCubeService.drawCube(downth, alongth, 5, colour, i);
        }
    }
    drawTreadmillVerticalLine(alongth, colour) {
        for (let i = 0; i < 10; i++) {
            this.backgroundCubeService.drawCube(7 + (i / 10), alongth, 5, colour);
        }
    }
    drawTreadmillHorizontalLine(downth, colour) {
        for (let i = 2; i < 8; i++) {
            this.backgroundCubeService.drawCube(downth, 7 + (i / 10), 5, colour);
        }
    }
    drawTreadmillTopBar(colour) {
        for (let i = 2; i < 8; i++) {
            this.backgroundCubeService.drawCube(7, 7 + (i / 10), 5, colour, 9);
        }
    }
    // public drawCamels(race: Race) {
    //     const ctx = this._camelCanvas.getContext("2d")!;
    //     ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
    //     race.racingCamels.forEach(camel => this.drawCamel(camel, race));
    // }
    drawCamel(camel, race) {
        camel.handleJumpTick();
        const numberOfRaceTrackCoords = race.track.length;
        const currectCoordIndex = Math.floor(camel.completionPercentage * numberOfRaceTrackCoords);
        const currentCoordPercentage = currectCoordIndex / numberOfRaceTrackCoords;
        const nextCoordPercentage = (currectCoordIndex + 1) / numberOfRaceTrackCoords;
        const percentageTowardsNextCoord = (camel.completionPercentage - currentCoordPercentage) /
            (nextCoordPercentage - currentCoordPercentage);
        const currentCoord = race.track[currectCoordIndex];
        const nextCoord = currectCoordIndex < numberOfRaceTrackCoords - 1 ? race.track[currectCoordIndex + 1] : currentCoord;
        const movingInPositiveX = currentCoord[0] < nextCoord[0];
        const movingInNegativeX = currentCoord[0] > nextCoord[0];
        const movingInPositiveY = currentCoord[1] < nextCoord[1];
        const movingInNegativeY = currentCoord[1] > nextCoord[1];
        const offset = percentageTowardsNextCoord;
        const newXCoord = movingInPositiveX ? currentCoord[0] + offset :
            movingInNegativeX ? currentCoord[0] - offset :
                currentCoord[0];
        const newYCoord = movingInPositiveY ? currentCoord[1] + offset :
            movingInNegativeY ? currentCoord[1] - offset :
                currentCoord[1];
        if (movingInNegativeY) {
            this.drawNegativeYCamel(newXCoord, newYCoord, camel);
        }
        else if (movingInNegativeX) {
            this.drawNegativeXCamel(newXCoord, newYCoord, camel);
        }
        else if (movingInPositiveY) {
            this.drawPositiveYCamel(newXCoord, newYCoord, camel);
        }
        else if (movingInPositiveX) {
            this.drawPositiveXCamel(newXCoord, newYCoord, camel);
        }
    }
    drawNegativeYCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord + 0.25;
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1.5 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 2 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, camel.jumpHeight);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight);
    }
    drawNegativeXCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 1.5 + camel.jumpHeight, -2, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 2 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, 1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 1, -1.5);
    }
    drawPositiveYCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord + 0.25;
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 2 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1.5 + camel.jumpHeight, 0);
    }
    drawPositiveXCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, -1.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, -1.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, -0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 2 + camel.jumpHeight, -0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, 0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.colour, 1.5 + camel.jumpHeight, 1.5, -1.5);
    }
}
class GymSession {
    _sessionActive = false;
    startSession() {
        this._sessionActive = true;
    }
    endSession() {
        if (!this._sessionActive) {
            return;
        }
        this._sessionActive = false;
    }
}
class TrainSession extends GymSession {
    _skill;
    _xpGained = 0;
    _staminaRemaining = 0;
    constructor(_skill, _maxStamina) {
        super();
        this._skill = _skill;
        this._staminaRemaining = _maxStamina;
        PopupService.drawAlertPopup("Press spacebar to train!");
        document.addEventListener('keypress', (event) => {
            if (event.key !== " ") {
                return;
            }
            this.onSuccessfulAction();
        }, false);
    }
    startSession() {
        this._xpGained = 0;
        super.startSession();
    }
    onSuccessfulAction() {
        // Review
        if (!this._sessionActive) {
            return;
        }
        this._xpGained += 9;
        this._staminaRemaining += -3; // TODO: range of values
        this.postAction();
    }
    onFailedAction() {
        if (!this._sessionActive) {
            return;
        }
        this._staminaRemaining += -10;
        return this.postAction();
    }
    postAction() {
        if (!this._sessionActive) {
            return;
        }
        if (this._staminaRemaining <= 0) {
            this._xpGained /= 2;
            this.endSession();
        }
    }
    endSession() {
        super.endSession();
        GameState.camel.unspentXp += this._xpGained;
    }
}
class SpaSession extends GymSession {
    _skill;
    _startTime = 0;
    _staiminaGained = 0;
    constructor(_skill) {
        super();
        this._skill = _skill;
    }
    startSession() {
        this._startTime = GameState.secondsPassed;
        super.startSession();
    }
    endSession() {
        super.endSession();
        this._staiminaGained = GameState.secondsPassed - this._startTime;
        if (this._staiminaGained < this._skill.level) {
            GameState.camel.unspentXp += this._staiminaGained;
        }
        else {
            GameState.camel.unspentXp += this._skill.level;
        }
    }
}
class Gym {
    static getTreadmillSession(camel) {
        return new TrainSession(camel.sprintSpeed, camel.stamina.level);
    }
    getSpaSession(camel) {
        if (GameState.cashMoney >= 50) {
            GameState.cashMoney += -50;
            return new SpaSession(camel.stamina);
        }
    }
}
class LoadingScreen {
    _navigator;
    constructor(_navigator) {
        this._navigator = _navigator;
        this._canvas = CanvasService.getCanvasByName(CanvasNames.LoadingScreen);
        this._btnService = new CanvasBtnService(this._canvas, this._navigator);
    }
    _canvas;
    _btnService;
    startFreshGame = () => {
        GameState.Reset();
        this._navigator.requestPageNavigation(Page.mapOverview, () => PopupService.drawAlertPopup("Welcome to Private Bates' Camel Turismo Management 2024!"));
    };
    loadSavedGame = () => {
        GameState.LoadIfExists();
        this._navigator.requestPageNavigation(Page.mapOverview, () => PopupService.drawAlertPopup("Welcome back to Private Bates' Camel Turismo Management 2024!"));
    };
    drawLoadingScreen() {
        const ctx = this._canvas.getContext("2d");
        const img = new Image();
        img.src = './graphics/camel-oasis.jpg';
        ctx.drawImage(img, 0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const radius = 50;
        const backgroundColour = '#cc807a';
        const borderColour = '#f2ada7';
        const textColour = '#fff';
        if (GameState.GetExists()) {
            this._btnService.createBtn(GlobalStaticConstants.innerWidth / 6, 8 * GlobalStaticConstants.innerHeight / 10, GlobalStaticConstants.innerWidth / 4, GlobalStaticConstants.innerHeight / 10, radius, backgroundColour, borderColour, textColour, this.startFreshGame, 'New game');
            this._btnService.createBtn(7 * GlobalStaticConstants.innerWidth / 12, 8 * GlobalStaticConstants.innerHeight / 10, GlobalStaticConstants.innerWidth / 4, GlobalStaticConstants.innerHeight / 10, radius, backgroundColour, borderColour, textColour, this.loadSavedGame, 'Load saved game');
        }
        else {
            this._btnService.createBtn(GlobalStaticConstants.innerWidth / 3, 8 * GlobalStaticConstants.innerHeight / 10, GlobalStaticConstants.innerWidth / 3, GlobalStaticConstants.innerHeight / 10, radius, backgroundColour, borderColour, textColour, this.startFreshGame, 'New game');
        }
    }
}
class CamelSkillCommands {
    levelUpSkill(camel, skill) {
        const toNextLevel = skill.getXpToNextLevel();
        if (camel.unspentXp >= toNextLevel) {
            skill.addXp(toNextLevel);
            camel.unspentXp -= toNextLevel;
        }
    }
}
class CamelSkillComponent {
    _camelSkillDrawing;
    _camelSkillCommands;
    constructor(_camelSkillDrawing, _camelSkillCommands) {
        this._camelSkillDrawing = _camelSkillDrawing;
        this._camelSkillCommands = _camelSkillCommands;
    }
    load() {
        CanvasService.showCanvas(CanvasNames.CamelManagement);
        this._camelSkillDrawing.drawPage(GameState.camel, (camelSkill) => this.levelUpSkill(GameState.camel, camelSkill));
    }
    levelUpSkill = (camel, skill) => {
        this._camelSkillCommands.levelUpSkill(camel, skill);
        this.load();
    };
}
class CamelSkillDrawing {
    _navigator;
    constructor(_navigator) {
        this._navigator = _navigator;
        this._canvas = CanvasService.getCanvasByName(CanvasNames.CamelManagement);
        this._ctx = this._canvas.getContext('2d');
        this._btnService = new CanvasBtnService(this._canvas, _navigator);
    }
    _ctx;
    _canvas;
    _btnService;
    drawPage(camel, levelUpSkillFunc) {
        this._ctx.save();
        this._ctx.font = '12pt Garamond';
        this._ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        this._btnService.removeEventListeners();
        const maxX = this._canvas.width / GlobalStaticConstants.devicePixelRatio;
        this.drawOverview(camel, maxX / 40, maxX / 40);
        this.drawSkills(camel, levelUpSkillFunc);
        this._btnService.drawBackButton(Page.mapOverview);
        this._ctx.restore();
    }
    drawOverview(camel, x, y) {
        const nameText = `${camel.name}`;
        const nameTextLength = this._ctx.measureText(nameText).width;
        this._ctx.fillText(nameText, x, y);
        this._ctx.fillText(`XP: ${camel.unspentXp}`, x + nameTextLength + 20, y);
    }
    drawSkills(camel, levelUpSkillFunc) {
        const maxX = this._canvas.width / GlobalStaticConstants.devicePixelRatio;
        const xPadding = maxX / 40;
        const yPadding = maxX / 40;
        const height = 40;
        this.drawSkill(camel.agility, xPadding, yPadding + height, levelUpSkillFunc);
        this.drawSkill(camel.sprintSpeed, xPadding, yPadding + 2 * height, levelUpSkillFunc);
        this.drawSkill(camel.stamina, xPadding, yPadding + 3 * height, levelUpSkillFunc);
        this.drawSkillStar([camel.agility, camel.sprintSpeed, camel.stamina], maxX / 2, yPadding + 9 * height);
    }
    drawSkill(skill, x, y, levelUpSkillFunc) {
        const level = skill.level;
        const xpToNextLevel = skill.getXpToNextLevel();
        this._ctx.fillText(`${skill.name}: ${level}`, x, y);
        this._ctx.fillText(`XP to next: ${xpToNextLevel}`, x + 150, y);
        this._btnService.createBtn(x + 270, y - 20, 30, 30, 0, '#cc807a', '#f2ada7', '#fff', () => levelUpSkillFunc(skill), `+`);
    }
    drawSkillStar(skills, x, y) {
        const maxRadius = 99;
        // Center for small screens, otherwise offset from edge
        x = x > 2 * maxRadius ? 2 * maxRadius : x;
        const numberOfSkills = skills.length;
        let points = [];
        // Draw ring
        this._ctx.strokeStyle = GlobalStaticConstants.mediumColour;
        this._ctx.beginPath();
        this._ctx.arc(x, y, maxRadius, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.lineWidth = 2;
        this._ctx.strokeStyle = "black";
        this._ctx.fillStyle = "black";
        skills.forEach((s, i) => {
            // Calculate point
            const angle = 2 * Math.PI * i / numberOfSkills;
            const radius = maxRadius * s.level / 100;
            const spotX = (r) => x + r * Math.cos(angle);
            const spotY = (r) => y + r * Math.sin(angle);
            points?.push({ x: spotX(radius), y: spotY(radius) });
            // Draw point
            this._ctx.beginPath();
            this._ctx.moveTo(spotX(radius), spotY(radius));
            this._ctx.arc(spotX(radius), spotY(radius), 2, 0, 2 * Math.PI);
            this._ctx.stroke();
            this._ctx.fill();
            // Draw label
            const labelLength = this._ctx.measureText(s.name).width + 10;
            this._ctx.fillText(s.name, spotX(1) < x ? spotX(maxRadius) - 5 - labelLength : spotX(maxRadius) + 5, spotY(maxRadius));
        });
        // Draw and fill shape
        this._ctx.beginPath();
        points.forEach(p => {
            this._ctx.lineTo(p.x, p.y);
        });
        this._ctx.lineTo(points[0].x, points[0].y);
        this._ctx.stroke();
        this._ctx.fillStyle = GlobalStaticConstants.mediumColour;
        this._ctx.fill();
        // Draw center
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
        this._ctx.arc(x, y, 1, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.fillStyle = "black";
        this._ctx.fill();
    }
}
class CamelSkillQueries {
    getSkills(camel) {
        return [camel.agility, camel.sprintSpeed, camel.stamina];
    }
}
var CamelTemperament;
(function (CamelTemperament) {
    CamelTemperament[CamelTemperament["Calm"] = 0] = "Calm";
    CamelTemperament[CamelTemperament["Mild"] = 1] = "Mild";
    CamelTemperament[CamelTemperament["Temperamental"] = 2] = "Temperamental";
    CamelTemperament[CamelTemperament["Aggressive"] = 3] = "Aggressive";
})(CamelTemperament || (CamelTemperament = {}));
var InitCamelQuality;
(function (InitCamelQuality) {
    InitCamelQuality[InitCamelQuality["None"] = 0] = "None";
    InitCamelQuality[InitCamelQuality["Low"] = 1] = "Low";
    InitCamelQuality[InitCamelQuality["Medium"] = 2] = "Medium";
    InitCamelQuality[InitCamelQuality["High"] = 3] = "High";
    InitCamelQuality[InitCamelQuality["Cpu1"] = 4] = "Cpu1";
    InitCamelQuality[InitCamelQuality["Cpu2"] = 5] = "Cpu2";
    InitCamelQuality[InitCamelQuality["Cpu3"] = 6] = "Cpu3";
    InitCamelQuality[InitCamelQuality["Cpu4"] = 7] = "Cpu4";
    InitCamelQuality[InitCamelQuality["Cpu5"] = 8] = "Cpu5";
})(InitCamelQuality || (InitCamelQuality = {}));
class Camel {
    id;
    constructor(id, quality) {
        this.id = id;
        if (quality === InitCamelQuality.None) {
            return;
        }
        const sprintSpeed = Math.ceil(10 * (quality + 1) / 2 * (1 + Math.random()));
        const agility = Math.ceil(Math.random() * 10 * (quality + 1));
        const stamina = Math.ceil(Math.random() * 10 * (quality + 1));
        this.agility.level = agility;
        this.sprintSpeed.level = sprintSpeed;
        this.stamina.level = stamina;
    }
    colour = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    agility = new CamelSkill('Agility');
    sprintSpeed = new CamelSkill('SprintSpeed');
    stamina = new CamelSkill('Stamina');
    name = this.generateName();
    temperament = this.generateTemperament();
    unspentXp = 0;
    generateName() {
        const adjectives = [
            "Sandy", "Dusty", "Golden", "Majestic", "Spotted",
            "Whirling", "Blazing", "Silent", "Radiant", "Breezy",
            "Amber", "Crimson", "Harmony", "Marble", "Opal",
            "Princess", "Sahara", "Shadow", "Tawny", "Whisper"
        ];
        const nouns = [
            "Desert", "Oasis", "Pyramid", "Mirage", "Nomad",
            "Sunset", "Sahara", "Dune", "Caravan", "Cactus",
            "Jewel", "Moon", "Oracle", "Sphinx", "Spirit",
            "Sultan", "Talisman", "Treasure", "Zephyr", "Zodiac"
        ];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        return randomAdjective + " " + randomNoun;
    }
    generateTemperament() {
        if (Math.random() < 0.25) {
            return CamelTemperament.Aggressive;
        }
        else if (Math.random() < 0.5) {
            return CamelTemperament.Temperamental;
        }
        else if (Math.random() < 0.75) {
            return CamelTemperament.Calm;
        }
        else {
            return CamelTemperament.Mild;
        }
    }
}
class ManagementStartup {
    _musicService;
    _navigatorService;
    constructor(_musicService, _navigatorService) {
        this._musicService = _musicService;
        this._navigatorService = _navigatorService;
    }
    registerComponents() {
        const camelSkillDrawing = new CamelSkillDrawing(this._navigatorService);
        const camelSkillCommands = new CamelSkillCommands();
        camelSkillComponent = new CamelSkillComponent(camelSkillDrawing, camelSkillCommands);
        const selectCamelFunc = (camel) => {
            GameState.camel = camel;
            this._navigatorService.requestPageNavigation(Page.management);
        };
        camelManagementSelectComponent = new CamelSelectComponent(selectCamelFunc);
    }
}
class CamelSelectComponent {
    _selectFunc;
    constructor(_selectFunc) {
        this._selectFunc = _selectFunc;
    }
    load() {
        const camelSelectSection = document.getElementById('camel-select');
        if (!camelSelectSection) {
            throw new Error('No camel select element');
        }
        camelSelectSection.style.display = 'flex';
        this.createSelectList(camelSelectSection);
    }
    createSelectList(camelSelectSection) {
        const heading = document.createElement('h1');
        heading.appendChild(document.createTextNode('Choose camel'));
        camelSelectSection.appendChild(heading);
        const list = document.createElement('ul');
        camelSelectSection.appendChild(list);
        GameState.camels.forEach(camel => this.addCamelToList(list, camel));
    }
    addCamelToList(list, camel) {
        const listItem = document.createElement('li');
        listItem.onclick = () => this._selectFunc(camel);
        const camelPictureContainer = document.createElement('div');
        camelPictureContainer.classList.add('camel__picture-container');
        const camelPicture = document.createElement('div');
        camelPicture.classList.add('camel__picture');
        camelPicture.style.color = camel.colour;
        camelPicture.style.backgroundColor = camel.colour;
        camelPictureContainer.appendChild(camelPicture);
        const camelName = document.createElement('div');
        camelName.classList.add('camel__name');
        camelName.appendChild(document.createTextNode(camel.name));
        const camelStats = document.createElement('div');
        camelStats.classList.add('camel__stats');
        camelStats.appendChild(document.createTextNode(`Spd: ${camel.sprintSpeed.level} Sta: ${camel.stamina.level} Agl: ${camel.agility.level}`));
        const camelSelect = document.createElement('button');
        camelSelect.classList.add('camel__select');
        camelSelect.classList.add('chevron');
        listItem.appendChild(camelPictureContainer);
        listItem.appendChild(camelName);
        listItem.appendChild(camelStats);
        listItem.appendChild(camelSelect);
        list.appendChild(listItem);
    }
}
class MapOverview {
    static showMap() {
        CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
        CanvasService.showCanvas(CanvasNames.MapOverview);
        GameState.Save();
    }
    static hideMap() {
        CanvasService.hideCanvas(CanvasNames.MapOverview);
    }
    static getMousePosition(event) {
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }
    static renderMap() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        const ctx = canvas?.getContext("2d");
        if (!ctx)
            return;
        const scaleToWidth = GlobalStaticConstants.innerHeight > 0.815 * GlobalStaticConstants.innerWidth;
        let rect = {
            x: 0,
            y: 0,
            width: GlobalStaticConstants.innerHeight / 0.815,
            height: GlobalStaticConstants.innerHeight
        };
        if (scaleToWidth) {
            rect = {
                x: 0,
                y: 0,
                width: GlobalStaticConstants.innerWidth,
                height: 0.815 * GlobalStaticConstants.innerWidth
            };
        }
        const img = new Image();
        img.src = './graphics/camelmap-nobreed-v3.svg';
        ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);
        canvas.addEventListener('click', (event) => {
            const mousePosition = this.getMousePosition(event);
            // Hire
            if (mousePosition.x < rect.width / 3 && mousePosition.y < 7 * rect.height / 16) {
                CanvasService.showAllCanvas();
                this.hideMap();
                CashMoneyService.drawCashMoney(CanvasService.getCanvasByName(CanvasNames.Recruitment).getContext("2d"));
                CanvasService.bringCanvasToTop(CanvasNames.Recruitment);
            }
            // Gym
            else if (mousePosition.x > 11 * rect.width / 32 && mousePosition.x < 19 * rect.width / 32 && mousePosition.y < 3 * rect.height / 8) {
                if (!GameState.camel) {
                    PopupService.drawAlertPopup("You cannot got to the gym without a camel, you idiot!");
                    return;
                }
                CanvasService.showAllCanvas();
                this.hideMap();
                CanvasService.bringCanvasToTop(CanvasNames.GymBackground);
                CanvasService.bringCanvasToTop(CanvasNames.GymCamel);
                (new GymDrawing(navigatorService)).drawGym();
            }
            else if (mousePosition.x > 3 * rect.width / 8 && mousePosition.x < 19 * rect.width / 32 && mousePosition.y > 7 * rect.height / 16) {
                if (!!GameState.camel && GameState.camel.agility.level > 20) {
                    GameState.cashMoney += 1000;
                    CashMoneyService.drawCashMoney(ctx);
                }
            }
            // Race
            else if (mousePosition.x < rect.width / 3 && mousePosition.y > rect.height / 2) {
                if (!GameState.camel) {
                    PopupService.drawAlertPopup("You cannot enter a race without a camel, you idiot!");
                    return;
                }
                navigatorService.requestPageNavigation(Page.raceSelection);
            }
            // Management
            else if (mousePosition.x > 19 * rect.width / 32 && mousePosition.x < rect.width && mousePosition.y > 3 * rect.height / 16 && mousePosition.y < 9 * rect.height / 16) {
                if (!GameState.camel) {
                    PopupService.drawAlertPopup("You cannot manage camel skills without a camel, you idiot!");
                    return;
                }
                navigatorService.requestPageNavigation(Page.managementSelect);
            }
        }, false);
        CashMoneyService.drawCashMoney(ctx);
    }
}
class NavigatorService {
    _pageLoaded = false;
    _currentPage = Page.loading;
    _postNavigationFunc = () => { };
    requestPageNavigation(page, postNavigationFunc) {
        if (!this.canNavigate(page)) {
            return;
        }
        this._postNavigationFunc = postNavigationFunc ?? (() => { });
        this._pageLoaded = false;
        this._currentPage = page;
    }
    doNavigation() {
        if (this._pageLoaded === false) {
            CanvasService.hideAllCanvas();
            const camelSelectSection = document.getElementById('camel-select');
            if (!!camelSelectSection) {
                camelSelectSection.innerHTML = '';
                camelSelectSection.style.display = 'none';
            }
            switch (this._currentPage) {
                case Page.loading:
                    this.navigateToLoading();
                    break;
                case Page.mapOverview:
                    this.navigateToOverview();
                    break;
                case Page.management:
                    camelSkillComponent.load();
                    break;
                case Page.raceSelection:
                    raceSelection.load();
                    break;
                case Page.race:
                    raceComponent.load();
                    break;
                case Page.raceCamelSelect:
                    raceCamelSelectComponent.load();
                    break;
                case Page.managementSelect:
                    camelManagementSelectComponent.load();
                    break;
            }
            this._postNavigationFunc();
            this._pageLoaded = true;
        }
    }
    canNavigate(requestedPage) {
        switch (requestedPage) {
            case Page.raceSelection:
                return !!GameState.camel;
        }
        return true;
    }
    navigateToLoading() {
        CanvasService.showCanvas(CanvasNames.LoadingScreen);
        loadingScreen.drawLoadingScreen();
    }
    navigateToOverview() {
        MapOverview.showMap();
        MapOverview.renderMap();
    }
}
var Page;
(function (Page) {
    Page[Page["loading"] = 0] = "loading";
    Page[Page["mapOverview"] = 1] = "mapOverview";
    Page[Page["management"] = 2] = "management";
    Page[Page["managementSelect"] = 3] = "managementSelect";
    Page[Page["race"] = 4] = "race";
    Page[Page["raceCamelSelect"] = 5] = "raceCamelSelect";
    Page[Page["raceSelection"] = 6] = "raceSelection";
})(Page || (Page = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["Easy"] = 0] = "Easy";
    Difficulty[Difficulty["Normal"] = 1] = "Normal";
    Difficulty[Difficulty["Hard"] = 2] = "Hard";
})(Difficulty || (Difficulty = {}));
class LeaderboardService {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
        this._camelCubeService = new CubeService(ctx);
    }
    _camelCubeService;
    sortCamels(a, b) {
        if (b.finalPosition && !a.finalPosition) {
            return 1;
        }
        if (!b.finalPosition && a.finalPosition) {
            return -1;
        }
        if (!b.finalPosition && !a.finalPosition) {
            return b.completionPercentage - a.completionPercentage;
        }
        return a.finalPosition - b.finalPosition;
    }
    drawLeaderboard() {
        const cols = Math.ceil(race.racingCamels.length / 5);
        let height = 0;
        race.racingCamels.sort((a, b) => this.sortCamels(a, b)).forEach(racingCamel => {
            this.drawCamel(racingCamel, height);
            height -= 5;
        });
    }
    isCamelUserOwned(racingCamel) {
        return racingCamel == GameState.camel;
    }
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    getProgressBarColour(color1, color2, weight) {
        var w1 = weight;
        var w2 = 1 - w1;
        var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
            Math.round(color1[1] * w1 + color2[1] * w2),
            Math.round(color1[2] * w1 + color2[2] * w2)];
        return "#" + this.componentToHex(rgb[0]) + this.componentToHex(rgb[1]) + this.componentToHex(rgb[2]);
    }
    drawCamel(camel, heightOffset) {
        const x = 5.5;
        const y = -6.5;
        const camelService = new CanvasCamelService(this.ctx);
        camelService.drawCamelScreenCoords(GlobalStaticConstants.innerWidth - 150, 70 - heightOffset * 10, 10, camel.camel.colour);
        this.ctx.fillStyle = '#96876e';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`${camel.camel.sprintSpeed.level}:${camel.agility}:${camel.stamina}:${camel.currentSpeed}`, GlobalStaticConstants.innerWidth - 130, 70 - heightOffset * 10);
        if (this.isCamelUserOwned(camel.camel)) {
            this.ctx.fillStyle = '#96876e';
            this.ctx.fillText(camel.camel.name, GlobalStaticConstants.innerWidth - 100, 59 - heightOffset * 10);
        }
        this.ctx.fillStyle = '#000';
        this.ctx.font = '10pt Garamond';
        const completionPercentage = Math.min(1, Math.round(camel.completionPercentage * 100) / 100);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fff';
        this.ctx.roundRect(GlobalStaticConstants.innerWidth - 100, 70 - heightOffset * 10, 80, 10, 5);
        this.ctx.fill();
        this.ctx.closePath();
        const colour = this.getProgressBarColour([255, 238, 150], [61, 204, 83], 1 - camel.completionPercentage);
        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.roundRect(GlobalStaticConstants.innerWidth - 100, 70 - heightOffset * 10, 80 * completionPercentage, 10, 5);
        this.ctx.fill();
        this.ctx.closePath();
    }
}
class RaceComponent {
    _raceDrawing;
    _raceManagement;
    _leaderboardService;
    _countdown;
    constructor(_raceDrawing, _raceManagement, _leaderboardService, _countdown) {
        this._raceDrawing = _raceDrawing;
        this._raceManagement = _raceManagement;
        this._leaderboardService = _leaderboardService;
        this._countdown = _countdown;
    }
    load() {
        CanvasService.showCanvas(CanvasNames.RaceBackground);
        CanvasService.showCanvas(CanvasNames.RaceCamel);
        CanvasService.showCanvas(CanvasNames.Countdown);
        CanvasService.bringCanvasToTop(CanvasNames.RaceBackground);
        CanvasService.bringCanvasToTop(CanvasNames.RaceCamel);
        CanvasService.bringCanvasToTop(CanvasNames.Countdown);
    }
    handleRaceLoop(timeStamp) {
        if (!race || race.raceState === RaceState.none) {
            return;
        }
        if (race.raceState === RaceState.inProgress) {
            this._raceManagement.simulateRaceStep(race);
            this._raceDrawing.drawCamels(race);
            this._leaderboardService.drawLeaderboard();
        }
        if (race.raceState === RaceState.triggered) {
            this._raceDrawing.drawRaceCourse(race);
            race.triggeredTimestamp = timeStamp;
            this._raceDrawing.drawCamels(race);
            race.raceState = RaceState.initialised;
        }
        if (race.raceState === RaceState.initialised) {
            this._countdown.displayCountdown(8000 - (timeStamp - race.triggeredTimestamp));
            if (timeStamp - race.triggeredTimestamp >= 7500) {
                CanvasService.hideCanvas(CanvasNames.Countdown);
                this._raceManagement.startRace(race);
            }
        }
        if (race.raceState === RaceState.finished) {
            this._raceManagement.handleFinishedRace(race);
        }
    }
}
class RaceDrawing {
    constructor() {
        this._backgroundCanvas = CanvasService.getCanvasByName(CanvasNames.RaceBackground);
        this._camelCanvas = CanvasService.getCanvasByName(CanvasNames.RaceCamel);
        this.backgroundCubeService = new CubeService(this._backgroundCanvas.getContext("2d"));
        this.camelCubeService = new CubeService(this._camelCanvas.getContext("2d"));
    }
    _backgroundCanvas;
    _camelCanvas;
    backgroundCubeService;
    camelCubeService;
    drawRaceCourse(race) {
        const ctx = this._backgroundCanvas.getContext("2d");
        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const canvasColour = '#C2B280';
        const lighterColour = '#d8bd80';
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (race.track.filter(o => o[0] === i && o[1] === j).length > 0) {
                    // If is a race track
                    const height = -Math.random() / 6;
                    this.backgroundCubeService.drawCube(i, j, GlobalStaticConstants.baseCubeSize, '#938b71', height);
                }
                else {
                    const height = Math.random() / 3;
                    const colour = height < 0.1 ? canvasColour : lighterColour;
                    this.backgroundCubeService.drawCube(i, j, GlobalStaticConstants.baseCubeSize, colour, height);
                    const shouldIncludeObject = Math.floor(Math.random() * 10) === 4;
                    if (shouldIncludeObject) {
                        // Randomize object
                        const random = Math.floor(Math.random() * 10);
                        if (random < 5) {
                            this.drawPalmTree(i, j, height);
                        }
                        else if (random < 9) {
                            this.drawRocks(i, j, height);
                        }
                        else {
                            this.drawStaticCamel(i, j, height);
                        }
                    }
                }
            }
        }
    }
    drawStaticCamel(newXCoord, newYCoord, height) {
        new CanvasCamelService(this._backgroundCanvas.getContext("2d"))
            .drawCamelIsoCoords(newXCoord, newYCoord + 0.5, GlobalStaticConstants.baseCubeSize / 5, '#d8843b', height);
    }
    drawRocks(i, j, height) {
        var xOffset = (Math.random() - 0.5) * 0.5;
        var yOffset = (Math.random() - 0.5) * 0.5;
        const size = GlobalStaticConstants.baseCubeSize / 6;
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#555555', height);
    }
    drawPalmTree(i, j, height) {
        var xOffset = (Math.random() - 0.5) * 0.5;
        var yOffset = (Math.random() - 0.5) * 0.5;
        const size = GlobalStaticConstants.baseCubeSize / 10;
        this.backgroundCubeService.drawCube(i - 0.5 + xOffset, j + yOffset, size, '#3e6549', height + 5);
        this.backgroundCubeService.drawCube(i - 0.4 + xOffset, j + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i - 0.3 + xOffset, j + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i - 0.2 + xOffset, j + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i - 0.1 + xOffset, j + yOffset, size, '#3e6549', height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.5 + yOffset, size, '#3e6549', height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.4 + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.3 + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.2 + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.1 + yOffset, size, '#3e6549', height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 1);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 2);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 3);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 4);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.1 + yOffset, size, '#3e6549', height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.2 + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.3 + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.4 + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.5 + yOffset, size, '#3e6549', height + 5);
        this.backgroundCubeService.drawCube(i + 0.1 + xOffset, j + yOffset, size, '#3e6549', height + 5);
        this.backgroundCubeService.drawCube(i + 0.2 + xOffset, j + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i + 0.3 + xOffset, j + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i + 0.4 + xOffset, j + yOffset, size, '#3e6549', height + 6);
        this.backgroundCubeService.drawCube(i + 0.5 + xOffset, j + yOffset, size, '#3e6549', height + 5);
    }
    drawCamels(race) {
        const ctx = this._camelCanvas.getContext("2d");
        ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        race.racingCamels.forEach(camel => this.drawCamel(camel, race, GlobalStaticConstants.baseCubeSize / 5));
    }
    drawCamel(camel, race, size) {
        const numberOfRaceTrackCoords = race.track.length;
        const completionPercentage = Math.min(camel.completionPercentage, 1);
        const currectCoordIndex = Math.floor(completionPercentage * numberOfRaceTrackCoords);
        const currentCoordPercentage = currectCoordIndex / numberOfRaceTrackCoords;
        const nextCoordPercentage = (currectCoordIndex + 1) / numberOfRaceTrackCoords;
        const percentageTowardsNextCoord = (completionPercentage - currentCoordPercentage) /
            (nextCoordPercentage - currentCoordPercentage);
        const currentCoord = currectCoordIndex < numberOfRaceTrackCoords ? race.track[currectCoordIndex] : race.track[currectCoordIndex - 1];
        const nextCoord = currectCoordIndex < numberOfRaceTrackCoords - 1 ? race.track[currectCoordIndex + 1] : currentCoord;
        const movingInPositiveX = currentCoord[0] < nextCoord[0];
        const movingInNegativeX = currentCoord[0] > nextCoord[0];
        const movingInPositiveY = currentCoord[1] < nextCoord[1];
        const movingInNegativeY = currentCoord[1] > nextCoord[1];
        const offset = percentageTowardsNextCoord;
        const newXCoord = movingInPositiveX ? currentCoord[0] + offset :
            movingInNegativeX ? currentCoord[0] - offset :
                currentCoord[0];
        const newYCoord = movingInPositiveY ? currentCoord[1] + offset :
            movingInNegativeY ? currentCoord[1] - offset :
                currentCoord[1];
        if (movingInNegativeY) {
            this.drawNegativeYCamel(newXCoord, newYCoord, camel, size);
        }
        else if (movingInNegativeX) {
            this.drawNegativeXCamel(newXCoord, newYCoord, camel, size);
        }
        else if (movingInPositiveY) {
            this.drawPositiveYCamel(newXCoord, newYCoord, camel, size);
        }
        else if (movingInPositiveX) {
            this.drawPositiveXCamel(newXCoord, newYCoord, camel, size);
        }
    }
    drawNegativeYCamel(newXCoord, newYCoord, camel, size) {
        const xCoord = newXCoord + 0.25;
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1.5 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 2 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, camel.jumpHeight);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight);
    }
    drawNegativeXCamel(newXCoord, newYCoord, camel, size) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1.5 + camel.jumpHeight, -2, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 0 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 2 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 1, -1.5);
    }
    drawPositiveYCamel(newXCoord, newYCoord, camel, size) {
        const xCoord = newXCoord + 0.25;
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 2 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1.5 + camel.jumpHeight, 0);
    }
    drawPositiveXCamel(newXCoord, newYCoord, camel, size) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 0 + camel.jumpHeight, -1.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, -1.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, -0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 2 + camel.jumpHeight, -0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1.5 + camel.jumpHeight, 1.5, -1.5);
    }
}
class RaceManagement {
    _musicService;
    _raceSimulation;
    constructor(_musicService, _raceSimulation) {
        this._musicService = _musicService;
        this._raceSimulation = _raceSimulation;
    }
    addCamelToRace(camel, race) {
        const racingCamel = new RacingCamel(camel);
        race.racingCamels.push(racingCamel);
    }
    addCpuCamelsToRace(raceSize, competitorQuality, race) {
        for (let i = 0; i < raceSize; i++) {
            const competitorCamel = new Camel(++GameState.lastUsedId, competitorQuality);
            this.addCamelToRace(competitorCamel, race);
        }
    }
    createRace(raceLength, prizeCashMoney, raceSize, difficulty) {
        let competitorQuality;
        if (difficulty === Difficulty.Easy) {
            competitorQuality = InitCamelQuality.High;
        }
        else if (difficulty === Difficulty.Normal) {
            competitorQuality = InitCamelQuality.Cpu1;
        }
        else {
            competitorQuality = InitCamelQuality.Cpu5;
        }
        const trackCreator = new RaceTrackCreator();
        const track = trackCreator.CreateTrack(raceLength);
        const race = new Race(raceLength, track, prizeCashMoney);
        this.addCpuCamelsToRace(raceSize, competitorQuality, race);
        return race;
    }
    startRace(race) {
        if (race.length <= 0) {
            throw new Error('Tried to start a race with bad length');
        }
        if (race.racingCamels.length === 0) {
            throw new Error('Tried to start a race with no camels');
        }
        race.raceState = RaceState.inProgress;
        this._raceSimulation.startRace(race);
    }
    getPositionDisplay(position) {
        switch (position) {
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            default:
                return `${position}th`;
        }
    }
    simulateRaceStep(race) {
        this._raceSimulation.simulateRaceStep(race);
    }
    handleFinishedRace(race) {
        let position = race.racingCamels.filter(o => o.camel == GameState.camel)[0].finalPosition;
        position = position ??
            1 +
                race.racingCamels.sort((a, b) => b.completionPercentage - a.completionPercentage).map(o => o.camel).indexOf(GameState.camel);
        const prizeCashMoney = this.getPrizeMoney(race, position);
        GameState.cashMoney += prizeCashMoney;
        const xpGained = (race.racingCamels.length - position + 1) * 100;
        GameState.camel.unspentXp += xpGained;
        race.raceState = RaceState.none;
        this._musicService.setAudio('HomeScreenAudio');
        this._musicService.startAudio();
        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();
        PopupService.drawAlertPopup(`Congratulations, ${GameState.camel.name} finished ${this.getPositionDisplay(position)}! You won $${prizeCashMoney}, and gained ${xpGained}xp!`);
    }
    getPrizeMoney(race, position) {
        const prizePool = race.prizeCashMoney;
        if (position === 1) {
            return prizePool * 0.75;
        }
        if (position === 2) {
            return prizePool * 0.2;
        }
        if (position === 3) {
            return prizePool * 0.05;
        }
        return 0;
    }
}
class RaceSelection {
    _navigator;
    _raceManagement;
    constructor(_navigator, _raceManagement) {
        this._navigator = _navigator;
        this._raceManagement = _raceManagement;
        this._canvas = CanvasService.getCanvasByName(CanvasNames.RaceSelection);
        this._ctx = this._canvas.getContext('2d');
        this._btnService = new CanvasBtnService(this._canvas, this._navigator);
    }
    _ctx;
    _canvas;
    _btnService;
    load() {
        CanvasService.showCanvas(CanvasNames.RaceSelection);
        this.drawSelectionScreen();
    }
    drawSelectionScreen() {
        this._btnService.removeEventListeners();
        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const radius = 25;
        const enterStreetRace = () => this.selectRace(40, 100, 0, 5, Difficulty.Easy);
        const enterLocalDerby = () => this.selectRace(80, 500, 200, 8, Difficulty.Normal);
        const enterWorldCup = () => this.selectRace(100, 10000, 300, 15, Difficulty.Hard);
        const middleX = this._canvas.width / GlobalStaticConstants.devicePixelRatio / 2;
        const middleY = this._canvas.height / GlobalStaticConstants.devicePixelRatio / 2;
        this._btnService.drawBackButton(Page.mapOverview);
        this._btnService.createBtn(middleX - 400, middleY / 2, 800, 50, radius, '#cc807a', '#f2ada7', '#fff', enterStreetRace, 'Street race | Entry $0 | Prize $100');
        this._btnService.createBtn(middleX - 400, middleY, 800, 50, radius, '#debb49', '#f5d671', '#fff', enterLocalDerby, 'Local derby | Entry $200 | Prize $500');
        this._btnService.createBtn(middleX - 400, middleY * 4 / 3, 800, 50, radius, '#569929', '#7ac24a', '#fff', enterWorldCup, 'World cup | Entry $300 | Prize $10000');
        CashMoneyService.drawCashMoney(this._ctx);
    }
    selectRace(raceLength, prizeMoney, entryFee, raceSize, difficulty) {
        if (GameState.cashMoney < entryFee) {
            return;
        }
        if (GameState.cashMoney >= entryFee) {
            GameState.cashMoney -= entryFee;
        }
        PopupService.showLoading();
        // A few frames are needed to paint the loader
        window.setTimeout(() => {
            race = this._raceManagement.createRace(raceLength, prizeMoney, raceSize, difficulty);
            this._navigator.requestPageNavigation(Page.raceCamelSelect);
        }, 100);
    }
}
class RaceSimulation {
    constructor() { }
    _nextPosition = 1;
    startRace(race) {
        this._nextPosition = 1;
        race.racingCamels.forEach(x => x.startJump());
    }
    simulateRaceStep(race) {
        race.racingCamels.forEach(racingCamel => {
            if (racingCamel.finalPosition) {
                return;
            }
            racingCamel.handleJumpTick();
            // Multipliers
            const speedMultiplier = 1 / 10;
            const staminaMultiplier = 0.6;
            const agilityMultiplier = 6;
            const intelligenceMultiplier = 3;
            const finalSpeedMultiplier = 0.8;
            // Offsets
            const speedOffset = 10;
            const agilityOffset = 0;
            const staminaOffset = 10;
            const intelligenceOffset = 20;
            let speed = 0;
            const remainingDistance = race.length * (1 - racingCamel.completionPercentage);
            const completedDistance = race.length * racingCamel.completionPercentage;
            const sprintDuration = this.GetVariantNumber(6, 2);
            const sprintingSpeed = speedOffset + racingCamel.camel.sprintSpeed.level * speedMultiplier;
            const baseSpeed = 0.5 * sprintingSpeed;
            const deadSpeed = 0.25;
            const accelerationRate = agilityOffset + agilityMultiplier * racingCamel.agility / 100;
            const decelerationRate = (1 + racingCamel.currentSpeed / 10) / ((racingCamel.stamina + staminaOffset) * staminaMultiplier);
            const baseInconsistancyRate = intelligenceMultiplier + intelligenceOffset; // TODO new skill just dropped?
            let inconsistancyRate = baseInconsistancyRate * racingCamel.completionPercentage / 10;
            let form = 0;
            if (racingCamel.camel.temperament === CamelTemperament.Aggressive) {
                // Initial sprint
                const maxSprintSpeedReached = Math.min((1 + sprintDuration) * accelerationRate, sprintingSpeed);
                if (completedDistance < sprintDuration) {
                    speed = Math.min((1 + completedDistance) * accelerationRate, sprintingSpeed);
                }
                else {
                    const distanceSinceSprint = completedDistance - sprintDuration;
                    speed = Math.min(sprintingSpeed, maxSprintSpeedReached) - distanceSinceSprint * decelerationRate;
                }
            }
            else {
                speed = Math.min((1 + completedDistance) * accelerationRate, // initial acceleration
                baseSpeed, // top speed
                baseSpeed - completedDistance * decelerationRate); // deceleration
                // Final sprint
                if (remainingDistance < sprintDuration) {
                    speed = Math.max(speed, Math.min(sprintDuration - remainingDistance * accelerationRate, // sprint acceleration
                    sprintingSpeed)); // top speed
                }
            }
            // Now we spice things up
            const bias = speed === deadSpeed ? inconsistancyRate / 40 : 0;
            racingCamel.form += this.GetVariantNumber(bias, inconsistancyRate / 10);
            racingCamel.form *= 0.95;
            speed += form;
            speed = Math.max(speed, deadSpeed); // still walking
            speed *= finalSpeedMultiplier;
            racingCamel.currentSpeed = speed;
            const newCompletedDistance = completedDistance + GameState.secondsPassed * speed;
            racingCamel.completionPercentage = newCompletedDistance / race.length;
            if (racingCamel.completionPercentage >= 1) {
                racingCamel.finalPosition = this._nextPosition++;
                if (race.racingCamels.filter(o => o.finalPosition).length >= 3) {
                    race.raceState = RaceState.finished;
                    return;
                }
            }
        });
    }
    GetVariantNumber(value, variance) {
        return Math.round(100 * (value - variance / 2 + variance * Math.random())) / 100;
    }
}
class RaceTrackCreator {
    CreateTrack(length) {
        if (length <= 0) {
            throw new Error('Tried to create a track with invalid length');
        }
        const allCoords = [];
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                allCoords.push([i, j]);
            }
        }
        let track = [];
        while (track.length !== length) {
            track = [];
            let trackToAddCoord = allCoords[Math.floor(Math.random() * allCoords.length)];
            track.push(trackToAddCoord);
            for (var i = 0; i < length; i++) {
                const possibleMoves = allCoords
                    .filter(o => Math.abs(trackToAddCoord[0] - o[0]) + Math.abs(trackToAddCoord[1] - o[1]) === 1);
                const refinedPossibleMoves = [];
                possibleMoves.forEach((move) => {
                    const trackIntersections = track
                        .filter(o => Math.abs(move[0] - o[0]) + Math.abs(move[1] - o[1]) === 1)
                        .length;
                    if (trackIntersections <= 1) {
                        refinedPossibleMoves.push(move);
                    }
                });
                if (refinedPossibleMoves.length === 0) {
                    break;
                }
                trackToAddCoord = refinedPossibleMoves[Math.floor(Math.random() * refinedPossibleMoves.length)];
                track.push(trackToAddCoord);
            }
        }
        return Array.from(track);
    }
}
class RacingStartup {
    _musicService;
    _navigatorService;
    constructor(_musicService, _navigatorService) {
        this._musicService = _musicService;
        this._navigatorService = _navigatorService;
    }
    registerComponents() {
        const raceSimulation = new RaceSimulation();
        const raceManagement = new RaceManagement(this._musicService, raceSimulation);
        this.registerRaceCamelSelectComponent(raceManagement);
        this.registerRaceSelection(raceManagement);
        this.registerRaceComponent(raceManagement);
    }
    registerRaceCamelSelectComponent(raceManagement) {
        const selectRaceCamelFunc = (camel) => {
            GameState.camel = camel;
            raceManagement.addCamelToRace(camel, race);
            this._navigatorService.requestPageNavigation(Page.race);
            this._musicService.setAudio("RaceAudio");
            this._musicService.startAudio();
            race.raceState = RaceState.triggered;
        };
        raceCamelSelectComponent = new CamelSelectComponent(selectRaceCamelFunc);
    }
    registerRaceSelection(raceManagement) {
        raceSelection = new RaceSelection(this._navigatorService, raceManagement);
    }
    registerRaceComponent(raceManagement) {
        const leaderboardService = new LeaderboardService(CanvasService.getCanvasByName(CanvasNames.RaceCamel).getContext("2d"));
        const raceDrawing = new RaceDrawing();
        const countdown = new Countdown();
        raceComponent = new RaceComponent(raceDrawing, raceManagement, leaderboardService, countdown);
    }
}
class Countdown {
    constructor() {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.Countdown);
        this._ctx = this._canvas.getContext('2d');
    }
    _ctx;
    _canvas;
    displayCountdown(seconds) {
        this._ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const middleX = this._canvas.width / GlobalStaticConstants.devicePixelRatio / 2;
        const middleY = this._canvas.height / GlobalStaticConstants.devicePixelRatio / 2;
        this._ctx.font = "240px Garamond";
        this._ctx.fillText(Math.floor(seconds / 1000).toString(), middleX - 30, middleY);
    }
}
var RaceState;
(function (RaceState) {
    RaceState[RaceState["none"] = 0] = "none";
    RaceState[RaceState["triggered"] = 1] = "triggered";
    RaceState[RaceState["initialised"] = 2] = "initialised";
    RaceState[RaceState["inProgress"] = 3] = "inProgress";
    RaceState[RaceState["finished"] = 4] = "finished";
})(RaceState || (RaceState = {}));
class Race {
    length;
    track;
    prizeCashMoney;
    constructor(length, track, prizeCashMoney) {
        this.length = length;
        this.track = track;
        this.prizeCashMoney = prizeCashMoney;
    }
    racingCamels = [];
    raceState = RaceState.none;
    winner;
    triggeredTimestamp = 0;
}
class RacingCamel {
    camel;
    constructor(camel) {
        this.camel = camel;
        this._initialVelocity = 5 + (this.camel.agility.level / 10);
        this.stamina = this.camel.stamina.level;
        this.agility = this.camel.agility.level;
    }
    finalPosition;
    completionPercentage = 0;
    stamina = 0;
    agility = 0;
    currentSpeed = 0;
    form = 0;
    _jumpHeight = 0;
    get jumpHeight() {
        return this._jumpHeight;
    }
    _gravityAcceleration = 9.81;
    _scaleFactor = 20;
    _initialVelocity = 0;
    _currentVelocity = 0;
    startJump() {
        this._currentVelocity = this._initialVelocity;
    }
    handleJumpTick() {
        if (this.completionPercentage >= 1) {
            this._jumpHeight = 0;
            this._currentVelocity = 0;
            return;
        }
        if (this._currentVelocity == 0) {
            // Have to start the jump
            return;
        }
        this._jumpHeight += this._currentVelocity / this._scaleFactor;
        this._currentVelocity += -(this._gravityAcceleration) / this._scaleFactor;
        if (this._jumpHeight < 0) {
            this._jumpHeight = 0;
            this._currentVelocity = 0;
        }
        // Remove
        if (this._jumpHeight == 0) {
            this.startJump();
        }
    }
}
class RecruitmentService {
    _navigator;
    constructor(_navigator) {
        this._navigator = _navigator;
        this._canvas = CanvasService.getCanvasByName(CanvasNames.Recruitment);
        this._ctx = this._canvas.getContext('2d');
        this._camelCubeService = new CubeService(this._ctx);
        this.drawInitCanvas();
    }
    _canvas;
    _ctx;
    _camelCubeService;
    _recruitedCamel = false;
    handleEvent = () => {
        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();
        document.removeEventListener("redirectToMap", this.handleEvent);
    };
    leaveRecruitmentArea = () => {
        document.addEventListener("redirectToMap", this.handleEvent, false);
    };
    validateEnoughCashMoney(cost) {
        return GameState.cashMoney - cost >= 0;
    }
    leaveRecruitmentAreaIfSuccessfulRecruitment = () => {
        if (this._recruitedCamel) {
            this._recruitedCamel = false;
            this.leaveRecruitmentArea();
        }
    };
    tryBuyCamel(cost) {
        if (!this.validateEnoughCashMoney(cost)) {
            PopupService.drawAlertPopup('Not enough cash money!');
            return;
        }
        GameState.cashMoney = GameState.cashMoney - cost;
        const quality = cost / 100;
        GameState.camel = new Camel(++GameState.lastUsedId, quality);
        GameState.camels.push(GameState.camel);
        PopupService.drawAlertPopup(`Recruited ${GameState.camel.name}!`);
        this._recruitedCamel = true;
    }
    spendHighCashMoney = () => {
        this.tryBuyCamel(300);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    };
    spendMediumCashMoney = () => {
        this.tryBuyCamel(200);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    };
    spendLowCashMoney = () => {
        this.tryBuyCamel(100);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    };
    drawInitCanvas() {
        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const btnService = new CanvasBtnService(this._canvas, this._navigator);
        const camelService = new CanvasCamelService(this._ctx);
        const radius = 25;
        btnService.drawBackButton(Page.mapOverview);
        const camelSize = Math.round(GlobalStaticConstants.baseCubeSize * 4 / 5);
        const btnWidth = 550;
        const btnHeight = 50;
        let btnX = 240;
        let btnY = 250;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, '#cc807a', '#f2ada7', '#fff', this.spendLowCashMoney, 'Recruit lowly camel - $100');
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - 60, camelSize, '#cc807a');
        btnX = 840;
        btnY = 250;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, '#debb49', '#f5d671', '#fff', this.spendMediumCashMoney, 'Recruit mediocre camel - $200');
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - 60, camelSize, '#debb49');
        btnX = 540;
        btnY = 650;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, '#569929', '#7ac24a', '#fff', this.spendHighCashMoney, 'Recruit high camel - $300');
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - 60, camelSize, '#509124');
        CashMoneyService.drawCashMoney(this._ctx);
    }
}
class CamelSkill {
    _name;
    _initialXP;
    constructor(_name, _initialXP = 0) {
        this._name = _name;
        this._initialXP = _initialXP;
        if (_initialXP < 0) {
            throw Error('Cannot create camel skill with negative xp');
        }
        this.currentXp = _initialXP;
        this._level = this.getLevelFromXp(_initialXP);
    }
    currentXp = 0;
    _minSkillLevel = 1;
    _maxSkillLevel = 99;
    _level = 0;
    get name() {
        return this._name;
    }
    getXpRequiredForLevel(level) {
        return (level - 1) * 100;
    }
    getLevelFromXp(xp) {
        return Math.min(this._maxSkillLevel, Math.floor(xp / 100) + 1);
    }
    set level(level) {
        let flooredLevel = Math.floor(level);
        flooredLevel = Math.max(level, this._minSkillLevel);
        flooredLevel = Math.min(level, this._maxSkillLevel);
        this._level = flooredLevel;
        this.currentXp = this.getXpRequiredForLevel(flooredLevel);
    }
    get level() {
        return this._level;
    }
    getXpToNextLevel() {
        if (this._level === this._maxSkillLevel) {
            return 0;
        }
        return this.getXpRequiredForLevel(this.level + 1) - this.currentXp;
    }
    addXp(value) {
        if (value < 0) {
            throw Error('Cannot add negative xp');
        }
        this.currentXp += value;
        this._level = this.getLevelFromXp(this.currentXp);
    }
}
