class CamelPropertyGenerator {
    public generateColour(): string {
        return this.generateSeededColour(Math.random());
    }

    public generateSeededColour(seed: number): string {
        return '#' + (0x1000000 + seed * 0xffffff).toString(16).substring(1, 7);
    }

    public generateName(): string {
        return this.generateSeededName(Math.random(), Math.random());
    }

    public generateSeededName(adjectiveSeed: number, nounSeed: number): string {
        const adjectives = [
            "Sandy", "Dusty", "Golden", "Majestic", "Spotted",
            "Whirling", "Blazing", "Silent", "Radiant", "Breezy",
            "Amber", "Crimson", "Harmony", "Marble", "Opal",
            "Princess", "Sahara", "Shadow", "Tawny", "Whisper"
        ];

        const nouns = [
            "Desert", "Oasis", "Pyramid", "Mirage", "Nomad",
            "Sunset", "Sahara", "Dune", "Caravan", "Cactus",
            "Jewel", "Moon", "Oracle", "Sphinx", "Spirit",
            "Sultan", "Talisman", "Treasure", "Zephyr", "Zodiac"
        ];

        const randomAdjective = adjectives[Math.floor(adjectiveSeed * adjectives.length)];
        const randomNoun = nouns[Math.floor(nounSeed * nouns.length)];

        return randomAdjective + " " + randomNoun;
    }

    public generateTemperament(): CamelTemperament {
        return this.generateSeededTemperament(Math.random());
    }

    public generateSeededTemperament(seed: number): CamelTemperament {
        if (seed < 0.25) {
            return CamelTemperament.Aggressive;
        } else if (Math.random() < 0.5) {
            return CamelTemperament.Temperamental;
        } else if (Math.random() < 0.75) {
            return CamelTemperament.Calm;
        } else {
            return CamelTemperament.Mild;
        }
    }
}
