import { Hono } from "hono";
// import stripe from "../../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";
import { CartItemsType } from "@repo/types";
import { getStripeProductPrice } from "../utils/stripeProducts";
import { Session } from "inspector/promises";
import stripe from "../utils/stripe";
import { producer } from "../utils/kafka";

const sessionRoutes =new Hono();

sessionRoutes.post('/create-checkout-session',shouldBeUser ,async (c) => {

  const {cart}:{cart:CartItemsType} = await c.req.json();
  const userId = c.get("userId");

  const lineItems= await Promise.all(
    cart.map(async(item)=>{
      const unitAmount = await getStripeProductPrice(item.id);
      return {
        price_data:{
          currency:"usd",
          product_data:{
            name:item.name,
          },
          unit_amount:unitAmount as number,
        },
        quantity: item.quantity,
      }
    })
  )


  try {
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    client_reference_id:userId,
    mode: 'payment',
    ui_mode: 'custom',
    // The URL of your payment completion page
    
    return_url: 'http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}'
  });

  return c.json({checkoutSessionClientSecret: session.client_secret});

  
} catch (error) {
  console.log(error);
  return c.json(error)
}

});
// console.log(Session)

sessionRoutes.get("/:session_id",async (c)=>{
  const {session_id}= c.req.param();
  const session = await stripe.checkout.sessions.retrieve(session_id as string,{
    expand:["line_items"],
  });

  if (session.status === "complete" && session.payment_status === "paid") {
    const lineItems = session.line_items || await stripe.checkout.sessions.listLineItems(session.id);
    await producer.send("payment.successful", {
      value: {
        stripeSessionId: session.id,
        userId: session.client_reference_id,
        email: session.customer_details?.email,
        amount: session.amount_total,
        status: "success",
        products: lineItems.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.price?.unit_amount,
        })),
      },
    });
  }

  console.log(session);
  return c.json(session);
})


export default sessionRoutes;