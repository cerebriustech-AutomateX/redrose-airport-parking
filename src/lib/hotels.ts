export const NUITEE_HOTEL_BASE = "https://redrose.nuitee.link";

type HotelSearchParams = {
  placeId?: string;
  checkIn?: string;
  checkOut?: string;
  adults: number;
  children: number;
  rooms: number;
};

type Occupancy = {
  adults: number;
  children: number[];
};

const PLACE_ALIASES = [
  {
    pattern: /manchester/i,
    placeId: "ChIJ6W8xS2Nhe0gR9fQC4zL8gXc",
    label: "Manchester, UK",
  },
  {
    pattern: /london/i,
    placeId: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
    label: "London, UK",
  },
  {
    pattern: /spain/i,
    placeId: "ChIJi3lwCZyMYQ0R7WCoVKZ0FEA",
    label: "Spain",
  },
  {
    pattern: /birmingham/i,
    placeId: "ChIJc3eB4ytae0gRkHsHUIIvb3U",
    label: "Birmingham, UK",
  },
  {
    pattern: /edinburgh/i,
    placeId: "ChIJ6RHkRNK7h0gR3AqKWJYqKqY",
    label: "Edinburgh, UK",
  },
  {
    pattern: /liverpool/i,
    placeId: "ChIJrQ6lI0QQe0gR3X8x8YQZ8ZQ",
    label: "Liverpool, UK",
  },
  {
    pattern: /glasgow/i,
    placeId: "ChIJza7bElVH0YgR2bkI-TmoM5s",
    label: "Glasgow, UK",
  },
  {
    pattern: /bristol/i,
    placeId: "ChIJmcdPRLgEdkgR2q6Q4dY8qZQ",
    label: "Bristol, UK",
  },
  {
    pattern: /england/i,
    placeId: "ChIJbZ6z4s4OcEgRl4oiF5q4QFXk",
    label: "England",
  },
  {
    pattern: /heathrow/i,
    placeId: "ChIJbVpeh0gFdkgR9fOrhq94HxE",
    label: "London Heathrow Airport",
  },
  {
    pattern: /gatwick/i,
    placeId: "ChIJT92m6QYRdUgRqJz7Z9Q8zZQ",
    label: "London Gatwick Airport",
  },
] as const;

function buildOccupancies(
  adults: number,
  children: number,
  rooms: number,
): Occupancy[] {
  const roomCount = Math.max(1, rooms);
  const adultCount = Math.max(1, adults);
  const childCount = Math.max(0, children);
  const baseAdults = Math.floor(adultCount / roomCount);
  let adultRemainder = adultCount % roomCount;
  const childAges = Array.from({ length: childCount }, () => 8);

  return Array.from({ length: roomCount }, (_, index) => {
    const roomAdults = baseAdults + (adultRemainder > 0 ? 1 : 0);
    if (adultRemainder > 0) adultRemainder -= 1;

    return {
      adults: Math.max(1, roomAdults),
      children: index === 0 ? childAges : [],
    };
  });
}

function encodeOccupancies(occupancies: Occupancy[]): string {
  const json = JSON.stringify(occupancies);
  if (typeof window !== "undefined") {
    return window.btoa(json);
  }
  return Buffer.from(json, "utf-8").toString("base64");
}

export function matchPlaceAlias(destination: string) {
  const trimmed = destination.trim();
  if (!trimmed) return null;

  return (
    PLACE_ALIASES.find((entry) => entry.pattern.test(trimmed)) ?? null
  );
}

export async function resolvePlaceId(destination: string): Promise<{
  placeId: string;
  displayName: string;
} | null> {
  const trimmed = destination.trim();
  if (!trimmed) return null;

  const alias = matchPlaceAlias(trimmed);
  if (alias) {
    return { placeId: alias.placeId, displayName: alias.label };
  }

  try {
    const response = await fetch(
      `/api/hotels/place?${new URLSearchParams({ q: trimmed })}`,
    );

    if (response.ok) {
      const data = (await response.json()) as {
        placeId?: string;
        displayName?: string;
      };
      if (data.placeId) {
        return {
          placeId: data.placeId,
          displayName: data.displayName ?? trimmed,
        };
      }
    }
  } catch {
    // Fall through to null when lookup is unavailable.
  }

  return null;
}

export function buildHotelSearchUrl({
  placeId,
  checkIn,
  checkOut,
  adults,
  children,
  rooms,
}: HotelSearchParams): string {
  const url = new URL(`${NUITEE_HOTEL_BASE}/hotels`);
  url.searchParams.set("language", "en");
  url.searchParams.set("currency", "GBP");

  if (placeId) url.searchParams.set("placeId", placeId);
  if (checkIn) url.searchParams.set("checkin", checkIn);
  if (checkOut) url.searchParams.set("checkout", checkOut);

  const occupancies = buildOccupancies(adults, children, rooms);
  url.searchParams.set("occupancies", encodeOccupancies(occupancies));

  return url.toString();
}

export const HOTEL_SEARCH_HELPER =
  "Search opens our partner hotel site with your destination, dates, guests and rooms pre-filled.";
