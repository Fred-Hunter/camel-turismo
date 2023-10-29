import { Scroll } from "../scroll";

export class EmmaDaleScrolls {
    static get welcome(): Scroll {
        return {
            sender: 'Emma Dale',
            subject: 'Welcome to Camel Racing Adventures!',
            body: `Welcome, Manager! 🐪 Ready to conquer the desert tracks? 
            As your racing guide, I'm here to help. 
            Train hard, master the sands, and aim for victory. 
            Remember, teamwork counts. Good luck in the races! 🏁 - Emma Dale`,
            read: false
        };
    }
}
