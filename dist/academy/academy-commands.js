import { GameState } from "../global/game-state.js";
import { AcademyBuildingLevel, AcademyBuildingType } from "./academy.js";
export class AcademyCommands {
    initAcademy() {
        const academyBuildings = GameState.academy.buildings;
        if (academyBuildings.length === 0) {
            this.AddBuildingToAcademy(AcademyBuildingType.Dwelling, AcademyBuildingLevel.Basic, { x: 3, y: 4 });
        }
    }
    AddBuildingToAcademy(type, level, coords) {
        const academyBuildings = GameState.academy.buildings;
        if (coords.x < 0 || coords.x >= 5 || coords.y < 0 || coords.y >= 5) {
            return;
        }
        if (academyBuildings.filter(o => o.coords.x === coords.x && o.coords.y === coords.y).length === 1) {
            return;
        }
        academyBuildings.push({
            type: type,
            level: level,
            coords: coords
        });
    }
}
