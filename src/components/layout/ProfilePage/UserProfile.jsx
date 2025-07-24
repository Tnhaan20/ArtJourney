import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useToast } from "@/utils/Toast";
import {
  Camera,
  Check,
  AlertCircle,
  Calendar,
  Crown,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TailwindStyle } from "@/utils/Enum";
import { useAuth } from "@/hooks/Auth/use-auth";
import { useUser } from "@/hooks/User/use-user";
import { useUserForm } from "@/hooks/User/use-user-form";

export default function UserProfile() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  // Sử dụng custom hooks
  const { useSendVerifyEmail } = useAuth();
  const { getPremiumStatusQuery, getUserProfileQuery } = useUser();
  const { updateUserProfileForm } = useUserForm();
  const verifyEmailQuery = useSendVerifyEmail();

  // Local state for avatar preview
  const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

  const [isVerifyEmailLoading, setIsVerifyEmailLoading] = useState(false);
  const [formInitialized, setFormInitialized] = useState(false);

  // Get user profile data
  const {
    data: userProfile,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = getUserProfileQuery;
  const currentUser = userProfile?.data || user;


  
  // Initialize form with user data
  const {
    form,
    onSubmit,
    isLoading: isUpdateLoading,
  } = updateUserProfileForm({
    fullName: currentUser?.fullName || currentUser?.name || "",
    phoneNumber: currentUser?.phoneNumber || currentUser?.phone || "",
    gender: currentUser?.gender || 0,
    avatarUrl: currentUser?.avatarUrl || currentUser?.avatar || "",
    birthday: currentUser?.birthday
      ? new Date(currentUser.birthday).toISOString().slice(0, 10)
      : "",
  });

  // Effect to refetch profile data when component mounts
  useEffect(() => {
    if (!userProfile && !isProfileLoading) {
      refetchProfile();
    }
  }, [userProfile, isProfileLoading, refetchProfile]);

  // Effect to update form when user data changes
  useEffect(() => {
    if (currentUser && !formInitialized) {
      form.reset({
        fullName: currentUser?.fullName || "",
        phoneNumber: currentUser?.phoneNumber || "",
        gender: currentUser?.gender || 0,
        avatarUrl: currentUser?.avatarUrl || "",
        birthday: currentUser?.birthday
          ? new Date(currentUser.birthday).toISOString().slice(0, 10)
          : "",
      });
      setFormInitialized(true);
    }
  }, [currentUser, form, formInitialized]);

  // Handle avatar upload
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      setAvatarFile(file);

      // Set the file in form data
      form.setValue("avatarUrl", file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      setAvatarPreview(null); // Reset preview after successful update
      await refetchProfile();
      
      setFormInitialized(false); // Allow form to be re-initialized with new data
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // Xử lý gửi email xác thực với thông báo tại component
  const handleResendVerification = async () => {
    setIsVerifyEmailLoading(true);
    try {
      const dataVerifyMail = await verifyEmailQuery.refetch();
      toast({
        title: "Verification email sent",
        description: dataVerifyMail.data.data,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Failed to send verification email",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifyEmailLoading(false);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render premium status section
  const renderPremiumStatus = () => {
    const premiumData = getPremiumStatusQuery.data?.data;
    const isLoading = getPremiumStatusQuery.isLoading;

    if (isLoading) {
      return (
        <div className="w-full mb-4">
          <div className="bg-gray-100 rounded-lg p-3 animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
      );
    }

    if (!premiumData || currentUser?.premium === "FreeTier") {
      return (
        <div className="w-full mb-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  Free Tier
                </span>
              </div>
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-600 text-xs"
              >
                Current Plan
              </Badge>
            </div>
            <p className="text-xs text-gray-500">
              Basic access to courses and features
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full mb-4">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-800">
                Premium Member
              </span>
            </div>
            <Badge className="bg-amber-500 text-white text-xs">
              <Star className="w-3 h-3 mr-1" />
              {premiumData.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-amber-700">
              <Calendar className="w-3 h-3" />
              <span>Subscribed: {formatDate(premiumData.subcriptionAt)}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-amber-700">
              <Calendar className="w-3 h-3" />
              <span>Valid until: {formatDate(premiumData.endDate)}</span>
            </div>
          </div>

          <p className="text-xs text-amber-600 mt-2">
            Full access to all courses and exclusive content
          </p>

          {new Date(premiumData.endDate) - new Date() <
            7 * 24 * 60 * 60 * 1000 && (
            <div className="mt-2 p-2 bg-orange-100 border border-orange-200 rounded text-xs text-orange-700">
              ⚠️ Your premium subscription expires soon!
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isProfileLoading && !currentUser) {
    return (
      <div className="container mx-auto max-w-2xl py-10 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-6"></div>
          <div className="flex flex-col md:flex-row gap-7">
            <div className="w-full md:w-1/3 h-96 bg-gray-300 rounded"></div>
            <div className="w-full md:w-2/3 h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-3xl font-bold text-primary-yellow mb-6">
        My Profile
      </h1>

      <div className="flex flex-col md:flex-row gap-7">
        {/* Profile Photo & Verification Status */}
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden bg-amber-50 mb-4 cursor-pointer group"
              onClick={handleAvatarClick}
            >
              {avatarPreview || currentUser?.avatarUrl ? (
                <img
                  src={avatarPreview || currentUser.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-100 text-amber-800 text-2xl font-bold group-hover:bg-amber-200 transition-colors">
                  {currentUser?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200">
                <Camera
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  size={24}
                />
              </div>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <div className="text-center mb-4">
              <p className="font-medium text-lg">{currentUser?.fullName}</p>
              <p className="text-gray-600">{currentUser?.email}</p>
            </div>

            {/* Render Premium Status */}
            {renderPremiumStatus()}

            <div className="w-full text-center">
              {currentUser?.status === 0 ? (
                <Badge className="bg-green-600">
                  <Check size={14} className="mr-1" />
                  Verified
                </Badge>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Badge className="bg-primary-yellow">
                    <AlertCircle size={14} className="mr-1" />
                    Verification Required
                  </Badge>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleResendVerification}
                    className="text-primary-blue hover:text-primary-yellow p-0 h-auto"
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

          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <CardContent className="space-y-4 gap-2 px-4 py-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your name"
                    {...form.register("fullName")}
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-red-500 text-xs">
                      {form.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="Your phone number"
                    {...form.register("phoneNumber")}
                  />
                  {form.formState.errors.phoneNumber && (
                    <p className="text-red-500 text-xs">
                      {form.formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={currentUser?.email || ""}
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
                    {...form.register("gender", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                    <option value={2}>Other</option>
                  </select>
                  {form.formState.errors.gender && (
                    <p className="text-red-500 text-xs">
                      {form.formState.errors.gender.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input
                    id="birthday"
                    type="date"
                    {...form.register("birthday")}
                  />
                  {form.formState.errors.birthday && (
                    <p className="text-red-500 text-xs">
                      {form.formState.errors.birthday.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end space-x-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdateLoading}
                className={`${TailwindStyle.HIGHLIGHT_FRAME} rounded-md cursor-pointer`}
              >
                {isUpdateLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
