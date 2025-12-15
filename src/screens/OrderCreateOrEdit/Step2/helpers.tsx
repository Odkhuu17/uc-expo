const createArc = (
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
  segments: number = 100
) => {
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;

    // Linear interpolation for base path
    const lat = start.latitude + (end.latitude - start.latitude) * t;
    const lng = start.longitude + (end.longitude - start.longitude) * t;

    // Add perpendicular offset to create arc
    const latDiff = end.latitude - start.latitude;
    const lngDiff = end.longitude - start.longitude;
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

    // Smooth parabolic offset (maximum at midpoint t=0.5)
    const offset = Math.sin(t * Math.PI) * distance * 0.3; // Scale offset based on distance

    // Perpendicular direction (rotated 90 degrees)
    const perpLat = -lngDiff;
    const perpLng = latDiff;

    // Apply offset
    points.push({
      latitude: lat + perpLat * offset,
      longitude: lng + perpLng * offset,
    });
  }

  return points;
};

export { createArc };
