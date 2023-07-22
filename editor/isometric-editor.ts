class IsometricEditorComponent {
    constructor(
        private readonly _cubeService: CubeService
    ) { }

    private _cubeCoords: Array<{ x: number, y: number, colour: string }> = [];
    private _colour: string = Colours.grey;

    load() {
        CanvasService.showCanvas(CanvasNames.Debug);
        const canvas = CanvasService.getCanvasByName(CanvasNames.Debug);

        this.drawGround();
        this.drawButtons(canvas);

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const coords = ImportantService.ConvertRealToCoord(x, y, GlobalStaticConstants.baseCubeSize);

            if (coords.y2 > 10) {
                return;
            }

            canvas.getContext('2d')!.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

            this.addCube({ x: Math.floor(coords.x2) - 1, y: Math.floor(coords.y2) - 1, colour: this._colour });

            this.redraw();

            console.log(this._cubeCoords);
        });
    }

    private addCube(newCube: { x: number, y: number, colour: string }) {
        const existingCube = this._cubeCoords
            .filter(o => o.x === newCube.x && o.y === newCube.y);

        if (existingCube.length > 0) {
            this._cubeCoords.splice(this._cubeCoords.indexOf(existingCube[0]), 1);
        }

        this._cubeCoords.push(newCube);
    }

    private redraw() {
        this.drawGround();
        this.drawCubes();
    }

    private drawCubes() {
        this._cubeCoords.forEach((cube) => {
            this._cubeService.drawCube(cube.x, cube.y, GlobalStaticConstants.baseCubeSize, cube.colour, 0);
        })
    }

    private drawGround() {
        const canvasColour = '#C2B280';

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this._cubeService.drawCube(i, j, GlobalStaticConstants.baseCubeSize, canvasColour, 0);
            }
        }
    }

    private drawPaletteButton(
        btnService: CanvasBtnService,
        maxX: number,
        maxY: number,
        position: number,
        colour: string
    ) {
        btnService.createBtn(
            (position + 2) * maxX / 40 + (position + 1) * 20,
            maxY - 100,
            maxX / 40,
            50,
            0,
            5,
            colour,
            colour,
            '#fff',
            () => { this._colour = colour; console.log(this._colour, colour) },
            ['']);
    }

    private drawButtons(canvas: HTMLCanvasElement) {
        const btnService = new CanvasBtnService(canvas, globalServices.navigatorService);

        const maxX = canvas.width / GlobalStaticConstants.devicePixelRatio;
        const maxY = canvas.height / GlobalStaticConstants.devicePixelRatio;

        btnService.createBtn(
            maxX / 40,
            maxY - 100,
            maxX / 40,
            50,
            0,
            5,
            '#cc807a',
            '#f2ada7',
            '#fff',
            () => {
                this._cubeCoords.pop();
                this.redraw()
            },
            ['<-']);

        this.drawPaletteButton(btnService, maxX, maxY, 0, Colours.green);
        this.drawPaletteButton(btnService, maxX, maxY, 1, Colours.grey);
    }
}