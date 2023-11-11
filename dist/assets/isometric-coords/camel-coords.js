export class CamelCoords {
    static getNegativeY(colour) {
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
    static getNegativeX(colour) {
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
    static getPositiveY(colour) {
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
    static getPositiveX(colour) {
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
