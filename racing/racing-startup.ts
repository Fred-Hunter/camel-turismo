import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { GameState } from "../global/game-state.js";
import { GlobalComponents } from "../global/global-components.js";
import { GlobalServices } from "../global/global-services.js";
import { Camel } from "../management/camel-creation/camel.js";
import { CamelSelectComponent } from "../management/camel-select/camel-select-component.js";
import { Page } from "../navigation/page.js";
import { Countdown } from "./countdown/countdown.js";
import { LeaderboardService } from "./leaderboard-service.js";
import { RaceState } from "./models/race-state.js";
import { RaceComponent } from "./race-component.js";
import { RaceDrawing } from "./race-drawing.js";
import { RaceManagement } from "./race-managment.js";
import { RaceSelection } from "./race-selection.js";
import { RaceSimulation } from "./race-simulation.js";

export class RacingStartup {
    constructor(private readonly _globalServices: GlobalServices) { }

    public registerComponents() {
        const raceSimulation = new RaceSimulation();
        const raceManagement = new RaceManagement(
            this._globalServices.musicService, 
            raceSimulation,
            this._globalServices.camelCreator);
        
        this.registerRaceCamelSelectComponent(raceManagement);
        this.registerRaceSelection(raceManagement);
        this.registerRaceComponent(raceManagement);
    }

    private registerRaceCamelSelectComponent(raceManagement: RaceManagement) {
        const selectRaceCamelFunc = (camel: Camel) => {
            GameState.camel = camel;
            raceManagement.addCamelToRace(camel, GlobalComponents.race);

            this._globalServices.navigatorService.requestPageNavigation(Page.race)
            this._globalServices.musicService.setAudio("RaceAudio");
            this._globalServices.musicService.startAudio()

            GlobalComponents.race.raceState = RaceState.triggered;
        };

        GlobalComponents.raceCamelSelectComponent = new CamelSelectComponent(selectRaceCamelFunc);
    }

    private registerRaceSelection(raceManagement: RaceManagement) {
        GlobalComponents.raceSelection = new RaceSelection(this._globalServices.navigatorService, raceManagement);
    }

    private registerRaceComponent(raceManagement: RaceManagement) {
        const leaderboardService = new LeaderboardService(CanvasService.getCanvasByName(CanvasNames.RaceCamel).getContext("2d")!);
        const raceDrawing = new RaceDrawing();
        const countdown = new Countdown();

        GlobalComponents.raceComponent = new RaceComponent(raceDrawing, raceManagement, leaderboardService, countdown);
    }
}
