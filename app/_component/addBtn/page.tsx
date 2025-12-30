"use client";

import { addToCart } from "@/app/api/cartAction/addProductCart.api";
import cartItemContext from "@/app/context/cartContext";
import { useContext } from "react";
import { toast } from "sonner";

interface AddBtnProps {
  id: string;
  className?: string;
}

export default function AddBtn({ id, className = "" }: AddBtnProps) {
  const context = useContext(cartItemContext);

  if (!context) {
    throw new Error("Cart context does not exist");
  }

  const { setDetails } = context;

  async function addProductToCart() {
    try {
      const response = await addToCart(id);
      setDetails(response.numOfCartItems);

      toast.success("Added to cart", {
        position: "top-center",
        duration: 3000,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <button
      onClick={addProductToCart}
      className={`w-full transition-all duration-200 active:scale-95 ${className}`}
    >
      Add To Cart
    </button>
  );
}

