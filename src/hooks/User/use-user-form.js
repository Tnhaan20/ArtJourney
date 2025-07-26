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
            console.log("🔍 useUserForm onSubmit received data:", data);
            console.log(
              "🔍 Avatar file check:",
              data.avatarUrl instanceof File ? "✅ Is File" : "❌ Not a File",
              data.avatarUrl
            );

            let submitData;

            if (data.avatarUrl && data.avatarUrl instanceof File) {
              // Create FormData for file upload (similar to CourseModal)
              submitData = new FormData();
              submitData.append("FullName", data.fullName || "");
              submitData.append("PhoneNumber", data.phoneNumber || "");
              submitData.append("Gender", data.gender.toString());
              submitData.append("Birthday", data.birthday || "");
              submitData.append("AvatarUrl", data.avatarUrl); // File object with correct name

              console.log("📤 Creating FormData with file:");
              console.log("📤 File name:", data.avatarUrl.name);
              console.log("📤 File size:", data.avatarUrl.size);
              console.log("📤 File type:", data.avatarUrl.type);

              // Log all FormData entries
              for (let [key, value] of submitData.entries()) {
                console.log(
                  `📤 FormData - ${key}:`,
                  value instanceof File
                    ? `[File: ${value.name}, ${value.size} bytes]`
                    : value
                );
              }
            } else {
              // Regular JSON object without avatar update (similar to CourseModal approach)
              submitData = {
                fullName: data.fullName || "",
                phoneNumber: data.phoneNumber || "",
                gender: data.gender,
                birthday: data.birthday || "",
                // Don't include avatarUrl if no file to upload
              };

              console.log("📤 Creating JSON object:", submitData);
            }

            console.log(
              "📤 Final submitData type:",
              submitData instanceof FormData ? "FormData" : "JSON Object"
            );
            
            await updateUserProfile.mutateAsync(submitData);
          } catch (error) {
            console.error("🚨 User profile update failed:", error);
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
