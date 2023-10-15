"use strict";
// Game state
let race;
// Global service
let globalServices;
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
// Drawing
let isometricEditorComponent;
let drawingMode = false;
// Scrolls
let scrollsComponent;
function init() {
    const startup = new Startup();
    globalServices = startup.createGlobalServices();
    startup.createCanvases();
    startup.registerComponents();
    startup.registerAudio();
    if (drawingMode) {
        globalServices.navigatorService.requestPageNavigation(Page.debug);
    }
    window.requestAnimationFrame(gameLoop);
}
function gameLoop(timeStamp) {
    try {
        GameState.secondsPassed = Math.min((timeStamp - GameState.oldTimeStamp) / 1000, 0.1);
        GameState.oldTimeStamp = timeStamp;
        globalServices.navigatorService.doNavigation();
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
class Colours {
    static get green() { return '#3e6549'; }
    ;
    static get grey() { return '#555555'; }
    ;
    static get sand() { return '#C2B280'; }
    ;
    static get blue() { return '#2ebce4'; }
    ;
    static get brown() { return '#b18579'; }
    ;
}
class CactusCoords {
    static get cactus() {
        return [
            {
                "x": 6,
                "y": 6,
                "colour": Colours.green
            },
            {
                "x": 5,
                "y": 5,
                "colour": Colours.green
            },
            {
                "x": 4,
                "y": 4,
                "colour": Colours.green
            },
            {
                "x": 3,
                "y": 3,
                "colour": Colours.green
            },
            {
                "x": 2,
                "y": 2,
                "colour": Colours.green
            },
            {
                "x": 5,
                "y": 4,
                "colour": Colours.green
            },
            {
                "x": 6,
                "y": 4,
                "colour": Colours.green
            },
            {
                "x": 5,
                "y": 3,
                "colour": Colours.green
            },
            {
                "x": 4,
                "y": 2,
                "colour": Colours.green
            },
            {
                "x": 1,
                "y": 1,
                "colour": Colours.green
            }
        ];
    }
    static get cactus2() {
        return [
            {
                "x": 7,
                "y": 7,
                "colour": Colours.green
            },
            {
                "x": 6,
                "y": 6,
                "colour": Colours.green
            },
            {
                "x": 2,
                "y": 4,
                "colour": Colours.green
            },
            {
                "x": 1,
                "y": 3,
                "colour": Colours.green
            },
            {
                "x": 3,
                "y": 4,
                "colour": Colours.green
            },
            {
                "x": 5,
                "y": 5,
                "colour": Colours.green
            },
            {
                "x": 6,
                "y": 5,
                "colour": Colours.green
            },
            {
                "x": 7,
                "y": 5,
                "colour": Colours.green
            },
            {
                "x": 6,
                "y": 4,
                "colour": Colours.green
            },
            {
                "x": 5,
                "y": 3,
                "colour": Colours.green
            },
            {
                "x": 4,
                "y": 4,
                "colour": Colours.green
            },
            {
                "x": 3,
                "y": 3,
                "colour": Colours.green
            },
            {
                "x": 2,
                "y": 2,
                "colour": Colours.green
            },
            {
                "x": 1,
                "y": 1,
                "colour": Colours.green
            },
            {
                "x": 0,
                "y": 0,
                "colour": Colours.green
            },
            {
                "x": 0,
                "y": 2,
                "colour": Colours.green
            },
            {
                "x": 4,
                "y": 2,
                "colour": Colours.green
            }
        ];
    }
}
class OasisCoords {
    static get oasis() {
        return [
            {
                "x": 0,
                "y": 0,
                "colour": "#C2B280"
            },
            {
                "x": 0,
                "y": 3,
                "colour": "#C2B280"
            },
            {
                "x": 1,
                "y": 1,
                "colour": "#3e6549"
            },
            {
                "x": 1,
                "y": 2,
                "colour": "#3e6549"
            },
            {
                "x": 1,
                "y": 3,
                "colour": "#3e6549"
            },
            {
                "x": 1,
                "y": 4,
                "colour": "#C2B280"
            },
            {
                "x": 1,
                "y": 5,
                "colour": "#3e6549"
            },
            {
                "x": 1,
                "y": 6,
                "colour": "#3e6549"
            },
            {
                "x": 0,
                "y": 5,
                "colour": "#b18579"
            },
            {
                "x": -1,
                "y": 4,
                "colour": "#b18579"
            },
            {
                "x": -2,
                "y": 3,
                "colour": "#b18579"
            },
            {
                "x": -3,
                "y": 2,
                "colour": "#b18579"
            },
            {
                "x": -4,
                "y": 1,
                "colour": "#b18579"
            },
            {
                "x": -4,
                "y": 2,
                "colour": "#3e6549"
            },
            {
                "x": -3,
                "y": 1,
                "colour": "#3e6549"
            },
            {
                "x": -3,
                "y": 4,
                "colour": "#3e6549"
            },
            {
                "x": -1,
                "y": 2,
                "colour": "#3e6549"
            },
            {
                "x": -5,
                "y": 0,
                "colour": "#3e6549"
            },
            {
                "x": 2,
                "y": 0,
                "colour": "#3e6549"
            },
            {
                "x": 2,
                "y": 1,
                "colour": "#2ebce4"
            },
            {
                "x": 2,
                "y": 2,
                "colour": "#2ebce4"
            },
            {
                "x": 2,
                "y": 4,
                "colour": "#2ebce4"
            },
            {
                "x": 2,
                "y": 5,
                "colour": "#2ebce4"
            },
            {
                "x": 2,
                "y": 6,
                "colour": "#3e6549"
            },
            {
                "x": 3,
                "y": 1,
                "colour": "#2ebce4"
            },
            {
                "x": 3,
                "y": 2,
                "colour": "#2ebce4"
            },
            {
                "x": 3,
                "y": 3,
                "colour": "#2ebce4"
            },
            {
                "x": 3,
                "y": 6,
                "colour": "#C2B280"
            },
            {
                "x": 4,
                "y": 1,
                "colour": "#3e6549"
            },
            {
                "x": 3,
                "y": 0,
                "colour": "#b18579"
            },
            {
                "x": 2,
                "y": -1,
                "colour": "#b18579"
            },
            {
                "x": 1,
                "y": -2,
                "colour": "#b18579"
            },
            {
                "x": 0,
                "y": -3,
                "colour": "#3e6549"
            },
            {
                "x": 1,
                "y": -1,
                "colour": "#3e6549"
            },
            {
                "x": 2,
                "y": -2,
                "colour": "#3e6549"
            },
            {
                "x": 4,
                "y": 2,
                "colour": "#2ebce4"
            },
            {
                "x": 4,
                "y": 3,
                "colour": "#2ebce4"
            },
            {
                "x": 4,
                "y": 6,
                "colour": "#3e6549"
            },
            {
                "x": 1,
                "y": 7,
                "colour": "#3e6549"
            },
            {
                "x": 5,
                "y": 1,
                "colour": "#3e6549"
            },
            {
                "x": 5,
                "y": 2,
                "colour": "#2ebce4"
            },
            {
                "x": 5,
                "y": 3,
                "colour": "#2ebce4"
            },
            {
                "x": 5,
                "y": 4,
                "colour": "#2ebce4"
            },
            {
                "x": 5,
                "y": 5,
                "colour": "#3e6549"
            },
            {
                "x": 6,
                "y": 2,
                "colour": "#3e6549"
            },
            {
                "x": 6,
                "y": 3,
                "colour": "#3e6549"
            },
            {
                "x": 6,
                "y": 4,
                "colour": "#3e6549"
            },
            {
                "x": 7,
                "y": 3,
                "colour": "#C2B280"
            },
            {
                "x": 7,
                "y": 4,
                "colour": "#C2B280"
            },
            {
                "x": 8,
                "y": 5,
                "colour": "#C2B280"
            },
            {
                "x": 6,
                "y": 7,
                "colour": "#b18579"
            },
            {
                "x": 5,
                "y": 6,
                "colour": "#b18579"
            },
            {
                "x": 4,
                "y": 5,
                "colour": "#b18579"
            },
            {
                "x": 3,
                "y": 4,
                "colour": "#b18579"
            },
            {
                "x": 2,
                "y": 3,
                "colour": "#3e6549"
            },
            {
                "x": 4,
                "y": 4,
                "colour": "#3e6549"
            },
            {
                "x": 3,
                "y": 5,
                "colour": "#3e6549"
            }
        ];
    }
}
class PyramidCoords {
    static get dilapidated() {
        return [
            {
                "x": 6,
                "y": 0,
                "colour": "#555555"
            },
            {
                "x": 6,
                "y": 1,
                "colour": "#555555"
            },
            {
                "x": 6,
                "y": 2,
                "colour": "#555555"
            },
            {
                "x": 6,
                "y": 3,
                "colour": "#555555"
            },
            {
                "x": 6,
                "y": 4,
                "colour": "#555555"
            },
            {
                "x": 6,
                "y": 5,
                "colour": "#555555"
            },
            {
                "x": 0,
                "y": 6,
                "colour": "#555555"
            },
            {
                "x": 1,
                "y": 6,
                "colour": "#555555"
            },
            {
                "x": 2,
                "y": 6,
                "colour": "#555555"
            },
            {
                "x": 3,
                "y": 6,
                "colour": "#555555"
            },
            {
                "x": 4,
                "y": 6,
                "colour": "#555555"
            },
            {
                "x": 5,
                "y": 6,
                "colour": "#555555"
            },
            {
                "x": 6,
                "y": 6,
                "colour": "#555555"
            },
            {
                "x": 0,
                "y": 7,
                "colour": "#555555"
            },
            {
                "x": 1,
                "y": 7,
                "colour": "#555555"
            },
            {
                "x": 2,
                "y": 7,
                "colour": "#555555"
            },
            {
                "x": 4,
                "y": 0,
                "colour": "#C2B280"
            },
            {
                "x": 5,
                "y": 0,
                "colour": "#C2B280"
            },
            {
                "x": 4,
                "y": 1,
                "colour": "#C2B280"
            },
            {
                "x": 4,
                "y": 2,
                "colour": "#C2B280"
            },
            {
                "x": 4,
                "y": 3,
                "colour": "#C2B280"
            },
            {
                "x": 0,
                "y": 4,
                "colour": "#C2B280"
            },
            {
                "x": 1,
                "y": 4,
                "colour": "#C2B280"
            },
            {
                "x": 2,
                "y": 4,
                "colour": "#C2B280"
            },
            {
                "x": 3,
                "y": 4,
                "colour": "#C2B280"
            },
            {
                "x": 4,
                "y": 4,
                "colour": "#C2B280"
            },
            {
                "x": 2,
                "y": 0,
                "colour": "#555555"
            },
            {
                "x": 2,
                "y": 1,
                "colour": "#555555"
            },
            {
                "x": 0,
                "y": 2,
                "colour": "#555555"
            },
            {
                "x": 1,
                "y": 2,
                "colour": "#555555"
            },
            {
                "x": 2,
                "y": 2,
                "colour": "#555555"
            },
            {
                "x": 0,
                "y": 3,
                "colour": "#555555"
            },
            {
                "x": 1,
                "y": 3,
                "colour": "#555555"
            },
            {
                "x": 0,
                "y": 0,
                "colour": "#C2B280"
            },
            {
                "x": 1,
                "y": 0,
                "colour": "#C2B280"
            },
            {
                "x": 0,
                "y": 1,
                "colour": "#C2B280"
            },
            {
                "x": 3,
                "y": 7,
                "colour": "#3e6549"
            },
            {
                "x": 4,
                "y": 7,
                "colour": "#3e6549"
            },
            {
                "x": 5,
                "y": 7,
                "colour": "#555555"
            },
            {
                "x": 6,
                "y": 7,
                "colour": "#3e6549"
            },
            {
                "x": 2,
                "y": 3,
                "colour": "#3e6549"
            },
            {
                "x": 3,
                "y": 0,
                "colour": "#555555"
            },
            {
                "x": 3,
                "y": 1,
                "colour": "#C2B280"
            },
            {
                "x": 3,
                "y": 2,
                "colour": "#555555"
            },
            {
                "x": 3,
                "y": 3,
                "colour": "#555555"
            },
            {
                "x": 1,
                "y": 1,
                "colour": "#C2B280"
            },
            {
                "x": 0,
                "y": 5,
                "colour": "#555555"
            },
            {
                "x": 1,
                "y": 5,
                "colour": "#C2B280"
            },
            {
                "x": 2,
                "y": 5,
                "colour": "#C2B280"
            },
            {
                "x": 3,
                "y": 5,
                "colour": "#3e6549"
            },
            {
                "x": 4,
                "y": 5,
                "colour": "#C2B280"
            },
            {
                "x": 7,
                "y": 0,
                "colour": "#C2B280"
            },
            {
                "x": 7,
                "y": 1,
                "colour": "#C2B280"
            },
            {
                "x": 5,
                "y": 1,
                "colour": "#3e6549"
            },
            {
                "x": 7,
                "y": 2,
                "colour": "#3e6549"
            },
            {
                "x": 7,
                "y": 3,
                "colour": "#3e6549"
            },
            {
                "x": 7,
                "y": 4,
                "colour": "#C2B280"
            },
            {
                "x": 7,
                "y": 5,
                "colour": "#C2B280"
            },
            {
                "x": 7,
                "y": 6,
                "colour": "#C2B280"
            },
            {
                "x": 7,
                "y": 7,
                "colour": "#C2B280"
            },
            {
                "x": 5,
                "y": 2,
                "colour": "#C2B280"
            },
            {
                "x": 5,
                "y": 3,
                "colour": "#C2B280"
            },
            {
                "x": 5,
                "y": 4,
                "colour": "#555555"
            },
            {
                "x": 5,
                "y": 5,
                "colour": "#C2B280"
            }
        ];
    }
}
class RookCoords {
    static get smallRock1() {
        return [
            {
                "x": 1,
                "y": 3,
                "colour": Colours.grey
            },
            {
                "x": 1,
                "y": 4,
                "colour": Colours.grey
            },
            {
                "x": 2,
                "y": 3,
                "colour": Colours.grey
            },
            {
                "x": 2,
                "y": 4,
                "colour": Colours.grey
            },
            {
                "x": 2,
                "y": 5,
                "colour": Colours.grey
            },
            {
                "x": 3,
                "y": 3,
                "colour": Colours.grey
            }
        ];
    }
    static get smallRock2() {
        return [
            {
                "x": 3,
                "y": 1,
                "colour": Colours.grey
            },
            {
                "x": 4,
                "y": 0,
                "colour": Colours.grey
            },
            {
                "x": 4,
                "y": 1,
                "colour": Colours.grey
            },
            {
                "x": 4,
                "y": 2,
                "colour": Colours.grey
            },
            {
                "x": 5,
                "y": 2,
                "colour": Colours.grey
            },
            {
                "x": 4,
                "y": 3,
                "colour": Colours.grey
            },
            {
                "x": 5,
                "y": 3,
                "colour": Colours.grey
            }
        ];
    }
}
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
class CalendarDetailsDrawing {
    static drawCalendarDetails() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.CalendarDetails);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const numberOfColumns = 6;
        const numberOfRows = 5;
        const calendarXStart = GlobalStaticConstants.innerWidth / 10;
        const calendarYStart = GlobalStaticConstants.innerHeight / 5;
        const calendarWidth = 4 * GlobalStaticConstants.innerWidth / 5;
        const calendarHeight = 7 * GlobalStaticConstants.innerHeight / 10;
        ctx.fillStyle = '#fff';
        ctx.fillRect(calendarXStart - 2, calendarYStart - 2, calendarWidth + 4, calendarHeight + 4);
        const calendar = CalendarService.getCalendar();
        const standardTileFillColour = this.getStandardTileColour(calendar.Season);
        ctx.fillStyle = standardTileFillColour;
        ctx.font = '40pt Garamond';
        ctx.textAlign = 'center';
        ctx.fillText(CalendarService.getSeasonAsString(calendar.Season), GlobalStaticConstants.innerWidth / 2, calendarYStart / 2, GlobalStaticConstants.innerWidth);
        ctx.font = '12pt Garamond';
        const currentDay = calendar.Day;
        const currentDayTileColour = this.getCurrentDayTileColour(calendar.Season);
        for (let column = 0; column < numberOfColumns; column++) {
            for (let row = 0; row < numberOfRows; row++) {
                const x = calendarXStart + (column * calendarWidth / (numberOfColumns)) + 2;
                const y = calendarYStart + (row * calendarHeight / (numberOfRows)) + 2;
                const width = (calendarWidth / numberOfColumns) - 4;
                const height = (calendarHeight / numberOfRows) - 4;
                const day = column + 1 + row * numberOfColumns;
                if (day === currentDay) {
                    ctx.fillStyle = currentDayTileColour;
                }
                ctx.fillRect(x, y, width, height);
                ctx.fillStyle = '#fff';
                ctx.fillText(day.toString(), x + width / 10, y + height / 5);
                ctx.fillStyle = standardTileFillColour;
            }
        }
        const btnService = new CanvasBtnService(canvas, globalServices.navigatorService);
        btnService.drawBackButton(Page.mapOverview, standardTileFillColour, currentDayTileColour);
    }
    static getStandardTileColour(season) {
        return CalendarService.getSeasonDarkerColour(season);
    }
    static getCurrentDayTileColour(season) {
        return CalendarService.getSeasonLighterColour(season);
    }
}
class CalendarOverviewDrawing {
    static drawCalendarOverview(canvas) {
        const btnService = new CanvasBtnService(canvas, globalServices.navigatorService);
        const calendar = CalendarService.getCalendar();
        const widthUnit = GlobalStaticConstants.innerWidth / 20;
        const heightUnit = GlobalStaticConstants.innerHeight / 20;
        btnService.createBtn(15 * widthUnit, // x
        0.5 * heightUnit, // y
        4 * widthUnit, // width
        2 * heightUnit, // height
        10, 10, CalendarService.getSeasonDarkerColour(calendar.Season), CalendarService.getSeasonLighterColour(calendar.Season), '#fff', () => globalServices.navigatorService.requestPageNavigation(Page.calendarDetails), ['Day ' + calendar.Day.toString(), CalendarService.getSeasonAsString(calendar.Season)]);
    }
}
class CalendarService {
    static getCalendar() {
        if (!GameState.calendar) {
            GameState.calendar = new Calendar();
        }
        return GameState.calendar;
    }
    static getSeasonAsString(season) {
        switch (season) {
            case Season.Spring:
                return 'Spring';
            case Season.Summer:
                return 'Summer';
            case Season.Autumn:
                return 'Autumn';
            case Season.Winter:
                return 'Winter';
            default:
                return '';
        }
    }
    static getSeasonDarkerColour(season) {
        switch (season) {
            case Season.Spring:
                return '#61ab4b';
            case Season.Summer:
                return '#e3c036';
            case Season.Autumn:
                return '#ed7e39';
            default:
                return '#246';
        }
    }
    static getSeasonLighterColour(season) {
        switch (season) {
            case Season.Spring:
                return '#91d97c';
            case Season.Summer:
                return '#fce37c';
            case Season.Autumn:
                return '#ffaa75';
            default:
                return '#4b7bab';
        }
    }
}
class Calendar {
    constructor(startDay = 1, season = Season.Spring) {
        this.Day = startDay;
        this.Season = season;
    }
    _numberOfDaysInASeason = 30;
    Day;
    Season;
    moveToNextDay() {
        if (this.Day === this._numberOfDaysInASeason) {
            this.Day = 1;
            this.Season = (this.Season + 1) % 4;
            return;
        }
        this.Day++;
    }
}
var Season;
(function (Season) {
    Season[Season["Spring"] = 0] = "Spring";
    Season[Season["Summer"] = 1] = "Summer";
    Season[Season["Autumn"] = 2] = "Autumn";
    Season[Season["Winter"] = 3] = "Winter";
})(Season || (Season = {}));
class IsometricEditorComponent {
    _canvas;
    _cubeService;
    _btnService;
    constructor(_canvas, _cubeService, _btnService) {
        this._canvas = _canvas;
        this._cubeService = _cubeService;
        this._btnService = _btnService;
    }
    _cubeCoords = [];
    _cubeCoordHistory = [[]];
    _colour = Colours.grey;
    load() {
        CanvasService.showCanvas(CanvasNames.Debug);
        this.drawGround();
        this.drawButtons();
        this._canvas.addEventListener('click', (event) => {
            const rect = this._canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const coords = ImportantService.ConvertRealToCoord(x, y, GlobalStaticConstants.baseCubeSize);
            if (coords.y2 > 10) {
                return;
            }
            this.addCube({ x: Math.floor(coords.x2) - 1, y: Math.floor(coords.y2) - 1, colour: this._colour });
            this.redraw();
            console.log(this._cubeCoords);
        });
    }
    addCube(newCube) {
        const existingCube = this._cubeCoords
            .filter(o => o.x === newCube.x && o.y === newCube.y);
        if (existingCube.length > 0) {
            this._cubeCoords.splice(this._cubeCoords.indexOf(existingCube[0]), 1);
        }
        this._cubeCoords.push(newCube);
        this._cubeCoordHistory.push([...this._cubeCoords]);
    }
    redraw() {
        this._canvas.getContext('2d').clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        this._btnService.removeEventListeners();
        this.drawGround();
        this.drawCubes();
        this.drawButtons();
    }
    drawCubes() {
        this._cubeCoords.forEach((cube) => {
            this._cubeService.drawCube(cube.x, cube.y, GlobalStaticConstants.baseCubeSize, cube.colour, 0);
        });
    }
    drawGround() {
        const canvasColour = '#C2B280';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this._cubeService.drawCube(i, j, GlobalStaticConstants.baseCubeSize, canvasColour, 0);
            }
        }
    }
    drawPaletteButton(maxX, maxY, position, colour) {
        this._btnService.createBtn((position + 2) * maxX / 40 + (position + 1) * 20, maxY - 100, maxX / 40, 50, 0, 5, colour, colour, '#fff', () => this._colour = colour, ['']);
    }
    drawButtons() {
        const maxX = this._canvas.width / GlobalStaticConstants.devicePixelRatio;
        const maxY = this._canvas.height / GlobalStaticConstants.devicePixelRatio;
        this._btnService.createBtn(maxX / 40, maxY - 100, maxX / 40, 50, 0, 5, '#cc807a', '#f2ada7', '#fff', () => {
            if (this._cubeCoordHistory.length === 1) {
                return;
            }
            this._cubeCoordHistory.pop();
            this._cubeCoords = [...this._cubeCoordHistory.at(-1)];
            this.redraw();
        }, ['<-']);
        this.drawPaletteButton(maxX, maxY, 0, Colours.green);
        this.drawPaletteButton(maxX, maxY, 1, Colours.grey);
        this.drawPaletteButton(maxX, maxY, 2, Colours.sand);
        this.drawPaletteButton(maxX, maxY, 3, Colours.blue);
        this.drawPaletteButton(maxX, maxY, 4, Colours.brown);
    }
}
class CamelStable {
    _camelCreator;
    constructor(_camelCreator) {
        this._camelCreator = _camelCreator;
    }
    _seedRadix = 36;
    _camelInformationLength = 10;
    _numberOfCamels = 25;
    camels = [];
    populateStable() {
        let firstTimeSetUp = false;
        if (!GameState.stableSeed) {
            firstTimeSetUp = true;
        }
        let index = 0;
        const variation = 30;
        const uniformCenters = Array.from(new Array(this._numberOfCamels), (e, i) => (100 / this._numberOfCamels) * (i + 1));
        if (firstTimeSetUp) {
            uniformCenters.forEach(center => {
                const agility = this.generateRandomNumber(center, variation);
                const sprintSpeed = this.generateRandomNumber(center, variation);
                const stamina = this.generateRandomNumber(center, variation);
                const colour = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix;
                const name1 = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix;
                const name2 = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix;
                const temperament = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix; // unused
                const camel = this._camelCreator.createSeededCamel([
                    agility,
                    sprintSpeed,
                    stamina,
                    colour,
                    name1,
                    name2,
                    temperament
                ]);
                this.camels.push(camel);
                GameState.stableSeed += this._camelCreator.createSeedFromCamel(camel);
            });
            return;
        }
        const populateCamelArray = (camelArray) => {
            const seedPart = GameState.stableSeed.slice(index * this._camelInformationLength, (1 + index) * this._camelInformationLength);
            const maxLevel = (new DefaultLevelCurve()).maxSkillLevel;
            camelArray.push(this._camelCreator.createSeededCamel([
                maxLevel * parseInt(seedPart.slice(0, 2), this._seedRadix) / (this._seedRadix ** 2),
                maxLevel * parseInt(seedPart.slice(2, 4), this._seedRadix) / (this._seedRadix ** 2),
                maxLevel * parseInt(seedPart.slice(4, 6), this._seedRadix) / (this._seedRadix ** 2),
                parseInt(seedPart.slice(6, 7), this._seedRadix) / this._seedRadix,
                parseInt(seedPart.slice(7, 8), this._seedRadix) / this._seedRadix,
                parseInt(seedPart.slice(8, 9), this._seedRadix) / this._seedRadix,
                parseInt(seedPart.slice(9, 10), this._seedRadix) / this._seedRadix,
            ]));
            index += this._camelInformationLength;
        };
        new Array(this._numberOfCamels).forEach(e => populateCamelArray(this.camels));
        return;
    }
    static GetGeneralWaste = () => {
        const levelCurve = new DefaultLevelCurve();
        return new Camel(++GameState.lastUsedId, {
            colour: "#fff",
            name: "General Waste",
            skills: {
                agility: new CamelSkill(CamelSkillType.agility, levelCurve, 0, levelCurve.getXpRequiredForLevel(2)),
                sprintSpeed: new CamelSkill(CamelSkillType.sprintSpeed, levelCurve, 0, levelCurve.getXpRequiredForLevel(50)),
                stamina: new CamelSkill(CamelSkillType.stamina, levelCurve, 0, levelCurve.getXpRequiredForLevel(50)),
            },
            temperament: CamelTemperament.Calm,
            unspentXp: 0,
            achievementsUnlocked: 0,
        });
    };
    generateSeed(length = 700, radix = 36) {
        return "x".repeat(length).replace(/x/g, (char) => Math.floor(Math.random() * radix).toString(radix));
    }
    generateRandomNumber(center, plusMinusRange, max = 100, min = 0) {
        const randValue = center + ((Math.random()) * 2 - 1) * plusMinusRange;
        return Math.max(min, Math.min(max, randValue));
    }
}
class CanvasBtnService {
    canvas;
    _navigator;
    constructor(canvas, _navigator) {
        this.canvas = canvas;
        this._navigator = _navigator;
    }
    clickEventListeners = [];
    mouseMoveEventListeners = [];
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
    drawBackButton(targetPage, backgroundColour = '#cc807a', borderColour = '#f2ada7') {
        const maxX = this.canvas.width / GlobalStaticConstants.devicePixelRatio;
        const maxY = this.canvas.height / GlobalStaticConstants.devicePixelRatio;
        this.createBtn(maxX / 40, maxY - 100, 100, 50, 0, 5, backgroundColour, borderColour, '#fff', () => this._navigator.requestPageNavigation(targetPage), ['Back']);
    }
    drawBtn = (context, rect, radius, borderWidth, backgroundColour, borderColour, fontColour, text) => {
        context.save();
        context.beginPath();
        context.roundRect(rect.x, rect.y, rect.width, rect.height, radius);
        context.fillStyle = backgroundColour;
        context.fill();
        context.lineWidth = borderWidth;
        context.strokeStyle = borderColour;
        context.stroke();
        context.closePath();
        context.font = '30pt Garamond';
        context.fillStyle = fontColour;
        context.textAlign = "center";
        if (text.length < 2) {
            context.fillText(text[0], rect.x + rect.width / 2, rect.y + 3 * rect.height / 4, rect.width - 10);
        }
        else {
            let lineHeight = 0.25;
            text.forEach(line => {
                context.fillText(line, rect.x + rect.width / 2, rect.y + ++lineHeight * 1.25 * rect.height / 4, rect.width - 10);
            });
        }
        context.restore();
    };
    displayHoverState = (context, rect, radius, borderWidth, borderColour, fontColour, text) => {
        this.drawBtn(context, rect, radius, borderWidth, borderColour, borderColour, fontColour, text);
    };
    createBtn(xStart, yStart, width, height, radius, borderWidth, backgroundColour, borderColour, fontColour, onclickFunction, text) {
        var rect = {
            x: xStart,
            y: yStart,
            width: width,
            height: height
        };
        // Binding the click event on the canvas
        var context = this.canvas.getContext('2d');
        const clickHandler = (event) => {
            let mousePos = this.getMousePosition(event);
            if (this.isInside(mousePos, rect)) {
                onclickFunction();
            }
        };
        this.clickEventListeners.push(clickHandler);
        this.canvas.addEventListener('click', clickHandler, false);
        const mouseMoveEventHandler = (event) => {
            let mousePos = this.getMousePosition(event);
            if (this.isInside(mousePos, rect)) {
                this.displayHoverState(context, rect, radius, borderWidth, borderColour, fontColour, text);
            }
            else {
                this.drawBtn(context, rect, radius, borderWidth, backgroundColour, borderColour, fontColour, text);
            }
        };
        this.mouseMoveEventListeners.push(mouseMoveEventHandler);
        this.canvas.addEventListener('mousemove', mouseMoveEventHandler, false);
        this.drawBtn(context, rect, radius, borderWidth, backgroundColour, borderColour, fontColour, text);
    }
    removeEventListeners() {
        this.clickEventListeners.forEach(o => {
            this.canvas.removeEventListener('click', o, false);
        });
        this.clickEventListeners = [];
        this.mouseMoveEventListeners.forEach(o => {
            this.canvas.removeEventListener('mousemove', o, false);
        });
        this.mouseMoveEventListeners = [];
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
        const scaleFactor = GlobalStaticConstants.baseCubeSize / 5;
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1.5, 0, -3 * size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 0, 0, -2 * size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, -2 * size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, -size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 2, 0, -size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 0, 0, 0);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, 0);
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
    static CalendarDetails = 'calendar-details';
    static Debug = 'debug';
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
            ctx.save();
            ctx.drawImage(img, GlobalStaticConstants.innerWidth - 450, GlobalStaticConstants.innerHeight - 150, 400, 125);
            ctx.fillStyle = '#e8be9e';
            ctx.fillRect(GlobalStaticConstants.innerWidth - 375, GlobalStaticConstants.innerHeight - 125, 250, 25);
            ctx.font = '30pt Garamond';
            ctx.fillStyle = '#000';
            ctx.textAlign = "center";
            ctx.fillText('Cash money: ' + GameState.cashMoney, GlobalStaticConstants.innerWidth - 250, GlobalStaticConstants.innerHeight - 102, 250);
            ctx.restore();
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
    static _version = 4;
    // Camel
    static camel;
    static camels = [];
    static secondsPassed = 0; // done
    static oldTimeStamp = 0; // done
    static stableSeed = "";
    // Calendar
    static calendar;
    // Recruitment
    static lastUsedId = 0; // done
    static cashMoney = 100; // done
    // Scrolls
    static scrolls = [];
    static get unreadScrollCount() { return GameState.scrolls.filter(o => !o.read).length; }
    static Save() {
        const gameStateObject = {
            camel: GameState.camel,
            camels: GameState.camels,
            secondsPassed: GameState.secondsPassed,
            oldTimeStamp: GameState.oldTimeStamp,
            lastUsedId: GameState.lastUsedId,
            cashMoney: GameState.cashMoney,
            calendar: GameState.calendar,
            scrolls: GameState.scrolls,
            stableSeed: GameState.stableSeed
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
        return true;
    }
    static LoadIfExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        if (!gameStateString || gameStateString === undefined)
            return;
        const gameState = JSON.parse(gameStateString);
        // Load camel
        gameState.camels.forEach(camel => this.loadCamel(globalServices.camelCreator, camel));
        if (gameState.camels.length > 0) {
            GameState.camel = GameState.camels[0];
        }
        // Load game state
        GameState.secondsPassed = gameState.secondsPassed;
        GameState.oldTimeStamp = gameState.oldTimeStamp;
        GameState.lastUsedId = gameState.lastUsedId;
        GameState.cashMoney = gameState.cashMoney;
        GameState.calendar = new Calendar(gameState.calendar.Day, gameState.calendar.Season);
        debugger;
        GameState.scrolls = gameState.scrolls;
        GameState.stableSeed = gameState.stableSeed;
    }
    static loadCamel(camelCreator, serialisedCamel) {
        const camel = camelCreator.createCamelFromSerialisedCamel(serialisedCamel);
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
    static lightColour = "#ccb693";
    static innerWidth = window.innerWidth;
    static innerHeight = window.innerHeight;
    static devicePixelRatio = window.devicePixelRatio;
    static baseCubeSize = Math.round(window.innerWidth / 30);
    static debugMode = false;
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
        const textLines = this.getLines(ctx, text, width / 2 - 20);
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
                    globalServices.navigatorService.requestPageNavigation(Page.mapOverview);
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
    constructor() { }
    registerComponents() {
        const racingStartup = new RacingStartup(globalServices);
        racingStartup.registerComponents();
        const managementStartup = new ManagementStartup(globalServices);
        managementStartup.registerComponents();
        const scrollsStartup = new ScrollsStartup(globalServices);
        scrollsStartup.registerComponents();
        recruitmentService = new RecruitmentService(globalServices.navigatorService, globalServices.camelCreator);
        loadingScreen = new LoadingScreen(globalServices.navigatorService);
        this.registerDebugComponents();
    }
    registerAudio() {
        window.addEventListener('keydown', () => {
            globalServices.musicService.startAudio();
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
        CanvasService.createCanvas('0', CanvasNames.CalendarDetails);
        CanvasService.createCanvas('9', CanvasNames.Debug);
    }
    createGlobalServices() {
        const navigatorService = new NavigatorService();
        const musicService = new MusicService();
        const camelPropertyGenerator = new CamelPropertyGenerator();
        const levelCurveFactor = new LevelCurveFactory();
        const camelSkillCreator = new CamelSkillCreator(levelCurveFactor);
        const camelCreator = new CamelCreator(camelPropertyGenerator, camelSkillCreator);
        const camelStable = new CamelStable(camelCreator);
        return {
            musicService,
            navigatorService,
            camelCreator,
            camelStable
        };
    }
    registerDebugComponents() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.Debug);
        const cubeService = new CubeService(canvas.getContext("2d"));
        const btnService = new CanvasBtnService(canvas, globalServices.navigatorService);
        isometricEditorComponent = new IsometricEditorComponent(canvas, cubeService, btnService);
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
        const borderWidth = 5;
        const buttonService = new CanvasBtnService(this._camelCanvas, this._navigatorService);
        buttonService.createBtn((this._camelCanvas.width / GlobalStaticConstants.devicePixelRatio) / 2, GlobalStaticConstants.innerHeight / 2, 550, 50, 25, borderWidth, GlobalStaticConstants.backgroundColour, GlobalStaticConstants.mediumColour, "black", () => this._trainSession = Gym.getTreadmillSession(GameState.camel), ["Start session"]);
        buttonService.createBtn((this._camelCanvas.width / GlobalStaticConstants.devicePixelRatio) / 2, GlobalStaticConstants.innerHeight / 2 + 100, 550, 50, 25, borderWidth, GlobalStaticConstants.backgroundColour, GlobalStaticConstants.mediumColour, "black", () => { this.exitGym(this._trainSession); }, ["Back to map"]);
    }
    exitGym(trainSession) {
        if (trainSession) {
            trainSession.endSession();
        }
        CanvasService.hideAllCanvas();
        MapOverview.load();
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
        GameState.scrolls.push(EmmaDaleScrolls.welcome);
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
        const borderWidth = 5;
        const backgroundColour = '#cc807a';
        const borderColour = '#f2ada7';
        const textColour = '#fff';
        if (GameState.GetExists()) {
            this._btnService.createBtn(GlobalStaticConstants.innerWidth / 6, 8 * GlobalStaticConstants.innerHeight / 10, GlobalStaticConstants.innerWidth / 4, GlobalStaticConstants.innerHeight / 10, radius, borderWidth, backgroundColour, borderColour, textColour, this.startFreshGame, ['New game']);
            this._btnService.createBtn(7 * GlobalStaticConstants.innerWidth / 12, 8 * GlobalStaticConstants.innerHeight / 10, GlobalStaticConstants.innerWidth / 4, GlobalStaticConstants.innerHeight / 10, radius, borderWidth, backgroundColour, borderColour, textColour, this.loadSavedGame, ['Load saved game']);
        }
        else {
            this._btnService.createBtn(GlobalStaticConstants.innerWidth / 3, 8 * GlobalStaticConstants.innerHeight / 10, GlobalStaticConstants.innerWidth / 3, GlobalStaticConstants.innerHeight / 10, radius, borderWidth, backgroundColour, borderColour, textColour, this.startFreshGame, ['New game']);
        }
    }
}
class ManagementStartup {
    _globalServices;
    constructor(_globalServices) {
        this._globalServices = _globalServices;
    }
    registerComponents() {
        const camelSkillDrawing = new CamelSkillDrawing(this._globalServices.navigatorService);
        const camelSkillCommands = new CamelSkillCommands();
        camelSkillComponent = new CamelSkillComponent(camelSkillDrawing, camelSkillCommands);
        const selectCamelFunc = (camel) => {
            GameState.camel = camel;
            this._globalServices.navigatorService.requestPageNavigation(Page.management);
        };
        camelManagementSelectComponent = new CamelSelectComponent(selectCamelFunc);
    }
}
class CamelCreator {
    _camelPropertyGenerator;
    _camelSkillCreator;
    constructor(_camelPropertyGenerator, _camelSkillCreator) {
        this._camelPropertyGenerator = _camelPropertyGenerator;
        this._camelSkillCreator = _camelSkillCreator;
    }
    createRandomCamelWithQuality(quality) {
        const agility = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.agility, quality);
        const sprintSpeed = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.sprintSpeed, quality);
        const stamina = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.stamina, quality);
        const camelInitProperties = {
            colour: this._camelPropertyGenerator.generateColour(),
            name: this._camelPropertyGenerator.generateName(),
            skills: {
                agility: agility,
                sprintSpeed: sprintSpeed,
                stamina: stamina,
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: 0,
            achievementsUnlocked: 0,
        };
        const camel = new Camel(++GameState.lastUsedId, camelInitProperties);
        return camel;
    }
    createCamel(agilityLevel, sprintSpeedLevel, staminaLevel) {
        const agility = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.agility, agilityLevel);
        const sprintSpeed = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.sprintSpeed, sprintSpeedLevel);
        const stamina = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.stamina, staminaLevel);
        const camelInitProperties = {
            colour: this._camelPropertyGenerator.generateColour(),
            name: this._camelPropertyGenerator.generateName(),
            skills: {
                agility: agility,
                sprintSpeed: sprintSpeed,
                stamina: stamina,
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: 0,
            achievementsUnlocked: 0,
        };
        return new Camel(++GameState.lastUsedId, camelInitProperties);
    }
    createCamelFromSerialisedCamel(serialisedCamel) {
        const camelInitProperties = {
            colour: serialisedCamel.colour,
            name: serialisedCamel.name,
            skills: {
                agility: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.agility),
                sprintSpeed: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.sprintSpeed),
                stamina: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.stamina),
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: serialisedCamel.unspentXp,
            achievementsUnlocked: serialisedCamel.achievementsUnlocked,
        };
        return new Camel(serialisedCamel.id, camelInitProperties);
    }
    createSeededCamel(seeds) {
        const agility = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.agility, Math.ceil(seeds[0] * 100));
        const sprintSpeed = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.sprintSpeed, Math.ceil(seeds[1] * 100));
        const stamina = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.stamina, Math.ceil(seeds[2] * 100));
        const camelInitProperties = {
            colour: this._camelPropertyGenerator.generateSeededColour(seeds[3]),
            name: this._camelPropertyGenerator.generateSeededName(seeds[4], seeds[5]),
            skills: {
                agility: agility,
                sprintSpeed: sprintSpeed,
                stamina: stamina,
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: 0,
            achievementsUnlocked: 0,
        };
        return new Camel(++GameState.lastUsedId, camelInitProperties);
    }
    createSeedFromCamel(camel) {
        const radix = 36;
        let encodedString = "";
        // skills
        encodedString += camel.agility.level.toString(radix).padStart(2, "0");
        encodedString += camel.sprintSpeed.level.toString(radix).padStart(2, "0");
        encodedString += camel.stamina.level.toString(radix).padStart(2, "0");
        // colour
        encodedString += (parseInt(camel.colour.substring(1, 7), 16) / 13000).toString(36);
        // name
        encodedString += this._camelPropertyGenerator.generateSeedFromName(camel.name);
        return encodedString;
    }
}
class CamelPropertyGenerator {
    nameAjectives = [
        "Sandy", "Dusty", "Golden", "Majestic", "Spotted",
        "Whirling", "Blazing", "Silent", "Radiant", "Breezy",
        "Amber", "Crimson", "Harmony", "Marble", "Opal",
        "Princess", "Sahara", "Shadow", "Tawny", "Whisper"
    ];
    nameNouns = [
        "Desert", "Oasis", "Pyramid", "Mirage", "Nomad",
        "Sunset", "Sahara", "Dune", "Caravan", "Cactus",
        "Jewel", "Moon", "Oracle", "Sphinx", "Spirit",
        "Sultan", "Talisman", "Treasure", "Zephyr", "Zodiac"
    ];
    generateColour() {
        return this.generateSeededColour(Math.random());
    }
    generateSeededColour(seed) {
        return '#' + (0x000000 + seed * 0x32c8).toString(16);
    }
    generateName() {
        return this.generateSeededName(Math.random(), Math.random());
    }
    generateSeededName(adjectiveSeed, nounSeed) {
        const randomAdjective = this.nameAjectives[Math.floor(adjectiveSeed * this.nameAjectives.length)];
        const randomNoun = this.nameNouns[Math.floor(nounSeed * this.nameNouns.length)];
        return randomAdjective + " " + randomNoun;
    }
    generateSeedFromName(name) {
        let seed = "";
        seed += this.nameAjectives.indexOf(name.split(" ")[0]);
        seed += this.nameNouns.indexOf(name.split(" ")[1]);
        return seed;
    }
    generateTemperament() {
        return this.generateSeededTemperament(Math.random());
    }
    generateSeededTemperament(seed) {
        if (seed < 0.25) {
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
class CamelSkillCreator {
    _levelCurveFactory;
    constructor(_levelCurveFactory) {
        this._levelCurveFactory = _levelCurveFactory;
    }
    generateSkillWithQuality(skillType, quality) {
        const level = Math.ceil(Math.random() * 10 * (quality + 1));
        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        const potentialRange = levelCurve.maxSkillLevel - level;
        const potential = level + Math.floor(Math.random() * potentialRange);
        const initialXp = levelCurve.getXpRequiredForLevel(level, potential);
        return new CamelSkill(skillType, levelCurve, potential, initialXp);
    }
    generateSkillFromSerialisedSkill(serialisedSkill) {
        const xp = serialisedSkill.currentXp;
        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        return new CamelSkill(serialisedSkill.skillType, levelCurve, serialisedSkill.potential, xp);
    }
    generateSkillWithLevel(skillType, level) {
        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        return new CamelSkill(skillType, levelCurve, level, levelCurve.getXpRequiredForLevel(level, level));
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
    constructor(id, camelInitProperties) {
        this.id = id;
        this.colour = camelInitProperties.colour;
        this.name = camelInitProperties.name;
        this.temperament = camelInitProperties.temperament;
        this.unspentXp = camelInitProperties.unspentXp;
        this.agility = camelInitProperties.skills.agility;
        this.sprintSpeed = camelInitProperties.skills.sprintSpeed;
        this.stamina = camelInitProperties.skills.stamina;
        this.achievementsUnlocked = camelInitProperties.achievementsUnlocked;
    }
    colour;
    name;
    temperament;
    achievementsUnlocked = 0;
    unspentXp;
    agility;
    sprintSpeed;
    stamina;
    get level() {
        const skillLevels = [
            this.agility.level,
            this.sprintSpeed.level,
            this.stamina.level
        ];
        const skillLevelSum = skillLevels.reduce((partialSum, newValue) => partialSum + newValue, 0);
        return Math.floor(skillLevelSum / skillLevels.length);
    }
    get potentialLevel() {
        const potentialSkillLevels = [
            this.agility.potential,
            this.sprintSpeed.potential,
            this.stamina.potential
        ];
        const skillLevelSum = potentialSkillLevels.reduce((partialSum, newValue) => partialSum + newValue, 0);
        return Math.floor(skillLevelSum / potentialSkillLevels.length);
    }
    get potentialDescription() {
        const potentialLevel = this.potentialLevel;
        if (potentialLevel <= 10)
            return 'Dismal underachiever';
        else if (potentialLevel <= 20)
            return 'Dismal underachiever';
        else if (potentialLevel <= 30)
            return 'Struggling competitor';
        else if (potentialLevel <= 40)
            return 'Modest hopeless case';
        else if (potentialLevel <= 50)
            return 'Developing talent';
        else if (potentialLevel <= 60)
            return 'Breakthrough prospect';
        else if (potentialLevel <= 70)
            return 'Frontrunner in training';
        else if (potentialLevel <= 80)
            return 'Elite championship aspirant';
        else if (potentialLevel <= 90)
            return 'Future racing star';
        else
            return 'Legendary camel in the making';
    }
    get levelAverage() {
        return (this.agility.level +
            this.sprintSpeed.level +
            this.stamina.level) / 3;
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
        let xTextOffset = 0;
        const xPaddingOffset = 20;
        const nameText = `${camel.name}`;
        const xpText = `XP: ${camel.unspentXp}`;
        this._ctx.fillText(nameText, x, y);
        xTextOffset += this._ctx.measureText(nameText).width;
        this._ctx.fillText(xpText, x + xTextOffset + xPaddingOffset, y);
        xTextOffset += this._ctx.measureText(xpText).width;
        this._ctx.fillText(camel.potentialDescription, x + xTextOffset + 2 * xPaddingOffset, y);
        xTextOffset += this._ctx.measureText(camel.potentialDescription).width;
        // Why y - 20?
        this.drawAwards(camel, x + xTextOffset + 3 * xPaddingOffset, y - 20);
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
        if (xpToNextLevel > 0) {
            this._ctx.fillText(`XP to next: ${xpToNextLevel}`, x + 150, y);
            this._btnService.createBtn(x + 270, y - 20, 30, 30, 0, 5, '#cc807a', '#f2ada7', '#fff', () => levelUpSkillFunc(skill), [`+`]);
        }
    }
    drawSkillStar(skills, x, y) {
        const maxRadius = 99;
        // Center for small screens, otherwise offset from edge
        x = x > 2 * maxRadius ? 2 * maxRadius : x;
        // Draw ring
        this._ctx.strokeStyle = GlobalStaticConstants.mediumColour;
        this._ctx.beginPath();
        this._ctx.arc(x, y, maxRadius, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.lineWidth = 2;
        this._ctx.strokeStyle = "black";
        this._ctx.fillStyle = "black";
        this.drawPotentialOnStar(skills, maxRadius, x, y);
        this.drawSkillsOnStar(skills, maxRadius, x, y);
        // Draw center
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
        this._ctx.arc(x, y, 1, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.fillStyle = "black";
        this._ctx.fill();
    }
    drawSkillsOnStar(skills, maxRadius, x, y) {
        const numberOfSkills = skills.length;
        let points = [];
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
    }
    drawPotentialOnStar(skills, maxRadius, x, y) {
        const numberOfSkills = skills.length;
        let points = [];
        this._ctx.save();
        this._ctx.fillStyle = GlobalStaticConstants.lightColour;
        this._ctx.strokeStyle = GlobalStaticConstants.lightColour;
        skills.forEach((s, i) => {
            // Calculate point
            const angle = 2 * Math.PI * i / numberOfSkills;
            const radius = maxRadius * s.potential / 100;
            const spotX = (r) => x + r * Math.cos(angle);
            const spotY = (r) => y + r * Math.sin(angle);
            points?.push({ x: spotX(radius), y: spotY(radius) });
            // Draw point
            this._ctx.beginPath();
            this._ctx.moveTo(spotX(radius), spotY(radius));
            this._ctx.arc(spotX(radius), spotY(radius), 2, 0, 2 * Math.PI);
            this._ctx.stroke();
            this._ctx.fill();
        });
        // Draw and fill shape
        this._ctx.beginPath();
        points.forEach(p => {
            this._ctx.lineTo(p.x, p.y);
        });
        this._ctx.lineTo(points[0].x, points[0].y);
        this._ctx.stroke();
        this._ctx.fill();
        this._ctx.restore();
    }
    drawAwards(camel, x, y) {
        const achievementLevel = camel.achievementsUnlocked;
        if (achievementLevel < 1)
            return;
        const maxAchievementLevel = 8;
        const scaling = 1 / 8;
        const context = this._ctx;
        const img = new Image();
        img.src = "./graphics/medals.svg";
        img.onload = function () {
            const spriteWidth = img.naturalWidth / maxAchievementLevel;
            context.drawImage(img, // img
            (achievementLevel - 1) * spriteWidth, // sx
            0, // sy
            spriteWidth, // sw
            img.naturalHeight, // sh
            x, // dx
            y, // dy
            spriteWidth * scaling, // dw
            img.naturalHeight * scaling); // dh
        };
    }
}
class CamelSkillQueries {
    getSkills(camel) {
        return [camel.agility, camel.sprintSpeed, camel.stamina];
    }
}
var CamelSkillType;
(function (CamelSkillType) {
    CamelSkillType[CamelSkillType["agility"] = 0] = "agility";
    CamelSkillType[CamelSkillType["sprintSpeed"] = 1] = "sprintSpeed";
    CamelSkillType[CamelSkillType["stamina"] = 2] = "stamina";
})(CamelSkillType || (CamelSkillType = {}));
class CamelSkill {
    skillType;
    levelCurve;
    potential;
    constructor(skillType, levelCurve, potential, initialXp) {
        this.skillType = skillType;
        this.levelCurve = levelCurve;
        this.potential = potential;
        this.potential = Math.min(potential, levelCurve.maxSkillLevel);
        this.potential = Math.max(potential, levelCurve.minSkillLevel);
        this.addXp(initialXp);
    }
    currentXp = 0;
    get name() {
        switch (this.skillType) {
            case CamelSkillType.agility: return 'Agility';
            case CamelSkillType.sprintSpeed: return 'Sprint speed';
            case CamelSkillType.stamina: return 'Stamina';
        }
    }
    get level() {
        return this.levelCurve.getLevelFromXp(this.currentXp, this.potential);
    }
    getXpToNextLevel() {
        if (this.level === this.potential) {
            return 0;
        }
        return this.levelCurve.getXpRequiredForLevel(this.level + 1, this.potential) - this.currentXp;
    }
    addXp(value) {
        if (value < 0) {
            throw Error('Cannot add negative xp');
        }
        this.currentXp += value;
    }
}
class DefaultLevelCurve {
    get minSkillLevel() { return 1; }
    get maxSkillLevel() { return 99; }
    getXpRequiredForLevel(level, potential = 0) {
        return (level - 1) * 100;
    }
    getLevelFromXp(xp, potential) {
        return Math.min(potential, Math.floor(xp / 100) + 1);
    }
}
class LevelCurveFactory {
    getDefaultLevelCurve() {
        return new DefaultLevelCurve();
    }
}
class MapOverview {
    static _canvasXOffset = 0;
    static _canvasYOffset = 0;
    static _mapEventListeners = [];
    static _clickZones = [];
    static _boundingRect = this.getBoundingRect();
    // V2
    static _tileSize = 8;
    static _outerPadding = 2;
    static _tileGap = 0.5;
    static _locationTiles = [];
    static _uiTiles = [];
    static _verticalScreen = GlobalStaticConstants.innerHeight > 0.815 * GlobalStaticConstants.innerWidth;
    static _previousHoverZone = '';
    static getMousePosition(event) {
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }
    static getBoundingRect() {
        return this._verticalScreen ? {
            x: 0,
            y: 0,
            width: GlobalStaticConstants.innerWidth,
            height: 0.815 * GlobalStaticConstants.innerWidth,
        } : {
            x: 0,
            y: 0,
            width: GlobalStaticConstants.innerHeight / 0.815,
            height: GlobalStaticConstants.innerHeight,
        };
    }
    static load() {
        // Set up canvas
        CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
        CanvasService.showCanvas(CanvasNames.MapOverview);
        GameState.Save();
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        const ctx = canvas?.getContext("2d");
        if (!ctx)
            return;
        ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        this.removeEventListeners(canvas);
        // V2 Load tiles
        this._clickZones = [];
        this.loadLocationTiles();
        this.paintLocationTiles(ctx);
        this.loadUiTiles();
        // V1
        this.removeEventListeners(canvas);
        this.addEventListeners(canvas, ctx);
        CalendarOverviewDrawing.drawCalendarOverview(canvas);
        CashMoneyService.drawCashMoney(ctx);
        if (GlobalStaticConstants.debugMode) {
            this.drawDebugGrid(ctx);
        }
    }
    static drawDebugGrid(ctx) {
        ctx.save();
        const gridSize = 32;
        ctx.strokeStyle = "red";
        ctx.font = "8px Arial";
        for (let x = 0; x < GlobalStaticConstants.innerWidth; x += this._boundingRect.width / gridSize) {
            for (let y = 0; y < GlobalStaticConstants.innerHeight; y += this._boundingRect.height / gridSize) {
                ctx.strokeRect(x, y, this._boundingRect.width / gridSize, this._boundingRect.height / gridSize);
                ctx.fillText(`${Math.trunc(x / gridSize)},${Math.trunc(y / gridSize)}`, x, y);
            }
        }
        ctx.strokeStyle = "blue";
        ctx.font = "16px Arial";
        ctx.lineWidth = 4;
        this._clickZones.forEach(z => {
            ctx.strokeRect(z.clickZone.x, z.clickZone.y, z.clickZone.width, z.clickZone.height);
            ctx.fillText(`${z.location}`, z.clickZone.x, z.clickZone.y + 16);
        });
        ctx.restore();
    }
    static addEventListeners(canvas, ctx) {
        const clickHandler = (event) => {
            const mousePosition = this.getMousePosition(event);
            let zone = this.getClickZone(mousePosition);
            switch (zone) {
                case MapLocations.Hire:
                    CanvasService.showAllCanvas();
                    CashMoneyService.drawCashMoney(CanvasService.getCanvasByName(CanvasNames.Recruitment).getContext("2d"));
                    CanvasService.bringCanvasToTop(CanvasNames.Recruitment);
                    break;
                case MapLocations.Gym:
                    if (!GameState.camel) {
                        PopupService.drawAlertPopup("You cannot got to the gym without a camel, you idiot!");
                        return;
                    }
                    CanvasService.showAllCanvas();
                    CanvasService.bringCanvasToTop(CanvasNames.GymBackground);
                    CanvasService.bringCanvasToTop(CanvasNames.GymCamel);
                    new GymDrawing(globalServices.navigatorService).drawGym();
                    break;
                case MapLocations.Mystery:
                    if (!!GameState.camel && GameState.camel.agility.level > 20) {
                        GameState.cashMoney += 1000;
                        CashMoneyService.drawCashMoney(ctx);
                    }
                    if (!!event.altKey) {
                        GlobalStaticConstants.debugMode = !GlobalStaticConstants.debugMode;
                        PopupService.drawAlertPopup(`${GlobalStaticConstants.debugMode ? "Enabled" : "Disabled"} debug mode, you idiot!`);
                    }
                    break;
                case MapLocations.Race:
                    if (!GameState.camel) {
                        PopupService.drawAlertPopup("You cannot enter a race without a camel, you idiot!");
                        return;
                    }
                    globalServices.navigatorService.requestPageNavigation(Page.raceSelection);
                    break;
                case MapLocations.Management:
                    if (!GameState.camel) {
                        PopupService.drawAlertPopup("You cannot manage camel skills without a camel, you idiot!");
                        return;
                    }
                    globalServices.navigatorService.requestPageNavigation(Page.managementSelect);
                    break;
                case MapLocations.Scrolls:
                    globalServices.navigatorService.requestPageNavigation(Page.scrolls);
                    break;
            }
        };
        const hoverHandler = (event) => {
            const mousePosition = this.getMousePosition(event);
            const zone = this.getClickZone(mousePosition);
            if (zone === this._previousHoverZone)
                return;
            canvas.style.cursor = "default";
            this.paintLocationTiles(ctx);
            if (zone !== MapLocations.None) {
                const tile = this.getLocationTileByName(zone);
                if (tile !== null)
                    this.paintTile(ctx, tile, GlobalStaticConstants.highlightColour);
                canvas.style.cursor = "pointer";
            }
            this._previousHoverZone = zone;
            return;
        };
        canvas.addEventListener("click", clickHandler, false);
        canvas.addEventListener("mousemove", hoverHandler, false);
        this._mapEventListeners.push(clickHandler, hoverHandler);
    }
    static removeEventListeners(canvas) {
        this._mapEventListeners.forEach(o => {
            canvas.removeEventListener('click', o, false);
            canvas.removeEventListener('mousemove', o, false);
        });
        this._mapEventListeners = [];
    }
    static isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
    }
    static getClickZone(pos) {
        let location = MapLocations.None;
        this._clickZones.every(z => {
            if (this.isInside(pos, z.clickZone)) {
                location = z.location;
                return false;
            }
            return true;
        });
        return location;
    }
    static loadLocationTiles() {
        this._locationTiles = [];
        const wUnit = this._boundingRect.width / 32;
        const hUnit = this._boundingRect.height / 32;
        let tilesPlacedCount = 0;
        // Add tiles
        const locationsToAdd = [
            MapLocations.Hire,
            MapLocations.Gym,
            MapLocations.Management,
            MapLocations.Race,
            MapLocations.Mystery,
        ];
        // Calculate grid
        let getTilesPerRow = () => Math.min(4, Math.max(1, Math.floor((GlobalStaticConstants.innerWidth - this._outerPadding * wUnit) / ((this._tileSize + this._tileGap) * wUnit))));
        let tilesPerRow = getTilesPerRow();
        if (locationsToAdd.length / tilesPerRow > 3) {
            this._tileSize = 4;
            tilesPerRow = getTilesPerRow();
        }
        locationsToAdd.forEach((tile) => {
            this.addLocationTile(tile, wUnit, hUnit, tilesPlacedCount, tilesPerRow);
            tilesPlacedCount++;
        });
        const scrollAlertMessage = GameState.unreadScrollCount > 0 ? GameState.unreadScrollCount.toString() : undefined;
        this.addLocationTile(MapLocations.Scrolls, wUnit, hUnit, tilesPlacedCount, tilesPerRow, scrollAlertMessage);
        tilesPlacedCount++;
        // Add click zones
        this._locationTiles.forEach((tile) => {
            this._clickZones.push({
                location: tile.name,
                clickZone: tile.position
            });
            tilesPlacedCount++;
        });
    }
    static addLocationTile(tile, wUnit, hUnit, tilesPlacedCount, tilesPerRow, alertText = undefined) {
        this._locationTiles.push(new MapTile(tile, new Rect(((tilesPlacedCount % tilesPerRow) * (this._tileSize + this._tileGap) * wUnit) + this._canvasXOffset + this._outerPadding * wUnit, Math.floor(tilesPlacedCount / tilesPerRow) * (this._tileSize + this._tileGap) * hUnit + this._canvasYOffset + this._outerPadding * hUnit, this._tileSize * wUnit, this._tileSize * hUnit), `./map/tile-${tile}.svg`, alertText));
    }
    static paintLocationTiles(ctx) {
        this._locationTiles.forEach((tile) => {
            this.paintTile(ctx, tile);
        });
    }
    static paintTile(ctx, mapTile, borderColour = GlobalStaticConstants.mediumColour) {
        // Don't draw tiles off-screen
        if (mapTile.position.y + mapTile.position.height > this._boundingRect.y + this._boundingRect.height)
            return;
        ctx.save();
        ctx.strokeStyle = borderColour;
        ctx.lineWidth = 4;
        const img = new Image();
        img.src = mapTile.backgroundImagePath;
        ctx.drawImage(img, mapTile.position.x, mapTile.position.y, mapTile.position.width, mapTile.position.height);
        ctx.strokeRect(mapTile.position.x, mapTile.position.y, mapTile.position.width, mapTile.position.height);
        if (!!mapTile.alertText) {
            const alertRadius = 20; // Adjust the radius as needed
            const alertX = mapTile.position.x + mapTile.position.width - alertRadius - 10; // Adjust position as needed
            const alertY = mapTile.position.y + alertRadius + 10; // Adjust position as needed
            ctx.fillStyle = '#D0312D';
            ctx.beginPath();
            ctx.arc(alertX, alertY, alertRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16pt Garamond';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(mapTile.alertText, alertX, alertY + 2);
        }
        ctx.restore();
    }
    static getLocationTileByName(name) {
        const matches = this._locationTiles.filter((tile) => {
            return tile.name === name;
        });
        return matches.length >= 0 ? matches[0] : null;
    }
    static loadUiTiles() {
    }
}
class MapLocations {
    static None = "";
    static Hire = "Hire";
    static Gym = "Gym";
    static Mystery = "Mystery";
    static Race = "Race";
    static Management = "Management";
    static Scrolls = "Scrolls";
}
class UiElements {
    static Money = "UiMoney";
    static Calendar = "UiCalendar";
}
class MapTile {
    name;
    position;
    backgroundImagePath;
    alertText;
    constructor(name, position, backgroundImagePath, alertText = undefined) {
        this.name = name;
        this.position = position;
        this.backgroundImagePath = backgroundImagePath;
        this.alertText = alertText;
    }
}
class Rect {
    x;
    y;
    width;
    height;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
            const scrollsSection = document.getElementById('scrolls');
            if (!!scrollsSection) {
                scrollsSection.innerHTML = '';
                scrollsSection.style.display = 'none';
            }
            switch (this._currentPage) {
                case Page.loading:
                    this.navigateToLoading();
                    break;
                case Page.mapOverview:
                    MapOverview.load();
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
                case Page.calendarDetails:
                    this.navigateToCalendarDetails();
                    break;
                case Page.debug:
                    isometricEditorComponent.load();
                    break;
                case Page.scrolls:
                    scrollsComponent.load();
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
    navigateToCalendarDetails() {
        CanvasService.showCanvas(CanvasNames.CalendarDetails);
        CalendarDetailsDrawing.drawCalendarDetails();
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
    Page[Page["calendarDetails"] = 7] = "calendarDetails";
    Page[Page["debug"] = 8] = "debug";
    Page[Page["scrolls"] = 9] = "scrolls";
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
        race.racingCamels
            .sort((a, b) => this.sortCamels(a, b))
            .forEach(racingCamel => {
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
        var rgb = [Math.round(color1[0] * w1 + color2[0] * w2), Math.round(color1[1] * w1 + color2[1] * w2), Math.round(color1[2] * w1 + color2[2] * w2)];
        return "#" + this.componentToHex(rgb[0]) + this.componentToHex(rgb[1]) + this.componentToHex(rgb[2]);
    }
    drawCamel(camel, heightOffset) {
        const x = 5.5;
        const y = -6.5;
        const camelService = new CanvasCamelService(this.ctx);
        camelService.drawCamelScreenCoords(GlobalStaticConstants.innerWidth - 150, 70 - heightOffset * 10, 10, camel.camel.colour);
        this.ctx.fillStyle = "#96876e";
        if (this.isCamelUserOwned(camel.camel)) {
            this.ctx.fillStyle = "#96876e";
            this.ctx.fillText(camel.camel.name, GlobalStaticConstants.innerWidth - 100, 59 - heightOffset * 10);
        }
        this.ctx.fillStyle = "#000";
        this.ctx.font = "10pt Garamond";
        const completionPercentage = Math.min(1, Math.round(camel.completionPercentage * 100) / 100);
        this.ctx.beginPath();
        this.ctx.fillStyle = "#fff";
        this.ctx.roundRect(GlobalStaticConstants.innerWidth - 100, 70 - heightOffset * 10, 80, 10, 5);
        this.ctx.fill();
        this.ctx.closePath();
        const colour = this.getProgressBarColour([255, 238, 150], [61, 204, 83], 1 - camel.completionPercentage);
        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.roundRect(GlobalStaticConstants.innerWidth - 100, 70 - heightOffset * 10, 80 * completionPercentage, 10, 5);
        this.ctx.fill();
        this.ctx.closePath();
        if (GlobalStaticConstants.debugMode) {
            this.ctx.save();
            this.ctx.fillStyle = "black";
            this.ctx.fillText(`S:${camel.camel.sprintSpeed.level} A:${camel.agility} St:${camel.stamina}`, GlobalStaticConstants.innerWidth - 130, 70 - heightOffset * 10);
            this.ctx.fillText(`Speed:${camel.currentSpeed.toPrecision(3)}`, GlobalStaticConstants.innerWidth - 130, 80 - heightOffset * 10);
            this.ctx.fillText(`Form:${camel.form.toPrecision(3)}`, GlobalStaticConstants.innerWidth - 130, 90 - heightOffset * 10);
            this.ctx.restore();
        }
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
                        if (random < 1) {
                            this.drawPalmTree(i, j, height);
                        }
                        else if (random < 2) {
                            this.drawRocks(i, j, height);
                        }
                        else if (random < 2.5) {
                            this.drawOasis(i, j, height);
                        }
                        else if (random < 6) {
                            this.drawCactus(i, j, height);
                        }
                        else if (random < 8) {
                            this.drawCactus2(i, j, height);
                        }
                        else if (random < 9) {
                            if (height > 0.1) {
                                this.drawPyramid(i, j, height);
                            }
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
    drawRocks(x, y, height) {
        var xOffset = (Math.random() - 0.5) * 0.5;
        var yOffset = (Math.random() - 0.5) * 0.5;
        const rockToDraw = Math.random() < 0.5 ? RookCoords.smallRock1 : RookCoords.smallRock2;
        rockToDraw.forEach(coord => {
            this.backgroundCubeService.drawCube(x + +xOffset + coord.x / 10, y + yOffset + coord.y / 10, GlobalStaticConstants.baseCubeSize / 10, coord.colour, height * 10);
        });
    }
    drawPalmTree(i, j, height) {
        var xOffset = (Math.random() - 0.5) * 0.5;
        var yOffset = (Math.random() - 0.5) * 0.5;
        const size = GlobalStaticConstants.baseCubeSize / 10;
        this.backgroundCubeService.drawCube(i - 0.5 + xOffset, j + yOffset, size, Colours.green, height + 5);
        this.backgroundCubeService.drawCube(i - 0.4 + xOffset, j + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i - 0.3 + xOffset, j + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i - 0.2 + xOffset, j + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i - 0.1 + xOffset, j + yOffset, size, Colours.green, height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.5 + yOffset, size, Colours.green, height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.4 + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.3 + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.2 + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j - 0.1 + yOffset, size, Colours.green, height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 1);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 2);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 3);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 4);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, size, '#b18579', height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.1 + yOffset, size, Colours.green, height + 5);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.2 + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.3 + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.4 + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i + xOffset, j + 0.5 + yOffset, size, Colours.green, height + 5);
        this.backgroundCubeService.drawCube(i + 0.1 + xOffset, j + yOffset, size, Colours.green, height + 5);
        this.backgroundCubeService.drawCube(i + 0.2 + xOffset, j + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i + 0.3 + xOffset, j + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i + 0.4 + xOffset, j + yOffset, size, Colours.green, height + 6);
        this.backgroundCubeService.drawCube(i + 0.5 + xOffset, j + yOffset, size, Colours.green, height + 5);
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
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1.5 + camel.jumpHeight, 0, 0);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 0, 1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, 1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, 2);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 2 + camel.jumpHeight, 0, 2);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, camel.jumpHeight, 0, 3);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, 3);
    }
    drawNegativeXCamel(newXCoord, newYCoord, camel, size) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1.5 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 2, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 2 + camel.jumpHeight, 2, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 3, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 3, -1.5);
    }
    drawPositiveYCamel(newXCoord, newYCoord, camel, size) {
        const xCoord = newXCoord + 0.25;
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, 0);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 2 + camel.jumpHeight, 0, 0);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 0, 1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, 1);
        this.camelCubeService.drawCube(xCoord, newYCoord, size, camel.camel.colour, 1.5 + camel.jumpHeight, 0, 2);
    }
    drawPositiveXCamel(newXCoord, newYCoord, camel, size) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 0 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 2 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 0 + camel.jumpHeight, 1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1 + camel.jumpHeight, 1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, size, camel.camel.colour, 1.5 + camel.jumpHeight, 2, -1.5);
    }
    drawCactus(x, y, height) {
        var xOffset = (Math.random() - 0.5) * 0.25;
        var yOffset = (Math.random() - 0.5) * 0.25;
        CactusCoords.cactus.forEach(coord => {
            this.backgroundCubeService.drawCube(x + xOffset + coord.x / 10, y + yOffset + coord.y / 10, GlobalStaticConstants.baseCubeSize / 10, coord.colour, height * 10);
        });
    }
    drawCactus2(x, y, height) {
        var xOffset = (Math.random() - 0.5) * 0.25;
        var yOffset = (Math.random() - 0.5) * 0.25;
        CactusCoords.cactus2.forEach(coord => {
            this.backgroundCubeService.drawCube(x + xOffset + coord.x / 10, y + yOffset + coord.y / 10, GlobalStaticConstants.baseCubeSize / 10, coord.colour, height * 10);
        });
    }
    drawPyramid(x, y, height) {
        PyramidCoords.dilapidated.forEach(coord => {
            this.backgroundCubeService.drawCube(x + coord.x / 10, y + coord.y / 10, GlobalStaticConstants.baseCubeSize / 10, coord.colour, height * 10);
        });
    }
    drawOasis(x, y, height) {
        OasisCoords.oasis.forEach(coord => {
            this.backgroundCubeService.drawCube(x + coord.x / 10, y + coord.y / 10, GlobalStaticConstants.baseCubeSize / 10, coord.colour, height * 10);
        });
    }
}
class RaceManagement {
    _musicService;
    _raceSimulation;
    _camelCreator;
    constructor(_musicService, _raceSimulation, _camelCreator) {
        this._musicService = _musicService;
        this._raceSimulation = _raceSimulation;
        this._camelCreator = _camelCreator;
    }
    addCamelToRace(camel, race) {
        const racingCamel = new RacingCamel(camel);
        race.racingCamels.push(racingCamel);
    }
    // private addCpuCamelsToRace(
    //     raceSize: number,
    //     competitorQuality: InitCamelQuality,
    //     race: Race) {
    //     for (let i = 0; i < raceSize; i++) {
    //         const competitorCamel = this._camelCreator.createRandomCamelWithQuality(competitorQuality);
    //         this.addCamelToRace(competitorCamel, race);
    //     }
    // }
    addCpuCamelsToRace(raceSize, raceDifficulty, race) {
        globalServices.camelStable.populateStable();
        let sortedCamels = globalServices.camelStable.camels
            .map(c => c) // copy array
            .sort((c1, c2) => Math.abs(c1.levelAverage - raceDifficulty) - Math.abs(c2.levelAverage - raceDifficulty));
        for (let i = 0; i < raceSize; i++) {
            if (sortedCamels.length === 0)
                break;
            this.addCamelToRace(sortedCamels.shift(), race);
        }
    }
    createRace(raceLength, prizeCashMoney, raceSize, difficulty) {
        let competitorQuality = 0; // Average level of competitors
        if (difficulty === Difficulty.Easy) {
            competitorQuality = 40;
        }
        else if (difficulty === Difficulty.Normal) {
            competitorQuality = 50;
        }
        else {
            competitorQuality = 90;
        }
        const trackCreator = new RaceTrackCreator();
        const track = trackCreator.createTrack(raceLength);
        const race = new Race(raceLength, track, prizeCashMoney, difficulty);
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
    updateCalendar() {
        GameState.calendar.moveToNextDay();
    }
    handleFinishedRace(race) {
        if (!GameState.camel)
            return;
        let position = race.racingCamels.filter(o => o.camel == GameState.camel)[0].finalPosition;
        position = position ??
            1 +
                race.racingCamels.sort((a, b) => b.completionPercentage - a.completionPercentage).map(o => o.camel).indexOf(GameState.camel);
        const prizeCashMoney = this.getPrizeMoney(race, position);
        GameState.cashMoney += prizeCashMoney;
        const xpGained = (race.racingCamels.length - position + 1) * 100;
        GameState.camel.unspentXp += xpGained;
        if (position === 1 && GameState.camel.achievementsUnlocked < race.difficulty + 1) {
            GameState.camel.achievementsUnlocked = Math.max(GameState.camel.achievementsUnlocked, race.difficulty + 1);
        }
        race.raceState = RaceState.none;
        this._musicService.setAudio('HomeScreenAudio');
        this._musicService.startAudio();
        this.updateCalendar();
        CanvasService.hideAllCanvas();
        MapOverview.load();
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
        const borderWidth = 5;
        const enterStreetRace = () => this.selectRace(40, 100, 0, 5, Difficulty.Easy);
        const enterLocalDerby = () => this.selectRace(80, 500, 200, 8, Difficulty.Normal);
        const enterWorldCup = () => this.selectRace(100, 10000, 300, 15, Difficulty.Hard);
        const middleX = this._canvas.width / GlobalStaticConstants.devicePixelRatio / 2;
        const middleY = this._canvas.height / GlobalStaticConstants.devicePixelRatio / 2;
        this._btnService.drawBackButton(Page.mapOverview);
        this._btnService.createBtn(middleX - 400, middleY / 2, 800, 50, radius, borderWidth, '#cc807a', '#f2ada7', '#fff', enterStreetRace, ['Street race | Entry $0 | Prize $100']);
        this._btnService.createBtn(middleX - 400, middleY, 800, 50, radius, borderWidth, '#debb49', '#f5d671', '#fff', enterLocalDerby, ['Local derby | Entry $200 | Prize $500']);
        this._btnService.createBtn(middleX - 400, middleY * 4 / 3, 800, 50, radius, borderWidth, '#569929', '#7ac24a', '#fff', enterWorldCup, ['World cup | Entry $300 | Prize $10000']);
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
        race.racingCamels.forEach((x) => x.startJump());
    }
    simulateRaceStep(race) {
        race.racingCamels.forEach((racingCamel) => {
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
            const intelligenceOffset = 40;
            let speed = 0;
            const remainingDistance = race.length * (1 - racingCamel.completionPercentage);
            const completedDistance = race.length * racingCamel.completionPercentage;
            const sprintDuration = this.GetVariantNumber(6, 2);
            const sprintingSpeed = speedOffset + racingCamel.camel.sprintSpeed.level * speedMultiplier;
            const baseSpeed = 0.75 * sprintingSpeed;
            const deadSpeed = 0.25;
            const accelerationRate = agilityOffset + (agilityMultiplier * racingCamel.agility) / 100;
            const decelerationRate = (1 + racingCamel.currentSpeed / 10) / ((racingCamel.stamina + staminaOffset) * staminaMultiplier);
            const baseInconsistancyRate = intelligenceMultiplier + intelligenceOffset; // TODO new skill just dropped?
            let inconsistancyRate = (baseInconsistancyRate * racingCamel.completionPercentage) / 10;
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
            racingCamel.form *= 0.999;
            speed += form;
            speed = Math.max(speed, deadSpeed); // still walking
            speed *= finalSpeedMultiplier;
            racingCamel.currentSpeed = speed;
            const newCompletedDistance = completedDistance + GameState.secondsPassed * speed;
            racingCamel.completionPercentage = newCompletedDistance / race.length;
            if (racingCamel.completionPercentage >= 1) {
                racingCamel.finalPosition = this._nextPosition++;
                if (race.racingCamels.filter((o) => o.finalPosition).length >= 3) {
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
    createTrack(length) {
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
    _globalServices;
    constructor(_globalServices) {
        this._globalServices = _globalServices;
    }
    registerComponents() {
        const raceSimulation = new RaceSimulation();
        const raceManagement = new RaceManagement(this._globalServices.musicService, raceSimulation, this._globalServices.camelCreator);
        this.registerRaceCamelSelectComponent(raceManagement);
        this.registerRaceSelection(raceManagement);
        this.registerRaceComponent(raceManagement);
    }
    registerRaceCamelSelectComponent(raceManagement) {
        const selectRaceCamelFunc = (camel) => {
            GameState.camel = camel;
            raceManagement.addCamelToRace(camel, race);
            this._globalServices.navigatorService.requestPageNavigation(Page.race);
            this._globalServices.musicService.setAudio("RaceAudio");
            this._globalServices.musicService.startAudio();
            race.raceState = RaceState.triggered;
        };
        raceCamelSelectComponent = new CamelSelectComponent(selectRaceCamelFunc);
    }
    registerRaceSelection(raceManagement) {
        raceSelection = new RaceSelection(this._globalServices.navigatorService, raceManagement);
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
    difficulty;
    constructor(length, track, prizeCashMoney, difficulty) {
        this.length = length;
        this.track = track;
        this.prizeCashMoney = prizeCashMoney;
        this.difficulty = difficulty;
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
    _camelCreator;
    constructor(_navigator, _camelCreator) {
        this._navigator = _navigator;
        this._camelCreator = _camelCreator;
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
        MapOverview.load();
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
        GameState.camel = this._camelCreator.createRandomCamelWithQuality(quality);
        ;
        GameState.camels.push(GameState.camel);
        PopupService.drawAlertPopup(`Recruited ${GameState.camel.name}!`);
        this._recruitedCamel = true;
        GameState.scrolls.push(MerchantIceScrolls.getCamelPurchase(GameState.camel));
        if (GameState.camels.length === 1) {
            GameState.scrolls.push(GeneralWasteScrolls.welcome);
        }
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
        const borderWidth = 5;
        let btnX = 240;
        let btnY = 250;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, borderWidth, '#cc807a', '#f2ada7', '#fff', this.spendLowCashMoney, ['Recruit lowly camel - $100']);
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - 60, camelSize, '#cc807a');
        btnX = 840;
        btnY = 250;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, borderWidth, '#debb49', '#f5d671', '#fff', this.spendMediumCashMoney, ['Recruit mediocre camel - $200']);
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - 60, camelSize, '#debb49');
        btnX = 540;
        btnY = 650;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, borderWidth, '#569929', '#7ac24a', '#fff', this.spendHighCashMoney, ['Recruit high camel - $300']);
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - 60, camelSize, '#509124');
        CashMoneyService.drawCashMoney(this._ctx);
    }
}
class ScrollsComponent {
    _navigator;
    constructor(_navigator) {
        this._navigator = _navigator;
    }
    load() {
        const scrollsSection = document.getElementById('scrolls');
        if (!scrollsSection) {
            throw new Error('No scrolls element');
        }
        scrollsSection.style.display = 'flex';
        this.createScrollsList(scrollsSection);
        this.createBackButton(scrollsSection);
    }
    createBackButton(scrollsSection) {
        const button = document.createElement('button');
        button.classList.add('scrolls__back');
        button.innerText = 'Back';
        button.onclick = () => this._navigator.requestPageNavigation(Page.mapOverview);
        scrollsSection.appendChild(button);
    }
    createScrollsList(scrollsSection) {
        const heading = document.createElement('h1');
        heading.appendChild(document.createTextNode('Scrolls'));
        scrollsSection.appendChild(heading);
        const list = document.createElement('ul');
        scrollsSection.appendChild(list);
        const sortedScrolls = GameState.scrolls.sort((a, b) => Number(a.read) - Number(b.read));
        sortedScrolls.forEach(scroll => this.addScrollToList(list, scroll));
    }
    addScrollToList(list, scroll) {
        const listItem = document.createElement('li');
        listItem.classList.add('scroll');
        if (scroll.read) {
            listItem.classList.add('scroll--read');
        }
        const scrollOverview = document.createElement('div');
        scrollOverview.classList.add('scroll__overview');
        const scrollPictureContainer = document.createElement('div');
        scrollPictureContainer.classList.add('scroll__picture-container');
        const scrollPicture = document.createElement('div');
        scrollPicture.classList.add('scroll__picture');
        scrollPictureContainer.appendChild(scrollPicture);
        const scrollSubject = document.createElement('div');
        scrollSubject.classList.add('scroll__subject');
        scrollSubject.appendChild(document.createTextNode(scroll.subject));
        const scrollSender = document.createElement('div');
        scrollSender.classList.add('scroll__sender');
        scrollSender.appendChild(document.createTextNode(scroll.sender));
        const scrollBody = document.createElement('div');
        scrollBody.classList.add('scroll__body');
        scrollBody.appendChild(document.createTextNode(scroll.body));
        scrollOverview.onclick = () => {
            listItem.classList.toggle('scroll__expanded');
            if (!scroll.read) {
                scroll.read = true;
                listItem.classList.add('scroll--read');
            }
        };
        listItem.appendChild(scrollOverview);
        scrollOverview.appendChild(scrollPictureContainer);
        scrollOverview.appendChild(scrollSubject);
        scrollOverview.appendChild(scrollSender);
        listItem.appendChild(scrollBody);
        list.appendChild(listItem);
    }
}
class ScrollsStartup {
    _globalServices;
    constructor(_globalServices) {
        this._globalServices = _globalServices;
    }
    registerComponents() {
        scrollsComponent = new ScrollsComponent(globalServices.navigatorService);
    }
}
class EmmaDaleScrolls {
    static get welcome() {
        return {
            sender: 'Emma Dale',
            subject: 'Welcome to Camel Racing Adventures!',
            body: `Welcome, Manager! 🐪 Ready to conquer the desert tracks? 
            As your racing guide, I'm here to help. 
            Train hard, master the sands, and aim for victory. 
            Remember, teamwork counts. Good luck in the races! 🏁 - Emma Dale`,
            read: false
        };
    }
}
class GeneralWasteScrolls {
    static get welcome() {
        return {
            sender: 'General Waste',
            subject: 'Advice for the Enthusiastic Newcomer 🐫',
            body: `I hope you're enjoying your little camel racing escapade. While it's cute that you're trying, you might find this endeavor slightly more challenging than anticipated. Don't hesitate to reach out to us seasoned racers; we'll try not to laugh too hard at your struggles.
            
            Sincerely,
            General Waste`,
            read: false
        };
    }
}
class MerchantIceScrolls {
    static getCamelPurchase(camel) {
        return {
            sender: 'Merchant Ice',
            subject: 'Celebrating Your New Camel',
            body: `Dear Camel Owner,

            Congratulations on your purchase of ${camel.name}! Your new camel is a magnificent creature with a rich history, it's in its prime, boasting a striking ${camel.colour} coat that glistens in the sun. This majestic camel hails from the land of Egypt, known for its prized camels.
            
            We've attached the official camel papers for your records. Take good care of this remarkable camel, and may your journeys together be filled with adventure.
            
            Best regards,
            Merchant Ice`,
            read: false
        };
    }
}
