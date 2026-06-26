import mongoose, { InferSchemaType, model } from "mongoose";
const {Schema} = mongoose;

export const OrderStatus = ["success","fail"] as const;

const OrderSchema = new Schema({
    userId:{type :String , required:true},
    email:{type :String , required:true},
    amount:{type :String , required:true},
    status:{type :String , required:true ,enum:OrderStatus},
    stripeSessionId:{type :String},
    products:{type :[
        {
            name:{type:String , required:true},
            quantity:{type:Number,required:true},
            price:{type:Number,required:true}
        }
        ],
        required:true,
    },
},{timestamps:true})

export type OrderSchemaType = InferSchemaType<typeof OrderSchema>;

export const Order = model<OrderSchemaType>("Order",OrderSchema)