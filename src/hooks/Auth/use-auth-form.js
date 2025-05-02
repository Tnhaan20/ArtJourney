import { useAuth } from "./use-auth";
import { useForm } from "react-hook-form";
import {
  authSchemas
} from "@/domains/schema/Auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAuthForm = ({ type }) => {
  const { loginMutation, registerMutation } = useAuth();
  const { loginSchema, registerSchema } = authSchemas;
  
  const form = useForm({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
    defaultValues:
      type === "login"
        ? { email: "", password: "" }
        : { email: "", password: "", confirmPassword: "", role: 0 },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (type === "login") {
      await loginMutation.mutateAsync(data);
    } else {
      await registerMutation.mutateAsync(data);
    }
  });
  
  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  };
};
