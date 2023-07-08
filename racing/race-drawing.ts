class RaceDrawing {
    constructor(
        private readonly _backgroundCanvas: HTMLCanvasElement,
        private readonly _camelCanvas: HTMLCanvasElement,
    ) {
        this.backgroundCubeService = new CubeService(_backgroundCanvas.getContext("2d")!);
        this.camelCubeService = new CubeService(_camelCanvas.getContext("2d")!);
    }

    private backgroundCubeService: CubeService;
    private camelCubeService: CubeService;

    public drawRaceCourse() {
        const ctx = this._backgroundCanvas.getContext("2d")!;

        ctx.fillStyle = '#e8d7a7';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        const canvasColour = '#C2B280';

        const raceTrackCoords = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10]];

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (raceTrackCoords.filter(o => o[0] === i && o[1] === j).length > 0) {
                    this.backgroundCubeService.drawCube(i, j, 50, '#5892a1', -0.2);
                } else {
                    this.backgroundCubeService.drawCube(i, j, 50, canvasColour);
                }
            }
        }
    }

    public drawCamels(race: Race) {
        const ctx = this._camelCanvas.getContext("2d")!;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        race.racingCamels.forEach(camel => this.drawCamel(camel));
    }

    public drawCamel(camel: RacingCamel) {
        const xCoord = 1;
        const yCoord = 1 + 9 * camel.completionPercentage;

        /// OLLIE CHANGE THE DIRECTIONS
        // if (this.containsW) {
            this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1.5, 0, -3);
            this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 0, 0, -2);
            this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 0, -2);
            this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 0, -1);
            this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 2, 0, -1);
            this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color);
            this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1);
        // } else if (this.containsA) {
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1.5, -2, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 0, -1, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, -1, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 0, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 2, 0, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 0, 1, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 1, -1.5);
        // } else if (this.containsS) {
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 0, 0, -3);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 0, -3);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 0, -2);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 2, 0, -2);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 0, 0, -1);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 0, -1);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1.5, 0);
        // } else if (this.containsD) {
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 0, -1.5, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, -1.5, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, -0.5, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 2, -0.5, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 0, 0.5, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 0.5, -1.5);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1.5, 1.5, -1.5);
        // } else {
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1.5, 0, -3);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 0, 0, -2);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 0, -2);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1, 0, -1);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 2, 0, -1);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color);
        //     this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.color, 1);
        // }
    }
}
