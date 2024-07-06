import { CanvasService } from "../global/canvas-service.js";
import { GameState } from "../global/game-state.js";
import { GlobalComponents } from "../global/global-components.js";
import { PopupService } from "../global/popup-service.js";
import { Camel } from "../management/camel-creation/camel.js";
import { CamelCreator } from "../management/camel-creation/camel-creator.js";
import { MapOverview } from "../map/map-overview.js";
import { RaceType } from "./race-type.js";
import { Race } from "./models/race.js";
import { RaceState } from "./models/race-state.js";
import { RacingCamel } from "./models/racing-camel.js";
import { RaceSimulation } from "./race-simulation.js";
import { RaceTrackCreator } from "./race-track-creator.js";
import { MusicService } from "../audio/music-service.js";
import { RaceResult } from "../statistics/race-result.js";
import { StatisticsHelper } from "../statistics/statistics-helper.js";
import { EmmaDaleScrolls } from "../scrolls/library/emma-dale.js";
import { GeneralWasteScrolls } from "../scrolls/library/general-waste.js";

export class RaceManagement {
    constructor(
        private readonly _musicService: MusicService,
        private readonly _raceSimulation: RaceSimulation,
        private readonly _camelCreator: CamelCreator,
    ) { }

    addCamelToRace(camel: Camel, race: Race) {
        const racingCamel = new RacingCamel(camel);
        race.racingCamels.push(racingCamel);
    }

    private addCpuCamelsToRace(
        raceSize: number,
        raceDifficulty: number,
        race: Race) {

        if (race.raceType === RaceType.SpookyShowdown) {
            return this.addSpookyShowdownCpuToRace(race, raceDifficulty);
        }

        GlobalComponents.globalServices.camelStable.populateStable();
        let sortedCamels = GlobalComponents.globalServices.camelStable.camels
            .map((c: Camel) => c) // copy array
            .sort((c1: Camel, c2: Camel) => Math.abs(c1.levelAverage - raceDifficulty) - Math.abs(c2.levelAverage - raceDifficulty));

        for (let i = 0; i < raceSize; i++) {
            if (sortedCamels.length === 0) break;
            this.addCamelToRace(sortedCamels.shift() as Camel, race);
        }
    }

    private addSpookyShowdownCpuToRace(race: Race, raceDifficulty: number){
        this.addCamelToRace(this._camelCreator.createCamel(raceDifficulty, raceDifficulty, raceDifficulty, raceDifficulty, raceDifficulty, "Major Upset"), race);
    }

    createRace(
        raceLength: number,
        prizeCashMoney: number,
        raceSize: number,
        averageCompetitorLevel: number,
        raceType: RaceType): Race {

        const trackCreator = new RaceTrackCreator();
        const track = trackCreator.createTrack(raceLength);

        const race = new Race(raceLength, track, prizeCashMoney, raceType);

        this.addCpuCamelsToRace(raceSize, averageCompetitorLevel, race);

        return race;
    }

    startRace(race: Race): void {
        if (race.length <= 0) {
            throw new Error('Tried to start a race with bad length');
        }

        if (race.racingCamels.length === 0) {
            throw new Error('Tried to start a race with no camels');
        }

        race.raceState = RaceState.inProgress;

        this._raceSimulation.startRace(race);
    }

    getPositionDisplay(position: number) {
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

    simulateRaceStep(race: Race) {
        this._raceSimulation.simulateRaceStep(race);
    }

    updateCalendar() {
        GameState.calendar.moveToNextDay();
        
        if (Math.random() < 0.05) {
            GameState.cashMoney += 100;
            GameState.scrolls.push(EmmaDaleScrolls.bonus100CashMoney);
        }

        if (Math.random() < 0.05 && GameState.cashMoney > 100) {
            GameState.cashMoney -= Math.max(Math.round(GameState.cashMoney * 0.01) * 10, 10);
            GameState.scrolls.push(GeneralWasteScrolls.corruptionTax);
        }
    }

    handleFinishedRace(race: Race) {
        if (!GameState.camel) return;

        let position = race.racingCamels.filter(o => o.camel == GameState.camel)[0].finalPosition;

        position = position ??
            1 +
            race.racingCamels.sort((a, b) => b.completionPercentage - a.completionPercentage).map(o => o.camel).indexOf(GameState.camel);

        const prizeCashMoney = this.getPrizeMoney(race, position);

        GameState.cashMoney += prizeCashMoney;
        StatisticsHelper.LogCashMoneyChange(prizeCashMoney);

        const xpGained = (race.racingCamels.length - position + 1) * 100;
        GameState.camel.unspentXp += xpGained;
        StatisticsHelper.LogExpChange(xpGained);
        
        if (position === 1 && GameState.camel.achievementsUnlocked < race.raceType + 1) {
            GameState.camel.achievementsUnlocked = Math.max(GameState.camel.achievementsUnlocked, race.raceType + 1);
        }

        race.raceState = RaceState.none;

        this._musicService.setAudio('HomeScreenAudio');
        this._musicService.startAudio();

        const raceResult: RaceResult = {
            duration: Date.now() - race.startTime,
            position: position,
            type: race.raceType,
            camelId: GameState.camel.id
        } 
        StatisticsHelper.LogRaceResult(raceResult);

        this.updateCalendar();

        CanvasService.hideAllCanvas();
        MapOverview.load();

        PopupService.drawAlertPopup(`Congratulations, ${GameState.camel.name} finished ${this.getPositionDisplay(position)}! You won $${prizeCashMoney}, and gained ${xpGained}xp!`);
    }

    getPrizeMoney(race: Race, position: number) {
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
