class CamelPropertyGenerator{
    public generateColour(): string {
        return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7);
    }

    public generateName(): string {
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

        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

        return randomAdjective + " " + randomNoun;
    }

    public generateTemperament(): CamelTemperament {
        if (Math.random() < 0.25) {
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