import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-950 text-center px-4">
    <span className="text-6xl font-bold text-gray-800">404</span>
    <h1 className="text-lg font-semibold text-gray-200">Page not found</h1>
    <p className="text-sm text-gray-500">This page doesn't exist or was moved.</p>
    <Link
      to="/dashboard"
      className="mt-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 transition-colors"
    >
      Back to Dashboard
    </Link>
  </div>
);

export default NotFound;
