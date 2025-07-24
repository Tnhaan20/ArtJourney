import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfileSchema } from "@/domains/schema/User/user.schema";
import { useUser } from "./use-user";


export const useUserForm = () => {
    const {
        updateUserProfile
    } = useUser();


    const updateUserProfileForm = (defaultValues = {}) => {
        const form = useForm({
            resolver: zodResolver(updateUserProfileSchema),
            defaultValues: {
                fullName: "",
                phoneNumber: "",
                gender: 0,
                avatarUrl: "",
                birthday: "",
                ...defaultValues,
            }
        });

        const onSubmit = async (data) => {
            try {
                await updateUserProfile.mutateAsync(data);
                // Don't reset the form here since we want to keep the updated values
                // form.reset();
            } catch (error) {
                console.error("User profile update failed:", error);
                // Error handling is already done in the mutation's onError callback
                throw error; // Re-throw so the component can handle it if needed
            }
        };

        return {
            form,
            onSubmit: form.handleSubmit(onSubmit),
            isLoading: updateUserProfile.isPending,
            error: updateUserProfile.error,
        };
    };


    return {
      updateUserProfileForm,
    };
};
