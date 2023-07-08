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

    private raceTrackCoords = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
    [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    [10, 9], [10, 8], [10, 7]];

    public drawRaceCourse() {
        const ctx = this._backgroundCanvas.getContext("2d")!;

        ctx.fillStyle = '#e8d7a7';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        const canvasColour = '#C2B280';

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (this.raceTrackCoords.filter(o => o[0] === i && o[1] === j).length > 0) {
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
        const numberOfRaceTrackCoords = this.raceTrackCoords.length;
        const currectCoordIndex = Math.floor(camel.completionPercentage * numberOfRaceTrackCoords);

        const currentCoordPercentage = currectCoordIndex / numberOfRaceTrackCoords;
        const nextCoordPercentage = (currectCoordIndex + 1) / numberOfRaceTrackCoords;

        const percentageTowardsNextCoord = (camel.completionPercentage - currentCoordPercentage) /
            (nextCoordPercentage - currentCoordPercentage);

        const currentCoord = this.raceTrackCoords[currectCoordIndex];
        const previousCoord = currectCoordIndex > 0 ? this.raceTrackCoords[currectCoordIndex - 1] : currentCoord;

        const movingInPositiveX = currentCoord[0] > previousCoord[0];
        const movingInNegativeX = currentCoord[0] < previousCoord[0];
        const movingInPositiveY = currentCoord[1] > previousCoord[1];
        const movingInNegativeY = currentCoord[1] < previousCoord[1];

        const offset = percentageTowardsNextCoord;

        const newXCoord = movingInPositiveX ? currentCoord[0] + offset :
            movingInNegativeX ? currentCoord[0] - offset :
                currentCoord[0];

        const newYCoord = movingInPositiveY ? currentCoord[1] + offset :
            movingInNegativeY ? currentCoord[1] - offset :
                currentCoord[1];

        if (movingInNegativeY) {
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1.5, 0, -3);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0, 0, -2);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, 0, -2);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, 0, -1);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 2, 0, -1);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1);
        } else if (movingInNegativeX) {
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1.5, -2, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0, -1, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, -1, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, 0, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 2, 0, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0, 1, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, 1, -1.5);
        } else if (movingInPositiveY) {
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0, 0, -3);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, 0, -3);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, 0, -2);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 2, 0, -2);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0, 0, -1);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, 0, -1);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1.5, 0);
        } else if (movingInPositiveX) {
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0, -1.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, -1.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, -0.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 2, -0.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 0, 0.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1, 0.5, -1.5);
            this.camelCubeService.drawCube(newXCoord, newYCoord, 10, camel.color, 1.5, 1.5, -1.5);
        }
    }
}
