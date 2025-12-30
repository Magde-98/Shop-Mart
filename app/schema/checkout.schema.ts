import { z } from "zod";

export const checkoutSchema = z.object({
    details: z
        .string()
        .min(5, "Address details are required"),

    city: z
        .string()
        .min(3, "City is required"),

    phone: z
        .string()
        .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"),

});
