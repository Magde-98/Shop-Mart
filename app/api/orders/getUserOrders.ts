"use server";

import getMyToken from "@/app/utilities/getMyToken";

export async function getUserOrders(userId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      headers: {
        token: token as string,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Orders API error:", errorText);
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}


