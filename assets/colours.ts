export class ColourCodes {
    static getCode(colour: Colour) {
        switch (colour) {
            case Colour.green: return '#3e6549'
            case Colour.lightGreen: return '#7ac24a'
            case Colour.grey: return '#555555'
            case Colour.lightGrey: return '#938b71'
            case Colour.sand: return '#C2B280'
            case Colour.lightSand: return '#d8bd80'
            case Colour.darkSand: return '#998e6b'
            case Colour.blue: return '#2ebce4'
            case Colour.brown: return '#362312'
            case Colour.lightBrown: return '#D2B48C'
            case Colour.white: return '#F9F6EE'
            case Colour.yellow: return '#debb49'
            case Colour.lightYellow: return '#f5d671'
            case Colour.pink: return '#cc807a'
            case Colour.lightPink: return '#f2ada7'
            case Colour.spring: return '#61ab4b'
            case Colour.summer: return '#e3c036'
            case Colour.autumn: return '#ed7e39'
            case Colour.winter: return '#246'
            case Colour.lightSpring: return '#91d97c'
            case Colour.lightSummer: return '#fce37c'
            case Colour.lightAutumn: return '#ffaa75'
            case Colour.lightWinter: return '#4b7bab'
        }
    }

    static shadeColor(colour: string, percent: number) {
        colour = colour.substring(1);
        const num = parseInt(colour, 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}

export enum Colour {
    green,
    lightGreen,
    grey,
    lightGrey,
    sand,
    lightSand,
    darkSand,
    blue,
    brown,
    lightBrown,
    white,
    yellow,
    lightYellow,
    pink,
    lightPink,
    spring,
    lightSpring,
    summer,
    lightSummer,
    autumn,
    lightAutumn,
    winter,
    lightWinter
}
