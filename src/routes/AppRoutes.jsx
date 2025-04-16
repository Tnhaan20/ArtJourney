import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import CommunityPage from '../pages/CommunityPage';
import SurveyPage from '../pages/SurveyPage';
import Signin from "../components/layout/Signin/Signin";
import Signup from "../components/layout/Signup/Signup";
import Error from "../components/layout/Error/404Error";
import ServerError from "../components/layout/Error/500Error";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes without layout */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/survey" element={<SurveyPage />} />

      {/* Routes with MainLayout */}
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
        path="/community"
        element={
          <MainLayout>
            <CommunityPage />
          </MainLayout>
        }
      />

      {/* Error route - will catch all unmatched paths */}
      <Route path="*" element={<Error />} />
      <Route path="/server-error" element={<ServerError />} />
    </Routes>
  );
}