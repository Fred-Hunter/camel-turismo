import { Colour } from "../assets/colours.js";
import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { GlobalStaticConstants } from "../global/global-static-constants.js";
import { ImportantService } from "../global/important-service.js";
export class IsometricEditorComponent {
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
    _colour = Colour.grey;
    _size = 15;
    _scale = 0.75;
    load() {
        CanvasService.showCanvas(CanvasNames.Debug);
        this.drawGround();
        this.drawButtons();
        this.redraw();
        this._canvas.addEventListener('click', (event) => {
            const rect = this._canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const coords = ImportantService.ConvertRealToCoord(x, y, this._scale);
            if (coords.y2 > this._size) {
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
            this._cubeService.drawCube(cube.colour, cube.x, cube.y, this._scale);
        });
    }
    drawGround() {
        for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++) {
                this._cubeService.drawCube(Colour.sand, i, j, this._scale);
            }
        }
    }
    drawPaletteButton(maxX, maxY, position, colour) {
        this._btnService.createBtn((position + 2) * maxX / 40 + (position + 1) * 20, maxY - 100, maxX / 40, 50, 0, 5, colour, colour, Colour.white, () => this._colour = colour, ['']);
    }
    drawButtons() {
        const maxX = this._canvas.width / GlobalStaticConstants.devicePixelRatio;
        const maxY = this._canvas.height / GlobalStaticConstants.devicePixelRatio;
        this._btnService.createBtn(maxX / 40, maxY - 100, maxX / 40, 50, 0, 5, Colour.sand, Colour.sand, Colour.white, () => {
            if (this._cubeCoordHistory.length === 1) {
                return;
            }
            this._cubeCoordHistory.pop();
            this._cubeCoords = [...this._cubeCoordHistory.at(-1)];
            this.redraw();
        }, ['<-']);
        this.drawPaletteButton(maxX, maxY, 0, Colour.green);
        this.drawPaletteButton(maxX, maxY, 1, Colour.lightGreen);
        this.drawPaletteButton(maxX, maxY, 2, Colour.grey);
        this.drawPaletteButton(maxX, maxY, 3, Colour.lightGrey);
        this.drawPaletteButton(maxX, maxY, 4, Colour.sand);
        this.drawPaletteButton(maxX, maxY, 5, Colour.lightSand);
        this.drawPaletteButton(maxX, maxY, 6, Colour.darkSand);
        this.drawPaletteButton(maxX, maxY, 7, Colour.blue);
        this.drawPaletteButton(maxX, maxY, 8, Colour.brown);
        this.drawPaletteButton(maxX, maxY, 9, Colour.lightBrown);
        this.drawPaletteButton(maxX, maxY, 10, Colour.white);
    }
}
