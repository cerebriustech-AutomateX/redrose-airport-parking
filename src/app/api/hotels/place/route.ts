import { matchPlaceAlias } from "@/lib/hotels";

type PlacesResponse = {
  data?: Array<{
    placeId?: string;
    displayName?: string;
    formattedAddress?: string;
  }>;
};

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim();

  if (!query) {
    return Response.json({ error: "Missing destination query." }, { status: 400 });
  }

  const alias = matchPlaceAlias(query);
  if (alias) {
    return Response.json({
      placeId: alias.placeId,
      displayName: alias.label,
      source: "alias",
    });
  }

  const apiKey = process.env.LITEAPI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Destination lookup is not configured." },
      { status: 503 },
    );
  }

  const placesUrl = new URL("https://api.liteapi.travel/v3.0/data/places");
  placesUrl.searchParams.set("textQuery", query);
  placesUrl.searchParams.set("language", "en");

  const response = await fetch(placesUrl, {
    headers: {
      accept: "application/json",
      "X-API-Key": apiKey,
    },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    return Response.json(
      { error: "Could not look up destination." },
      { status: response.status },
    );
  }

  const payload = (await response.json()) as PlacesResponse;
  const place = payload.data?.[0];

  if (!place?.placeId) {
    return Response.json({ error: "No matching destination found." }, { status: 404 });
  }

  return Response.json({
    placeId: place.placeId,
    displayName: place.displayName ?? query,
    source: "liteapi",
  });
}
