import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CourseAuth from "./CourseAuth";
import CourseDetailGuest from "./CoursePublic";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useCourse } from "@/hooks/Courses/use-course";
import { useCertificate } from "@/hooks/Certificate/use-certificate";
import { useToast } from "@/utils/Toast";
import { Loader2, BookOpen, User, Award, ExternalLink } from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const { user, isAuthenticated } = useAuthStore();
  const { getUserLearningProgress } = useCourse();
  const {
    awardCertificate,
    getUserCertificatesQuery,
    userCertificates, // ✅ Use the processed userCertificates array
    isCreatingCertificate,
  } = useCertificate();
  const { toast } = useToast();

  // State to track if we've already processed the certificate for this session
  const [certificateProcessed, setCertificateProcessed] = useState(false);

  // Get user learning progress
  const {
    data: learningProgress,
    isLoading,
    error,
  } = getUserLearningProgress(user?.userId, courseId);

  // Get user certificates to check if they already have one for this course
  const { isLoading: certificatesLoading } = getUserCertificatesQuery;

  // Check if user already has a certificate for this course
  const existingCertificate = userCertificates.find((cert) => {
    const match = cert.courseId === parseInt(courseId);
    
    return match;
  });


  // ✅ Alternative approach - also check string comparison just in case
  const existingCertificateAlt = userCertificates.find(
    (cert) => cert.courseId == courseId || cert.courseId === parseInt(courseId)
  );

  // Use the alternative if the main one is undefined
  const finalExistingCertificate =
    existingCertificate || existingCertificateAlt;


  // ✅ Effect to handle automatic certificate creation when course is completed
  useEffect(() => {
    const handleCertificateCreation = async () => {
      const learningStatus = learningProgress?.data?.learningStatus;
      const progress = learningProgress?.data?.progressPercent || 0;



      // ✅ Check conditions for certificate creation
      const shouldCreateCertificate =
        isAuthenticated &&
        user?.userId &&
        learningStatus === 2 && // Course completed
        progress >= 100 && // 100% progress
        !finalExistingCertificate && // ✅ No existing certificate found
        !certificateProcessed && // Not already processed this session
        !isCreatingCertificate && // Not currently creating
        !certificatesLoading; // Certificates data is loaded


      if (shouldCreateCertificate) {
        
        setCertificateProcessed(true);

        try {
          // ✅ Award certificate to the user for completing the course
          const result = await awardCertificate(
            user.userId,
            parseInt(courseId)
          );

          // Show success notification with certificate preview
          toast({
            title: "🎉 Congratulations! Course Completed!",
            description: (
              <div className="space-y-3">
                <p>
                  You have successfully completed this course and earned your
                  certificate!
                </p>

                {/* Certificate Preview */}
                {result?.data?.certificateImageUrl && (
                  <div className="relative">
                    <img
                      src={result.data.certificateImageUrl}
                      alt="Certificate Preview"
                      className="w-full h-24 object-cover rounded-lg border border-yellow-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-1 left-2 text-white text-xs font-medium">
                      Your Certificate
                    </div>
                  </div>
                )}

                <Link
                  to={`/certificate/${finalExistingCertificate.id}`}
                  className="inline-flex items-center text-primary-yellow hover:text-secondary-yellow font-medium"
                >
                  <Award className="w-4 h-4 mr-1" />
                  View Your Certificate
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </div>
            ),
            variant: "success",
            duration: 15000, // Show for 15 seconds
          });
        } catch (error) {
          console.error("❌ Failed to create award certificate:", error);

          // Show error notification
          

          // Reset the processed flag to allow retry
          setCertificateProcessed(false);
        }
      } else if (finalExistingCertificate) {
        
      } else {
        
      }
    };

    // ✅ Only run the check if we have all the required data
    if (
      learningProgress?.data && // Learning progress is loaded
      userCertificates !== undefined && // Certificates array is available
      !certificatesLoading // Certificates are not loading
    ) {
      handleCertificateCreation();
    } else {
      
    }
  }, [
    learningProgress?.data, // Watch for changes in learning progress
    userCertificates, // Watch for changes in user certificates
    finalExistingCertificate, // Watch for changes in existing certificate
    certificateProcessed, // Watch for session processing flag
    isAuthenticated,
    user?.userId,
    courseId,
    awardCertificate,
    isCreatingCertificate,
    certificatesLoading,
    toast,
  ]);

  // Enhanced loading state
  if (isLoading || certificatesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
          {/* Animated spinner */}
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-yellow border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-yellow" />
            </div>
          </div>

          {/* Loading text */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Course Information
          </h3>
          <p className="text-gray-600 mb-4">
            {isAuthenticated
              ? "Checking your enrollment status and certificates..."
              : "Preparing course details..."}
          </p>

          {/* Show certificate creation status if applicable */}
          {isCreatingCertificate && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
              <div className="flex items-center justify-center text-yellow-700">
                <Award className="h-4 w-4 mr-2 animate-pulse" />
                <span className="text-sm">Creating your certificate...</span>
              </div>
            </div>
          )}

          {/* Progress dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary-yellow rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary-yellow rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-primary-yellow rounded-full animate-pulse delay-150"></div>
          </div>

          {/* User info if authenticated */}
          {isAuthenticated && user && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-2" />
                <span>Welcome back, {user.name || user.email}!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Enhanced error state
  if (error) {
    console.error("Error fetching learning progress:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Unable to Load Course Data
          </h2>
          <p className="text-gray-600 mb-6">
            There was an issue checking your enrollment status. We'll show you
            the course as a guest.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              Redirecting to guest view...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is enrolled (learningStatus === 1 for In Progress OR learningStatus === 2 for Completed)
  const learningStatus = learningProgress?.data?.learningStatus;
  const isEnrolled = learningStatus === 1 || learningStatus === 2;



  // ✅ Show completion notification if user has completed course and has certificate
  const showCompletionNotification =
    isAuthenticated &&
    learningStatus === 2 &&
    finalExistingCertificate && // User has a certificate
    learningProgress?.data?.progressPercent >= 100;

  // Render component based on authentication and enrollment status
  if (isAuthenticated && isEnrolled) {
    // User is authenticated and enrolled in the course (either in progress or completed)
    

    return (
      <div>
        {/* ✅ Completion notification banner - only show if certificate exists */}
        {showCompletionNotification && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-green-800">
                      🎉 Course Completed!
                    </h3>
                    <p className="text-sm text-green-700">
                      Congratulations! You have successfully completed this
                      course and earned your certificate.
                    </p>
                  </div>

                  {/* Certificate Preview in Banner */}
                  {finalExistingCertificate?.certificateImageUrl && (
                    <div className="hidden md:block">
                      <img
                        src={finalExistingCertificate.certificateImageUrl}
                        alt="Certificate"
                        className="w-16 h-12 object-cover rounded border border-green-300"
                      />
                    </div>
                  )}
                </div>
                <Link
                  to={`/certificate/${finalExistingCertificate.id}`}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Award className="w-4 h-4 mr-2" />
                  View Certificate
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        

        <CourseAuth
          courseId={courseId}
          learningProgress={learningProgress?.data}
          existingCertificate={finalExistingCertificate}
        />
      </div>
    );
  } else {
    // Guest or user not enrolled in course
    
    return (
      <CourseDetailGuest
        courseId={courseId}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}
