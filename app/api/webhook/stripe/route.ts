import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text(); // raw text — for signature verification
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // update user in DB
      const userId = session.metadata?.userId;
      if(userId) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        console.log(
          "🫂🫂 Subscription object:",
          JSON.stringify(subscription, null, 2),
        );

        const subscriptionEnds = new Date(
          subscription.items.data[0].current_period_end * 1000,
        );

        await prisma.user.update({
            where: {id:userId},
            data: {
                isSubscribed: true,
                subscriptionEnds: subscriptionEnds,
            },
        })

        console.log("😡 User subscribed:", userId, "ends:", subscriptionEnds);
        
      }

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      // update user in DB
      const userId = subscription.metadata?.userId;

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            isSubscribed: false,
            subscriptionEnds: null,
          },
        });
        console.log("User unsubscribed:", userId);
      }
      
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
