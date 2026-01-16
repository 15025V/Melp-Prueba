/**
 * The function calculates the distance in meters between two sets of latitude and longitude
 * coordinates using the Haversine formula.
 * @param {number} lat1 - Latitude of the first point in degrees
 * @param {number} lon1 - Longitude of the first location in degrees
 * @param {number} lat2 - Latitude of the second point
 * @param {number} lon2 - Longitude of the second point
 * @returns The function `getDistanceInMeters` calculates the distance in meters between two sets of
 * latitude and longitude coordinates using the Haversine formula. The calculated distance in meters is
 * being returned by the function.
 */
export function getDistanceInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
