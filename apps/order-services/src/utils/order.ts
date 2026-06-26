import { Order } from "@repo/order-db";
import { OrderType } from "@repo/types";
import { producer } from "./kafka";

export const createOrder = async (order:OrderType)=>{
     try{
      if (order.stripeSessionId) {
        const existing = await Order.findOne({ stripeSessionId: order.stripeSessionId });
        if (existing) {
          console.log(`Order with stripeSessionId ${order.stripeSessionId} already exists. Skipping.`);
          return;
        }
      }
      const newOrder = new Order(order);
      const savedOrder = await newOrder.save();
      producer.send("order.created",{
         value:{
            email:savedOrder.email,
            amount:savedOrder.amount,
            status:savedOrder.status,
         }
      });
     }catch(error){
        console.log(error);
        throw error;
     }
}