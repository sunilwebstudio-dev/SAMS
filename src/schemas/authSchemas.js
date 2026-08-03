import { z } from "zod";

export const signupSchema = z.object({

  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  mobile: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter valid mobile number"
    ),

  email: z
    .string()
    .email("Invalid email"),

  businessType: z
    .string()
    .min(1, "Select business type"),

  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "One uppercase required")
    .regex(/[a-z]/, "One lowercase required")
    .regex(/[0-9]/, "One number required")
    .regex(
      /[^A-Za-z0-9]/,
      "One special character required"
    ),

  confirmPassword: z.string(),

  acceptTerms: z.literal(true),

}).refine(

(data)=>data.password===data.confirmPassword,

{

path:["confirmPassword"],

message:"Passwords do not match",

}

);

// --------------------------------

export const loginSchema = z.object({

email:z.string().email(),

password:z.string().min(8),

});