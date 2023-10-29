"use strict";
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
