import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    console.log("WEBHOOK HIT");
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if(!WEBHOOK_SECRET) {
        throw new Error("Please add webhook secret in env");
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if(!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured- No svix header");
    }

    const payload = await req.json(); 
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let event: WebhookEvent;

    try {
        event = wh.verify(body, {
            "svix-id" : svix_id,
            "svix-timestamp" : svix_timestamp,
            "svix-signature" : svix_signature
        }) as WebhookEvent;

        // console.log("Webhook event received:", event);
        
    } catch (error) {
        console.error("Error verifying webhook:", error); 
        return new Response("Error occured", {status:400});
    }

    const {id} = event.data;
    const eventType = event.type;

    if(eventType === "user.created") {
        try {
            const {email_addresses, primary_email_address_id} = event.data;
            console.log(
              "Checking emails:",email_addresses,
              "Primary ID:",primary_email_address_id,
            );
            // log the data

            let emailString = "";
            const primaryEmail = email_addresses.find((email: any) => email.id === primary_email_address_id);
               
            if(primaryEmail) {
                emailString = primaryEmail.email_address;
            } else if (email_addresses && email_addresses.length > 0) {
                emailString = email_addresses[0].email_address;
            } else  {
                emailString = `mock-user-${event.data.id}@example.com`;
                console.log(` Empty email array detected. Using mock fallback email: ${emailString}`);
            }


            // if(!primaryEmail) {
            //     console.log(" Failed at: No primary email found in array");
            //     return new Response("Error occured- No primary email found", {status:400});
            // }

            // create user in db
            const newUser = await prisma.user.create({
              data: {
                id: event.data.id,
                email: emailString,
                isSubscribed: false,
              },
            });
            // console.log("new user crearted", newUser);
            

        } catch (error) {
            console.error("Failed at Prisma database insert error:", error);
            return new Response("Error occured while creating user in db", {status:400});
        }
    }

    return new Response("Webhook received successfully", {status:200});

}
