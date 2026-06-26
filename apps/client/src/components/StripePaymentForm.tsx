"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CartItemsType, shippingformInputs } from "@repo/types";
import useCartStore from "@/stores/cartStore";
import CheckoutForm from "./checkoutForm";

const stripe = loadStripe("pk_test_51SMoIELfu0EBlY3GHvvjRG4rxEjsPVLiUzOmUvci6JbtFzet6XGty5R6IiaFni8gefqFWTtMfASjnYXkm9ggPi8E00bb3QFxbJ");

const fetchClientSecret = async (cart:CartItemsType, token:String) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/sessions/create-checkout-session`, {
    method: "POST",
    body: JSON.stringify({ cart }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (!json.checkoutSessionClientSecret) {
    throw new Error(json.error || "No client secret returned");
  }

  return json.checkoutSessionClientSecret;
};



const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: shippingformInputs;
}) => {
  const { cart } = useCartStore();
  const [token, setToken] = useState<String | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  if (!token) {
    return <div className="">Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ fetchClientSecret: () => fetchClientSecret(cart, token) }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;