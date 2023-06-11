import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { priceId } = await request.json();

    if (!priceId) {
        return NextResponse.json({message: 'Price not found'}, {status: 400})
    }

    const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: success_url,
        mode: 'payment',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ],
    })

    return NextResponse.json({checkoutUrl: checkoutSession.url}, {status: 201})
} 