export class MerchantIceScrolls {
    static getCamelPurchase(camel) {
        return {
            sender: 'Merchant Ice',
            subject: 'Celebrating Your New Camel',
            body: `Dear Camel Owner,

            Congratulations on your purchase of ${camel.name}! Your new camel is a magnificent creature with a rich history, it's in its prime, boasting a striking ${camel.colour} coat that glistens in the sun. This majestic camel hails from the land of Egypt, known for its prized camels.
            
            We've attached the official camel papers for your records. Take good care of this remarkable camel, and may your journeys together be filled with adventure.
            
            Best regards,
            Merchant Ice`,
            read: false
        };
    }
}
