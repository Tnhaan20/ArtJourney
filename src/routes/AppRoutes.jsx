import { Routes, Route } from 'react-router-dom';
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import CommunityPage from "@/pages/CommunityPage";
import PaymentPage from "@/pages/PaymentPage";
import SurveyPage from "@/pages/SurveyPage";
import Signin from "@/components/layout/Signin/Signin";
import Signup from "@/components/layout/Signup/Signup";
import Error from "@/components/layout/Error/404Error";
import ServerError from "@/components/layout/Error/500Error";
import LearnPage from "@/pages/LearnPage";
import CourseList from "@/components/layout/LearnPage/CourseList";
import CoursePage from "@/pages/LearnPage/CoursePage";
import CourseDetailPage from "@/pages/LearnPage/ModulePage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import GoogleCallback from "@/components/layout/GoogleCallback/GoogleCallback";
import ProfilePage from "@/pages/ProfilePage";
import EmailVerifyPage from '@/pages/EmailVerifyPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - accessible to everyone */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        }
      />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      {/* Google Auth Callback Route */}
      <Route path="/signin-google" element={<GoogleCallback />} />

      {/* Learn routes */}
      <Route
        path="/learn"
        element={
          <MainLayout>
            <LearnPage />
          </MainLayout>
        }
      >
        <Route index element={<CourseList />} />
        <Route path="course/:courseId" element={<CoursePage />} />
        <Route
          path="course/:courseId/module/:moduleId"
          element={<CourseDetailPage />}
        />
      </Route>

      {/* Protected routes - require authentication */}
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <MainLayout>
              <CommunityPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pay/:paymentType?"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/survey"
        element={
          <ProtectedRoute>
            <SurveyPage />
          </ProtectedRoute>
        }
      />
      {/* Admin-only routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              {/* Admin component here */}
              <div>Admin Dashboard</div>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      {/* Email Verification Route */}
      <Route path="/authentication/verify-email" element={<EmailVerifyPage />} />
      {/* Error route - will catch all unmatched paths */}
      <Route path="*" element={<Error />} />
      <Route path="/server-error" element={<ServerError />} />
    </Routes>
  );
}