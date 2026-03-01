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



  return {
    success: true,
    message: "Widget created successfully on the server.",
  };
}
