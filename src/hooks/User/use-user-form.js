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
            avatarUrl: null, // File type default
            birthday: "",
            ...defaultValues,
          },
        });

        const onSubmit = async (data) => {
          try {
            let submitData;

            if (data.avatarUrl && data.avatarUrl instanceof File) {
              // Create FormData for file upload
              submitData = new FormData();
              submitData.append("fullName", data.fullName || "");
              submitData.append("phoneNumber", data.phoneNumber || "");
              submitData.append("gender", data.gender.toString());
              submitData.append("birthday", data.birthday || "");
              submitData.append("avatarUrl", data.avatarUrl); // File object

              console.log("Creating FormData with file:");
              for (let [key, value] of submitData.entries()) {
                console.log(
                  key,
                  value instanceof File ? `File: ${value.name}` : value
                );
              }
            } else {
              // Regular JSON object without avatar update
              submitData = {
                fullName: data.fullName || "",
                phoneNumber: data.phoneNumber || "",
                gender: data.gender,
                birthday: data.birthday || "",
                // Don't include avatarUrl if no file to upload
              };

              console.log("Creating JSON object:", submitData);
            }

            await updateUserProfile.mutateAsync(submitData);
          } catch (error) {
            console.error("User profile update failed:", error);
            throw error;
          }
        };

        return {
          form,
          onSubmit, // Return the raw onSubmit function
          isLoading: updateUserProfile.isPending,
          error: updateUserProfile.error,
        };
    };


    return {
      updateUserProfileForm,
    };
};
