// Human-readable labels for the localization_level enum (A/B/D/foreign).
export const LOC_LABELS = {
  A: 'A 原生中文',
  B: 'B 官方中文化',
  D: 'D 包裝中文',
  foreign: '外文（未中文化）',
};

export const locLabel = v => LOC_LABELS[v] || v;
