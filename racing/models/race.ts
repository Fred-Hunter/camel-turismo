class Race {
    constructor(
        public length: number,
        public track: number[][],
        public prizeCashMoney: number) { 
            
        }

    racingCamels: RacingCamel[] = [];
    raceState: RaceState = RaceState.none;
    winner: undefined;
    triggeredTimestamp: number = 0;
}
