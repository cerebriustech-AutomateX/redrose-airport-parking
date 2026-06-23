"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimatedWords } from "@/components/AnimatedText";
import { companyInfo, parkingServices } from "@/lib/data";
import {
  HOTEL_SEARCH_HELPER,
  buildHotelSearchUrl,
  resolvePlaceId,
} from "@/lib/hotels";

type BookingTab = "parking" | "hotels";

type BookingCardProps = {
  className?: string;
  id?: string;
  variant?: "default" | "intro";
};

const panelFade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] as const },
};

export default function BookingCard({
  className = "",
  id,
  variant = "default",
}: BookingCardProps) {
  const [activeTab, setActiveTab] = useState<BookingTab>("parking");
  const [notice, setNotice] = useState<string | null>(null);
  const [hotelNotice, setHotelNotice] = useState<string | null>(null);
  const [hotelLoading, setHotelLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleParkingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("Booking system coming soon.");
  };

  const handleHotelSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHotelNotice(null);
    setHotelLoading(true);

    try {
      const form = new FormData(event.currentTarget);
      const destination = String(form.get("destination") ?? "").trim();
      const checkIn = String(form.get("checkin") ?? "");
      const checkOut = String(form.get("checkout") ?? "");
      const adults = Number(form.get("adults") ?? 2);
      const children = Number(form.get("children") ?? 0);
      const rooms = Number(form.get("rooms") ?? 1);

      if (!destination) {
        setHotelNotice("Please enter a destination.");
        return;
      }

      if (!checkIn || !checkOut) {
        setHotelNotice("Please choose check-in and check-out dates.");
        return;
      }

      const place = await resolvePlaceId(destination);
      if (!place) {
        setHotelNotice(
          "We could not match that destination. Try Manchester, London, Spain, or another major city.",
        );
        return;
      }

      const url = buildHotelSearchUrl({
        placeId: place.placeId,
        checkIn,
        checkOut,
        adults: Number.isFinite(adults) ? adults : 2,
        children: Number.isFinite(children) ? children : 0,
        rooms: Number.isFinite(rooms) ? rooms : 1,
      });

      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setHotelLoading(false);
    }
  };

  const card = (
    <div
      className={`frost-panel ${variant === "intro" ? "intro-booking-card" : ""}`}
    >
      <div className="frost-panel-inner">
        <div className="booking-tabs" role="tablist" aria-label="Booking type">
          <button
            type="button"
            role="tab"
            id="booking-tab-parking"
            aria-selected={activeTab === "parking"}
            aria-controls="booking-panel-parking"
            className="booking-tab"
            onClick={() => {
              setActiveTab("parking");
              setNotice(null);
            }}
          >
            Airport Parking
          </button>
          <button
            type="button"
            role="tab"
            id="booking-tab-hotels"
            aria-selected={activeTab === "hotels"}
            aria-controls="booking-panel-hotels"
            className="booking-tab"
            onClick={() => {
              setActiveTab("hotels");
              setNotice(null);
              setHotelNotice(null);
            }}
          >
            Hotels
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={reduceMotion ? false : panelFade.initial}
            animate={panelFade.animate}
            exit={reduceMotion ? undefined : panelFade.exit}
            transition={panelFade.transition}
          >
            <div className="mb-6 text-center sm:text-left">
              <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {activeTab === "parking"
                  ? "Check Availability"
                  : "Search Hotels"}
              </h3>
              <p className="mt-1.5 text-sm text-white/45">
                {activeTab === "parking"
                  ? "Enter your travel details to get started."
                  : HOTEL_SEARCH_HELPER}
              </p>
            </div>

            {activeTab === "parking" ? (
              <form
                id="booking-panel-parking"
                role="tabpanel"
                aria-labelledby="booking-tab-parking"
                onSubmit={handleParkingSubmit}
                className="space-y-3"
              >
                <FrostField label="Airport" name="airport">
                  <input
                    id="airport"
                    type="text"
                    name="airport"
                    readOnly
                    value={companyInfo.airport}
                    className="frost-row-input"
                  />
                </FrostField>

                <FrostField label="Service" name="service">
                  <select
                    id="service"
                    name="service"
                    defaultValue="park-ride"
                    className="frost-row-input"
                  >
                    {parkingServices.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
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

                {variant !== "intro" ? (
                  <FrostField label="Vehicle Registration" name="registration">
                    <input
                      id="registration"
                      type="text"
                      name="registration"
                      placeholder="e.g. AB12 CDE"
                      className="frost-row-input"
                    />
                  </FrostField>
                ) : null}

                <button type="submit" className="btn-submit frost-submit">
                  Check Availability
                </button>

                <AnimatePresence>
                  {notice && (
                    <motion.p
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="rounded-xl border border-redrose-red/30 bg-redrose-red/10 px-4 py-3 text-center text-sm text-redrose-off-white backdrop-blur-md"
                      role="status"
                    >
                      {notice}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            ) : (
              <form
                id="booking-panel-hotels"
                role="tabpanel"
                aria-labelledby="booking-tab-hotels"
                onSubmit={handleHotelSubmit}
                className="space-y-3"
              >
                <FrostField
                  label="Where"
                  name="destination"
                  hint="Enter any destination, e.g. Manchester, London, Spain."
                >
                  <input
                    id="destination"
                    type="text"
                    name="destination"
                    placeholder="Enter a destination"
                    className="frost-row-input"
                    required
                    autoComplete="off"
                  />
                </FrostField>

                <div className="grid gap-3 sm:grid-cols-2">
                <FrostField label="Check-in" name="checkin">
                  <input
                    id="checkin"
                    type="date"
                    name="checkin"
                    className="frost-row-input"
                    required
                  />
                </FrostField>
                <FrostField label="Check-out" name="checkout">
                  <input
                    id="checkout"
                    type="date"
                    name="checkout"
                    className="frost-row-input"
                    required
                  />
                </FrostField>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <FrostField label="Adults" name="adults" hint="Aged 16+">
                    <input
                      id="adults"
                      type="number"
                      name="adults"
                      min={1}
                      max={20}
                      defaultValue={2}
                      className="frost-row-input"
                    />
                  </FrostField>
                  <FrostField label="Children" name="children" hint="Under 16">
                    <input
                      id="children"
                      type="number"
                      name="children"
                      min={0}
                      max={10}
                      defaultValue={0}
                      className="frost-row-input"
                    />
                  </FrostField>
                  <FrostField label="Rooms" name="rooms" hint="Rooms required">
                    <input
                      id="rooms"
                      type="number"
                      name="rooms"
                      min={1}
                      max={10}
                      defaultValue={1}
                      className="frost-row-input"
                    />
                  </FrostField>
                </div>

                <button
                  type="submit"
                  className="btn-submit frost-submit"
                  disabled={hotelLoading}
                >
                  {hotelLoading ? "Searching..." : "Search Hotels"}
                </button>

                <AnimatePresence>
                  {hotelNotice && (
                    <motion.p
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="rounded-xl border border-redrose-red/30 bg-redrose-red/10 px-4 py-3 text-center text-sm text-redrose-off-white backdrop-blur-md"
                      role="status"
                    >
                      {hotelNotice}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  if (variant === "intro" && !reduceMotion) {
    return (
      <motion.div
        id={id}
        className={`hero-booking-shell relative ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.008 }}
        transition={{
          opacity: { duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
          default: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {card}
      </motion.div>
    );
  }

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
      {card}
    </motion.div>
  );
}

type FrostFieldProps = {
  label: string;
  name: string;
  hint?: string;
  children: React.ReactNode;
};

function FrostField({ label, name, hint, children }: FrostFieldProps) {
  return (
    <label htmlFor={name} className="frost-row block cursor-text">
      <span className="frost-row-label">
        <AnimatedWords text={label} mode="inView" />
      </span>
      {hint ? <span className="frost-row-hint">{hint}</span> : null}
      {children}
    </label>
  );
}
