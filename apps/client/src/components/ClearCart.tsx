"use client";

import { useEffect } from "react";
import useCartStore from "@/stores/cartStore";

export default function ClearCart() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
