import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-blue-500 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Punch Point Panel</h1>
      <nav className="flex space-x-4">
        <Link
          href="/setup"
          className="px-4 py-2 bg-white text-red-500 rounded-lg font-semibold hover:bg-gray-200"
        >
          Setup Match
        </Link>
        <Link
          href="/results"
          className="px-4 py-2 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-200"
        >
          View Results
        </Link>
      </nav>
    </div>
  );
}
