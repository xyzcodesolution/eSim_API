const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY);

module.exports.validateVisaCard = async (req, res) => {
    const { payment_method_id } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 50, // Replace with the amount you want to charge
            currency: 'usd',
            payment_method: payment_method_id,
            confirmation_method: 'manual',
            confirm: true,
        });

        res.send({ paymentIntent });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
    // try {
    //     // Create a payment intent with the card details
    //     const paymentIntent = await stripe.paymentIntents.create({
    //         amount: 100, // Amount in cents
    //         currency: 'usd',
    //         // payment_method_types: ['card'],
    //         confirmation_method: 'manual', // Handle confirmation on client-side
    //         capture_method: 'manual', // Manually capture the payment later
    //         payment_method_data: {
    //             type: 'card',
    //             card: {
    //                 number: cardNumber,
    //                 exp_month: expirationMonth,
    //                 exp_year: expirationYear,
    //                 cvc: cvv,
    //             },
    //         },
    //     });
    //     // const balance = await stripe.balance.retrieve();
    //     // If no errors occur, the card is valid and able to transfer money
    //     console.log('Payment intent created successfully:', paymentIntent);
    //     return true;
    // } catch (error) {
    //     // Handle errors
    //     console.error('Error creating payment intent:', error);
    //     return false;
    // }
}


// module.exports.testStripe = async () => {
//     // Example usage
//     validateVisaCard('4231200008525320 ', 12, 2024, '441', 1, 'usd');
// }