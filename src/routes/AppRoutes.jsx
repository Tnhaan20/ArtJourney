import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Keep non-lazy imports for components that are always needed
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import LoadingScreen from "@/components/elements/loading-screen/loading-screen";
import ArtJourneyAdminDashboard from "@/pages/AdminDashboardPage";
import { Loader2 } from "lucide-react";

// Convert all page components to lazy imports
const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage"));
const PaymentPage = lazy(() => import("@/pages/PaymentPage"));
const SurveyPage = lazy(() => import("@/pages/SurveyPage"));
const LearnPage = lazy(() => import("@/pages/LearnPage"));
const CoursePage = lazy(() => import("@/pages/LearnPage/CoursePage"));
const CourseDetailPage = lazy(() => import("@/pages/LearnPage/ModulePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const EmailVerifyPage = lazy(() => import("@/pages/EmailVerifyPage"));
const UnauthorizedPage = lazy(() => import("@/pages/UnauthorizedPage/Index"));
const QuizPage = lazy(() => import("@/pages/LearnPage/QuizPage/QuizPage"));
const ChallengePage = lazy(() =>
  import("@/pages/LearnPage/ChallengePage/ChallengePage")
);
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const RankingPage = lazy(() => import("@/pages/RankingPage"));

const ContactPage = lazy(() => import("@/pages/ContactPage"));
// Auth and Error components
const Signin = lazy(() => import("@/components/layout/Signin/Signin"));
const Signup = lazy(() => import("@/components/layout/Signup/Signup"));
const Error = lazy(() => import("@/components/layout/Error/404Error"));
const ServerError = lazy(() => import("@/components/layout/Error/500Error"));
const GoogleCallback = lazy(() =>
  import("@/components/layout/GoogleCallback/GoogleCallback")
);
const SupportPage = lazy(() =>
  import("@/pages/SupportPage/SupportPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage/TermsPage"));
// Learn page components
const CourseList = lazy(() =>
  import("@/components/layout/LearnPage/CourseList")
);
const SearchResultsPage = lazy(() => import("@/pages/LearnPage/SearchPage"));

// Loading component for better UX
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingScreen />
  </div>
);

// Smaller loader for nested routes
const ComponentLoader = () => (
  <div className="flex items-center justify-center">
    <Loader2 className="animated-spin text-primary-yellow"></Loader2>
    <br />
    <span className="ml-2">Loading...</span>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* 
        PUBLIC ROUTES - Accessible to guests and regular users, but NOT admin 
        Admin will be redirected to /unauthorized if they try to access these
      */}
      <Route
        path="/"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true} requireAuth={false}>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true} requireAuth={false}>
              <MainLayout>
                <AboutPage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true} requireAuth={false}>
              <MainLayout>
                <ContactPage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/support"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true} requireAuth={false}>
              <MainLayout>
                <SupportPage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/terms"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true} requireAuth={false}>
              <MainLayout>
                <TermsPage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/pricing"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true} requireAuth={false}>
              <MainLayout>
                <PricingPage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />

      {/* 
        AUTH ROUTES - Accessible to everyone (no restrictions)
        These are needed for authentication flow
      */}
      <Route
        path="/signin"
        element={
          <Suspense fallback={<PageLoader />}>
            <Signin />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<PageLoader />}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/signin-google"
        element={
          <Suspense fallback={<PageLoader />}>
            <GoogleCallback />
          </Suspense>
        }
      />

      {/* 
        ERROR ROUTES - Accessible to everyone (no restrictions)
        These are needed for error handling
      */}
      <Route
        path="/server-error"
        element={
          <Suspense fallback={<PageLoader />}>
            <ServerError />
          </Suspense>
        }
      />
      <Route
        path="/unauthorized"
        element={
          <Suspense fallback={<PageLoader />}>
            <UnauthorizedPage />
          </Suspense>
        }
      />

      {/* 
        PROTECTED ROUTES - Require authentication and restrict admin access
        Only authenticated non-admin users can access these
      */}
      <Route
        path="/profile"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true}>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/community"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true}>
              <MainLayout>
                <CommunityPage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/ranking"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true}>
              <MainLayout>
                <RankingPage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/pay/:paymentType?"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true}>
              <MainLayout>
                <PaymentPage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/survey"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true}>
              <SurveyPage />
            </ProtectedRoute>
          </Suspense>
        }
      />

      {/* 
        LEARN ROUTES - Require authentication and restrict admin access
        Only authenticated non-admin users can access these
      */}
      <Route
        path="/learn"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true} requireAuth={false}>
              <MainLayout>
                <LearnPage />
              </MainLayout>
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<ComponentLoader />}>
              <CourseList />
            </Suspense>
          }
        />
        <Route
          path="search"
          element={
            <Suspense fallback={<ComponentLoader />}>
              <SearchResultsPage />
            </Suspense>
          }
        />
        <Route
          path="course/:courseId"
          element={
            <Suspense fallback={<ComponentLoader />}>
              <CoursePage />
            </Suspense>
          }
        />
        <Route
          path="course/:courseId/module/:moduleId"
          element={
            <Suspense fallback={<ComponentLoader />}>
              <CourseDetailPage />
            </Suspense>
          }
        />
      </Route>

      {/* 
        QUIZ AND CHALLENGE ROUTES - Require authentication and restrict admin access
        Only authenticated non-admin users can access these
      */}
      <Route
        path="quiz/course/:courseId/module/:moduleId"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true}>
              <QuizPage />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="challenge/course/:courseId/module/:moduleId"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute restrictAdmin={true}>
              <ChallengePage />
            </ProtectedRoute>
          </Suspense>
        }
      />

      {/* 
        ADMIN-ONLY ROUTES - Only accessible by admin (role = 2)
        Non-admin users will be redirected to /unauthorized
      */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute adminOnly={true}>
              <ArtJourneyAdminDashboard />
            </ProtectedRoute>
          </Suspense>
        }
      />

      {/* 
        EMAIL VERIFICATION ROUTE - Accessible to everyone
        This is needed for email verification flow
      */}
      <Route
        path="/authentication/verify-email"
        element={
          <Suspense fallback={<PageLoader />}>
            <EmailVerifyPage />
          </Suspense>
        }
      />

      {/* 
        CATCH-ALL ROUTE - 404 Error for unmatched paths
        Accessible to everyone
      */}
      <Route
        path="*"
        element={
          <Suspense fallback={<PageLoader />}>
            <Error />
          </Suspense>
        }
      />
    </Routes>
  );
}
