// ECD-RIIP · Andhra Pradesh Intelligence Platform
// Mock data derived from 1,000-child baseline dataset

export const T = {
  bg: "#F0F4F9",
  surface: "#FFFFFF",
  navy: "#0F2D5E",
  navyMid: "#1E4D8C",
  teal: "#0B7D6E",
  tealSoft: "#E6F4F2",
  amber: "#C97D10",
  amberSoft: "#FEF3E2",
  red: "#B91C1C",
  redSoft: "#FEE9E9",
  blue: "#1D5FA8",
  blueSoft: "#E8F1FB",
  green: "#166534",
  greenSoft: "#EAFAF1",
  purple: "#6D3FBF",
  purpleSoft: "#EDE9FF",
  text: "#0F1C2E",
  textMid: "#4A5E78",
  textDim: "#90A3B8",
  border: "#DDE5EF",
  shadow: "0 2px 12px rgba(15,45,94,0.07)",
  shadowMd: "0 4px 24px rgba(15,45,94,0.1)",
};

export const KPI = [
  { label: "Developmental Delays", current: 52.4, target: 20, unit: "%", color: T.red,   soft: T.redSoft,   icon: "⚠",  raw: "524 / 1,000 children" },
  { label: "Pending Referrals",    current: 51.3, target: 5,  unit: "%", color: T.amber, soft: T.amberSoft, icon: "⏳", raw: "513 / 1,000 cases" },
  { label: "High-Risk Exit Rate",  current: 14.6, target: 35, unit: "%", color: T.teal,  soft: T.tealSoft,  icon: "↑",  raw: "146 / 1,000 exited" },
  { label: "Improvement Rate",     current: 47.2, target: 70, unit: "%", color: T.blue,  soft: T.blueSoft,  icon: "◈",  raw: "472 / 1,000 improved" },
];

export const riskDist = [
  { name: "Low Risk",    value: 71.3, n: 713, color: T.teal  },
  { name: "Medium Risk", value: 27.9, n: 279, color: T.amber },
  { name: "High Risk",   value: 0.8,  n: 8,   color: T.red   },
];

export const delayDomains = [
  { domain: "Language (LC)", pct: 18.2, n: 182, color: T.red    },
  { domain: "Gross Motor",   pct: 14.6, n: 146, color: T.amber  },
  { domain: "Social-Emot.",  pct: 13.7, n: 137, color: T.purple },
  { domain: "Fine Motor",    pct: 11.5, n: 115, color: T.blue   },
  { domain: "Cognitive",     pct: 10.0, n: 100, color: T.teal   },
];

export const numDelays = [
  { d: "0 delays", n: 476, pct: 47.6 },
  { d: "1 delay",  n: 385, pct: 38.5 },
  { d: "2 delays", n: 124, pct: 12.4 },
  { d: "3+",       n: 15,  pct: 1.5  },
];

export const nutritionBars = [
  { l: "Anemia",      pct: 26.8, n: 268, c: T.red    },
  { l: "Underweight", pct: 19.0, n: 190, c: T.amber  },
  { l: "Stunting",    pct: 13.8, n: 138, c: T.purple },
  { l: "Wasting",     pct: 10.8, n: 108, c: T.blue   },
];

export const referralStatus = [
  { s: "Pending",         v: 513, pct: 51.3, c: T.red   },
  { s: "Completed",       v: 299, pct: 29.9, c: T.teal  },
  { s: "Under Treatment", v: 188, pct: 18.8, c: T.amber },
];

export const outcomeData = [
  { l: "Improved", v: 472, pct: 47.2, c: T.teal  },
  { l: "Same",     v: 430, pct: 43.0, c: T.amber },
  { l: "Worsened", v: 98,  pct: 9.8,  c: T.red   },
];

export const districtData = [
  { district: "Chittoor",      n: 255, exitRate: 17, improvement: 49, pending: 49 },
  { district: "Eluru",         n: 257, exitRate: 15, improvement: 48, pending: 50 },
  { district: "Guntur",        n: 234, exitRate: 13, improvement: 46, pending: 53 },
  { district: "Visakhapatnam", n: 254, exitRate: 13, improvement: 45, pending: 54 },
];

export const trendData = [
  { m: "Baseline", exit: 14.6, impr: 47.2, pend: 51.3 },
  { m: "Month 2",  exit: 17,   impr: 51,   pend: 44   },
  { m: "Month 4",  exit: 20,   impr: 55,   pend: 36   },
  { m: "Month 6",  exit: 24,   impr: 59,   pend: 26   },
  { m: "Month 9",  exit: 29,   impr: 64,   pend: 15   },
  { m: "Target",   exit: 35,   impr: 70,   pend: 5    },
];

export const dqData = [
  { d: "Language",   dq: 91.2, c: T.red    },
  { d: "Gross Mtr.", dq: 93.8, c: T.amber  },
  { d: "Soc-Emot.",  dq: 94.1, c: T.purple },
  { d: "Fine Mtr.",  dq: 95.6, c: T.blue   },
  { d: "Cognitive",  dq: 96.4, c: T.teal   },
  { d: "Composite",  dq: 94.9, c: T.navy   },
];

export const TABS = ["Overview", "Delay Analysis", "Nutrition & Neuro", "Referrals", "Outcomes", "Districts"];
