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
}
