/* eslint-disable prettier/prettier */
import { z } from "zod";

const registerValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Must be at least 6 characters."),
    phone: z.string().regex(/^\d{11}$/, "Please enter a valid mobile number!"),
    address: z.string().min(1, "Please enter your address.!"),
    profileImage: z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/"), {
            message: "Please upload a valid image file!",
        })
        .refine((file) => file.size <= 2 * 1024 * 1024, {
            message: "Image must be less than 2MB!", // 2MB limit
        }),
});

export default registerValidationSchema;
