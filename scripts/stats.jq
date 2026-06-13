{
  total: length,
  vendor: [.[] | select(.vendor != null)] | length,
  year_num: [.[] | select(.year | type == "number")] | length,
  rating: [.[] | select(.rating != null)] | length,
  catalog_id: [.[] | select(.catalog_id != null)] | length,
  has_en_alias: [.[] | select(.title_aliases | length > 0)] | length,
  year_gt_2004: [.[] | select((.year | type == "number") and .year > 2004)] | length,
  year_min: ([.[].year | numbers] | min),
  year_max: ([.[].year | numbers] | max)
}
