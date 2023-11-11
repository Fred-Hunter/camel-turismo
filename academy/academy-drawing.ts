import { Colour } from "../assets/colours.js";
import { DwellingCoords } from "../assets/isometric-coords/dwelling-coords.js";
import { FarmCoords } from "../assets/isometric-coords/farm-coords.js";
import { IsometricCoordsDrawer } from "../assets/isometric-coords/isometric-coords-drawer.js";
import { StablesCoords } from "../assets/isometric-coords/stables-coords.js";
import { CanvasBtnService } from "../global/canvas-btn-service.js";
import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { CubeService } from "../global/cube-service.js";
import { GameState } from "../global/game-state.js";
import { GlobalStaticConstants } from "../global/global-static-constants.js";
import { AcademyBuildingLevel, AcademyBuildingType } from "./academy.js";

export class AcademyDrawing {
    constructor() {
        this._academyCanvas = CanvasService.getCanvasByName(CanvasNames.Academy);
        this._academyCubeService = new CubeService(this._academyCanvas.getContext("2d")!);
    }

    private _academyCanvas: HTMLCanvasElement;
    private _academyCubeService: CubeService;

    public drawGround() {
        const ctx = this._academyCanvas.getContext("2d")!;

        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const height = Math.random() / 100;
                this._academyCubeService.drawCube(Colour.sand, i, j, 2, height);
            }
        }
    }

    public drawAcademy() {
        const academyBuildings = GameState.academy.buildings;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const academyBuilding = academyBuildings.filter(o => o.coords.x === i && o.coords.y === j);

                if (academyBuilding.length === 1) {
                    const coords = this.getBuildingCoords(academyBuilding[0].type, academyBuilding[0].level)
                    IsometricCoordsDrawer.draw(i, j, coords, this._academyCubeService, 0, 2, 1 / 15);
                }
            }
        }
    }

    private getBuildingCoords(type: AcademyBuildingType, level: AcademyBuildingLevel) {
        switch (type) {
            case AcademyBuildingType.Dwelling:
                return DwellingCoords.basic;
            case AcademyBuildingType.Stables:
                return StablesCoords.basic;
            case AcademyBuildingType.Farm:
                return FarmCoords.basic;
        }
    }

    public drawBack(unload: () => void) {
        const buttonService = new CanvasBtnService(this._academyCanvas);
        buttonService.createBtn(
            0,
            0,
            150,
            50,
            25,
            1,
            Colour.autumn,
            Colour.lightAutumn,
            Colour.white,
            () => { unload() },
            ["Back"]);
    }
}