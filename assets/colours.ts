export class ColourCodes {
    static getCode(colour: Colour) {
        switch (colour) {
            case Colour.green: return '#509162'
            case Colour.lightGreen: return '#7ac24a'
            case Colour.grey: return '#555555'
            case Colour.lightGrey: return '#d6d0bc'
            case Colour.sand: return '#f5e7bc'
            case Colour.lightSand: return '#d8bd80'
            case Colour.darkSand: return '#998e6b'
            case Colour.blue: return '#2ebce4'
            case Colour.brown: return '#805937'
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

    /**
    * Shades a color lighter or darker.
    * @param {string} colour - The hex color code to be shaded (e.g., "#3e4f6a").
    * @param {number} factor - The factor to lighten or darken the color. Range: -1 to 1.
    * @returns {string} The shaded color in hex format.
    */
    static shadeColour2(colour: string, factor: number): string {
       if (colour.startsWith('#')) {
           colour = colour.slice(1);
       }
   
       // Convert hex colour to RGB
       let r = parseInt(colour.substring(0, 2), 16);
       let g = parseInt(colour.substring(2, 4), 16);
       let b = parseInt(colour.substring(4, 6), 16);
   
       // Adjust each colour component
       r = Math.round(r + (factor * (factor > 0 ? (255 - r) : r)));
       g = Math.round(g + (factor * (factor > 0 ? (255 - g) : g)));
       b = Math.round(b + (factor * (factor > 0 ? (255 - b) : b)));
   
       // Ensure values are within 0-255
       r = Math.min(255, Math.max(0, r));
       g = Math.min(255, Math.max(0, g));
       b = Math.min(255, Math.max(0, b));
   
       // Convert RGB back to hex
       const newColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
   
       return newColor;
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
