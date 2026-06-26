import type {Product} from "@repo/product-db";
import z from "zod"

export type CartItemType = Product & {
    quantity : number;
    selectedSize : string;
    selectedColor : string;
}



export const shippingSchema = z.object({
    name:z.string().min(1,"Name is Required"),
    email:z.string().min(1,"Email Is Required"),
    phone:z.string().min(7,"Phone Number Must Be Between 7 And 10 Digits").max(10,"Phone Number Must Be Between 7 And 10 Digits").regex(/^\d+$/,"Phone Number Must Be Contain Only Numbers!"),
    address:z.string().min(1,"Address Is Required"),
    city:z.string().min(1,"City Is Required"),

})

    export type shippingformInputs = z.infer<typeof shippingSchema>;

export type CartItemsType = CartItemType[]



export type CartStoreStateType = {
    cart : CartItemsType,
    hasHydrated:boolean
}

export type CartStoreActionsType = {
    addToCart : (product:CartItemType)=>void;
    removeFromCart:(product:CartItemType)=>void;
    clearCart:()=> void;
}