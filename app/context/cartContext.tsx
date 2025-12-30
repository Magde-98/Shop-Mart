"use client";

import { createContext, useEffect, useState } from "react";
import { getLoggedUserCart } from "../api/cartAction/getLoggedUserCart.api";

interface CartContextType {
  dataDetails: number;
  setDetails: React.Dispatch<React.SetStateAction<number>>;
}

const cartItemContext = createContext<CartContextType | null>(null);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataDetails, setDetails] = useState<number>(0);

  useEffect(() => {
    async function getDetails() {
      try {
        const resp = await getLoggedUserCart();
        setDetails(resp.numOfCartItems);
      } catch (error) {
        setDetails(0);
      }
    }

    getDetails();
  }, []);

  return (
    <cartItemContext.Provider value={{ dataDetails, setDetails }}>
      {children}
    </cartItemContext.Provider>
  );
}

export default cartItemContext;
