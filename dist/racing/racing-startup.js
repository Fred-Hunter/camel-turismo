import { CanvasNames } from "../global/canvas-names";
import { CanvasService } from "../global/canvas-service";
import { GameState } from "../global/game-state";
import { GlobalComponents } from "../global/global-components";
import { race } from "../main";
import { CamelSelectComponent } from "../management/camel-select/camel-select-component";
import { Page } from "../navigation/page";
import { Countdown } from "./countdown/countdown";
import { LeaderboardService } from "./leaderboard-service";
import { RaceState } from "./models/race-state";
import { RaceComponent } from "./race-component";
import { RaceDrawing } from "./race-drawing";
import { RaceManagement } from "./race-managment";
import { RaceSelection } from "./race-selection";
import { RaceSimulation } from "./race-simulation";
export class RacingStartup {
    _globalServices;
    constructor(_globalServices) {
        this._globalServices = _globalServices;
    }
    registerComponents() {
        const raceSimulation = new RaceSimulation();
        const raceManagement = new RaceManagement(this._globalServices.musicService, raceSimulation, this._globalServices.camelCreator);
        this.registerRaceCamelSelectComponent(raceManagement);
        this.registerRaceSelection(raceManagement);
        this.registerRaceComponent(raceManagement);
    }
    registerRaceCamelSelectComponent(raceManagement) {
        const selectRaceCamelFunc = (camel) => {
            GameState.camel = camel;
            raceManagement.addCamelToRace(camel, race);
            this._globalServices.navigatorService.requestPageNavigation(Page.race);
            this._globalServices.musicService.setAudio("RaceAudio");
            this._globalServices.musicService.startAudio();
            race.raceState = RaceState.triggered;
        };
        GlobalComponents.raceCamelSelectComponent = new CamelSelectComponent(selectRaceCamelFunc);
    }
    registerRaceSelection(raceManagement) {
        GlobalComponents.raceSelection = new RaceSelection(this._globalServices.navigatorService, raceManagement);
    }
    registerRaceComponent(raceManagement) {
        const leaderboardService = new LeaderboardService(CanvasService.getCanvasByName(CanvasNames.RaceCamel).getContext("2d"));
        const raceDrawing = new RaceDrawing();
        const countdown = new Countdown();
        GlobalComponents.raceComponent = new RaceComponent(raceDrawing, raceManagement, leaderboardService, countdown);
    }
}
