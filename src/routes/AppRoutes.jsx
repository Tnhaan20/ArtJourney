import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Keep non-lazy imports for components that are always needed
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import LoadingScreen from "@/components/elements/loading-screen/loading-screen";

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
const UnauthorizedPage = lazy(() => import("@/pages/UnauthorizedPage"));
const QuizPage = lazy(() => import("@/pages/LearnPage/QuizPage/QuizPage"));
const ChallengePage = lazy(() =>
  import("@/pages/LearnPage/ChallengePage/ChallengePage")
);

// Auth and Error components - these can be lazy too since they're not always shown
const Signin = lazy(() => import("@/components/layout/Signin/Signin"));
const Signup = lazy(() => import("@/components/layout/Signup/Signup"));
const Error = lazy(() => import("@/components/layout/Error/404Error"));
const ServerError = lazy(() => import("@/components/layout/Error/500Error"));
const GoogleCallback = lazy(() =>
  import("@/components/layout/GoogleCallback/GoogleCallback")
);

// Learn page components
const CourseList = lazy(() =>
  import("@/components/layout/LearnPage/CourseList")
);

// Loading component for better UX
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingScreen />
  </div>
);

// Smaller loader for nested routes
const ComponentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2">Loading...</span>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - accessible to everyone */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <ProfilePage />
            </Suspense>
          </MainLayout>
        }
      />

      {/* Auth routes */}
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

      {/* Error routes */}
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

      {/* Google Auth Callback Route */}
      <Route
        path="/signin-google"
        element={
          <Suspense fallback={<PageLoader />}>
            <GoogleCallback />
          </Suspense>
        }
      />

      {/* Learn routes */}
      <Route
        path="/learn"
        element={
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <LearnPage />
            </Suspense>
          </MainLayout>
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

      {/* Quiz and Challenge routes */}
      <Route
        path="quiz/course/:courseId/module/:moduleId"
        element={
          <Suspense fallback={<PageLoader />}>
            <QuizPage />
          </Suspense>
        }
      />
      <Route
        path="challenge/course/:courseId/module/:moduleId"
        element={
          <Suspense fallback={<PageLoader />}>
            <ChallengePage />
          </Suspense>
        }
      />

      {/* Protected routes - require authentication */}
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <CommunityPage />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pay/:paymentType?"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <PaymentPage />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/survey"
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <SurveyPage />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Admin-only routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <div>Admin Dashboard</div>
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Email Verification Route */}
      <Route
        path="/authentication/verify-email"
        element={
          <Suspense fallback={<PageLoader />}>
            <EmailVerifyPage />
          </Suspense>
        }
      />

      {/* Error route - will catch all unmatched paths */}
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
