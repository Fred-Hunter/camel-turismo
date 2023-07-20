class GymDrawing {
    constructor(
        private readonly _navigatorService: NavigatorService
    ) {
        this._camelCanvas = CanvasService.getCanvasByName(CanvasNames.GymCamel);
        this._backgroundCanvas = CanvasService.getCanvasByName(CanvasNames.GymBackground);
        this.backgroundCubeService = new CubeService(this._backgroundCanvas.getContext("2d")!);
        this.camelCubeService = new CubeService(this._camelCanvas.getContext("2d")!);
    }

    private _camelCanvas: HTMLCanvasElement;
    private _backgroundCanvas: HTMLCanvasElement;
    private backgroundCubeService: CubeService;
    private camelCubeService: CubeService;
    private _trainSession: TrainSession | null = null;

    public drawGym() {
        const ctx = this._backgroundCanvas.getContext("2d")!;

        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

        this.drawFloor();
        this.drawTreadmill();

        const borderWidth = 5;

        const buttonService = new CanvasBtnService(this._camelCanvas, this._navigatorService);
        buttonService.createBtn(
            (this._camelCanvas.width / GlobalStaticConstants.devicePixelRatio) / 2,
            GlobalStaticConstants.innerHeight / 2,
            550,
            50,
            25,
            borderWidth,
            GlobalStaticConstants.backgroundColour,
            GlobalStaticConstants.mediumColour,
            "black",
            () => this._trainSession = Gym.getTreadmillSession(GameState.camel!),
            ["Start session"]);

        buttonService.createBtn(
            (this._camelCanvas.width / GlobalStaticConstants.devicePixelRatio) / 2,
            GlobalStaticConstants.innerHeight / 2 + 100,
            550,
            50,
            25,
            borderWidth,
            GlobalStaticConstants.backgroundColour,
            GlobalStaticConstants.mediumColour,
            "black",
            () => { this.exitGym(this._trainSession) },
            ["Back to map"]);
    }

    private exitGym(trainSession: TrainSession | null) {
        if (trainSession) {
            trainSession.endSession();
        }
        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap()
    }

    public drawFloor() {
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

    public drawTreadmill() {

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

        this.drawTreadmillUppyDownyLine(7.1, 7, '#000000')
        this.drawTreadmillTopBar('#000000');
        this.drawTreadmillUppyDownyLine(7.8, 7, '#000000')


    }

    drawTreadmillUppyDownyLine(alongth: number, downth: number, colour: string) {
        for (let i = 1; i < 10; i++) {
            this.backgroundCubeService.drawCube(downth, alongth, 5, colour, i);
        }
    }

    drawTreadmillVerticalLine(alongth: number, colour: string) {
        for (let i = 0; i < 10; i++) {
            this.backgroundCubeService.drawCube(7 + (i / 10), alongth, 5, colour);
        }
    }

    drawTreadmillHorizontalLine(downth: number, colour: string) {
        for (let i = 2; i < 8; i++) {
            this.backgroundCubeService.drawCube(downth, 7 + (i / 10), 5, colour);
        }
    }

    drawTreadmillTopBar(colour: string) {
        for (let i = 2; i < 8; i++) {
            this.backgroundCubeService.drawCube(7, 7 + (i / 10), 5, colour, 9);
        }
    }

    // public drawCamels(race: Race) {
    //     const ctx = this._camelCanvas.getContext("2d")!;
    //     ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

    //     race.racingCamels.forEach(camel => this.drawCamel(camel, race));
    // }

    public drawCamel(camel: RacingCamel, race: Race) {
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
