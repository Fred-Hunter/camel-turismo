import { CamelTemperament } from "./camel-temperament.js";
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
        return this.generateSeededName(this.generateNameSeed());
    }
    generateNameSeed(radix = 36) {
        const adjectiveSeed = Math.floor(Math.random() * this.nameAjectives.length).toString(radix);
        const nounSeed = Math.floor(Math.random() * this.nameNouns.length).toString(radix);
        return adjectiveSeed + nounSeed;
    }
    generateSeededName(nameSeed) {
        if (nameSeed.length != 2)
            return "Bad Camel";
        const randomAdjective = this.nameAjectives[parseInt(nameSeed[0], 36)];
        const randomNoun = this.nameNouns[parseInt(nameSeed[1], 36)];
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
