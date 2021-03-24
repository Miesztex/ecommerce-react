// domain/.netlify/functions/create-payment-intent

require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

// 1. receive post with cart
// 2. calculate price
// 3. send price with secret key to stripe
// 4. return response or error

exports.handler = async function (event, context) {
	const { shipping_fee, total_amount } = JSON.parse(event.body); // decode payload

	const calculateOrderAmount = () => {
		// Replace this constant with a calculation of the order's amount
		return shipping_fee + total_amount;
	};

	try {
		// ------- send to stripe ------
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(),
			currency: 'usd',
		});
		return {
			statusCode: 200,
			body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			// received payload from stripe
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
