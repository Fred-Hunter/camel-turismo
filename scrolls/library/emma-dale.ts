import { Scroll } from "../scroll.js";

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
    
    static get bonus100CashMoney(): Scroll {
        return {
            sender: 'Emma Dale',
            subject: 'Thank you for supporting the Camel Racing Adventures!',
            body: `Felicitations, Manager! 🐪 Thank you for your support of the desert tracks!
            As your esteemed racing connoisseur, I stand ready to bestow upon you the rewards of your valor.
            Within the venerable confines of your Cash Money holdings, you shall find an extra bonus of 100 Cash Money awaiting your enjoyment. 💸 - Emma Dale`,
            read: false
        };
    }
}
