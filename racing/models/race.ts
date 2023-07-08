class Race {
    constructor(
        public length: number,
        camels: Camel[],
        public track: number[][],
        public prizeCashMoney: number) { 
            camels.forEach(camel => {
                const racingCamel = new RacingCamel(camel);
                this.racingCamels.push(racingCamel);
            });
    
        }

    racingCamels: RacingCamel[] = [];
    triggered: boolean = false;
    initialised: boolean = false;
    inProgress: boolean = false;
    winner: undefined;
}
