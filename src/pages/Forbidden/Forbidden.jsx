import React from "react";

/**
 * Premium Forbidden (403) Page - React + Tailwind CSS
 *
 * Props (optional):
 *  - title (string) - short heading
 *  - subtitle (string) - one-line summary
 *  - showReport (bool) - show "Report Issue" button
 *
 * Usage:
 *  <PremiumForbidden showReport={true} />
 */

export default function PremiumForbidden({
  title = "403 — Forbidden",
  subtitle = "You don't have permission to access this page.",
  showReport = true,
}) {
  return (
    <div className=" flex items-center justify-center bg-linear-to-br from-[#0f172a] via-[#0b1220] to-[#021024] text-white overflow-hidden relative rounded-3xl">
      {/* background animated gradient blobs */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(800px 400px at 10% 20%, rgba(99,102,241,0.12), transparent 12%), radial-gradient(700px 350px at 90% 80%, rgba(34,197,94,0.08), transparent 12%)",
          filter: "blur(60px)",
        }}
      />

      {/* giant translucent 403 in background */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 0 }}
      >
        <span
          style={{
            fontFamily: "'Montserrat', system-ui, sans-serif",
            fontSize: "35vw",
            lineHeight: 1,
            color: "rgba(255,255,255,0.04)",
            transform: "translateY(-3%)",
            whiteSpace: "nowrap",
          }}
        >
          403
        </span>
      </div>

      {/* content card */}
      <main
        role="main"
        aria-labelledby="forbidden-title"
        className="relative z-10 w-full max-w-4xl px-6 py-10 sm:py-14"
      >
        <div
          className="mx-auto bg-white/6 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          style={{ boxShadow: "0 20px 60px rgba(2,6,23,0.6)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10">
            {/* left: icon + heading */}
            <section className="flex flex-col items-start justify-center gap-4 md:pl-6">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(34,197,94,0.06))",
                    border: "1px solid rgba(255,255,255,0.04)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {/* simple SVG shield lock icon */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 1L3 5v6c0 5 3.8 9.7 9 11 5.2-1.3 9-6 9-11V5l-9-4z"
                      stroke="url(#g1)"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 10c0-2 1.4-3.6 4-3.6s4 1.6 4 3.6"
                      stroke="white"
                      strokeOpacity="0.9"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#6366F1" />
                        <stop offset="1" stopColor="#22C55E" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div>
                  <h1
                    id="forbidden-title"
                    className="text-2xl sm:text-3xl lg:text-4xl font-semibold"
                    style={{
                      fontFamily: "'Montserrat', system-ui, sans-serif",
                    }}
                  >
                    {title}
                  </h1>
                  <p className="mt-1 text-sm text-white/70 max-w-xl">
                    {subtitle}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-white/60 leading-relaxed">
                The server understood the request, but refuses to authorize it.
                This could be because you are not signed in, your account
                doesn't have the required role, or access is restricted by IP or
                policy.
              </p>

              <ul className="mt-4 text-sm text-white/70 grid gap-2">
                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mt-2" />
                  <span>Double-check the URL & permissions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                  <span>Try signing in with an authorized account.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-sky-400 mt-2" />
                  <span>Contact support if you believe this is an error.</span>
                </li>
              </ul>

              {/* actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/12 transition px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {/* Home SVG */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="opacity-90"
                    aria-hidden
                  >
                    <path
                      d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z"
                      fill="currentColor"
                    />
                  </svg>
                  Go to Home
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-liner-to-r from-indigo-500 to-green-400 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow"
                >
                  Contact Support
                </a>

                {showReport && (
                  <button
                    onClick={() => {
                      // example client-side reporter, you can replace with modal
                      window.alert("Report sent to admins (demo).");
                    }}
                    className="inline-flex items-center gap-3 bg-transparent border border-white/8 px-4 py-2 rounded-lg text-sm"
                  >
                    Report Issue
                  </button>
                )}
              </div>
            </section>

            {/* right: details / diagnostics */}
            <aside className="px-4 py-4 md:py-0 md:px-6 rounded-xl bg-white/3 border border-white/6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Error Code</span>
                  <span className="text-xs font-mono text-white/90">
                    HTTP 403
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Status</span>
                  <span className="text-xs font-medium rounded px-2 py-1 bg-yellow-600 text-black">
                    Access Denied
                  </span>
                </div>

                <div className="mt-3 text-sm text-white/75">
                  <strong className="block mb-1">Possible Causes</strong>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-white/60">
                    <li>Insufficient permissions / role</li>
                    <li>Network / IP restriction</li>
                    <li>Expired or invalid client certificate</li>
                    <li>Server configuration / blocked resource</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <strong className="block text-xs text-white/70">
                    Request ID
                  </strong>
                  <div className="mt-1 text-xs font-mono text-white/60 select-all">
                    #b7f3a9c2
                  </div>
                </div>

                <div className="mt-4">
                  <strong className="block text-xs text-white/70">
                    Timestamp
                  </strong>
                  <div className="mt-1 text-xs text-white/60">
                    {new Date().toLocaleString()}
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="/status"
                    className="inline-block text-sm underline text-white/80"
                  >
                    Check system status
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* footer small */}
          <div className="border-t border-white/6 px-6 py-4 text-xs text-white/60 flex items-center justify-between">
            <div>
              Need help?{" "}
              <a href="/docs/security" className="underline text-white/80">
                Security docs
              </a>
            </div>
            <div>© {new Date().getFullYear()} Zap Shift</div>
          </div>
        </div>
      </main>

      {/* extra styles for motion-respect and small animations */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          /* subtle breathing animation on left icon background */
          @keyframes breathe {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.03); opacity: 1; }
            100% { transform: scale(1); opacity: 0.9; }
          }
          .breathe { animation: breathe 6s ease-in-out infinite; }
        }

        /* small responsive tweaks for very small screens */
        @media (max-width: 420px) {
          main { padding-left: 12px; padding-right: 12px; }
        }
      `}</style>
    </div>
  );
}
