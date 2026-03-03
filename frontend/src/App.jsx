import { useState } from "react";
import { T, TABS } from "./data/mockData";
import UCRSPanel from "./components/UCRSPanel";
import EscalationPanel from "./components/EscalationPanel";
import InterventionPanel from "./components/InterventionPanel";
import SLAPanel from "./components/SLAPanel";
import { OutcomesTab, DistrictsTab } from "./components/GovernanceTabs";

const TAB_PANELS = [UCRSPanel, EscalationPanel, InterventionPanel, SLAPanel, OutcomesTab, DistrictsTab];

const TAB_DESCRIPTIONS = [
  "UCRS overview, risk distribution & 12-month projection",
  "Domain delays, DQ analysis & escalation engine",
  "Nutrition, neuro-behavioral & intervention bundles",
  "SLA engine, referral status & escalation path",
  "Improvement rates, high-risk exit & outcome insights",
  "District benchmarking & governance performance",
];

export default function App() {
  const [tab, setTab] = useState(0);
  const Panel = TAB_PANELS[tab];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'system-ui', sans-serif" }}>

      {/* Header */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, boxShadow: "0 1px 12px rgba(15,45,94,0.06)" }}>
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 32px" }}>

          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: `linear-gradient(135deg, ${T.navy}, ${T.navyMid})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(15,45,94,0.22)", fontSize: 20 }}>🏛</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.teal, fontWeight: 600 }}>
                  Government of Andhra Pradesh · WCD Department
                </div>
                <div style={{ fontSize: 20, fontFamily: "'Georgia', serif", color: T.navy, marginTop: 2, fontWeight: 700, letterSpacing: "-0.01em" }}>
                  ECD-RIIP Intelligence Platform
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              {[
                { l: "Dataset",    v: "1,000 children" },
                { l: "Districts",  v: "4 · AP"          },
                { l: "Data Sheets",v: "14 sheets"       },
                { l: "Phase",      v: "1 · Pilot", highlight: true },
              ].map((x, i) => (
                <div key={i} style={{ textAlign: "right", padding: "0 20px", borderLeft: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 10, color: T.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{x.l}</div>
                  <div style={{ fontSize: 13, color: x.highlight ? T.amber : T.text, fontWeight: 600 }}>{x.v}</div>
                </div>
              ))}
              <div style={{ marginLeft: 18, display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: T.teal,
                  animation: "pulse 2s infinite",
                }} />
                <span style={{ fontSize: 11, color: T.teal, fontWeight: 600 }}>Live</span>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                style={{
                  padding: "8px 18px",
                  background: tab === i ? T.navy : "transparent",
                  borderRadius: 8,
                  border: "none",
                  color: tab === i ? "#fff" : T.textMid,
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: tab === i ? 600 : 400,
                  letterSpacing: "0.01em",
                  transition: "all 0.18s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb / tab descriptor */}
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "12px 32px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: T.textDim }}>ECD-RIIP</span>
          <span style={{ fontSize: 11, color: T.textDim }}>›</span>
          <span style={{ fontSize: 11, color: T.navy, fontWeight: 600 }}>{TABS[tab]}</span>
          <span style={{ fontSize: 11, color: T.textDim }}>·</span>
          <span style={{ fontSize: 11, color: T.textDim }}>{TAB_DESCRIPTIONS[tab]}</span>
        </div>
      </div>

      {/* Page content */}
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "18px 32px 40px" }}>
        <Panel />
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
        * { box-sizing: border-box; }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
