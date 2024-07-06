import { Colour } from "../../assets/colours.js";

export class RaceDrawingParameters {
    constructor(
        public track: number[][],
    ) { }

    public worldXStart: number = 0;
    public worldYStart: number = 0;
    public worldXSize: number = 15;
    public worldYSize: number = 15;
    public worldFilter: string | undefined;
    public colourVarianceMultiplier = 1;
    public heightVarianceMultiplier = 1;
    public addObjects: boolean = true;
    public groundColours: Array<{ colour: Colour, frequency: number }> = [];

    public pickRandomGroundColour(): Colour {
        const totalFrequency = this.groundColours.reduce((sum, { frequency }) => sum + frequency, 0);
        let random = Math.random() * totalFrequency;

        for (const { colour, frequency } of this.groundColours) {
            if (random < frequency) {
                return colour;
            }
            random -= frequency;
        }

        // This line should never be reached if frequencies are properly set
        throw new Error("No colour found. Check the groundColours array.");
    }
}
