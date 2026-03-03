import { Card, STitle, PBar, InsightBox } from "./UIComponents";
import { T, nutritionBars } from "../data/mockData";

const neuroBehavioral = [
  { label: "Autism Risk", data: [{ l: "Low", v: 74.2, c: T.teal }, { l: "Moderate", v: 21.2, c: T.amber }, { l: "High", v: 4.6, c: T.red }] },
  { label: "ADHD Risk",   data: [{ l: "Low", v: 79.8, c: T.teal }, { l: "Moderate", v: 16.1, c: T.amber }, { l: "High", v: 4.1, c: T.red }] },
  { label: "Behaviour",   data: [{ l: "Low", v: 85.3, c: T.teal }, { l: "High", v: 14.7, c: T.red }] },
];

const interventionBundles = [
  { domain: "Language Delay", bundle: "Structured language activity bundle", intensity: "Daily 20-min sessions", icon: "🗣" },
  { domain: "Motor Delay", bundle: "Motor stimulation bundle", intensity: "Gross + fine motor exercises", icon: "🤸" },
  { domain: "Behaviour Risk", bundle: "Behaviour-focused plan", intensity: "Caregiver coaching + routines", icon: "🧩" },
  { domain: "Nutrition Risk", bundle: "WASH + nutrition protocol", intensity: "Diet tracking + supplementation", icon: "🥗" },
];

export default function InterventionPanel() {
  return (
    <div>
      {/* Intervention engine banner */}
      <div style={{
        background: `linear-gradient(135deg, ${T.teal}15, ${T.amber}10)`,
        border: `1px solid ${T.teal}30`,
        borderRadius: 14,
        padding: "16px 22px",
        marginBottom: 16,
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
      }}>
        <div style={{ fontSize: 28 }}>⚙️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.teal, marginBottom: 4 }}>
            Adaptive Intervention Recommendation Engine
          </div>
          <div style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.7, marginBottom: 10 }}>
            Analysis shows that the <strong>number of activities assigned does not strongly correlate with improvement (r = 0.1)</strong>.
            Static intervention mapping is insufficient. The Adaptive Engine uses a contextual bandit algorithm that learns which
            intervention intensity works best for each child profile — continuously improving recommendations based on Andhra data.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {interventionBundles.map(b => (
              <div key={b.domain} style={{ background: T.surface, borderRadius: 12, padding: "12px 14px", border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 18, marginBottom: 6 }}>{b.icon}</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: T.text, marginBottom: 3 }}>{b.domain}</div>
                <div style={{ fontSize: 10.5, color: T.teal, marginBottom: 2 }}>{b.bundle}</div>
                <div style={{ fontSize: 10, color: T.textDim }}>{b.intensity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* Nutrition */}
        <Card>
          <STitle tag="Nutrition Sheet" title="Nutrition Risk Indicators" color={T.amber} soft={T.amberSoft} />
          <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 14, lineHeight: 1.7 }}>
            Nutrition status is a key input to the UCRS model. Anemia and underweight status directly elevate composite risk scores and trigger nutrition-focused intervention bundles.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
            {[{ l: "High", n: 82, pct: "8.2%", c: T.red }, { l: "Medium", n: 465, pct: "46.5%", c: T.amber }, { l: "Low", n: 453, pct: "45.3%", c: T.teal }].map(r => (
              <div key={r.l} style={{ background: T.bg, borderRadius: 12, padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: T.textDim, marginBottom: 4 }}>{r.l} Risk</div>
                <div style={{ fontSize: 22, fontFamily: "'Georgia',serif", color: r.c, fontWeight: 700 }}>{r.pct}</div>
                <div style={{ fontSize: 10, color: T.textDim }}>{r.n} children</div>
              </div>
            ))}
          </div>
          {nutritionBars.map(d => (
            <div key={d.l} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: T.textMid }}>{d.l}</span>
                <span style={{ fontSize: 14, color: d.c, fontWeight: 700 }}>{d.pct}% <span style={{ fontSize: 11, color: T.textDim, fontWeight: 400 }}>({d.n})</span></span>
              </div>
              <PBar pct={d.pct * 3.5} color={d.c} h={7} />
            </div>
          ))}
          <InsightBox color={T.amber} soft={T.amberSoft}>
            <strong>Anemia at 26.8%</strong> is the most prevalent nutrition risk — a direct input to the UCRS escalation weighting model.
          </InsightBox>
        </Card>

        {/* Neuro-behavioral */}
        <Card>
          <STitle tag="Neuro-Behavioral Sheet" title="Neuro-Behavioral Risk Profile" color={T.purple} soft="#EDE9FF" />
          <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 14, lineHeight: 1.7 }}>
            Autism and ADHD risk scores are embedded in the UCRS as neuro-behavioral signals. High autism risk triggers an <strong>automatic fast-track referral</strong> regardless of overall score.
          </div>
          {neuroBehavioral.map(item => (
            <div key={item.label} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: T.textMid, fontWeight: 600, marginBottom: 7 }}>{item.label}</div>
              <div style={{ display: "flex", height: 28, borderRadius: 30, overflow: "hidden" }}>
                {item.data.map(seg => (
                  <div
                    key={seg.l}
                    title={`${seg.l}: ${seg.v}%`}
                    style={{ width: `${seg.v}%`, background: seg.c, display: "flex", alignItems: "center", justifyContent: "center", transition: "width 0.6s" }}
                  >
                    {seg.v > 10 && <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>{seg.v}%</span>}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                {item.data.map(seg => (
                  <div key={seg.l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: seg.c }} />
                    <span style={{ fontSize: 10.5, color: T.textDim }}>{seg.l}: {seg.v}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ padding: "12px 14px", background: T.bg, borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, textAlign: "center" }}>
            {[{ l: "Autism High Risk", n: 46, c: T.red }, { l: "ADHD High Risk", n: 41, c: T.red }, { l: "Behaviour High", n: 147, c: T.amber }].map(x => (
              <div key={x.l}>
                <div style={{ fontSize: 24, color: x.c, fontFamily: "'Georgia',serif", fontWeight: 700 }}>{x.n}</div>
                <div style={{ fontSize: 10, color: T.textDim }}>{x.l}</div>
              </div>
            ))}
          </div>
          <InsightBox color={T.purple} soft="#EDE9FF">
            <strong>46 children with high autism risk</strong> are flagged for fast-track specialist referral — bypassing standard SLA queue.
          </InsightBox>
        </Card>
      </div>

      {/* Home environment */}
      <Card>
        <STitle tag="Environment & Caregiving Sheet" title="Home Environment & WASH Indicators" color={T.green} soft={T.greenSoft} />
        <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 16, lineHeight: 1.7 }}>
          Home stimulation and caregiver engagement are critical inputs to the UCRS model. These environmental signals help the Adaptive Engine decide whether to prioritize caregiver coaching vs. direct child-level intervention.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
          {[
            { l: "Caregiver Engagement Medium", pct: "~60%", icon: "👩‍👦", c: T.amber, sub: "Needs coaching" },
            { l: "Language Exposure Adequate",  pct: "~55%", icon: "🗣",   c: T.blue,  sub: "Below target" },
            { l: "Play Materials Available",    pct: "~72%", icon: "🧸",   c: T.teal,  sub: "Relatively strong" },
            { l: "Safe Water Access",           pct: "~48%", icon: "💧",   c: T.blue,  sub: "Critical gap" },
            { l: "Toilet Facility",             pct: "~61%", icon: "🏠",   c: T.green, sub: "Moderate coverage" },
          ].map(item => (
            <div key={item.l} style={{ background: T.bg, borderRadius: 14, padding: "18px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 20, color: item.c, fontFamily: "'Georgia',serif", fontWeight: 700, marginBottom: 4 }}>{item.pct}</div>
              <div style={{ fontSize: 10.5, color: T.text, marginBottom: 4, fontWeight: 600, lineHeight: 1.4 }}>{item.l}</div>
              <div style={{ fontSize: 10, color: item.c, background: `${item.c}15`, borderRadius: 20, padding: "2px 8px", display: "inline-block" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
