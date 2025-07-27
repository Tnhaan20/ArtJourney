import React, { useState } from "react";
import {
  ArrowLeft,
  Medal,
  Plus,
  Download,
  Eye,
  Trash2,
  Calendar,
  User,
  BookOpen,
  Award,
  Loader2,
  FileImage,
  Search,
  Filter,
} from "lucide-react";
import { useCertificate } from "@/hooks/Certificate/use-certificate";
import { TailwindStyle } from "@/utils/Enum";

export const CertificateTab = ({
  courseId,
  courseTitle,
  setShowCertificateModal,
  setSelectedCourseId,
  onBackToCourses,
}) => {
  const { getCertificateByCourseIdQuery, deleteCertificate, isDeletingCertificate } = useCertificate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get certificates for this specific course
  const { data: certificateData, isLoading, error, refetch } = getCertificateByCourseIdQuery(courseId);
  const certificates = certificateData?.data || [];

  console.log("📜 Certificate Tab - Course ID:", courseId);
  console.log("📜 Certificate Data:", certificateData);
  console.log("📜 Certificates Array:", certificates);

  // Handle create certificate with error checking
  const handleCreateCertificate = () => {
    console.log("🎯 Creating certificate for course:", courseId);
    console.log("🎯 setShowCertificateModal function:", typeof setShowCertificateModal);
    console.log("🎯 setSelectedCourseId function:", typeof setSelectedCourseId);
    
    // ✅ Add error checking
    if (typeof setSelectedCourseId !== 'function') {
      console.error("❌ setSelectedCourseId is not a function");
      return;
    }
    
    if (typeof setShowCertificateModal !== 'function') {
      console.error("❌ setShowCertificateModal is not a function");
      return;
    }
    
    try {
      setSelectedCourseId(courseId);
      setShowCertificateModal(true);
      console.log("✅ Certificate modal should open now");
    } catch (error) {
      console.error("❌ Error opening certificate modal:", error);
    }
  };

  // Handle delete certificate
  const handleDeleteCertificate = async (certificateId, courseName) => {
    if (
      window.confirm(
        `Are you sure you want to delete the certificate for "${courseName}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteCertificate(certificateId);
        refetch(); // Refresh the certificates list
      } catch (error) {
        console.error("Failed to delete certificate:", error);
      }
    }
  };

  // Handle download certificate
  const handleDownloadCertificate = async (certificate) => {
    try {
      console.log("🔽 Downloading certificate:", certificate.courseName);
      
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
      
      // Clean filename
      const cleanFileName = certificate.courseName
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .trim();
      
      const fileExtension = certificate.certificateImageUrl.split('.').pop() || 'jpg';
      link.download = `${cleanFileName}_Certificate.${fileExtension}`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
      
      console.log("✅ Certificate downloaded successfully");
    } catch (error) {
      console.error("❌ Download failed:", error);
    }
  };

  // Filter certificates based on search term
  const filteredCertificates = Array.isArray(certificates) 
    ? certificates.filter(cert => 
        cert.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary-yellow mx-auto mb-4" />
            <div className="text-lg">Loading certificates...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <div className="text-lg text-red-600">Error loading certificates</div>
            <p className="text-sm text-gray-600 mt-2">{error.message}</p>
            <button 
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToCourses}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Courses</span>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Medal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Certificate Management
              </h3>
              <p className="text-sm text-gray-600">
                Managing certificates for "{courseTitle}"
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateCertificate}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${TailwindStyle.HIGHLIGHT_FRAME}`}
        >
          <Plus className="w-4 h-4" />
          <span>Create Certificate</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search certificates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {certificates.length || 0}
              </p>
              <p className="text-sm text-gray-600">Total Certificates</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {courseTitle.length > 20
                  ? courseTitle.substring(0, 20) + "..."
                  : courseTitle}
              </p>
              <p className="text-sm text-gray-600">Course Name</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">ID: {courseId}</p>
              <p className="text-sm text-gray-600">Course ID</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">
            Certificates for this Course
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {filteredCertificates.length} certificate(s) found
          </p>
        </div>

        <div className="p-6">
          {filteredCertificates.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Certificates Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create the first certificate for this course to get started.
              </p>
              <button
                onClick={handleCreateCertificate}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl mx-auto ${TailwindStyle.HIGHLIGHT_FRAME}`}
              >
                <Plus className="w-4 h-4" />
                <span>Create First Certificate</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Certificate Image */}
                  <div className="relative h-48 ">
                    {certificate.certificateImageUrl ? (
                      <img
                        src={certificate.certificateImageUrl}
                        alt={`Certificate for ${certificate.courseName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileImage className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-4">
                    <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {certificate.courseName || "Certificate"}
                    </h5>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Created:{" "}
                          {formatDate(
                            certificate.completedAt || certificate.createdAt
                          )}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>
                          ID: {certificate.certificateId || certificate.id}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownloadCertificate(certificate)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-primary-yellow text-white rounded-lg hover:bg-secondary-yellow transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteCertificate(
                            certificate.id,
                            certificate.courseName
                          )
                        }
                        disabled={isDeletingCertificate}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isDeletingCertificate ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};