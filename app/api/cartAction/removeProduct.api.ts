"use server"

import getMyToken from "@/app/utilities/getMyToken"

export async function removeSpacificItem(id: string) {

    const token = await getMyToken();
    const tokenStr = token as string;

    const headers = {
        token: tokenStr,
        "Content-Type": "application/json",
    };

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: 'DELETE',
        headers: headers,

    });

    const data = await response.json();
    return data;



}