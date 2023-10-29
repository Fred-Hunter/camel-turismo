export class CamelPropertyGenerator {
    nameAjectives = [
        "Sandy", "Dusty", "Golden", "Majestic", "Spotted",
        "Whirling", "Blazing", "Silent", "Radiant", "Breezy",
        "Amber", "Crimson", "Harmony", "Marble", "Opal",
        "Princess", "Sahara", "Shadow", "Tawny", "Whisper"
    ];
    nameNouns = [
        "Desert", "Oasis", "Pyramid", "Mirage", "Nomad",
        "Sunset", "Sahara", "Dune", "Caravan", "Cactus",
        "Jewel", "Moon", "Oracle", "Sphinx", "Spirit",
        "Sultan", "Talisman", "Treasure", "Zephyr", "Zodiac"
    ];
    generateColour() {
        return this.generateSeededColour(Math.random());
    }
    generateSeededColour(seed) {
        return '#' + (0x000000 + Math.floor(seed * 36) * 0x71c71).toString(16);
    }
    generateName() {
        return this.generateSeededName(Math.random(), Math.random());
    }
    generateSeededName(adjectiveSeed, nounSeed) {
        const randomAdjective = this.nameAjectives[Math.floor(adjectiveSeed * this.nameAjectives.length)];
        const randomNoun = this.nameNouns[Math.floor(nounSeed * this.nameNouns.length)];
        return randomAdjective + " " + randomNoun;
    }
    generateSeedFromName(name, radix = 36) {
        let seed = "";
        seed += this.nameAjectives.indexOf(name.split(" ")[0]).toString(radix);
        seed += this.nameNouns.indexOf(name.split(" ")[1]).toString(radix);
        return seed;
    }
    generateTemperament() {
        return this.generateSeededTemperament(Math.random());
    }
    generateSeededTemperament(seed) {
        if (seed < 0.25) {
            return CamelTemperament.Aggressive;
        }
        else if (Math.random() < 0.5) {
            return CamelTemperament.Temperamental;
        }
        else if (Math.random() < 0.75) {
            return CamelTemperament.Calm;
        }
        else {
            return CamelTemperament.Mild;
        }
    }
}
