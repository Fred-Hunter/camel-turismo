import { RaceType } from "../racing/race-type.js"

export interface RaceResult {
    duration: number,
    position: number,
    type: RaceType,
    camelId: number
}
