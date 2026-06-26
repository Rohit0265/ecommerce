"use client"

// import PaymentForm from "@/components/PaymentForm"
import ShippingForm from "@/components/ShippingForm"
import StripePaymentForm from "@/components/StripePaymentForm"
import useCartStore from "@/stores/cartStore"
import { CartItemsType, shippingformInputs } from "@repo/types"
import { ArrowRight, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

const steps= [
    {
        id:1,
        title:"Shopping Cart"
    },
    {
        id:2,
        title:"Shipping Address "
    },
    {
        id:3,
        title:"Payment Method"
    },
]

// temproray

// const cartItems:CartItemsType = [
//       {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity:1,
//     selectedSize:"m",
//     selectedColor:"gray"
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//         quantity:1,
//     selectedSize:"l",
//     selectedColor:"black"
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//         quantity:1,
//     selectedSize:"xl",
//     selectedColor:"dark"
//   }
// ]



const CartPageContent=()=> {
  const [shippingform,setShippingForm] = useState<shippingformInputs>()
    const searchParams = useSearchParams()

    const router = useRouter()

    const activeStep = parseInt(searchParams.get("step")||"1")
   
    const {cart,removeFromCart}= useCartStore();
  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
        {/* title */}

        <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
{/* steps  */}

<div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
    {steps.map(steps=>(
        <div className={`flex flex-items gap-2 border-b-2 pb-4 ${steps.id === activeStep ? "border-gray-800" : "border-gray-200"}` } key={steps.id}>
            <p className={`text-sm font-medium ${steps.id === activeStep ? "text-gray-800" : "text-gray-400"}`}>{steps.title}</p>
        </div>
    ))}
</div>
{/* step and detail  */}
<div className="w-full flex flex-col lg:flex-row gap-16">
{/* step  */}
<div className="w-full lg:w-7/12 shadow-lg border-2 border-gray-100 p-8 rounded-lg flex flex-col gap-8 ">

{activeStep === 1 ? 

cart.map(items=>(

  <div className="flex items-center justify-between" key={items.id+items.selectedSize+items.selectedColor}>
    <div className="flex gap-8">
      <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
        <Image src={(items.images as Record<string,string>)?.[items.selectedColor] || ""} 
        alt={items.name}
        fill
        className="object-contain"
        />
      </div>

{/* item detail  */}

<div className="flex flex-col justify-between">
<div className="flex flex-col gao-1">
<p className="text-sm font-medium">{items.name}</p>
<p className="text-sm text-gray-500">Quantity:{" "}{items.quantity}</p>
<p className="text-sm text-gray-500">Size:{" "}{items.selectedSize}</p>
<p className="text-sm text-gray-500">Color:{" "}{items.selectedColor}</p>
</div>
<p className="font-medium">${items.price.toFixed(2)}</p>
</div>
 
    </div>


    {/* delte button  */}
    <button onClick={()=> (removeFromCart(items))} className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center"><Trash2 className="w-3 h-3"
    /></button>
  </div>


)) : activeStep === 2 ? (<ShippingForm setShippingForm={setShippingForm} />):(activeStep ===3 && shippingform ?<StripePaymentForm shippingForm={shippingform}/> : <p className="tezxt-sm text-gray-500">Please Fill The Shipping Address</p> )}
</div>





{/* detail  */}
<div className="w-full lg:w-5/12 shadow-lg border-2 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">

<h2 className="font-semibold">Cart Details</h2>


<div className="flex flex-col gap-4">
  <div className="flex justify-between text-sm">
    <p className="text-gray-500">Subtotal</p>
    <p className="text-sm font-medium">${cart.reduce((acc,item)=> acc+item.price *item.quantity,0).toFixed(2)}</p>
  </div>

  <div className="flex justify-between text-sm">
    <p className="text-gray-500">Discount(10%)</p>
    <p className="font-medium">$ 10</p>
  </div>

  <div className="flex justify-between text-sm">
    <p className="text-gray-500">Shipping Fee</p>
    <p className="font-medium"> $10</p>

  </div>
    <hr className="border-gray-00"></hr>
  <div className="flex justify-between text-sm">
    <p className="text-gray-800 font-semibold">Total</p>
    <p className="font-medium">${cart.reduce((acc,item)=> acc+item.price *item.quantity,0).toFixed(2)}</p>
  </div>
  
</div>

{
activeStep === 1 &&

<button onClick={()=> router.push("/cart?step=2",{scroll:false})} className="w-full hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 bg-gray-800 text-white p-2 rounded-lg cursor-pointer">Continue
  <ArrowRight className="w-3 h-3" />
</button>
}
</div>

</div>
    </div>
  )
}

const CartPage = () => {
  return (
    <Suspense fallback={<div>Loading Cart...</div>}>
      <CartPageContent />
    </Suspense>
  )
}

export default CartPage