"use client"

import useCartStore from "@/stores/cartStore"
import { ProductType } from "@repo/types"
import {ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"

const ProductCard = ({products}:{products:ProductType})=>{

const [productid,setproductid]= useState({
  size :products.sizes[0]!,
  color:products.colors[0]!
})

const {addToCart}= useCartStore();

const handleAddtToCart = ()=>{
  addToCart({
    ...products,
    quantity:1,
    selectedSize:productid.size,
    selectedColor:productid.color
  });
  toast.success("Product Added To Cart")
}

const handleProductType = ({type,value}:{type:"size" | "color",value:string})=>{
  setproductid((prev)=>({
    ...prev,
    [type]:value,
  }))
}

  return (

    <div className="shadow-lg rounded-lg overflow-hidden">
      <Link href={`/products/${products.id}`}>
      <div className="relative aspect-2/3">
        <Image
        src={(products.images as Record<string,string>)?.[productid.color] ||  " "}
        alt={products.name}
        fill
        className="object-cover hover:scale-105 transition-all duration-300"/>
      </div>
      </Link>

      {/* product detail */}

      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{products.name}</h1>
        <p className="text-sm text-gray-500">{products.shortDescription}</p>

        {/* product types  */}

        <div className="flex items-center gap-4 text-xs">
          {/* sizes */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select name="size" id="size" className="ring ring-gray-300 rounded-md px-2 py-1" onChange={e=>handleProductType({type:"size",value:e.target.value})}>
              {products.sizes.map(size=>(
                <option key={size} value={size}>{size.toUpperCase()}</option>
              ))}
            </select>
          </div>
          {/* colors */}
          <div className="">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {products.colors.map(color=>(
                <div className={`cursor-pointer border-1 ${productid.color === color ? "border-gray-400":"border-gray-200"} rounded-full p-[1.2px]`} key={color} onClick={()=>handleProductType({type:"color",value:color})}>
                  <div className="w-[14px] h-[14px] rounded-full" style={{backgroundColor:color}}/>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* price and atc */}
        <div className="flex items-center justify-between">
          <p className="font-medium">${products.price.toFixed(2)}</p>
          <button onClick={handleAddtToCart} className="ring-1 flex gap-2 items-center justify-center ring-gray-200shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ">
            <ShoppingCart className="w-4 h-4"/>
            Add to Cart</button>

        </div>
      </div>
    </div>
  )
}

export default ProductCard