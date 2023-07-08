"use strict";
var CanvasBtnService = /** @class */ (function () {
    function CanvasBtnService(canvas) {
        this.canvas = canvas;
    }
    CanvasBtnService.prototype.getMousePosition = function (event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };
    CanvasBtnService.prototype.isInside = function (pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
    };
    CanvasBtnService.prototype.createBtn = function (xStart, yStart, width, height, backgroundColour, fontColour, onclickFunction, text) {
        var _this = this;
        var rect = {
            x: xStart,
            y: yStart,
            width: width,
            height: height
        };
        // Binding the click event on the canvas
        var context = this.canvas.getContext('2d');
        this.canvas.addEventListener('click', function (event) {
            var mousePos = _this.getMousePosition(event);
            if (_this.isInside(mousePos, rect)) {
                onclickFunction();
            }
        }, false);
        context.beginPath();
        context.rect(rect.x, rect.y, rect.width, rect.height);
        context.fillStyle = backgroundColour;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.stroke();
        context.closePath();
        context.font = '30pt Kremlin Pro Web';
        context.fillStyle = fontColour;
        context.fillText(text, rect.x + rect.width / 8, rect.y + 3 * rect.height / 4, rect.x + 7 * rect.width / 8);
    };
    return CanvasBtnService;
}());
var CanvasService = /** @class */ (function () {
    function CanvasService() {
    }
    CanvasService.createCanvas = function (zIndex, name) {
        if (name === void 0) { name = "default"; }
        var canvas = document.createElement('canvas');
        canvas.setAttribute("id", "canvas-".concat(name));
        document.body.appendChild(canvas);
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.position = 'absolute';
        canvas.style.zIndex = zIndex;
        // Set actual size in memory (scaled to account for extra pixel density).
        var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);
        var ctx = canvas.getContext('2d');
        // Normalize coordinate system to use css pixels.
        ctx.scale(scale, scale);
        return canvas;
    };
    CanvasService.getCurrentCanvas = function () {
        return Array.from(document.querySelectorAll("canvas")).sort(function (c) { return +c.style.zIndex; })[0];
    };
    CanvasService.setCanvasZIndex = function (canvasName, zIndex) {
        this.getCanvasByName(canvasName).style.zIndex = "".concat(zIndex);
    };
    CanvasService.bringCanvasToTop = function (canvasName) {
        var allCanvases = Array.from(document.querySelectorAll("canvas"));
        var getMax = function (a, b) { return Math.max(a, b); };
        var maxZIndex = allCanvases === null || allCanvases === void 0 ? void 0 : allCanvases.map(function (c) { return +c.style.zIndex; }).reduce(getMax, 0);
        this.setCanvasZIndex(canvasName, maxZIndex + 1);
    };
    CanvasService.resetCanvases = function () {
        var _this = this;
        var allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(function (c) { return _this.setCanvasZIndex(c.id, 0); });
    };
    CanvasService.hideCanvas = function (canvasName) {
        this.getCanvasByName(canvasName).style.display = "none";
    };
    CanvasService.showCanvas = function (canvasName) {
        this.getCanvasByName(canvasName).style.display = "initial";
    };
    CanvasService.getCanvasByName = function (canvasName) {
        var canvas = document.querySelector("#canvas-".concat(canvasName));
        if (!canvas) {
            throw "`No canvas found with name: ${canvasName}`";
        }
        return canvas;
    };
    return CanvasService;
}());
var CubeService = /** @class */ (function () {
    function CubeService(ctx) {
        this.ctx = ctx;
    }
    CubeService.prototype.drawCube = function (coordX, coordY, sideLength, colour, height, xStart, yStart) {
        if (height === void 0) { height = 0; }
        if (xStart === void 0) { xStart = 0; }
        if (yStart === void 0) { yStart = 0; }
        var _a = ImportantService.ConvertCoordToReal(coordX, coordY, sideLength, height, xStart, yStart), x = _a.x, y = _a.y;
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
    };
    CubeService.prototype.shadeColor = function (colour, percent) {
        colour = colour.substring(1);
        var num = parseInt(colour, 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    };
    return CubeService;
}());
var ImportantService = /** @class */ (function () {
    function ImportantService() {
    }
    ImportantService.ConvertCoordToReal = function (coordX, coordY, sideLength, height, xStart, yStart) {
        if (height === void 0) { height = 0; }
        if (xStart === void 0) { xStart = 0; }
        if (yStart === void 0) { yStart = 0; }
        var xOffset = window.innerWidth / 2;
        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;
        var x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        var y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;
        return { x: x, y: y };
    };
    return ImportantService;
}());
// Time
var secondsPassed;
var oldTimeStamp = 0;
// Recruitment
var camel;
var lastUsedId = 0;
var recruitmentService;
var cashMoney = 100;
// Race
var raceCamelCanvas;
var raceBackgroundCanvas;
var raceSimulation;
var raceDrawing;
var race;
var startRace = new Event("startRace");
// Map
var map;
function init() {
    // Camel
    raceBackgroundCanvas = CanvasService.createCanvas('3', 'recruitmentCanvas');
    recruitmentService = new RecruitmentService();
    // Race
    raceBackgroundCanvas = CanvasService.createCanvas('1', 'race-background');
    raceCamelCanvas = CanvasService.createCanvas('2', 'race-camel');
    raceDrawing = new RaceDrawing(raceBackgroundCanvas, raceCamelCanvas);
    raceSimulation = new RaceSimulation();
    // Map
    var mapCanvas = CanvasService.createCanvas('4', 'map-overview');
    map = new MapOverview(mapCanvas);
    CanvasService.hideCanvas('map-overview');
    document.addEventListener("startRace", function (_) {
        race = raceSimulation.createRace(camel, 1000);
        raceSimulation.startRace(race);
        raceDrawing.drawRaceCourse();
        window.requestAnimationFrame(gameLoop);
    }, false);
}
function gameLoop(timeStamp) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;
    if (!!race && race.inProgress) {
        raceSimulation.simulateRaceStep(race);
    }
    raceDrawing.drawCamels(race);
    window.requestAnimationFrame(gameLoop);
}
window.onload = function () { init(); };
var MapOverview = /** @class */ (function () {
    function MapOverview(canvas) {
        this.canvas = canvas;
    }
    return MapOverview;
}());
var RecruitmentService = /** @class */ (function () {
    function RecruitmentService() {
        var _this = this;
        this._canvasId = 'recruitmentCanvas';
        this._recruitedCamel = false;
        this.leaveRecruitmentArea = function () {
            _this._canvas.style.zIndex = '-1';
            document.dispatchEvent(startRace);
        };
        this.leaveRecruitmentAreaIfSuccessfulRecruitment = function () {
            if (_this._recruitedCamel) {
                camel = new Camel(++lastUsedId, InitCamelQuality.High);
                _this.leaveRecruitmentArea();
            }
        };
        this.spendHighCashMoney = function () {
            _this.tryBuyCamel(300);
            _this.leaveRecruitmentAreaIfSuccessfulRecruitment();
        };
        this.spendMediumCashMoney = function () {
            _this.tryBuyCamel(200);
            _this.leaveRecruitmentAreaIfSuccessfulRecruitment();
        };
        this.spendLowCashMoney = function () {
            _this.tryBuyCamel(100);
            _this.leaveRecruitmentAreaIfSuccessfulRecruitment();
        };
        this.drawCamel = function (xCoord, yCoord, colour) {
            _this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 1.5, 0, -3);
            _this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 0, 0, -2);
            _this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 1, 0, -2);
            _this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 1, 0, -1);
            _this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 2, 0, -1);
            _this._camelCubeService.drawCube(xCoord, yCoord, 10, colour);
            _this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 1);
        };
        this._canvas = CanvasService.getCanvasByName(this._canvasId);
        this._ctx = this._canvas.getContext('2d');
        this._camelCubeService = new CubeService(this._ctx);
        this.drawInitCanvas();
    }
    RecruitmentService.prototype.goToRecruitmentArea = function () {
        this._canvas.style.zIndex = '99';
    };
    RecruitmentService.prototype.validateEnoughCashMoney = function (cost) {
        return cashMoney - cost >= 0;
    };
    RecruitmentService.prototype.tryBuyCamel = function (cost) {
        if (camel !== undefined && camel !== null) {
            // todo: change camels/allow more than one
            alert('Already recruited a camel!');
            return;
        }
        if (!this.validateEnoughCashMoney(cost)) {
            alert('Not enough cash money!');
            return;
        }
        cashMoney = cashMoney - cost;
        alert('Recruited camel!');
        this._recruitedCamel = true;
    };
    RecruitmentService.prototype.drawInitCanvas = function () {
        this._ctx.fillStyle = '#e8d7a7';
        this._ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        var btnService = new CanvasBtnService(this._canvas);
        btnService.createBtn(100, 100, 500, 100, '#fff', '#246', this.spendLowCashMoney, 'Recruit low camel');
        this.drawCamel(-5, 4, '#cc807a');
        btnService.createBtn(700, 100, 500, 100, '#fff', '#246', this.spendMediumCashMoney, 'Recruit medium camel');
        this.drawCamel(1, -2, '#debb49');
        btnService.createBtn(350, 400, 500, 100, '#fff', '#246', this.spendHighCashMoney, 'Recruit high camel');
        this.drawCamel(3.5, 7.5, '#509124');
    };
    return RecruitmentService;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GymSession = /** @class */ (function () {
    function GymSession() {
        this._sessionActive = false;
    }
    GymSession.prototype.startSession = function () {
        this._sessionActive = true;
    };
    GymSession.prototype.endSession = function () {
        if (!this._sessionActive) {
            return;
        }
        this._sessionActive = false;
    };
    return GymSession;
}());
var TrainSession = /** @class */ (function (_super) {
    __extends(TrainSession, _super);
    function TrainSession(_skill, _maxStamina) {
        var _this = _super.call(this) || this;
        _this._skill = _skill;
        _this._xpGained = 0;
        _this._staminaRemaining = 0;
        _this._staminaRemaining = _maxStamina;
        return _this;
    }
    TrainSession.prototype.startSession = function () {
        this._xpGained = 0;
        _super.prototype.startSession.call(this);
    };
    TrainSession.prototype.onSuccessfulAction = function () {
        // Review
        if (!this._sessionActive) {
            return;
        }
        this._xpGained += 9;
        this._staminaRemaining += -3; // TODO: range of values
        this.postAction();
    };
    TrainSession.prototype.onFailedAction = function () {
        if (!this._sessionActive) {
            return;
        }
        this._staminaRemaining += -10;
        return this.postAction();
    };
    TrainSession.prototype.postAction = function () {
        if (!this._sessionActive) {
            return;
        }
        if (this._staminaRemaining <= 0) {
            this._xpGained /= 2;
            this.endSession();
        }
    };
    TrainSession.prototype.endSession = function () {
        _super.prototype.endSession.call(this);
        this._skill.addXp(this._xpGained);
    };
    return TrainSession;
}(GymSession));
var SpaSession = /** @class */ (function (_super) {
    __extends(SpaSession, _super);
    function SpaSession(_skill) {
        var _this = _super.call(this) || this;
        _this._skill = _skill;
        _this._startTime = 0;
        _this._staiminaGained = 0;
        return _this;
    }
    SpaSession.prototype.startSession = function () {
        this._startTime = secondsPassed;
        _super.prototype.startSession.call(this);
    };
    SpaSession.prototype.endSession = function () {
        _super.prototype.endSession.call(this);
        this._staiminaGained = secondsPassed - this._startTime;
        if (this._staiminaGained < this._skill.level) {
            this._skill.addSkillValue(this._staiminaGained);
        }
        else {
            this._skill.addSkillValue(this._skill.level);
        }
    };
    return SpaSession;
}(GymSession));
var Gym = /** @class */ (function () {
    function Gym() {
    }
    Gym.prototype.getTreadmillSession = function (camel) {
        return new TrainSession(camel.camelSkills.sprintSpeed, camel.camelSkills.stamina.skillValue);
    };
    Gym.prototype.getSpaSession = function (camel) {
        // Take Away Money
        return new SpaSession(camel.camelSkills.stamina);
    };
    return Gym;
}());
var InitCamelQuality;
(function (InitCamelQuality) {
    InitCamelQuality[InitCamelQuality["Low"] = 0] = "Low";
    InitCamelQuality[InitCamelQuality["Medium"] = 1] = "Medium";
    InitCamelQuality[InitCamelQuality["High"] = 2] = "High";
})(InitCamelQuality || (InitCamelQuality = {}));
var Camel = /** @class */ (function () {
    function Camel(id, quality) {
        this.id = id;
        var sprintSpeed = Math.ceil(Math.random() * 10 * (quality + 1));
        this.camelSkills = new CamelSkillsBuilder()
            .withSprintSpeed(sprintSpeed)
            .build();
    }
    return Camel;
}());
var RaceDrawing = /** @class */ (function () {
    function RaceDrawing(_backgroundCanvas, _camelCanvas) {
        this._backgroundCanvas = _backgroundCanvas;
        this._camelCanvas = _camelCanvas;
        this.raceTrackCoords = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
            [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
            [10, 9], [10, 8], [10, 7]];
        this.backgroundCubeService = new CubeService(_backgroundCanvas.getContext("2d"));
        this.camelCubeService = new CubeService(_camelCanvas.getContext("2d"));
    }
    RaceDrawing.prototype.drawRaceCourse = function () {
        var ctx = this._backgroundCanvas.getContext("2d");
        ctx.fillStyle = '#e8d7a7';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        var canvasColour = '#C2B280';
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (this_1.raceTrackCoords.filter(function (o) { return o[0] === i && o[1] === j; }).length > 0) {
                    this_1.backgroundCubeService.drawCube(i, j, 50, '#5892a1', -0.2);
                }
                else {
                    this_1.backgroundCubeService.drawCube(i, j, 50, canvasColour);
                }
            };
            for (var j = 0; j < 15; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < 15; i++) {
            _loop_1(i);
        }
    };
    RaceDrawing.prototype.drawCamels = function (race) {
        var _this = this;
        var ctx = this._camelCanvas.getContext("2d");
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        race.racingCamels.forEach(function (camel) { return _this.drawCamel(camel); });
    };
    RaceDrawing.prototype.drawCamel = function (camel) {
        camel.handleJumpTick();
        var numberOfRaceTrackCoords = this.raceTrackCoords.length;
        var currectCoordIndex = Math.floor(camel.completionPercentage * numberOfRaceTrackCoords);
        var currentCoordPercentage = currectCoordIndex / numberOfRaceTrackCoords;
        var nextCoordPercentage = (currectCoordIndex + 1) / numberOfRaceTrackCoords;
        var percentageTowardsNextCoord = (camel.completionPercentage - currentCoordPercentage) /
            (nextCoordPercentage - currentCoordPercentage);
        var currentCoord = this.raceTrackCoords[currectCoordIndex];
        var previousCoord = currectCoordIndex > 0 ? this.raceTrackCoords[currectCoordIndex - 1] : currentCoord;
        var movingInPositiveX = currentCoord[0] > previousCoord[0];
        var movingInNegativeX = currentCoord[0] < previousCoord[0];
        var movingInPositiveY = currentCoord[1] > previousCoord[1];
        var movingInNegativeY = currentCoord[1] < previousCoord[1];
        var offset = percentageTowardsNextCoord;
        var newXCoord = movingInPositiveX ? currentCoord[0] + offset :
            movingInNegativeX ? currentCoord[0] - offset :
                currentCoord[0];
        var newYCoord = movingInPositiveY ? currentCoord[1] + offset :
            movingInNegativeY ? currentCoord[1] - offset :
                currentCoord[1];
        if (movingInNegativeY) {
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1.5 + camel.jumpHeight, 0, -3);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0 + camel.jumpHeight, 0, -2);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, 0, -2);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, 0, -1);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 2 + camel.jumpHeight, 0, -1);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0 + camel.jumpHeight);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight);
        }
        else if (movingInNegativeX) {
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1.5 + camel.jumpHeight, -2, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0 + camel.jumpHeight, -1, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, -1, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, 0, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 2 + camel.jumpHeight, 0, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0 + camel.jumpHeight, 1, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, 1, -1.5);
        }
        else if (movingInPositiveY) {
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0 + camel.jumpHeight, 0, -3);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, 0, -3);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, 0, -2);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 2 + camel.jumpHeight, 0, -2);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0 + camel.jumpHeight, 0, -1);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, 0, -1);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1.5 + camel.jumpHeight, 0);
        }
        else if (movingInPositiveX) {
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0 + camel.jumpHeight, -1.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, -1.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, -0.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 2 + camel.jumpHeight, -0.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0 + camel.jumpHeight, 0.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1 + camel.jumpHeight, 0.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1.5 + camel.jumpHeight, 1.5, -1.5);
        }
    };
    return RaceDrawing;
}());
var RaceSimulation = /** @class */ (function () {
    function RaceSimulation() {
    }
    RaceSimulation.prototype.createRace = function (enteringCamel, raceLength) {
        var camelsInRace = [enteringCamel];
        for (var i = 0; i < 4; i++) {
            // TODO randomise quality and allow quality about init camel quality
            var competitorCamel = new Camel(++lastUsedId, InitCamelQuality.High);
            camelsInRace.push(competitorCamel);
        }
        return new Race(raceLength, camelsInRace);
    };
    RaceSimulation.prototype.startRace = function (race) {
        if (race.length <= 0) {
            throw new Error('Tried to start a race with bad length');
        }
        if (race.racingCamels.length === 0) {
            throw new Error('Tried to start a race with no camels');
        }
        race.inProgress = true;
        race.racingCamels.forEach(function (x) { return x.startJump(); });
    };
    RaceSimulation.prototype.simulateRaceStep = function (race) {
        race.racingCamels.forEach(function (racingCamel) {
            racingCamel.raceSpeedPerSecond = racingCamel.camel.camelSkills.sprintSpeed.level * 20 * Math.random();
            var completedDistance = race.length * racingCamel.completionPercentage;
            var newCompletedDistance = completedDistance + secondsPassed * racingCamel.raceSpeedPerSecond;
            racingCamel.completionPercentage = newCompletedDistance / race.length;
            if (racingCamel.completionPercentage >= 1) {
                race.inProgress = false;
            }
        });
    };
    return RaceSimulation;
}());
var Race = /** @class */ (function () {
    function Race(length, camels) {
        var _this = this;
        this.length = length;
        this.racingCamels = [];
        this.inProgress = false;
        camels.forEach(function (camel) {
            var racingCamel = new RacingCamel(camel);
            _this.racingCamels.push(racingCamel);
        });
    }
    return Race;
}());
var RacingCamel = /** @class */ (function () {
    function RacingCamel(camel) {
        this.camel = camel;
        this.completionPercentage = 0;
        this.raceSpeedPerSecond = 0;
        this.color = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        this._jumpHeight = 0;
        this._gravityAcceleration = 9.81;
        this._initialVelocity = 10;
        this._scaleFactor = 10;
        this._currentVelocity = 0;
    }
    Object.defineProperty(RacingCamel.prototype, "jumpHeight", {
        get: function () {
            return this._jumpHeight;
        },
        enumerable: false,
        configurable: true
    });
    RacingCamel.prototype.startJump = function () {
        this._currentVelocity = this._initialVelocity;
    };
    RacingCamel.prototype.handleJumpTick = function () {
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
    };
    return RacingCamel;
}());
var CamelSkill = /** @class */ (function () {
    function CamelSkill(_name) {
        this._name = _name;
        this._minSkillLevel = 1;
        this._maxSkillLevel = 99;
        this._currentXp = 0;
        this._skillValue = 0;
        var xp = this.getXpRequiredForVirtualLevel(1);
        this._currentXp = xp;
        this._skillValue = this.level;
    }
    Object.defineProperty(CamelSkill.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    CamelSkill.prototype.getXpRequiredForVirtualLevel = function (level) {
        return (level - 1) * 100;
    };
    CamelSkill.prototype.getVirtualLevelWithXp = function (xp) {
        return Math.floor(xp / 100) + 1;
    };
    CamelSkill.prototype.setLevel = function (value) {
        this._currentXp = this.getXpRequiredForVirtualLevel(value);
    };
    Object.defineProperty(CamelSkill.prototype, "level", {
        get: function () {
            var virtualLevel = this.getVirtualLevelWithXp(this._currentXp);
            if (virtualLevel <= this._minSkillLevel) {
                return this._minSkillLevel;
            }
            if (virtualLevel >= this._maxSkillLevel) {
                return this._maxSkillLevel;
            }
            return virtualLevel;
        },
        enumerable: false,
        configurable: true
    });
    CamelSkill.prototype.addSkillValue = function (value) {
        this._skillValue += value;
    };
    Object.defineProperty(CamelSkill.prototype, "skillValue", {
        get: function () {
            return this._skillValue;
        },
        enumerable: false,
        configurable: true
    });
    CamelSkill.prototype.addXp = function (value) {
        this._currentXp += value;
        if (this.getVirtualLevelWithXp(this._currentXp) > this.getVirtualLevelWithXp(this._currentXp - value)) {
            this._skillValue = this.level;
        }
    };
    return CamelSkill;
}());
var CamelSkills = /** @class */ (function () {
    function CamelSkills() {
        this.sprintSpeed = new CamelSkill("Sprint Speed");
        this.stamina = new CamelSkill("Stamina");
    }
    return CamelSkills;
}());
var CamelSkillsBuilder = /** @class */ (function () {
    function CamelSkillsBuilder() {
        this._camelSkills = new CamelSkills();
    }
    CamelSkillsBuilder.prototype.withSprintSpeed = function (value) {
        this._camelSkills.sprintSpeed.setLevel(value);
        return this;
    };
    CamelSkillsBuilder.prototype.withStamina = function (value) {
        this._camelSkills.stamina.setLevel(value);
        return this;
    };
    CamelSkillsBuilder.prototype.build = function () {
        return this._camelSkills;
    };
    return CamelSkillsBuilder;
}());
