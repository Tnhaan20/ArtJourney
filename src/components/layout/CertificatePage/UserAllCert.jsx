import React, { useState } from "react";
import { useCertificate } from "@/hooks/Certificate/use-certificate";
import { useAuthStore } from "@/domains/store/use-auth-store";
import {
  Award,
  Calendar,
  Download,
  Eye,
  Search,
  Filter,
  BookOpen,
  Clock,
  ExternalLink,
  Share2,
  Trophy,
  Star,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

export default function UserAllCert() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    getUserCertificatesQuery,
    isLoadingCertificates,
    certificatesError,
    getCertificateCount,
  } = useCertificate();

  // Local state for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, courseName
  const [downloadingIds, setDownloadingIds] = useState(new Set()); // Track downloading certificates

  // Get certificates data
  const certificates = getUserCertificatesQuery.data?.data || [];

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
    const diffInDays = Math.floor(
      (now - completedDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  // Filter and sort certificates
  const filteredAndSortedCertificates = certificates
    .filter((cert) =>
      cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.completedAt) - new Date(a.completedAt);
        case "oldest":
          return new Date(a.completedAt) - new Date(b.completedAt);
        case "courseName":
          return a.courseName.localeCompare(b.courseName);
        default:
          return new Date(b.completedAt) - new Date(a.completedAt);
      }
    });

  // Handle certificate download - Proper file download to local device
  const handleDownloadCertificate = async (certificate) => {
    try {
      setDownloadingIds((prev) => new Set(prev).add(certificate.id));

      console.log("🔽 Starting certificate download:", certificate.courseName);

      // Fetch the image as a blob
      const response = await fetch(certificate.certificateImageUrl, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch certificate: ${response.statusText}`);
      }

      const blob = await response.blob();

      // Create a download URL
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = downloadUrl;

      // Clean filename (remove special characters)
      const cleanFileName = certificate.courseName
        .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
        .replace(/\s+/g, "_") // Replace spaces with underscores
        .trim();

      // Set the download filename with proper extension
      const fileExtension =
        certificate.certificateImageUrl.split(".").pop() || "jpg";
      link.download = `${cleanFileName}_Certificate.${fileExtension}`;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(downloadUrl);

      console.log("✅ Certificate downloaded successfully");

      // Optional: Show success notification
      // toast({ title: "Download Complete", description: "Certificate saved to your device" });
    } catch (error) {
      console.error("❌ Download failed:", error);

      // Fallback: Try the old method
      console.log("🔄 Trying fallback download method...");
      const link = document.createElement("a");
      link.href = certificate.certificateImageUrl;
      link.download = `${certificate.courseName
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")}_Certificate.jpg`;
      link.target = "_blank"; // Open in new tab if download fails
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Optional: Show error notification
      // toast({ title: "Download Issue", description: "Certificate opened in new tab for manual save" });
    } finally {
      setDownloadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(certificate.id);
        return newSet;
      });
    }
  };

  // Handle view certificate - Navigate to detail page
  const handleViewCertificate = (certificate) => {
    console.log("👁️ Viewing certificate:", certificate.id);
    navigate(`/certificate/${certificate.id}`);
  };

  // Handle share certificate
  const handleShareCertificate = async (certificate) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${certificate.courseName} Certificate`,
          text: `I've completed the ${certificate.courseName} course and earned a certificate!`,
          url: certificate.certificateImageUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(certificate.certificateImageUrl);
        console.log("📋 Certificate URL copied to clipboard");
        // Optional: Show success notification
        // toast({ title: "Link Copied", description: "Certificate link copied to clipboard" });
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  // Loading state
  if (isLoadingCertificates) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary-yellow mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Loading Your Certificates
              </h3>
              <p className="text-gray-500">Fetching your achievements...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (certificatesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Failed to Load Certificates
              </h3>
              <p className="text-gray-500 mb-4">
                {certificatesError.message ||
                  "Something went wrong while loading your certificates."}
              </p>
              <Button
                onClick={() => getUserCertificatesQuery.refetch()}
                className="bg-primary-yellow hover:bg-secondary-yellow text-white"
              >
                Try Again
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
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                My Certificates
              </h1>
              <p className="text-gray-600">
                Your learning achievements and completed courses
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {getCertificateCount()}
                    </p>
                    <p className="text-sm text-gray-600">Total Certificates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {certificates.length}
                    </p>
                    <p className="text-sm text-gray-600">Courses Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {certificates.length > 0
                        ? formatRelativeTime(
                            certificates.sort(
                              (a, b) =>
                                new Date(b.completedAt) -
                                new Date(a.completedAt)
                            )[0]?.completedAt
                          )
                        : "None"}
                    </p>
                    <p className="text-sm text-gray-600">Latest Achievement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          {certificates.length > 0 && (
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search certificates by course name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="courseName">Course Name A-Z</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Certificates Grid */}
        {filteredAndSortedCertificates.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {certificates.length === 0
                ? "No Certificates Yet"
                : "No Certificates Found"}
            </h3>
            <p className="text-gray-500 mb-6">
              {certificates.length === 0
                ? "Complete courses to earn your first certificate!"
                : `No certificates match "${searchTerm}"`}
            </p>
            {certificates.length === 0 && (
              <Link to="/courses">
                <Button className="bg-primary-yellow hover:bg-secondary-yellow text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCertificates.map((certificate) => (
              <Card
                key={certificate.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={certificate.certificateImageUrl}
                    alt={`${certificate.courseName} Certificate`}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handleViewCertificate(certificate)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-800"
                    >
                      Certificate
                    </Badge>
                  </div>

                  {/* Click to view overlay */}
                  <div
                    className="absolute inset-0 hover:bg-[#00000033] bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center cursor-pointer"
                    onClick={() => handleViewCertificate(certificate)}
                  >
                    <div className="opacity-0 hover:opacity-100 transition-opacity bg-white px-4 py-2 rounded-full text-sm font-medium">
                      Click to view details
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {certificate.courseName}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Completed {formatDate(certificate.completedAt)}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{formatRelativeTime(certificate.completedAt)}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewCertificate(certificate)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => handleDownloadCertificate(certificate)}
                      disabled={downloadingIds.has(certificate.id)}
                      className="bg-primary-yellow hover:bg-secondary-yellow text-white disabled:opacity-50"
                    >
                      {downloadingIds.has(certificate.id) ? (
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-1" />
                      )}
                      {downloadingIds.has(certificate.id)
                        ? "Downloading..."
                        : "Download"}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShareCertificate(certificate)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
