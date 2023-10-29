import { CamelInitSkills } from "./camel-init-skills"
import { CamelTemperament } from "./camel-temperament"

export interface CamelInitProperties {
    colour: string,
    name: string,
    skills: CamelInitSkills
    temperament: CamelTemperament
    unspentXp: number,
    achievementsUnlocked: number,
}
