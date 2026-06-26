"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import CartPage from "@/app/cart/page"
import useCartStore from "@/stores/cartStore"

const ShoppingCartIcon = () => {
  const {cart,hasHydrated} = useCartStore();
  if(!hasHydrated) return null;
    const totalQuantity = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
    : 0;
  return (
    <Link href="/cart" className="relative">
    <ShoppingCart className="w-4 h-4 text-gray-600"/>
    <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">{totalQuantity}</span>
    </Link>

  )
}

export default ShoppingCartIcon