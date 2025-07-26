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
            FullName: "",
            PhoneNumber: "",
            Gender: 0,
            Avatar: null,
            Birthday: "",
            ...defaultValues,
          },
        });

        const onSubmit = async (data) => {
          try {
            

            let submitData;

            if (data.Avatar && data.Avatar instanceof File) {
              // Create FormData for file upload (avatar update)
              submitData = new FormData();
              submitData.append("FullName", data.FullName || "");
              submitData.append("PhoneNumber", data.PhoneNumber || "");
              submitData.append("Gender", data.Gender.toString());
              submitData.append("Birthday", data.Birthday || "");
              submitData.append("Avatar", data.Avatar); // Use "Avatar" as field name

              
            } else {
              // Regular JSON object for profile data update (no avatar)
              submitData = {
                FullName: data.FullName || "",
                PhoneNumber: data.PhoneNumber || "",
                Gender: data.Gender,
                Birthday: data.Birthday || "",
                // Don't include Avatar field for profile-only updates
              };

            }

            

            const result = await updateUserProfile.mutateAsync(submitData);

            return result;
          } catch (error) {
            console.error("🚨 User profile update failed:", error);
            throw error;
          }
        };

        return {
          form,
          onSubmit,
          isLoading: updateUserProfile.isPending,
          error: updateUserProfile.error,
        };
    };


    return {
      updateUserProfileForm,
    };
};
