import { Colour } from "../colours.js";
export class RookCoords {
    static get smallRock1() {
        return [
            {
                "x": 1,
                "y": 3,
                "colour": Colour.grey
            },
            {
                "x": 1,
                "y": 4,
                "colour": Colour.grey
            },
            {
                "x": 2,
                "y": 3,
                "colour": Colour.grey
            },
            {
                "x": 2,
                "y": 4,
                "colour": Colour.grey
            },
            {
                "x": 2,
                "y": 5,
                "colour": Colour.grey
            },
            {
                "x": 3,
                "y": 3,
                "colour": Colour.grey
            }
        ];
    }
    static get smallRock2() {
        return [
            {
                "x": 3,
                "y": 1,
                "colour": Colour.grey
            },
            {
                "x": 4,
                "y": 0,
                "colour": Colour.grey
            },
            {
                "x": 4,
                "y": 1,
                "colour": Colour.grey
            },
            {
                "x": 4,
                "y": 2,
                "colour": Colour.grey
            },
            {
                "x": 5,
                "y": 2,
                "colour": Colour.grey
            },
            {
                "x": 4,
                "y": 3,
                "colour": Colour.grey
            },
            {
                "x": 5,
                "y": 3,
                "colour": Colour.grey
            }
        ];
    }
}
