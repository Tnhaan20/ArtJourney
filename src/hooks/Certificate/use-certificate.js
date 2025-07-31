import { certificateService } from "@/domains/services/Certificate/certificate.services";
import { QueryKey } from "@/domains/store/query-key";
import { useToast } from "@/utils/Toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCertificate = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // ============ MUTATIONS ============

  // Create Certificate Award Mutation
  const createCertificateAwardMutation = useMutation({
    mutationKey: [QueryKey.CERTIFICATE.CREATE_USER_CERTIFICATE],
    mutationFn: async ({ userId, courseId }) => {
      console.log("🏆 Creating certificate award for:", { userId, courseId });
      return await certificateService.post.createCertificateAward(userId, courseId);
    },
    onSuccess: async (data, variables) => { // ✅ Access variables to get original courseId
      console.log("✅ Certificate created successfully:", data);
      console.log("📝 Original variables:", variables);
      
      // Extract courseId from variables (the original input)
      const { courseId } = variables;
      
      // Invalidate related queries to refresh UI
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CERTIFICATE.GET_USER_CERTIFICATES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CERTIFICATE.GET_ALL_CERTIFICATES],
      });
      
      // ✅ Invalidate course-specific certificate query using original courseId
      if (courseId) {
        queryClient.invalidateQueries({
          queryKey: [QueryKey.CERTIFICATE.GET_CERTIFICATE_BY_COURSE_ID, courseId],
        });
      }

      toast({
        title: "🎉 Certificate Awarded!",
        description: "Congratulations! Your certificate has been created successfully.",
        variant: "success",
      });
    },
    onError: async (error) => {
      console.error("❌ Certificate creation failed:", error);
      
      
    },
  });

  // Create Certificate Mutation (for custom certificates)
  const createCertificateMutation = useMutation({
    mutationKey: [QueryKey.CERTIFICATE.CREATE_CERTIFICATE],
    mutationFn: async (certificateData) => {
      console.log("📜 Creating custom certificate:", certificateData);
      return await certificateService.post.createCertificate(certificateData);
    },
    onSuccess: async (data, variables) => { // ✅ Access variables to get original data
      console.log("✅ Custom certificate created successfully:", data);
      console.log("📝 Original variables:", variables);
      
      // Extract courseId from the original FormData or variables
      let courseId = null;
      
      // If variables is FormData, extract CourseId
      if (variables instanceof FormData) {
        courseId = variables.get('CourseId');
        console.log("📋 CourseId from FormData:", courseId);
      } else if (variables.CourseId) {
        courseId = variables.CourseId;
        console.log("📋 CourseId from object:", courseId);
      } else if (data?.data?.courseId) {
        courseId = data.data.courseId;
        console.log("📋 CourseId from response:", courseId);
      }
      
      // Invalidate related queries to refresh UI
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CERTIFICATE.GET_USER_CERTIFICATES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CERTIFICATE.GET_ALL_CERTIFICATES],
      });
      
      // ✅ Invalidate course-specific certificate query using extracted courseId
      if (courseId) {
        console.log("🔄 Invalidating certificate query for course:", courseId);
        queryClient.invalidateQueries({
          queryKey: [QueryKey.CERTIFICATE.GET_CERTIFICATE_BY_COURSE_ID, parseInt(courseId)],
        });
        
        // ✅ Also refetch immediately to ensure fresh data
        queryClient.refetchQueries({
          queryKey: [QueryKey.CERTIFICATE.GET_CERTIFICATE_BY_COURSE_ID, parseInt(courseId)],
        });
      }

      toast({
        title: "✨ Certificate Created!",
        description: "Your custom certificate has been created successfully.",
        variant: "success",
      });
    },
    onError: async (error) => {
      console.error("❌ Custom certificate creation failed:", error);
      
      
    },
  });

  // Delete Certificate Mutation
  const deleteCertificateMutation = useMutation({
    mutationKey: [QueryKey.CERTIFICATE.DELETE_CERTIFICATE],
    mutationFn: async ({ certificateId, courseId }) => { // ✅ Accept both certificateId and courseId
      console.log("🗑️ Deleting certificate:", certificateId, "from course:", courseId);
      return await certificateService.delete.deleteCertificate(certificateId);
    },
    onSuccess: async (data, variables) => { // ✅ Use variables to get courseId
      console.log("✅ Certificate deleted successfully:", data);
      console.log("📝 Delete variables:", variables);
      
      // Extract courseId from variables
      const { certificateId, courseId } = variables;
      
      // Invalidate related queries to refresh UI
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CERTIFICATE.GET_USER_CERTIFICATES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CERTIFICATE.GET_ALL_CERTIFICATES],
      });
      
      // Remove specific certificate from cache
      queryClient.removeQueries({
        queryKey: [QueryKey.CERTIFICATE.GET_CERTIFICATE_BY_ID, certificateId],
      });

      // ✅ Invalidate course-specific certificate query
      if (courseId) {
        console.log("🔄 Invalidating certificate query for course after deletion:", courseId);
        queryClient.invalidateQueries({
          queryKey: [QueryKey.CERTIFICATE.GET_CERTIFICATE_BY_COURSE_ID, courseId],
        });
        
        // ✅ Refetch to show updated list
        queryClient.refetchQueries({
          queryKey: [QueryKey.CERTIFICATE.GET_CERTIFICATE_BY_COURSE_ID, courseId],
        });
      }

      toast({
        title: "🗑️ Certificate Deleted",
        description: "The certificate has been deleted successfully.",
        variant: "success",
      });
    },
    onError: async (error) => {
      console.error("❌ Certificate deletion failed:", error);
      
      toast({
        title: "Deletion Failed",
        description: error.response?.data?.message || error.response?.data?.errors?.[0]?.message || "Failed to delete certificate. Please try again.",
        variant: "destructive",
      });
    },
  });

  // ============ QUERIES ============

  // Get User Certificates Query
  const getUserCertificatesQuery = useQuery({
    queryKey: [QueryKey.CERTIFICATE.GET_USER_CERTIFICATES],
    queryFn: async () => {
      console.log("📜 Fetching user certificates...");
      return await certificateService.get.getUserCertificates();
    },
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get All Certificates Query (Admin/Management use)
  const getAllCertificatesQuery = useQuery({
    queryKey: [QueryKey.CERTIFICATE.GET_ALL_CERTIFICATES],
    queryFn: async () => {
      return await certificateService.get.getAllCertificates();
    },
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get Certificate by ID Query
  const getCertificateByIdQuery = (certificateId) => {
    return useQuery({
      queryKey: [QueryKey.CERTIFICATE.GET_CERTIFICATE_BY_ID, certificateId],
      queryFn: async () => {
        console.log("🎯 Fetching certificate by ID:", certificateId);
        return await certificateService.get.getCertificateById(certificateId);
      },
      enabled: !!certificateId,
      refetchOnWindowFocus: false,
      retry: 2,
    });
  };

  // Get Certificate by Course ID Query
  const getCertificateByCourseIdQuery = (courseId) => {
    return useQuery({
      queryKey: [QueryKey.CERTIFICATE.GET_CERTIFICATE_BY_COURSE_ID, courseId],
      queryFn: async () => {
        console.log("📚 Fetching certificate by course ID:", courseId);
        return await certificateService.get.getCertificateByCourseId(courseId);
      },
      enabled: !!courseId,
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 2 * 60 * 1000, // ✅ Reduced stale time for faster updates
    });
  };

  // ============ HELPER FUNCTIONS ============

  // Helper function to create certificate award with better error handling
  const awardCertificate = async (userId, courseId) => {
    try {
      console.log("🎯 Awarding certificate:", { userId, courseId });
      
      if (!userId || !courseId) {
        throw new Error("User ID and Course ID are required");
      }

      const result = await createCertificateAwardMutation.mutateAsync({ 
        userId, 
        courseId 
      });
      
      return result;
    } catch (error) {
      console.error("❌ Award certificate error:", error);
      throw error;
    }
  };

  // Helper function to create custom certificate
  const createCustomCertificate = async (certificateData) => {
    try {
      if (!certificateData) {
        throw new Error("Certificate data is required");
      }

      const result = await createCertificateMutation.mutateAsync(certificateData);
      return result;
    } catch (error) {
      console.error("❌ Create custom certificate error:", error);
      throw error;
    }
  };

  // ✅ Updated helper function to delete certificate with courseId
  const deleteCertificate = async (certificateId, courseId) => {
    try {
      console.log("🗑️ Deleting certificate:", certificateId, "from course:", courseId);
      
      if (!certificateId) {
        throw new Error("Certificate ID is required");
      }

      const result = await deleteCertificateMutation.mutateAsync({ 
        certificateId, 
        courseId 
      });
      return result;
    } catch (error) {
      console.error("❌ Delete certificate error:", error);
      throw error;
    }
  };

  // Helper function to check if user has certificate for specific course
  const hasCertificateForCourse = (courseId) => {
    const userCertificates = getUserCertificatesQuery.data?.data || [];
    return userCertificates.find(cert => cert.courseId === parseInt(courseId));
  };

  // Helper function to get certificate count
  const getCertificateCount = () => {
    return getUserCertificatesQuery.data?.data?.length || 0;
  };

  // Helper function to get certificate for a specific course (using the new query)
  const getCertificateForCourse = (courseId) => {
    const { data, isLoading, error } = getCertificateByCourseIdQuery(courseId);
    return {
      certificate: data?.data,
      isLoading,
      error,
      hasCertificate: !!data?.data
    };
  };

  return {
    // ============ MUTATIONS ============
    createCertificateAwardMutation,
    createCertificateMutation,
    deleteCertificateMutation,
    
    // ============ QUERIES ============
    getUserCertificatesQuery,
    getAllCertificatesQuery,
    getCertificateByIdQuery,
    getCertificateByCourseIdQuery,
    
    // ============ HELPER FUNCTIONS ============
    awardCertificate,
    createCustomCertificate,
    deleteCertificate,
    hasCertificateForCourse,
    getCertificateCount,
    getCertificateForCourse,
    
    // ============ LOADING STATES ============
    isCreatingCertificate: createCertificateAwardMutation.isPending,
    isCreatingCustomCertificate: createCertificateMutation.isPending,
    isDeletingCertificate: deleteCertificateMutation.isPending,
    isLoadingCertificates: getUserCertificatesQuery.isLoading,
    isLoadingAllCertificates: getAllCertificatesQuery.isLoading,
    
    // ============ DATA ACCESS ============
    userCertificates: getUserCertificatesQuery.data?.data || [],
    allCertificates: getAllCertificatesQuery.data?.data || [],
    certificatesError: getUserCertificatesQuery.error,
    allCertificatesError: getAllCertificatesQuery.error,
  };
};
