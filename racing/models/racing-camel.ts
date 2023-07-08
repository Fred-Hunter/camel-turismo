class RacingCamel {
    constructor(
        public camel: Camel) { }

    completionPercentage: number = 0;
    raceSpeedPerSecond: number = 0;
    color: string = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}