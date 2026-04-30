export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-card max-w-xl p-10 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-secondaryText">
          Frequency Lost
        </p>
        <h1 className="font-heading mt-4 text-4xl text-primaryText">404</h1>
        <p className="mt-4 text-secondaryText">
          The page you requested is outside the current signal range.
        </p>
        <a
          href="/"
          className="button-outline mt-8 inline-flex items-center justify-center"
        >
          Return Home
        </a>
      </div>
    </main>
  );
}
