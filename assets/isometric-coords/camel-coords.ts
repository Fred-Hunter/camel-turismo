import { Colour } from "../colours.js";

export class CamelCoords {
    public static getNegativeY(colour: string): Array<{ x: number, y: number, colour: string }> {
        return [
            {
                "x": 1,
                "y": 0,
                "colour": colour
            },
            {
                "x": -0.5,
                "y": -2.5,
                "colour": colour
            },
            {
                "x": -0,
                "y": -1,
                "colour": colour
            },
            {
                "x": 0,
                "y": 0,
                "colour": colour
            },
            {
                "x": -1,
                "y": -1,
                "colour": colour
            },
            {
                "x": 1,
                "y": 2,
                "colour": colour
            },
            {
                "x": 0,
                "y": 1,
                "colour": colour
            }
        ];
    }

    public static getNegativeX(colour: string): Array<{ x: number, y: number, colour: string }> {
        return [
            {
              "x": 0,
              "y": 1,
              "colour": colour
            },
            {
              "x": -2.5,
              "y": -0.5,
              "colour": colour
            },
            {
              "x": -1,
              "y": 0,
              "colour": colour
            },
            {
              "x": 0,
              "y": 0,
              "colour": colour
            },
            {
              "x": -1,
              "y": -1,
              "colour": colour
            },
            {
              "x": 2,
              "y": 1,
              "colour": colour
            },
            {
              "x": 1,
              "y": 0,
              "colour": colour
            }
          ];
    }

    public static getPositiveY(colour: string): Array<{ x: number, y: number, colour: string }> {
        return [
            {
              "x": 1,
              "y": 0,
              "colour": colour
            },
            {
              "x": 0,
              "y": -1,
              "colour": colour
            },
            {
              "x": 0,
              "y": 0,
              "colour": colour
            },
            {
              "x": -1,
              "y": -1,
              "colour": colour
            },
            {
              "x": 1,
              "y": 2,
              "colour": colour
            },
            {
              "x": 0,
              "y": 1,
              "colour": colour
            },
            {
              "x": -0.5,
              "y": 1.5,
              "colour": colour
            }
          ];
    }

    public static getPositiveX(colour: string): Array<{ x: number, y: number, colour: string }> {
        return [
            {
              "x": 0,
              "y": 1,
              "colour": colour
            },
            {
              "x": -1,
              "y": 0,
              "colour": colour
            },
            {
              "x": 0,
              "y": 0,
              "colour": colour
            },
            {
              "x": -1,
              "y": -1,
              "colour": colour
            },
            {
              "x": 2,
              "y": 1,
              "colour": colour
            },
            {
              "x": 1,
              "y": 0,
              "colour": colour
            },
            {
              "x": 1.5,
              "y": -0.5,
              "colour": colour
            }
          ];
    }
}