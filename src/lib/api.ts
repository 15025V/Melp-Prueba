import { Restaurant } from "@/types/restaurant";

export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(
    "https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json",
    // { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  return res.json();
}
