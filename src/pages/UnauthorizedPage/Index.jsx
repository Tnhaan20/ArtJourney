import { Link } from "react-router-dom";
import { TailwindStyle } from "@/utils/Enum";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-8xl font-bold text-[#F2B866] mb-4">403</h1>
          <h2 className="text-4xl font-bold text-black mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-700 mb-8 max-w-md">
            You don't have permission to access this page. Please contact an
            administrator if you believe this is an error.
          </p>
          <Link
            to="/"
            className={`inline-block px-6 py-3 text-lg font-semibold ${TailwindStyle.HIGHLIGHT_FRAME}`}
          >
            GO BACK HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
