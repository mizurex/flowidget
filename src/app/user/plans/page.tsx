"use client";

import { useMemo, useState } from "react";

type CreditPack = {
  credits: number;
  priceUsd: number;
};

const CREDIT_PACKS: CreditPack[] = [
  { credits: 1000, priceUsd: 10 },
  { credits: 2500, priceUsd: 25 },
  { credits: 5000, priceUsd: 50 },
  { credits: 10000, priceUsd: 100 },
];

const MIN_CUSTOM = 500;
const MAX_CUSTOM = 100000;

export default function PlansPage() {
  const [selectedPack, setSelectedPack] = useState<CreditPack | null>(CREDIT_PACKS[0]);
  const [customCredits, setCustomCredits] = useState<string>("");
  const [autoTopUpEnabled, setAutoTopUpEnabled] = useState<boolean>(false);
  const [showBillingInfo, setShowBillingInfo] = useState<boolean>(false);

  const effectiveCredits = useMemo(() => {
    const parsed = Number(customCredits);
    if (!Number.isFinite(parsed) || customCredits === "") {
      return selectedPack?.credits ?? 0;
    }
    return Math.max(MIN_CUSTOM, Math.min(MAX_CUSTOM, Math.floor(parsed)));
  }, [customCredits, selectedPack]);

  const effectivePrice = useMemo(() => {
    const pack = CREDIT_PACKS.find((p) => p.credits === effectiveCredits);
    if (pack) return pack.priceUsd;
    const unitPrice = 0.01; // $0.01 per credit (example placeholder)
    return Math.round(effectiveCredits * unitPrice) / 100;
  }, [effectiveCredits]);

  function onSelectPack(pack: CreditPack) {
    setSelectedPack(pack);
    setCustomCredits("");
  }

  function onChangeCustom(value: string) {
    setCustomCredits(value.replace(/[^0-9]/g, ""));
    setSelectedPack(null);
  }

  function onBuy() {
    setShowBillingInfo(true);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur shadow-xl">
        <div className="flex items-start justify-between gap-4 p-6 md:p-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Buy Credits</h1>
          </div>
          <a
            href="#"
            className="text-sm text-neutral-300 hover:text-white underline underline-offset-4"
          >
            Billing Portal →
          </a>
        </div>

        <div className="px-6 md:px-8 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CREDIT_PACKS.map((pack) => {
              const isActive = selectedPack?.credits === pack.credits && customCredits === "";
              return (
                <button
                  key={pack.credits}
                  type="button"
                  onClick={() => onSelectPack(pack)}
                  className={
                    "group rounded-xl border px-4 py-5 text-left transition focus:outline-none " +
                    (isActive
                      ? "border-indigo-500/80 bg-indigo-500/10 ring-2 ring-indigo-500/40"
                      : "border-neutral-800 hover:border-neutral-700 bg-neutral-900")
                  }
                >
                  <div className="text-lg font-semibold">
                    {pack.credits.toLocaleString()}
                  </div>
                  <div className="mt-1 text-sm text-neutral-400">${pack.priceUsd}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onBuy}
              className="rounded-xl bg-white text-black px-5 py-3 font-medium shadow-[0_0_0_3px_rgba(99,102,241,0.4)] focus:outline-none hover:bg-neutral-200"
            >
              Buy Credits
            </button>
          </div>


          <div className="mt-8 h-px w-full bg-neutral-800" />

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                id="auto-topup"
                type="checkbox"
                checked={autoTopUpEnabled}
                onChange={(e) => setAutoTopUpEnabled(e.target.checked)}
                className="toggle toggle-info"
              />
              <label htmlFor="auto-topup" className="text-sm font-medium">
                Auto Top-up
              </label>
            </div>
          </div>
          <p className="mt-2 text-sm text-neutral-400">
            You need a valid payment method to enable auto top-up. Try buying some credits!
          </p>

          <div className="sr-only mt-4 text-sm text-neutral-400">
            Selected: {effectiveCredits.toLocaleString()} credits — ${effectivePrice}
          </div>
        </div>
      </div>

      {/* Billing info modal */}
      <div
        className={`fixed inset-0 z-50 ${showBillingInfo ? "" : "hidden"}`}
        aria-hidden={!showBillingInfo}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setShowBillingInfo(false)} />
        <div className="relative z-10 mx-auto mt-24 w-full max-w-md p-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 shadow-xl p-6 text-center">
            <h2 className="text-xl font-semibold">Billing in progress</h2>
            <p className="mt-2 text-sm text-neutral-300">
              We’re currently implementing billing options. Please check back soon to
              purchase credits.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowBillingInfo(false)}
                className="rounded-xl border border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}