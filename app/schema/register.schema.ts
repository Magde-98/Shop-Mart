import * as z from "zod";

export const signupSchema = z.object({
    name: z
        .string()
        .nonempty("Name is required")
        .min(3, "Minimum length is 3 characters")
        .max(20, "Maximum length is 20 characters"),

    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email format"),

    phone: z
        .string()
        .nonempty("Phone is required")
        .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"),

    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters"),

    rePassword: z
        .string()
        .nonempty("Confirm password is required")
}).refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
});
