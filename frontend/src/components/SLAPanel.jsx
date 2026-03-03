import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, STitle, PBar, InsightBox } from "./UIComponents";
import { T, referralStatus } from "../data/mockData";

const slaRules = [
  { cat: "High Risk",          sla: "48-hour response", c: T.red,   note: "Auto-escalate AWW → Supervisor → CDPO. Specialist referral triggered.", urgency: "CRITICAL" },
  { cat: "Medium + Worsening", sla: "7-day window",     c: T.amber, note: "Close monitoring, caregiver counselling, structured follow-up plan.", urgency: "ELEVATED" },
  { cat: "Low / Stable",       sla: "Routine cycle",    c: T.teal,  note: "AWW-level routine monitoring, scheduled reassessment.", urgency: "ROUTINE" },
];

const escalationPath = [
  { role: "AWW", desc: "Anganwadi Worker — front-line assessment & intervention", color: T.teal },
  { role: "Supervisor", desc: "Mandal Supervisor — SLA monitoring & AWW support", color: T.amber },
  { role: "CDPO", desc: "Child Dev. Project Officer — district coordination & escalations", color: T.red },
];

export default function SLAPanel() {
  const [hoveredSLA, setHoveredSLA] = useState(null);

  return (
    <div>
      {/* Critical gap banner */}
      <div style={{
        background: `linear-gradient(135deg, ${T.red}18, ${T.amber}10)`,
        border: `1px solid ${T.red}30`,
        borderRadius: 14,
        padding: "18px 22px",
        marginBottom: 16,
        display: "flex",
        gap: 32,
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.red, marginBottom: 4, fontWeight: 600 }}>Critical System Gap</div>
          <div style={{ fontSize: 48, fontFamily: "'Georgia',serif", color: T.red, fontWeight: 700, lineHeight: 1 }}>51.3%</div>
          <div style={{ fontSize: 13, color: T.textMid, marginTop: 4 }}>of referrals remain <strong>pending</strong> with no action</div>
        </div>
        <div style={{ width: 1, height: 60, background: T.border }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 6 }}>Why the Smart Referral & SLA Engine exists</div>
          <div style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.8 }}>
            The current system records referrals but does not systematically enforce follow-through. 263 referrals were triggered but <strong>513 remain pending system-wide</strong>.
            The SLA Engine automates response timelines, generates daily pending lists, and escalates through a structured AWW → Supervisor → CDPO chain.
            <br /><strong style={{ color: T.teal }}>Target: Reduce pending referrals from 51.3% → under 5% within 12 months.</strong>
          </div>
        </div>
        <div style={{ textAlign: "center", background: T.surface, borderRadius: 14, padding: "16px 24px", border: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 11, color: T.textDim, marginBottom: 4 }}>Target State</div>
          <div style={{ fontSize: 36, fontFamily: "'Georgia',serif", color: T.teal, fontWeight: 700 }}>&lt;5%</div>
          <div style={{ fontSize: 11, color: T.textDim }}>pending referrals</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* Referral status */}
        <Card>
          <STitle tag="Referral Action Sheet" title="Referral Status — 1,000 Children" color={T.amber} soft={T.amberSoft} />
          <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 16 }}>
            <ResponsiveContainer width={148} height={148}>
              <PieChart>
                <Pie data={referralStatus} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="v" strokeWidth={0}>
                  {referralStatus.map((d, i) => <Cell key={i} fill={d.c} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {referralStatus.map(d => (
                <div key={d.s} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: d.c }} />
                      <span style={{ fontSize: 12.5, color: T.textMid }}>{d.s}</span>
                    </div>
                    <span style={{ fontSize: 15, color: d.c, fontFamily: "'Georgia',serif", fontWeight: 700 }}>{d.pct}%</span>
                  </div>
                  <PBar pct={d.pct} color={d.c} h={6} />
                  <div style={{ fontSize: 10, color: T.textDim, marginTop: 2 }}>{d.v} cases</div>
                </div>
              ))}
            </div>
          </div>
          <InsightBox color={T.red} soft={T.redSoft}>
            <strong>Critical Gap:</strong> 263 referrals were triggered — yet <strong>513 remain pending</strong> across the system. Without SLA enforcement, referrals accumulate without action.
          </InsightBox>
        </Card>

        {/* SLA Engine */}
        <Card>
          <STitle tag="SLA Engine" title="Escalation Path & Response Logic" color={T.navy} soft={T.blueSoft} />
          <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 14, lineHeight: 1.7 }}>
            Response timelines are determined by the child's current UCRS tier. Hover over a tier to see escalation details.
          </div>
          {slaRules.map(s => (
            <div
              key={s.cat}
              onMouseEnter={() => setHoveredSLA(s.cat)}
              onMouseLeave={() => setHoveredSLA(null)}
              style={{
                padding: "14px 16px",
                marginBottom: 10,
                borderRadius: 12,
                background: hoveredSLA === s.cat ? `${s.c}08` : T.bg,
                borderLeft: `4px solid ${s.c}`,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: s.c, background: `${s.c}15`, borderRadius: 20, padding: "2px 8px", letterSpacing: "0.1em" }}>{s.urgency}</span>
                    <span style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{s.cat}</span>
                  </div>
                  <div style={{ fontSize: 11, color: T.textDim }}>{s.note}</div>
                </div>
                <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: "4px 14px", color: s.c, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", marginLeft: 10 }}>{s.sla}</div>
              </div>
            </div>
          ))}

          {/* Escalation chain */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, fontWeight: 600 }}>Escalation Chain</div>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {escalationPath.map((r, i) => (
                <div key={r.role} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{
                    flex: 1,
                    padding: "12px 14px",
                    background: T.bg,
                    borderRadius: 10,
                    borderTop: `3px solid ${r.color}`,
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: r.color }}>{i + 1}. {r.role}</div>
                    <div style={{ fontSize: 10, color: T.textDim, marginTop: 3, lineHeight: 1.5 }}>{r.desc}</div>
                  </div>
                  {i < escalationPath.length - 1 && (
                    <div style={{ fontSize: 18, color: T.textDim, padding: "0 6px" }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <InsightBox color={T.teal} soft={T.tealSoft}>
            <strong>Target:</strong> Pending referrals reduced from 51.3% to under 5% through automated SLA tracking and structured escalation.
          </InsightBox>
        </Card>
      </div>

      {/* Follow-up & intervention */}
      <Card>
        <STitle tag="Follow-Up Sheet" title="Follow-Up Rates and Intervention Distribution" color={T.teal} soft={T.tealSoft} />
        <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 16, lineHeight: 1.7 }}>
          Currently, <strong>70.6% of children had no follow-up conducted</strong> after initial assessment — a structural gap that the SLA engine directly closes by enforcing mandatory response windows.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 14 }}>Follow-Up Conducted</div>
            {[{ l: "Follow-up Done", pct: 29.4, n: 294, c: T.teal }, { l: "No Follow-up", pct: 70.6, n: 706, c: T.red }].map(d => (
              <div key={d.l} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: T.textMid }}>{d.l}</span>
                  <span style={{ fontSize: 14, color: d.c, fontWeight: 700 }}>{d.pct}%</span>
                </div>
                <PBar pct={d.pct} color={d.c} h={8} />
                <div style={{ fontSize: 11, color: T.textDim, marginTop: 2 }}>{d.n} children</div>
              </div>
            ))}
            <InsightBox color={T.red} soft={T.redSoft}>
              706 children (70.6%) had no follow-up. SLA enforcement mandates follow-up within defined windows for all risk tiers.
            </InsightBox>
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 14 }}>Intervention Type Distribution</div>
            {[{ l: "AWW Intervention", n: 350, c: T.teal, desc: "Home-based activity sessions conducted by AWW" }, { l: "PHC Referral", n: 340, c: T.blue, desc: "Referred to Primary Health Centre for medical assessment" }, { l: "Parent Counselling", n: 310, c: T.amber, desc: "Structured caregiver education and home guidance" }].map(d => (
              <div key={d.l} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: T.textMid }}>{d.l}</span>
                  <span style={{ fontSize: 14, color: d.c, fontWeight: 700 }}>{d.n} <span style={{ fontSize: 10, color: T.textDim, fontWeight: 400 }}>children</span></span>
                </div>
                <PBar pct={(d.n / 1000) * 100} color={d.c} h={7} />
                <div style={{ fontSize: 10.5, color: T.textDim, marginTop: 3 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
