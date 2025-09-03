export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">401 - Unauthorized</h1>
        <p className="mt-2">You don't have permission to access this page.</p>
        <a href="/" className="text-blue-500 mt-4 inline-block">Return to Home</a>
      </div>
    </div>
  );
}