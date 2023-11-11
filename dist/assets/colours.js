export class ColourCodes {
    static getCode(colour) {
        switch (colour) {
            case Colour.green: return '#3e6549';
            case Colour.lightGreen: return '#7ac24a';
            case Colour.grey: return '#555555';
            case Colour.lightGrey: return '#938b71';
            case Colour.sand: return '#C2B280';
            case Colour.lightSand: return '#d8bd80';
            case Colour.darkSand: return '#998e6b';
            case Colour.blue: return '#2ebce4';
            case Colour.brown: return '#362312';
            case Colour.lightBrown: return '#D2B48C';
            case Colour.white: return '#F9F6EE';
            case Colour.yellow: return '#debb49';
            case Colour.lightYellow: return '#f5d671';
            case Colour.pink: return '#cc807a';
            case Colour.lightPink: return '#f2ada7';
            case Colour.spring: return '#61ab4b';
            case Colour.summer: return '#e3c036';
            case Colour.autumn: return '#ed7e39';
            case Colour.winter: return '#246';
            case Colour.lightSpring: return '#91d97c';
            case Colour.lightSummer: return '#fce37c';
            case Colour.lightAutumn: return '#ffaa75';
            case Colour.lightWinter: return '#4b7bab';
        }
    }
    static shadeColor(colour, percent) {
        colour = colour.substring(1);
        const num = parseInt(colour, 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}
export var Colour;
(function (Colour) {
    Colour[Colour["green"] = 0] = "green";
    Colour[Colour["lightGreen"] = 1] = "lightGreen";
    Colour[Colour["grey"] = 2] = "grey";
    Colour[Colour["lightGrey"] = 3] = "lightGrey";
    Colour[Colour["sand"] = 4] = "sand";
    Colour[Colour["lightSand"] = 5] = "lightSand";
    Colour[Colour["darkSand"] = 6] = "darkSand";
    Colour[Colour["blue"] = 7] = "blue";
    Colour[Colour["brown"] = 8] = "brown";
    Colour[Colour["lightBrown"] = 9] = "lightBrown";
    Colour[Colour["white"] = 10] = "white";
    Colour[Colour["yellow"] = 11] = "yellow";
    Colour[Colour["lightYellow"] = 12] = "lightYellow";
    Colour[Colour["pink"] = 13] = "pink";
    Colour[Colour["lightPink"] = 14] = "lightPink";
    Colour[Colour["spring"] = 15] = "spring";
    Colour[Colour["lightSpring"] = 16] = "lightSpring";
    Colour[Colour["summer"] = 17] = "summer";
    Colour[Colour["lightSummer"] = 18] = "lightSummer";
    Colour[Colour["autumn"] = 19] = "autumn";
    Colour[Colour["lightAutumn"] = 20] = "lightAutumn";
    Colour[Colour["winter"] = 21] = "winter";
    Colour[Colour["lightWinter"] = 22] = "lightWinter";
})(Colour || (Colour = {}));
