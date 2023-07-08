class RaceDrawing {
    constructor(
        private readonly _canvas: HTMLCanvasElement
    ) {
        this.cubeService = new CubeService(_canvas.getContext("2d")!);
    }

    private cubeService: CubeService;

    public drawRaceCourse() {
        const ctx = this._canvas.getContext("2d")!;

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        const canvasColour = '#C2B280';

        const raceTrackCoords = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10]];

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (raceTrackCoords.filter(o => o[0] === i && o[1] === j).length > 0) {
                    this.cubeService.drawCube(i, j, 50, '#5892a1', -0.2);
                } else {
                    this.cubeService.drawCube(i, j, 50, canvasColour);
                }
            }
        }
    }

    public drawCamels(race: Race) {
        const ctx = this._canvas.getContext("2d")!;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        race.racingCamels.forEach(camel => this.drawCamel(camel));
    }

    public drawCamel(camel: RacingCamel) {
        const xCoord = 1;
        const yCoord = 1 + 9 * camel.completionPercentage;
        this.cubeService.drawCube(xCoord, yCoord, 10, '#fff');
    }
}
