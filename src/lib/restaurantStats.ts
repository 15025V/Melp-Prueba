/**
 * The function `analyzeRestaurantsInRadius` analyzes restaurants within a specified radius from a
 * given center point based on their location and ratings.
 * @param {Restaurant[]} restaurants - The `restaurants` parameter is an array of objects of type
 * `Restaurant`, which likely contains information about various restaurants such as name, address,
 * rating, etc.
 * @param {number} centerLat - The `centerLat` parameter represents the latitude of the center point
 * from which you want to analyze restaurants within a certain radius. This latitude value is used to
 * calculate the distance between the center point and the location of each restaurant.
 * @param {number} centerLng - The `centerLng` parameter represents the longitude coordinate of the
 * center point from which you want to analyze restaurants within a certain radius. It is used in
 * conjunction with the `centerLat` parameter to calculate the distance between the center point and
 * the location of each restaurant.
 * @param {number} radiusMeters - The `radiusMeters` parameter in the `analyzeRestaurantsInRadius`
 * function represents the distance in meters from the center point (specified by `centerLat` and
 * `centerLng`) within which you want to analyze the restaurants. This function filters out the
 * restaurants that are within this specified radius from
 * @returns The `analyzeRestaurantsInRadius` function returns an object with the following properties:
 * - `count`: The number of restaurants within the specified radius.
 * - `averageRating`: The average rating of the restaurants within the radius, rounded to 2 decimal
 * places.
 * - `stdDeviation`: The standard deviation of the ratings of the restaurants within the radius,
 * rounded to 2 decimal places.
 * - `
 */
import { Restaurant } from "@/types/restaurant";
import { getDistanceInMeters } from "./geo";

export function analyzeRestaurantsInRadius(
  restaurants: Restaurant[],
  centerLat: number,
  centerLng: number,
  radiusMeters: number
) {
  const inside = restaurants.filter((r) => {
    const loc = r.address?.location;
    if (!loc) return false;

    const distance = getDistanceInMeters(
      centerLat,
      centerLng,
      loc.lat,
      loc.lng
    );

    return distance <= radiusMeters;
  });

  const count = inside.length;

  if (count === 0) {
    return {
      count: 0,
      averageRating: 0,
      stdDeviation: 0,
      restaurants: [],
    };
  }

  const ratings = inside.map((r) => r.rating);

  const average =
    ratings.reduce((sum, r) => sum + r, 0) / count;

  const variance =
    ratings.reduce((sum, r) => sum + (r - average) ** 2, 0) /
    count;

  const stdDeviation = Math.sqrt(variance);

  return {
    count,
    averageRating: Number(average.toFixed(2)),
    stdDeviation: Number(stdDeviation.toFixed(2)),
    restaurants: inside,
  };
}
