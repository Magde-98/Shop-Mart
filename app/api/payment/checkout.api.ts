"use server";

import { Icheckout } from "@/app/interface/checkout.interface";
import getMyToken from "@/app/utilities/getMyToken";

export async function payProducts(formValue:Icheckout, cartId: string) {
    const token = await getMyToken();
    const tokenStr = token as string;

    const headers = {
        token: tokenStr,
        "Content-Type": "application/json",
    }

    const payload = {
        shippingAddress: formValue
    };

    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            method: "POST",
            headers: headers,

            body: JSON.stringify(payload),

        }
    );

    const data = await response.json();
    return data;
}