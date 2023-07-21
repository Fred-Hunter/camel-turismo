class IsometricEditorComponent {
    constructor(
        private readonly _cubeService: CubeService
    ) { }

    private _cubeCoords: Array<{x: number, y: number, colour: string}> = [];
    private _colour: string = '#555555';

    load() {
        CanvasService.showCanvas(CanvasNames.Debug);
        this.drawGround();

        const canvas = CanvasService.getCanvasByName(CanvasNames.Debug);

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const coords = ImportantService.ConvertRealToCoord(x, y, GlobalStaticConstants.baseCubeSize);

            canvas.getContext('2d')!.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

            this._cubeCoords.push({x: Math.floor(coords.x2) - 1, y: Math.floor(coords.y2) - 1, colour: this._colour});
            
            this.drawGround();
            this.drawCubes();

            console.log(this._cubeCoords);
        });
    }

    drawCubes() {
        this._cubeCoords.forEach((coords) => {
            this._cubeService.drawCube(coords.x, coords.y, GlobalStaticConstants.baseCubeSize, '#555555', 0);
        })
    }

    drawGround() {
        const canvasColour = '#C2B280';

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this._cubeService.drawCube(i, j, GlobalStaticConstants.baseCubeSize, canvasColour, 0);
            }
        }
    }
}