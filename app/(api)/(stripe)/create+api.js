import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  // console.log("start creation");
  
  const body = await request.json();
  const { name, email, amount } = body;

  if (!name || !email || !amount) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  let customer;
  const doesCustomerExist = await stripe.customers.list({
    email,
  });

  if (doesCustomerExist.data.length > 0) {
    customer = doesCustomerExist.data[0];
    // console.log("customer exist");
    
  } else {
    const newCustomer = await stripe.customers.create({
      name,
      email,
    });

    customer = newCustomer;
    // console.log("create new customer");
    
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-04-10" },
  );
  // console.log("customer", customer);
  // console.log("ephemeralKey: ",  ephemeralKey);
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "usd",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });
  // console.log("paymentIntent", paymentIntent);
  

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    }),
  );


  // const responsePayload = {
  //   paymentIntent: paymentIntent,
  //   ephemeralKey: ephemeralKey,
  //   customer: customer.id,
  // };
  // // console.log("Response Payload:", responsePayload);
  
  // return new Response(JSON.stringify(responsePayload), {
  //   status: 200,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',  // Or use specific domain in production
  //   },
  // });

  
}