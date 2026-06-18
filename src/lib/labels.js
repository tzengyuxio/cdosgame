// Human-readable labels for the localization_level enum.
export const LOC_LABELS = {
  native: '原生中文',
  localized: '中文化',
  packaging: '中文包裝',
  foreign: '外文遊戲',
};

export const locLabel = v => LOC_LABELS[v] || v;
