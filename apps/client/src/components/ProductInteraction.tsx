"use client";

import useCartStore from "@/stores/cartStore";
import {ProductType} from "@repo/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter,useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { size } from "zod";
import { useStore } from "zustand";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const {addToCart}= useCartStore();
  const [quantity,setquantity]= useState(1)
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();







const handleAddtoCart = ()=>{
addToCart({
  ...product,quantity,selectedColor,selectedSize
})
toast.success("Product Added Successfully")
}



  const handleQuantityChange = (type:"increment"| "decrement")=>{
    if(type ==="increment"){
      setquantity(prev=>prev+1)
    }else{
      if(quantity > 1){
        setquantity((prev)=>prev-1)
      }
    }
  }
  const handleTypeChange = (type:string,value:string)=>{
const params = new URLSearchParams(searchParams.toString())
params.set(type,value)
router.push(`${pathname}?${params.toString()}`,{ scroll : false });
  }
  return (
    <div className="flex flex-col gap-4 mt-4 ">
      {/* size  */}

      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray--500">size</span>
        <div className="flex items-center gap-2">
        
        {product.sizes.map(item => (
            <div className={`cursor-pointer border p-0.5 ${selectedSize === item ? "border-gray-600" :"border-gray-300 "}`} key={item} onClick={()=>handleTypeChange("size",item)}>
            <div className={`w-6 h-6 text-center flex items-center justify-center ${selectedSize === item ?"bg-black text-white":"bg-white text-black"}`} 
            >{item.toUpperCase()}</div>
          </div>
        ))}
        </div>
      </div>

      {/* color  */}

      <div className="flex flex-col gap-2 text-sm">
                <span className="text-gray--500">Color</span>
        <div className="flex items-center gap-2">
        
        {product.colors.map(color => (
            <div className={`cursor-pointer border-1 p-[2px] ${selectedColor === color ? "border-gray-600" :"border-white"}`} key={color} onClick={()=>handleTypeChange("color",color)}>
            <div className={`w-6 h-6`} 
            style={{backgroundColor:color}}
            />
          </div>
        ))}
        </div>
      </div>

      {/* quantity */}

      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button onClick={()=>handleQuantityChange("decrement")} className="cursor-pointer border-1 border-gray-300 p-1"><Minus className="w-4 h-4"/></button>
          {quantity}
          <button onClick={()=>handleQuantityChange("increment")}  className="cursor-pointer border-1 border-gray-300 p-1"><Plus className="w-4 h-4"/></button>
        </div>
      </div>

{/* button  */}

      <button onClick={handleAddtoCart} className="bg-gray-800 text-sm font-medium text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer">
        <Plus className="w-4 h-4"/>
        Add To Cart
      </button>

      <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium cursor-pointer">
        <ShoppingCart className="w-4 h-4"/>
        Buy This Item
      </button>
    </div>
  );
};

export default ProductInteraction;
