// Human-readable labels for the localization_level enum.
export const LOC_LABELS = {
  native: '原生中文',
  localized: '中文化',
  packaging: '中文包裝',
  foreign: '外文遊戲',
};

export const locLabel = v => LOC_LABELS[v] || v;

// Genre taxonomy v2 — see docs/genre-taxonomy.md. Frontmatter stores the stable
// KEY (e.g. SLG); the Chinese display name and group membership are derived here,
// so renaming a label or regrouping never touches content. Object key order is
// the canonical display order (action → rpg → adventure → … → etc).
export const GENRE_LABELS = {
  ACT: '動作', FTG: '格鬥', STG: '射擊', FPS: '第一人稱射擊', RCG: '賽車', SPG: '運動', SIM: '模擬',
  RPG: '角色扮演', ARPG: '動作角色扮演', SRPG: '戰棋角色扮演',
  ADV: '冒險', AVG: '視覺小說', AADV: '動作冒險',
  SLG: '回合策略', HSG: '歷史模擬', RTS: '即時戰略',
  CBG: '城市建造', CMS: '經營管理', LSG: '養成',
  PZG: '益智解謎', TBG: '棋牌桌遊',
  ETC: '其他',
};

export const GENRE_GROUPS = {
  ACT: 'action', FTG: 'action', STG: 'action', FPS: 'action', RCG: 'action', SPG: 'action', SIM: 'action',
  RPG: 'rpg', ARPG: 'rpg', SRPG: 'rpg',
  ADV: 'adventure', AVG: 'adventure', AADV: 'adventure',
  SLG: 'strategy', HSG: 'strategy', RTS: 'strategy',
  CBG: 'management', CMS: 'management', LSG: 'management',
  PZG: 'puzzle', TBG: 'puzzle',
  ETC: 'etc',
};

// group id -> display name (also the canonical group display order).
export const GROUP_LABELS = {
  action: '動作', rpg: '角色扮演', adventure: '冒險',
  strategy: '策略', management: '模擬經營', puzzle: '益智桌遊', etc: '其他',
};

// one-line definitions for the /genres/guide explainer (full version in docs/genre-taxonomy.md).
export const GENRE_DESC = {
  ACT: '即時操作、跳躍/攻擊為核心；含平台遊戲',
  FTG: '一對一對戰格鬥',
  STG: '捲軸/定點 shoot’em up',
  FPS: '第一人稱視角射擊',
  RCG: '駕駛競速',
  SPG: '運動競技',
  SIM: '載具/軍武擬真（飛行、坦克、潛艇、戰艦）',
  RPG: '回合/指令戰鬥、劇情成長',
  ARPG: '即時戰鬥＋數值成長',
  SRPG: '網格戰棋＋角色養成',
  ADV: '點擊式冒險解謎（Scumm 類）',
  AVG: '文字/分支劇情為主、互動少（galgame/視覺小說）',
  AADV: '動作操作＋探索並重',
  SLG: '架空/泛文明的回合策略經營',
  HSG: '光榮（KOEI）/三國志 like：君主視角回合大戰略，武將登用＋內政外交＋會戰',
  RTS: '即時操作的戰略，不論題材',
  CBG: '建設都市/設施布局',
  CMS: '商業實體經營',
  LSG: '養育角色/人生模擬（含戀愛養成）',
  PZG: '抽象規則、落物、推箱',
  TBG: '棋牌/桌遊',
  ETC: '上述接不住的歸這',
};

export const genreLabel = v => GENRE_LABELS[v] || v;
export const genreGroup = v => GENRE_GROUPS[v] || 'etc';
export const groupLabel = v => GROUP_LABELS[v] || v;
