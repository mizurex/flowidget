'use server';

import { widgetFormSchema } from '@/lib/schema/schema';

export async function createWidgetOnServer(formData: unknown) {
  const result = widgetFormSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      errors: require('zod').treeifyError(result.error),
    };
  }

  const { botName, welcomeMessage, role, content } = result.data;

  // Example: Add to DB or external API
  console.log('✅ Valid data received on server:', result.data);

  return {
    success: true,
    message: "Widget created successfully on the server.",
  };
}
