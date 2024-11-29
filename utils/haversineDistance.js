export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180.0;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2));

  const c = 2 * Math.asin(Math.sqrt(a));
  return R * c; // Distance in kilometers
};
