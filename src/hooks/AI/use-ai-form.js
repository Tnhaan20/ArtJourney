import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the schema for message form
const messageFormSchema = z.object({
  message: z.string().min(1, "Message is required"),
  chatSessionId: z.number().nullable().optional(),
  includeUserProgress: z.boolean().nullable().optional(),
  includeCurrentCourse: z.boolean().nullable().optional(),
});

export const useAIMessageForm = (defaultValues = {}) => {
  const form = useForm({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
      chatSessionId: null,
      includeUserProgress: null,
      includeCurrentCourse: null,
      ...defaultValues,
    },
  });

  const resetForm = () => {
    form.reset({
      message: "",
      chatSessionId: null,
      includeUserProgress: null,
      includeCurrentCourse: null,
      ...defaultValues,
    });
  };

  return {
    form,
    resetForm,
    messageFormSchema,
  };
};

// Define schema for creating a new chat session
const sessionFormSchema = z.object({
  title: z.string().min(1, "Session title is required"),
  description: z.string().optional(),
});

export const useAISessionForm = (defaultValues = {}) => {
  const form = useForm({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      ...defaultValues,
    },
  });

  const resetForm = () => {
    form.reset({
      title: "",
      description: "",
      ...defaultValues,
    });
  };

  return {
    form,
    resetForm,
    sessionFormSchema,
  };
};