import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useToast } from "@/utils/Toast";
import { Camera, Check, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TailwindStyle } from "@/utils/Enum";
import { useAuth } from "@/hooks/Auth/use-auth"; // Import custom hook

export default function UserProfile() {
  const { user, login } = useAuthStore();
  const { toast } = useToast();
  
  // Sử dụng custom hook use-auth
  const { useSendVerifyEmail } = useAuth();
  const verifyEmailQuery = useSendVerifyEmail();
  
  // Local state để quản lý trạng thái loading của việc gửi email
  const [isVerifyEmailLoading, setIsVerifyEmailLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender !== undefined ? user?.gender.toString() : "",
    birthday: user?.birthday ? new Date(user.birthday).toISOString().split('T')[0] : "",
  });
  
  // Cập nhật form khi user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender !== undefined ? user.gender.toString() : "",
        birthday: user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    
    try {
      // Chuyển đổi gender từ string thành number trước khi lưu
      const updatedUserData = {
        ...user,
        fullName: formData.name,
        gender: formData.gender !== "" ? parseInt(formData.gender) : undefined,
        birthday: formData.birthday,
      };
      
      // Cập nhật dữ liệu trong store
      await login(updatedUserData);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile information.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // Xử lý gửi email xác thực với thông báo tại component
  const handleResendVerification = async () => {
    setIsVerifyEmailLoading(true);
    try {
      // Gọi API thông qua hook
      const dataVerifyMail = await verifyEmailQuery.refetch();
      
      // Hiển thị thông báo thành công sau khi API trả về
      toast({
        title: "Verification email sent",
        description: dataVerifyMail.data.data,
        variant: "success",
      });
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo lỗi
      toast({
        title: "Failed to send verification email",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifyEmailLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <h1 className="text-3xl font-bold text-primary-yellow mb-6">
        My Profile
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Photo & Verification Status */}
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-amber-50 mb-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-100 text-amber-800 text-2xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <button className="absolute bottom-0 right-0 p-1.5 bg-primary-yellow rounded-full text-white">
                <Camera size={16} />
              </button>
            </div>

            <div className="text-center mb-4">
              <p className="font-medium text-lg">{user?.name}</p>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className="w-full text-center">
              {user?.status === 0 ? (
                <Badge className="bg-green-600">
                  <Check size={14} className="mr-1" />
                  Verified
                </Badge>
              ) : (
                <div>
                  <Badge className="bg-primary-yellow mb-2">
                    <AlertCircle size={14} className="mr-1" />
                    Verification Required
                  </Badge>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleResendVerification}
                    className="text-primary-blue hover:text-primary-yellow"
                    disabled={isVerifyEmailLoading}
                  >
                    {isVerifyEmailLoading
                      ? "Sending..."
                      : "Send verification email"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Information Form */}
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal information and how others see you on the
              platform.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 gap-2 px-4 py-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    disabled
                  />
                  <p className="text-xs text-gray-500">
                    Email address cannot be changed.
                  </p>
                </div>

                <Separator className="my-2" />

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select gender</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input
                    id="birthday"
                    name="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end space-x-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    gender:
                      user?.gender !== undefined ? user?.gender.toString() : "",
                    birthday: user?.birthday
                      ? new Date(user.birthday).toISOString().split("T")[0]
                      : "",
                  })
                }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitLoading}
                className={`${TailwindStyle.HIGHLIGHT_FRAME} rounded-md cursor-pointer`}
              >
                {isSubmitLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}