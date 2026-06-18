// Human-readable labels for the localization_level enum (A/B/D/foreign).
export const LOC_LABELS = {
  A: '原生中文',
  B: '中文化',
  D: '中文包裝',
  foreign: '外文遊戲',
};

export const locLabel = v => LOC_LABELS[v] || v;
