import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Clock,
  BookOpen,
  Users,
  Star,
  Play,
  Lock,
  CheckCircle,
  Award,
  Target,
  AlertCircle,
} from "lucide-react";
import { useCourse } from "@/hooks/Courses/use-course";
import { useUserEnrollForm } from "@/hooks/Courses/use-course-form";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { usePaymentForm } from "@/hooks/Payment/use-payment-form";
import { TailwindStyle } from "@/utils/Enum";
import { assets } from "@/assets/assets";

export default function CoursePublic({ courseId, isAuthenticated }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Use the real API for course public data
  const { useGetCoursePublic } = useCourse();
  const { data: courseData, isLoading, error } = useGetCoursePublic(courseId);

  // Use enrollment form hook
  const {
    enrollUser,
    isLoading: isEnrolling,
    isSuccess,
    error: enrollError,
  } = useUserEnrollForm();

  // Use payment form hook
  const { onSubmit: createPayment, isLoading: isCreatingPayment } =
    usePaymentForm();

  // Handle start learning/purchase button click
  const handleCourseAction = async () => {
    if (!isAuthenticated || !user?.id) {
      navigate("/signin");
      return;
    }

    // If course is free (price = 0), enroll directly
    if (course?.price === 0) {
      try {
        console.log(
          `🎓 Starting enrollment for user ${user.id} in course ${courseId}`
        );

        await enrollUser(user.id, courseId);

        console.log("✅ Enrollment successful, navigating to course...");

        setTimeout(() => {
          navigate(`/learn/course/${courseId}`);
        }, 1000);
      } catch (error) {
      }
    } else {
      // If course has price, create payment
      try {
        const paymentData = {
          buyerName: user?.name || user?.firstName || "Student",
          buyerEmail: user?.email || "",
          buyerPhone: user?.phone || "0354545454",
          description: `thanh toan khoa hoc`,
          items: [
            {
              courseId: parseInt(courseId),
              name: course?.title || "Course",
              quantity: 1,
              price: course?.price || 0,
            },
          ],
        };

        await createPayment(paymentData);
      } catch (error) {
      }
    }
  };

  // Format price in VND
  const formatPriceVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Get course action button text and style
  const getCourseActionButton = () => {
    if (!hasContent) {
      return {
        text: "Content Coming Soon",
        disabled: true,
        showPrice: false,
      };
    }

    if (!isAuthenticated) {
      return {
        text:
          course?.price === 0
            ? "Sign In to Start"
            : `Purchase for ${formatPriceVND(course.price)}`,
        disabled: false,
        showPrice: course?.price > 0,
      };
    }

    if (course?.price === 0) {
      return {
        text: isEnrolling
          ? "Enrolling..."
          : isSuccess
          ? "Enrolled! ✓"
          : "Start Learning",
        disabled: isEnrolling,
        showPrice: false,
      };
    } else {
      return {
        text: isCreatingPayment
          ? "Creating Payment..."
          : `Purchase for ${formatPriceVND(course.price)}`,
        disabled: isCreatingPayment,
        showPrice: true,
      };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading course</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading course preview</div>
      </div>
    );
  }

  const course = courseData?.data;

  // Helper function to get course level text
  const getCourseLevelText = (level) => {
    switch (level) {
      case 0:
        return "Beginner";
      case 1:
        return "Intermediate";
      case 2:
        return "Advanced";
      default:
        return "Unknown";
    }
  };

  // Check if course has content
  const hasContent =
    course?.moduleCourseDetailScreenResponseDTOs &&
    course.moduleCourseDetailScreenResponseDTOs.length > 0;

  const courseAction = getCourseActionButton();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-primary-yellow text-white px-3 py-1 rounded-full text-sm font-medium">
                {getCourseLevelText(course?.courseLevel)}
              </span>
              {course?.isPremium ? (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Premium
                </span>
              ) : (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Standard
                </span>
              )}
              {course?.price === 0 ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Free
                </span>
              ) : (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {formatPriceVND(course.price)}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {course?.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6">{course?.description}</p>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary-yellow" />
                <span className="text-sm text-gray-600">
                  {course?.totalModule || 0} Modules
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary-yellow" />
                <span className="text-sm text-gray-600">
                  {course?.courseCompletionPercentage || 0}% Complete
                </span>
              </div>
            </div>

            {/* Content Availability Notice */}
            {!hasContent && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    Course content is being prepared and will be available soon.
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCourseAction}
                disabled={courseAction.disabled}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  course?.price > 0 && hasContent
                    ? `${TailwindStyle.HIGHLIGHT_FRAME} text-white shadow-lg`
                    : TailwindStyle.HIGHLIGHT_FRAME
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Play className="w-5 h-5" />
                <span>{courseAction.text}</span>
              </button>

              {/* Additional Browse Button for non-authenticated users */}
              {!isAuthenticated && (
                <Link
                  to="/learn"
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:border-primary-yellow hover:text-primary-yellow transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Browse All Courses</span>
                </Link>
              )}
            </div>

            {/* Enrollment Status */}
            {enrollError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  Failed to enroll. Please try again.
                </p>
              </div>
            )}

            {isSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">
                  ✅ Successfully enrolled! Redirecting to course...
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <img
              src={
                course?.coverImageUrl || assets.courses.asia.bhimbetkaRockArt
              }
              alt={course?.title}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
            {/* Price Overlay for Paid Courses */}
            {course?.price > 0 && (
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatPriceVND(course.price)}
                  </div>
                  <div className="text-xs text-gray-500">Course Price</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Course Goals</h3>
          </div>
          <p className="text-gray-600">
            {course?.learningOutcomes ||
              "Master comprehensive knowledge and practical skills in this subject area"}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Certification</h3>
          </div>
          <p className="text-gray-600">
            Earn a certificate upon successful completion of all{" "}
            {course?.totalModule} modules
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Course Level</h3>
          </div>
          <p className="text-gray-600">
            {getCourseLevelText(course?.courseLevel)} level course designed for
            comprehensive learning
          </p>
        </div>
      </div>

      {/* What You'll Learn */}
      {course?.learningOutcomes && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.learningOutcomes.split("\n").map((outcome, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complete Course Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Complete Course Content</h2>

        {hasContent ? (
          <div className="space-y-4">
            {course.moduleCourseDetailScreenResponseDTOs.map(
              (module, moduleIndex) => (
                <div
                  key={module.moduleId}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="bg-gray-50 p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                          {moduleIndex + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {module.moduleTitle}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Module {moduleIndex + 1} of {course.totalModule}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {module.subModuleCourseDetailScreenResponseDTOs
                            ?.length || 0}{" "}
                          lessons
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sub-modules */}
                  <div className="p-4">
                    <div className="space-y-3">
                      {module.subModuleCourseDetailScreenResponseDTOs?.map(
                        (subModule, subIndex) => (
                          <div
                            key={`${module.moduleId}-${subIndex}`}
                            className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-500 w-6">
                                {moduleIndex + 1}.{subIndex + 1}
                              </span>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">
                                  {subModule.subModuleTitle}
                                </h4>
                                <p className="text-xs text-gray-600">
                                  {subModule
                                    .learningContentDetailScreenResponseDTOs
                                    ?.length || 0}{" "}
                                  learning contents
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!isAuthenticated && (
                                <Lock className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Course Content Not Available
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              The course modules and lessons are currently being prepared.
              Please check back soon for the complete learning experience.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-sm text-orange-700">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
              Content Coming Soon
            </div>
          </div>
        )}
      </div>

      {/* Course Features */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Course Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">
              {course?.totalModule} comprehensive modules
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">
              {getCourseLevelText(course?.courseLevel)} level content
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">
              Interactive learning experience
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">
              Progress tracking and analytics
            </span>
          </div>
          {course?.isPremium && (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Premium course content</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">Certificate of completion</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-primary-yellow to-orange-400 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-6 opacity-90">
            {hasContent
              ? `Join thousands of students and explore ${course?.title}!`
              : `Be the first to know when ${course?.title} content becomes available!`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hasContent ? (
              <>
                <Link
                  to="/signin"
                  className={`inline-block ${TailwindStyle.HIGHLIGHT_FRAME} px-8 py-3 rounded-lg font-medium  transition-colors`}
                >
                  {course?.price === 0
                    ? "Get Started"
                    : `Purchase for ${formatPriceVND(course.price)}`}
                </Link>
                <Link
                  to="/learn"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-yellow transition-colors"
                >
                  Browse All Courses
                </Link>
              </>
            ) : (
              <Link
                to="/learn"
                className="inline-block bg-white text-primary-yellow px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Browse Available Courses
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
