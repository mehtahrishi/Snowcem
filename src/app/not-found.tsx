import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-slate-800 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-black text-snowcem-orange mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4 text-slate-900">Page Not Found</h2>
      <p className="text-slate-600 text-sm max-w-md mb-8">
        The Snowcem Paints page you are looking for might have been moved or does not exist.
      </p>
      <Link
        href="/"
        className="bg-snowcem-orange hover:bg-orange-600 px-6 py-3 rounded-full text-sm font-bold text-white transition-colors"
      >
        Return to Home Page
      </Link>
    </div>
  );
}
