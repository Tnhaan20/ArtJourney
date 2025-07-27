import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCertificate } from "@/hooks/Certificate/use-certificate";
import { useModule } from "@/hooks/Module/use-module";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { 
  Award, 
  Calendar, 
  Download, 
  ArrowLeft,
  Share2,
  Trophy,
  BookOpen,
  Clock,
  ExternalLink,
  PlayCircle,
  FileText,
  CheckCircle,
  Loader2,
  User,
  MapPin,
  ChevronRight,
  X,
  ZoomIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function UserDetailCert() {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getCertificateByIdQuery } = useCertificate();
  const { getModuleQuery } = useModule();
  
  // Get certificate details
  const { 
    data: certificateData, 
    isLoading: isLoadingCertificate, 
    error: certificateError 
  } = getCertificateByIdQuery(certificateId);
  
  // Get modules for the course (once we have the courseId)
  const courseId = certificateData?.data?.courseId;
  const { 
    data: modulesData, 
    isLoading: isLoadingModules, 
    error: modulesError 
  } = getModuleQuery(courseId);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const certificate = certificateData?.data;
  const modules = modulesData?.data || [];

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format relative time
  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const completedDate = new Date(dateString);
    const diffInDays = Math.floor((now - completedDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  // Enhanced download function - Downloads certificate to local device
  const handleDownloadCertificate = async () => {
    if (!certificate?.certificateImageUrl) return;
    
    try {
      setIsDownloading(true);
      console.log("🔽 Starting certificate download:", certificate.courseName);
      
      // Fetch the image as a blob
      const response = await fetch(certificate.certificateImageUrl, {
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch certificate: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      
      // Create a download URL
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = downloadUrl;
      
      // Clean filename (remove special characters)
      const cleanFileName = certificate.courseName
        .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .trim();
      
      // Set the download filename with proper extension
      const fileExtension = certificate.certificateImageUrl.split('.').pop() || 'jpg';
      link.download = `${cleanFileName}_Certificate.${fileExtension}`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(downloadUrl);
      
      console.log("✅ Certificate downloaded successfully");
      
    } catch (error) {
      console.error("❌ Download failed:", error);
      
      // Fallback: Try the old method
      console.log("🔄 Trying fallback download method...");
      const link = document.createElement('a');
      link.href = certificate.certificateImageUrl;
      link.download = `${certificate.courseName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}_Certificate.jpg`;
      link.target = '_blank'; // Open in new tab if download fails
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle share certificate
  const handleShareCertificate = async () => {
    if (navigator.share && certificate) {
      try {
        await navigator.share({
          title: `${certificate.courseName} Certificate`,
          text: `I've completed the ${certificate.courseName} course and earned a certificate!`,
          url: certificate.certificateImageUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else if (certificate) {
      try {
        await navigator.clipboard.writeText(certificate.certificateImageUrl);
        console.log("📋 Certificate URL copied to clipboard");
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  // Handle opening modal
  const handleOpenModal = () => {
    console.log("🖼️ Opening certificate modal");
    setIsImageModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    console.log("❌ Closing certificate modal");
    setIsImageModalOpen(false);
  };

  // Handle modal close with escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (isImageModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isImageModalOpen]);

  // Loading state
  if (isLoadingCertificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary-yellow mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Loading Certificate Details
              </h3>
              <p className="text-gray-500">
                Fetching your certificate information...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (certificateError || !certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Certificate Not Found
              </h3>
              <p className="text-gray-500 mb-4">
                The certificate you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Button 
                onClick={() => navigate('/certificate')}
                className="bg-primary-yellow hover:bg-secondary-yellow text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Certificates
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm text-gray-600">
          <Link
            to="/certificate"
            className="hover:text-primary-yellow transition-colors"
          >
            Certificates
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">
            {certificate.courseName}
          </span>
        </div>

        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/certificate")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Certificates
        </Button>

        {/* Certificate Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Certificate of Completion
                </h1>
                <p className="text-yellow-100">
                  Congratulations on completing your course!
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Certificate Image */}
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={certificate.certificateImageUrl}
                    alt={`${certificate.courseName} Certificate`}
                    className="w-full rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
                    onClick={handleOpenModal}
                  />
                  <div
                    className="absolute inset-0 hover:bg-[#00000052] bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center cursor-pointer"
                    onClick={handleOpenModal}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                      <ZoomIn className="w-4 h-4" />
                      <span>Click to view full size</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    onClick={handleDownloadCertificate}
                    disabled={isDownloading}
                    className="flex-1 bg-primary-yellow hover:bg-secondary-yellow text-white disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {isDownloading ? "Downloading..." : "Download Certificate"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleShareCertificate}
                    className="flex-1"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* View Full Size Button */}
                <Button
                  variant="outline"
                  onClick={handleOpenModal}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>View Full Size</span>
                </Button>
              </div>

              {/* Certificate Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {certificate.courseName}
                  </h2>
                  <Badge variant="secondary" className="mb-4">
                    Certificate ID: {certificate.certificateId}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Awarded to</p>
                      <p className="font-semibold text-gray-800">
                        {user?.fullName || user?.email || "Student"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completed on</p>
                      <p className="font-semibold text-gray-800">
                        {formatDate(certificate.completedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Achievement time</p>
                      <p className="font-semibold text-gray-800">
                        {formatRelativeTime(certificate.completedAt)}
                      </p>
                    </div>
                  </div>

                  {certificate.completedIn && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Course duration</p>
                        <p className="font-semibold text-gray-800">
                          {certificate.completedIn}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Course Modules Completed</span>
            </CardTitle>
            <p className="text-gray-600">
              Here are the modules you completed to earn this certificate
            </p>
          </CardHeader>
          <CardContent>
            {isLoadingModules ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary-yellow mr-3" />
                <span className="text-gray-600">Loading course modules...</span>
              </div>
            ) : modulesError ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📚</div>
                <p className="text-gray-600">Unable to load course modules</p>
              </div>
            ) : modules.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📝</div>
                <p className="text-gray-600">
                  No modules found for this course
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {module.title || `Module ${index + 1}`}
                      </h4>
                      {module.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {module.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fixed Certificate Modal */}
        {isImageModalOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#00000052] bg-opacity-80"
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
              <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-20">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>{certificate.courseName} Certificate</span>
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCloseModal}
                    className="flex items-center space-x-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Close</span>
                  </Button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">
                      Right-click and "Save image as..." or use the download
                      button below
                    </p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <img
                      src={certificate.certificateImageUrl}
                      alt={`${certificate.courseName} Certificate`}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                      style={{ maxHeight: "70vh" }}
                    />
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={handleDownloadCertificate}
                      disabled={isDownloading}
                      className="bg-primary-yellow hover:bg-secondary-yellow text-white disabled:opacity-50"
                    >
                      {isDownloading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      {isDownloading ? "Downloading..." : "Download Full Size"}
                    </Button>

                    <Button variant="outline" onClick={handleShareCertificate}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Certificate
                    </Button>

                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}