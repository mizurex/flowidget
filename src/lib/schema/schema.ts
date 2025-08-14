import {z} from 'zod'

export const widgetFormSchema = z.object({
    botName : z.string().min(4,{message:"Bot Name must be atleast 4 words"}),
    welcomeMessage: z.string().min(5, { message: "Welcome message is required." }),
    role: z.string().min(10, { message: "Role must be at least 10 characters long." }),
    content: z.string()
    .min(20, { message: "Content/Knowledge base needs more information." })
    .max(800,{message:"Content too long"})
     .refine(val => !/function|<script|=>/.test(val), {
      message: "Code or scripts are not allowed in content",
    }),
  
});

export type TWidgetFormSchema = z.infer<typeof widgetFormSchema>;
