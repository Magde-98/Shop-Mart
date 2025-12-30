"use server";

import getMyToken from "@/app/utilities/getMyToken";

export async function getLoggedUserCart() {
  const token = await getMyToken();
  const tokenStr = token as string;
  const headers = {
    token: tokenStr,
    "Content-Type": "application/json",
  };

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: headers
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch cart: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
