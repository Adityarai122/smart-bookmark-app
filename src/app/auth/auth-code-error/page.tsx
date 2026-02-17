export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <div className="card w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          There was a problem signing you in. Please try again.
        </p>
        <a href="/login" className="btn-primary inline-block">
          Return to Login
        </a>
      </div>
    </div>
  );
}
