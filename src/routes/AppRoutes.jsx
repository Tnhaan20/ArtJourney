import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../page/HomePage';
import Signin from '../components/Signin/Signin';
import Signup from '../components/Signup/Signup';
import Error from "../components/Error/Error";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes without layout */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Routes with MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      {/* Error route - will catch all unmatched paths */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}