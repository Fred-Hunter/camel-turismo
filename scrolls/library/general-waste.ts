import { Scroll } from "../scroll.js";

export class GeneralWasteScrolls {
    static get welcome(): Scroll {
        return {
            sender: 'General Waste',
            subject: 'Advice for the Enthusiastic Newcomer 🐫',
            body: `I hope you're enjoying your little camel racing escapade. While it's cute that you're trying, you might find this endeavor slightly more challenging than anticipated. Don't hesitate to reach out to us seasoned racers; we'll try not to laugh too hard at your struggles.
            
            Sincerely,
            General Waste`,
            read: false
        };
    }

    static get corruptionTax(): Scroll {
        return {
            sender: 'General Waste',
            subject: 'Tax collection',
            body: `"Manager",
            It has come to my attention that your recent earnings have attracted the attention of our diligent tax collectors. While I'm sure this is a novel experience for someone of your stature, it is nonetheless a reminder of your racing duties. Rest assured, these taxes serve a greater purpose, ensuring your forays in the esteemed art of camel racing continue to go undisturbed.

            Do not feel the need to inspect your Cash Money holdings too closely, I question whether there is anything of great significance to check regardless.
            
            Sincerely,
            General Waste`,
            read: false
        };
    }
}
