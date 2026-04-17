/**
 * Maps Step 3 amenity chip labels to backend `amenity_ids` (Postman: amenity_ids[]).
 * Update this map if your API uses different IDs (fetch from an amenities API when available).
 */
const AMENITY_LABEL_TO_ID: Record<string, number> = {
  'Swimming Pool': 1,
  Gym: 2,
  'Power Backup': 3,
  Parking: 4,
  Security: 5,
  Garden: 6,
  Clubhouse: 7,
  Lift: 8,
};

export function amenityLabelsToIds(labels: string[]): number[] {
  const ids: number[] = [];
  for (const label of labels) {
    const id = AMENITY_LABEL_TO_ID[label];
    if (typeof id === 'number' && Number.isFinite(id)) ids.push(id);
  }
  return ids;
}
