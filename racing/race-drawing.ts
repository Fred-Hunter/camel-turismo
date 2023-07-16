class RaceDrawing {
    constructor(
    ) {
        this._backgroundCanvas = CanvasService.getCanvasByName(CanvasNames.RaceBackground);
        this._camelCanvas = CanvasService.getCanvasByName(CanvasNames.RaceCamel);
        this.backgroundCubeService = new CubeService(this._backgroundCanvas.getContext("2d")!);
        this.camelCubeService = new CubeService(this._camelCanvas.getContext("2d")!);
    }

    private _backgroundCanvas: HTMLCanvasElement;
    private _camelCanvas: HTMLCanvasElement;
    private backgroundCubeService: CubeService;
    private camelCubeService: CubeService;

    public drawRaceCourse(race: Race) {
        const ctx = this._backgroundCanvas.getContext("2d")!;

        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

        const canvasColour = '#C2B280';
        const lighterColour = '#d8bd80';

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (race.track.filter(o => o[0] === i && o[1] === j).length > 0) {
                    // If is a race track
                    const height = -Math.random() / 6;
                    this.backgroundCubeService.drawCube(i, j, 50, '#938b71', height);
                } else {
                    const height = Math.random() / 3;

                    const colour = height < 0.1 ? canvasColour : lighterColour;
                    this.backgroundCubeService.drawCube(i, j, 50, colour, height);

                    const shouldIncludeObject = Math.floor(Math.random() * 10) === 4;
                    
                    if (shouldIncludeObject) {
                        // Randomize object
                        
                        const random = Math.floor(Math.random() * 10);
                        if (random < 5) {
                            this.drawPalmTree(i,j, height);
                        }
                        else if (random < 9) {
                            this.drawRocks(i,j, height);
                        }
                        else {
                            this.drawStaticCamel(i,j, height);
                        }
                    }
                }
            }
        }
    }

    private drawStaticCamel(newXCoord: number, newYCoord: number, height: number) {
        new CanvasCamelService(this._backgroundCanvas.getContext("2d")!)
            .drawCamelIsoCoords(newXCoord, newYCoord + 0.5, 10, '#d8843b', height);
    }

    public drawRocks(i: number, j: number, height: number) {
        var xOffset = (Math.random() - 0.5) * 0.5;
        var yOffset = (Math.random() - 0.5) * 0.5;
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, 12, '#555555', height);
    }

    public drawPalmTree(i: number, j: number, height: number) {
        var xOffset =  (Math.random() - 0.5) * 0.5;
        var yOffset =  (Math.random() - 0.5) * 0.5;

        this.backgroundCubeService.drawCube(i-0.5 + xOffset, j + yOffset, 5, '#3e6549', height+5);
        this.backgroundCubeService.drawCube(i-0.4 + xOffset, j + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i-0.3 + xOffset, j + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i-0.2 + xOffset, j + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i-0.1 + xOffset, j + yOffset, 5, '#3e6549', height+5);

        this.backgroundCubeService.drawCube(i + xOffset, j-0.5 + yOffset, 5, '#3e6549', height+5);
        this.backgroundCubeService.drawCube(i + xOffset, j-0.4 + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i + xOffset, j-0.3 + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i + xOffset, j-0.2 + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i + xOffset, j-0.1 + yOffset, 5, '#3e6549', height+5);

        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, 5, '#b18579', height);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, 5, '#b18579', height+1);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, 5, '#b18579', height+2);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, 5, '#b18579', height+3);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, 5, '#b18579', height+4);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, 5, '#b18579', height+5);
        this.backgroundCubeService.drawCube(i + xOffset, j + yOffset, 5, '#b18579', height+6);

        this.backgroundCubeService.drawCube(i + xOffset, j+0.1 + yOffset, 5, '#3e6549', height+5);
        this.backgroundCubeService.drawCube(i + xOffset, j+0.2 + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i + xOffset, j+0.3 + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i + xOffset, j+0.4 + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i + xOffset, j+0.5 + yOffset, 5, '#3e6549', height+5);
        
        this.backgroundCubeService.drawCube(i+0.1 + xOffset, j + yOffset, 5, '#3e6549', height+5);
        this.backgroundCubeService.drawCube(i+0.2 + xOffset, j + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i+0.3 + xOffset, j + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i+0.4 + xOffset, j + yOffset, 5, '#3e6549', height+6);
        this.backgroundCubeService.drawCube(i+0.5 + xOffset, j + yOffset, 5, '#3e6549', height+5);
    }

    public drawCamels(race: Race) {
        const ctx = this._camelCanvas.getContext("2d")!;
        ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

        race.racingCamels.forEach(camel => this.drawCamel(camel, race));
    }

    public drawCamel(camel: RacingCamel, race: Race) {
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
            this.drawNegativeYCamel(newXCoord, newYCoord, camel);
        } else if (movingInNegativeX) {
            this.drawNegativeXCamel(newXCoord, newYCoord, camel);
        } else if (movingInPositiveY) {
            this.drawPositiveYCamel(newXCoord, newYCoord, camel);
        } else if (movingInPositiveX) {
            this.drawPositiveXCamel(newXCoord, newYCoord, camel);
        }
    }

    private drawNegativeYCamel(newXCoord: number, newYCoord: number, camel: RacingCamel) {
        const xCoord = newXCoord + 0.25;

        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1.5 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 2 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, camel.jumpHeight);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight);
    }

    private drawNegativeXCamel(newXCoord: number, newYCoord: number, camel: RacingCamel) {
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

    private drawPositiveYCamel(newXCoord: number, newYCoord: number, camel: RacingCamel) {
        const xCoord = newXCoord + 0.25;

        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 2 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 0 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.colour, 1.5 + camel.jumpHeight, 0);
    }

    private drawPositiveXCamel(newXCoord: number, newYCoord: number, camel: RacingCamel) {
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
