"use server"

import getMyToken from "@/app/utilities/getMyToken"

export async function updateProduct(id: string , countNumber:number){

    const token = await getMyToken();
    const tokenStr = token as string;
    const payload={
        count:countNumber
    }

    const headers = {
        token: tokenStr,
        "Content-Type": "application/json",
    };

      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      method:'PUT',
      headers: headers,
      body : JSON.stringify(payload)
  });

    const data = await response.json();
    return data;



}