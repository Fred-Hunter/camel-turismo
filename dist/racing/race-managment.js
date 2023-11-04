import { CanvasService } from "../global/canvas-service.js";
import { GameState } from "../global/game-state.js";
import { GlobalComponents } from "../global/global-components.js";
import { PopupService } from "../global/popup-service.js";
import { MapOverview } from "../map/map-overview.js";
import { Race } from "./models/race.js";
import { RaceState } from "./models/race-state.js";
import { RacingCamel } from "./models/racing-camel.js";
import { RaceTrackCreator } from "./race-track-creator.js";
export class RaceManagement {
    _musicService;
    _raceSimulation;
    _camelCreator;
    constructor(_musicService, _raceSimulation, _camelCreator) {
        this._musicService = _musicService;
        this._raceSimulation = _raceSimulation;
        this._camelCreator = _camelCreator;
    }
    addCamelToRace(camel, race) {
        const racingCamel = new RacingCamel(camel);
        race.racingCamels.push(racingCamel);
    }
    addCpuCamelsToRace(raceSize, raceDifficulty, race) {
        GlobalComponents.globalServices.camelStable.populateStable();
        let sortedCamels = GlobalComponents.globalServices.camelStable.camels
            .map((c) => c) // copy array
            .sort((c1, c2) => Math.abs(c1.levelAverage - raceDifficulty) - Math.abs(c2.levelAverage - raceDifficulty));
        for (let i = 0; i < raceSize; i++) {
            if (sortedCamels.length === 0)
                break;
            this.addCamelToRace(sortedCamels.shift(), race);
        }
    }
    createRace(raceLength, prizeCashMoney, raceSize, averageCompetitorLevel, raceType) {
        const trackCreator = new RaceTrackCreator();
        const track = trackCreator.createTrack(raceLength);
        const race = new Race(raceLength, track, prizeCashMoney, raceType);
        this.addCpuCamelsToRace(raceSize, averageCompetitorLevel, race);
        return race;
    }
    startRace(race) {
        if (race.length <= 0) {
            throw new Error('Tried to start a race with bad length');
        }
        if (race.racingCamels.length === 0) {
            throw new Error('Tried to start a race with no camels');
        }
        race.raceState = RaceState.inProgress;
        this._raceSimulation.startRace(race);
    }
    getPositionDisplay(position) {
        switch (position) {
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            default:
                return `${position}th`;
        }
    }
    simulateRaceStep(race) {
        this._raceSimulation.simulateRaceStep(race);
    }
    updateCalendar() {
        GameState.calendar.moveToNextDay();
    }
    handleFinishedRace(race) {
        if (!GameState.camel)
            return;
        let position = race.racingCamels.filter(o => o.camel == GameState.camel)[0].finalPosition;
        position = position ??
            1 +
                race.racingCamels.sort((a, b) => b.completionPercentage - a.completionPercentage).map(o => o.camel).indexOf(GameState.camel);
        const prizeCashMoney = this.getPrizeMoney(race, position);
        GameState.cashMoney += prizeCashMoney;
        const xpGained = (race.racingCamels.length - position + 1) * 100;
        GameState.camel.unspentXp += xpGained;
        if (position === 1 && GameState.camel.achievementsUnlocked < race.raceType + 1) {
            GameState.camel.achievementsUnlocked = Math.max(GameState.camel.achievementsUnlocked, race.raceType + 1);
        }
        race.raceState = RaceState.none;
        this._musicService.setAudio('HomeScreenAudio');
        this._musicService.startAudio();
        this.updateCalendar();
        CanvasService.hideAllCanvas();
        MapOverview.load();
        PopupService.drawAlertPopup(`Congratulations, ${GameState.camel.name} finished ${this.getPositionDisplay(position)}! You won $${prizeCashMoney}, and gained ${xpGained}xp!`);
    }
    getPrizeMoney(race, position) {
        const prizePool = race.prizeCashMoney;
        if (position === 1) {
            return Math.round(prizePool * 0.75);
        }
        if (position === 2) {
            return Math.round(prizePool * 0.2);
        }
        if (position === 3) {
            return Math.round(prizePool * 0.05);
        }
        return 0;
    }
}
