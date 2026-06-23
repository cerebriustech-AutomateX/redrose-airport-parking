export const NUITEE_HOTEL_BASE = "https://redrose.nuitee.link";

export const hotelDestinations = [
  { value: "manchester-area", label: "Manchester area" },
  { value: "manchester-airport", label: "Manchester Airport area" },
  { value: "heathrow-area", label: "London Heathrow area" },
  { value: "gatwick-area", label: "London Gatwick area" },
  { value: "stansted-area", label: "London Stansted area" },
  { value: "luton-area", label: "London Luton area" },
  { value: "central-london", label: "Central London" },
  { value: "birmingham-area", label: "Birmingham area" },
  { value: "edinburgh-area", label: "Edinburgh area" },
  { value: "glasgow-area", label: "Glasgow area" },
  { value: "bristol-area", label: "Bristol area" },
  { value: "liverpool-area", label: "Liverpool area" },
  { value: "east-midlands-area", label: "East Midlands area" },
  { value: "newcastle-area", label: "Newcastle area" },
  { value: "leeds-area", label: "Leeds area" },
] as const;

type HotelSearchParams = {
  destination?: string;
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

export function buildHotelSearchUrl({
  destination,
  checkIn,
  checkOut,
  adults,
  children,
  rooms,
}: HotelSearchParams): string {
  const url = new URL(`${NUITEE_HOTEL_BASE}/hotels`);
  url.searchParams.set("language", "en");
  url.searchParams.set("currency", "GBP");

  if (checkIn) url.searchParams.set("checkin", checkIn);
  if (checkOut) url.searchParams.set("checkout", checkOut);
  if (destination) url.searchParams.set("query", destination);

  const occupancies = buildOccupancies(adults, children, rooms);
  url.searchParams.set("occupancies", btoa(JSON.stringify(occupancies)));

  return url.toString();
}

export const HOTEL_SEARCH_HELPER =
  "Search opens our partner hotel site with your destination, dates, guests and rooms pre-filled.";
