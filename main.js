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
        context.font = '40pt Kremlin Pro Web';
        context.fillStyle = fontColour;
        context.fillText(text, rect.x + rect.width / 8, rect.y + 3 * rect.height / 4, rect.x + 7 * rect.width / 8);
    };
    return CanvasBtnService;
}());
var CanvasServiceService = /** @class */ (function () {
    function CanvasServiceService() {
    }
    CanvasServiceService.prototype.getCurrentCanvas = function () {
        return;
    };
    CanvasServiceService.prototype.setCanvasZIndex = function (canvasName) {
        return;
    };
    return CanvasServiceService;
}());
var CanvasService = /** @class */ (function () {
    function CanvasService() {
    }
    CanvasService.prototype.getCanvas = function (zIndex, name) {
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
    return CanvasService;
}());
var Game = /** @class */ (function () {
    function Game(_canvas) {
        this._canvas = _canvas;
        this.draw = function () { }; //test please ignore
        this.cubeService = new CubeService(_canvas.getContext("2d"));
    }
    Object.defineProperty(Game.prototype, "ctx", {
        get: function () {
            return this._canvas.getContext("2d");
        },
        enumerable: false,
        configurable: true
    });
    return Game;
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
// Canvas
var canvasService;
// Recruitment
var camel;
var lastUsedId = 0;
var recruitmentService;
// Race
var raceCanvas;
var raceSimulation;
var raceDrawing;
var race;
function init() {
    // Canvas
    canvasService = new CanvasService();
    // Camel
    camel = new Camel(++lastUsedId, InitCamelQuality.High);
    canvasService = new CanvasService();
    recruitmentService = new RecruitmentService(canvasService, 0);
    // Race
    raceCanvas = canvasService.getCanvas('1');
    raceDrawing = new RaceDrawing(raceCanvas);
    raceSimulation = new RaceSimulation();
    // TODO make triggered
    race = raceSimulation.createRace(camel, 1000);
    raceSimulation.startRace(race);
    raceDrawing.drawRaceCourse();
    window.requestAnimationFrame(gameLoop);
}
function gameLoop(timeStamp) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;
    if (!!race && race.inProgress) {
        raceSimulation.simulateRaceStep(race);
        race.racingCamels.forEach(function (camel) {
            console.log("".concat(camel.camel.id, " - ").concat(camel.completionPercentage));
        });
    }
    raceDrawing.drawCamels(race);
    window.requestAnimationFrame(gameLoop);
}
window.onload = function () { init(); };
var RecruitmentService = /** @class */ (function () {
    function RecruitmentService(canvasService, zIndex) {
        if (zIndex === void 0) { zIndex = -1; }
        this.canvasService = canvasService;
        this._canvasId = 'recruitmentCanvas';
        this._canvas = canvasService.getCanvas(zIndex.toString(), this._canvasId);
        this._ctx = this._canvas.getContext('2d');
        this.drawInitCanvas();
    }
    RecruitmentService.prototype.goToRecruitmentArea = function () {
        this._canvas.style.zIndex = '99';
    };
    RecruitmentService.prototype.leaveRecruitmentArea = function () {
        this._canvas.style.zIndex = '-1';
    };
    RecruitmentService.prototype.onclickFn = function () {
        alert('camel recruited');
    };
    RecruitmentService.prototype.drawInitCanvas = function () {
        this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this._ctx.fillStyle = '#e8d7a7';
        this._ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        var btnService = new CanvasBtnService(this._canvas);
        btnService.createBtn(100, 100, 400, 100, '#fff', '#246', this.onclickFn, 'Recruit camel');
    };
    return RecruitmentService;
}());
var GymSession = /** @class */ (function () {
    function GymSession(_skill, _maxStamina, _xpChangeOnSuccessfulAction, _staminaChangeOnSuccessfulAction, _staminaChangeOnFailedAction) {
        if (_xpChangeOnSuccessfulAction === void 0) { _xpChangeOnSuccessfulAction = 9; }
        if (_staminaChangeOnSuccessfulAction === void 0) { _staminaChangeOnSuccessfulAction = -3; }
        if (_staminaChangeOnFailedAction === void 0) { _staminaChangeOnFailedAction = -10; }
        this._skill = _skill;
        this._xpChangeOnSuccessfulAction = _xpChangeOnSuccessfulAction;
        this._staminaChangeOnSuccessfulAction = _staminaChangeOnSuccessfulAction;
        this._staminaChangeOnFailedAction = _staminaChangeOnFailedAction;
        this._sessionActive = false;
        this._xpGained = 0;
        this._staminaRemaining = 0;
        this._staminaRemaining = _maxStamina;
    }
    GymSession.prototype.startSession = function () {
        this._sessionActive = true;
        this._xpGained = 0;
    };
    GymSession.prototype.onSuccessfulAction = function () {
        // Review
        if (!this._sessionActive) {
            return;
        }
        this._xpGained += this._xpChangeOnSuccessfulAction;
        this._staminaRemaining += this._staminaChangeOnSuccessfulAction; // TODO: range of values
        this.postAction();
    };
    GymSession.prototype.onFailedAction = function () {
        if (!this._sessionActive) {
            return;
        }
        this._staminaRemaining += this._staminaChangeOnFailedAction;
        return this.postAction();
    };
    GymSession.prototype.postAction = function () {
        if (!this._sessionActive) {
            return;
        }
        if (this._staminaRemaining <= 0) {
            this._xpGained /= 2;
            this.endSession();
        }
    };
    GymSession.prototype.endSession = function () {
        if (!this._sessionActive) {
            return;
        }
        this._skill.addXp(this._xpGained);
        this._sessionActive = false;
    };
    return GymSession;
}());
var Gym = /** @class */ (function () {
    function Gym() {
    }
    Gym.prototype.getTreadmillSession = function (camel) {
        return new GymSession(camel.camelSkills.sprintSpeed, camel.camelSkills.stamina.level);
    };
    Gym.prototype.getSpaSession = function (camel) {
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
    function RaceDrawing(_canvas) {
        this._canvas = _canvas;
        this.cubeService = new CubeService(_canvas.getContext("2d"));
    }
    RaceDrawing.prototype.drawRaceCourse = function () {
        var ctx = this._canvas.getContext("2d");
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        var canvasColour = '#C2B280';
        var raceTrackCoords = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10]];
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (raceTrackCoords.filter(function (o) { return o[0] === i && o[1] === j; }).length > 0) {
                    this_1.cubeService.drawCube(i, j, 50, '#5892a1', -0.2);
                }
                else {
                    this_1.cubeService.drawCube(i, j, 50, canvasColour);
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
        var ctx = this._canvas.getContext("2d");
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        race.racingCamels.forEach(function (camel) { return _this.drawCamel(camel); });
    };
    RaceDrawing.prototype.drawCamel = function (camel) {
        var xCoord = 1;
        var yCoord = 1 + 9 * camel.completionPercentage;
        this.cubeService.drawCube(xCoord, yCoord, 10, '#fff');
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
    }
    return RacingCamel;
}());
var CamelSkill = /** @class */ (function () {
    function CamelSkill(_name) {
        this._name = _name;
        this._minSkillLevel = 1;
        this._maxSkillLevel = 99;
        this._currentXp = 0;
        var xp = this.getXpRequiredForVirtualLevel(1);
        this._currentXp = xp;
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
    CamelSkill.prototype.addXp = function (value) {
        this._currentXp += value;
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
