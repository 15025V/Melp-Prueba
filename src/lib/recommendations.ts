import { Restaurant } from "@/types/restaurant";
import { getDistanceInMeters } from "./geo";
/**
 * The function `getRecommendedRestaurants` filters and sorts a list of restaurants based on their
 * distance from a center point, rating, and a specified radius.
 * @param {Restaurant[]} restaurants - The `restaurants` parameter is an array of objects representing
 * different restaurants. Each restaurant object typically contains information such as name, address,
 * rating, and location.
 * @param {number} centerLat - The `centerLat` parameter represents the latitude of the center point
 * from which you want to find recommended restaurants.
 * @param {number} centerLng - The `centerLng` parameter in the `getRecommendedRestaurants` function
 * represents the longitude coordinate of the center point from which you want to find recommended
 * restaurants. It is used in conjunction with `centerLat` to calculate the distance between the center
 * point and the restaurants' locations.
 * @param {number} radiusMeters - The `radiusMeters` parameter in the `getRecommendedRestaurants`
 * function represents the maximum distance in meters from the center point (specified by `centerLat`
 * and `centerLng`) within which a restaurant must be located to be considered as a recommended option.
 * Restaurants outside this radius will not be
 * @param {number} minRating - The `minRating` parameter in the `getRecommendedRestaurants` function
 * represents the minimum rating that a restaurant must have in order to be considered as a recommended
 * option. Restaurants with a rating lower than this value will be filtered out from the final list of
 * recommended restaurants.
 * @param {number} maxRating - The `maxRating` parameter in the `getRecommendedRestaurants` function
 * represents the maximum rating that a restaurant must have in order to be considered in the
 * recommendations. Restaurants with a rating equal to or below this value will be filtered out from
 * the final list of recommended restaurants.
 * @returns The `getRecommendedRestaurants` function takes in an array of `Restaurant` objects, along
 * with the center latitude, center longitude, radius in meters, minimum rating, and maximum rating as
 * parameters. It then calculates the distance of each restaurant from the center location, filters the
 * restaurants based on the distance, rating, and radius criteria, and finally sorts the filtered
 * restaurants by distance before returning the result.
 */

export function getRecommendedRestaurants(
  restaurants: Restaurant[],
  centerLat: number,
  centerLng: number,
  radiusMeters: number,
  minRating: number,
  maxRating: number
) {
  return restaurants
    .map((r) => {
      const loc = r.address?.location;
      if (!loc) return null;

      const distance = getDistanceInMeters(
        centerLat,
        centerLng,
        loc.lat,
        loc.lng
      );

      return { ...r, distance };
    })
    .filter(
      (r): r is Restaurant & { distance: number } =>
        !!r &&
        r.distance <= radiusMeters &&
        r.rating >= minRating &&
        r.rating <= maxRating
    )
    .sort((a, b) => a.distance - b.distance);
}
