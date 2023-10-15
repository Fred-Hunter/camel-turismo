class RaceManagement {
    constructor(
        private readonly _musicService: MusicService,
        private readonly _raceSimulation: RaceSimulation,
        private readonly _camelCreator: CamelCreator,
    ) { }

    addCamelToRace(camel: Camel, race: Race) {
        const racingCamel = new RacingCamel(camel);
        race.racingCamels.push(racingCamel);
    }

    // private addCpuCamelsToRace(
    //     raceSize: number,
    //     competitorQuality: InitCamelQuality,
    //     race: Race) {
    //     for (let i = 0; i < raceSize; i++) {
    //         const competitorCamel = this._camelCreator.createRandomCamelWithQuality(competitorQuality);

    //         this.addCamelToRace(competitorCamel, race);
    //     }
    // }

    private addCpuCamelsToRace(
        raceSize: number,
        raceDifficulty: number,
        race: Race) {
            globalServices.camelStable.populateStable();
            let sortedCamels = globalServices.camelStable.camels
                .map(c => c) // copy array
                .sort((c1, c2) => Math.abs(c1.levelAverage - raceDifficulty) - Math.abs(c2.levelAverage - raceDifficulty));

        for (let i = 0; i < raceSize; i++) {
            if (sortedCamels.length === 0) break;
            this.addCamelToRace(sortedCamels.shift() as Camel, race);
        }
    }

    createRace(
        raceLength: number,
        prizeCashMoney: number,
        raceSize: number,
        difficulty: Difficulty): Race {
        let averageCompetitorLevel = 0;

        if (difficulty === Difficulty.Easy) {
            averageCompetitorLevel = 20;
        } else if (difficulty === Difficulty.Normal) {
            averageCompetitorLevel = 50;
        } else {
            averageCompetitorLevel = 80;
        }

        const trackCreator = new RaceTrackCreator();
        const track = trackCreator.createTrack(raceLength);

        const race = new Race(raceLength, track, prizeCashMoney, difficulty);

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
    }

    handleFinishedRace(race: Race) {
        if (!GameState.camel) return;

        let position = race.racingCamels.filter(o => o.camel == GameState.camel)[0].finalPosition;

        position = position ??
            1 +
            race.racingCamels.sort((a, b) => b.completionPercentage - a.completionPercentage).map(o => o.camel).indexOf(GameState.camel);

        const prizeCashMoney = this.getPrizeMoney(race, position);

        GameState.cashMoney += prizeCashMoney;

        const xpGained = (race.racingCamels.length - position + 1) * 100;
        GameState.camel.unspentXp += xpGained;
        
        if (position === 1 && GameState.camel.achievementsUnlocked < race.difficulty + 1) {
            GameState.camel.achievementsUnlocked = Math.max(GameState.camel.achievementsUnlocked, race.difficulty + 1);
        }

        race.raceState = RaceState.none;

        this._musicService.setAudio('HomeScreenAudio');
        this._musicService.startAudio();

        this.updateCalendar();

        CanvasService.hideAllCanvas();
        MapOverview.load();

        PopupService.drawAlertPopup(`Congratulations, ${GameState.camel.name} finished ${this.getPositionDisplay(position)}! You won $${prizeCashMoney}, and gained ${xpGained}xp!`);
    }

    getPrizeMoney(race: Race, position: number) {
        const prizePool = race.prizeCashMoney;

        if (position === 1) {
            return prizePool * 0.75;
        }

        if (position === 2) {
            return prizePool * 0.2;
        }

        if (position === 3) {
            return prizePool * 0.05;
        }

        return 0;
    }
}
