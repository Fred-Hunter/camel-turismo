export class RaceDrawingParameters {
    track;
    constructor(track) {
        this.track = track;
    }
    worldXStart = 0;
    worldYStart = 0;
    worldXSize = 15;
    worldYSize = 15;
    worldFilter;
    colourVarianceMultiplier = 1;
    heightVarianceMultiplier = 1;
    addObjects = true;
    groundColours = [];
    pickRandomGroundColour() {
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
