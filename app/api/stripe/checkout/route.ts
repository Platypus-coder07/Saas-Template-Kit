import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // "!" specified typescript that we know this field exsits

export async function POST() {

  const {userId} = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!, // the ID from Stripe dashboard
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
      metadata: {
            userId,
        },
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



/*
one time payment 

line_items: [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "T-shirt",
        },
        unit_amount: 2000,
      },
      quantity: 1,
    },
],
mode: "payment",

*/