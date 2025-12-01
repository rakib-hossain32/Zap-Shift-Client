import React from "react";
import { NavLink } from "react-router";

// Premium Payment Cancelled Page (React + Tailwind)
// - Default export: PaymentCancelled
// - Props: orderId, amount, currency, onRetry, onContact, backToStore
// - Drop this file into your React app (e.g. src/components/PaymentCancelled.jsx)
// - Tailwind must be configured in your project

export default function PaymentCancelled({
  orderId = "#000123",
  amount = "49.99",
  currency = "USD",
  onRetry = () => {},
  onContact = () => {},
  backToStore = () => {},
}) {
  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="max-w-4xl w-full  items-center ">
        {/* Illustration / left */}
        <div className="flex items-center justify-center ">
          <div className="relative w-full max-w-md ">
            <div className="absolute -left-10 -top-10 w-56 h-56 rounded-full bg-linear-to-r from-pink-500/30 to-purple-500/20 blur-3xl ring-1 ring-white/5"></div>
            <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-linear-to-tr from-amber-400/20 to-rose-400/10 blur-2xl"></div>

            <div className="bg-linear-to-br from-white/5 to-white/3 backdrop-blur-sm border border-white/6 rounded-2xl p-6 shadow-2xl bg-secondary/50">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-lg bg-red-600/10 ring-1 ring-red-500/10">
                  {/* cancelled icon */}
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                      stroke="#F87171"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 8l8 8M16 8l-8 8"
                      stroke="#F87171"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Payment Cancelled
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    We couldn't complete your payment.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="flex items-center justify-between bg-white/3 p-3 rounded-lg border border-white/6">
                  <div>
                    <p className="text-xs text-white/70">Order</p>
                    <p className="text-sm font-medium text-white">{orderId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/70">Amount</p>
                    <p className="text-sm font-medium text-white">
                      {currency} {amount}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-white/70 leading-relaxed">
                  <p>
                    Your payment was cancelled — this can happen when the
                    payment was denied, the process was interrupted, or the card
                    was declined.
                  </p>
                </div>

                <div className="flex gap-3">
                  <NavLink to={'/dashboard/deliveries'}
                    onClick={onRetry}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-linear-to-r from-rose-500 to-pink-500 px-4 py-2 text-white font-semibold shadow-lg hover:scale-[1.01] active:scale-[0.995] transition-transform"
                  >
                    Retry Payment
                  </NavLink>

                  <NavLink to={'/'}
                    onClick={backToStore}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/3 px-4 py-2 text-white/90 font-medium shadow-sm hover:bg-white/5 transition"
                  >
                    Back to store
                  </NavLink>
                </div>

                <div className="text-center text-xs text-white/60">
                  <p>
                    Need help?{" "}
                    <button onClick={onContact} className="underline">
                      Contact support
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs text-white/50 text-center">
              <p>
                Secure checkout • 256‑bit encryption • No card details stored
              </p>
            </div>
          </div>
        </div>

        {/* Right: Actions and details */}
      </div>
    </div>
  );
}
