"use server";

import getMyToken from "@/app/utilities/getMyToken";

export async function getLoggedUserCart() {
  const token = await getMyToken();


  if (!token) {
    return {
      numOfCartItems: 0,
      data: [],
    };
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });


  if (!res.ok) {
    return {
      numOfCartItems: 0,
      data: [],
    };
  }

  return res.json();
}
