"use server";

import getMyToken from "@/app/utilities/getMyToken";

export async function addToCart(productId: string) {
  const token = await getMyToken();
  const tokenStr = token as string;

  const payload = { productId };

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      method: "POST",
      headers: {
        token: tokenStr,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  return response.json();
}
