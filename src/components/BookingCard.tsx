"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimatedWords } from "@/components/AnimatedText";
import { parkingAirports } from "@/lib/data";

type BookingCardProps = {
  className?: string;
  id?: string;
  variant?: "default" | "intro";
};

export default function BookingCard({
  className = "",
  id,
  variant = "default",
}: BookingCardProps) {
  const [notice, setNotice] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("Booking system coming soon.");
  };

  return (
    <motion.div
      id={id}
      className={`relative ${className}`}
      whileHover={
        variant === "intro" && !reduceMotion
          ? { y: -8, scale: 1.008 }
          : undefined
      }
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`frost-panel ${variant === "intro" ? "intro-booking-card" : ""}`}
      >
        <div className="frost-panel-inner">
          <div className="mb-6 text-center sm:text-left">
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Check Availability
            </h3>
            <p className="mt-1.5 text-sm text-white/45">
              Enter your travel details to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <FrostField label="Airport" name="airport">
              <select
                id="airport"
                name="airport"
                defaultValue="manchester"
                className="frost-row-input"
              >
                {parkingAirports.map((airport) => (
                  <option key={airport.value} value={airport.value}>
                    {airport.label}
                  </option>
                ))}
              </select>
            </FrostField>

            <div className="grid gap-3 sm:grid-cols-2">
              <FrostField label="Drop-off Date" name="dropoff-date">
                <input
                  id="dropoff-date"
                  type="date"
                  name="dropoff-date"
                  className="frost-row-input"
                />
              </FrostField>
              <FrostField label="Return Date" name="return-date">
                <input
                  id="return-date"
                  type="date"
                  name="return-date"
                  className="frost-row-input"
                />
              </FrostField>
            </div>

            <FrostField label="Vehicle Registration" name="registration">
              <input
                id="registration"
                type="text"
                name="registration"
                placeholder="e.g. AB12 CDE"
                className="frost-row-input"
              />
            </FrostField>

            <button type="submit" className="btn-submit frost-submit">
              Check Availability
            </button>

            <AnimatePresence>
              {notice && (
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="rounded-xl border border-redrose-red/30 bg-redrose-red/10 px-4 py-3 text-center text-sm text-redrose-off-white backdrop-blur-md"
                  role="status"
                >
                  {notice}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

type FrostFieldProps = {
  label: string;
  name: string;
  children: React.ReactNode;
};

function FrostField({ label, name, children }: FrostFieldProps) {
  return (
    <label htmlFor={name} className="frost-row block cursor-text">
      <span className="frost-row-label">
        <AnimatedWords text={label} mode="inView" />
      </span>
      {children}
    </label>
  );
}
