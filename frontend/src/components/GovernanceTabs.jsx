import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, STitle, PBar, CTip, InsightBox } from "./UIComponents";
import { T, outcomeData, districtData } from "../data/mockData";

// ─── OUTCOMES TAB ────────────────────────────────────────────────────────────

export function OutcomesTab() {
  return (
    <div>
      {/* Headline */}
      <div style={{
        background: `linear-gradient(135deg, ${T.teal}15, ${T.blue}10)`,
        border: `1px solid ${T.teal}30`,
        borderRadius: 14,
        padding: "18px 22px",
        marginBottom: 16,
        display: "flex",
        gap: 32,
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.teal, marginBottom: 4, fontWeight: 600 }}>Current Improvement Rate</div>
          <div style={{ fontSize: 48, fontFamily: "'Georgia',serif", color: T.teal, fontWeight: 700, lineHeight: 1 }}>47.2%</div>
          <div style={{ fontSize: 13, color: T.textMid, marginTop: 4 }}>472 children showed improvement</div>
        </div>
        <div style={{ width: 1, height: 60, background: T.border }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 6 }}>The Outcome Gap — and Why Generic Follow-Up Isn't Enough</div>
          <div style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.8 }}>
            Nearly half of children show improvement — yet follow-up conducted does <strong>not automatically guarantee exit from high-risk status</strong>.
            Children with follow-up improved at ~51% vs ~45% without, a difference of just 6 points. The Adaptive Intervention Engine is designed to raise
            improvement rates to <strong style={{ color: T.teal }}>70%+</strong> through personalized, domain-targeted plans.
          </div>
        </div>
        <div style={{ textAlign: "center", background: T.surface, borderRadius: 14, padding: "16px 24px", border: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 11, color: T.textDim, marginBottom: 4 }}>12-Month Target</div>
          <div style={{ fontSize: 36, fontFamily: "'Georgia',serif", color: T.blue, fontWeight: 700 }}>70%+</div>
          <div style={{ fontSize: 11, color: T.textDim }}>improvement rate</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* Outcome distribution */}
        <Card>
          <STitle tag="Outcomes Sheet" title="Improvement Status — 1,000 Children" color={T.teal} soft={T.tealSoft} />
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <ResponsiveContainer width={148} height={148}>
              <PieChart>
                <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="v" strokeWidth={0}>
                  {outcomeData.map((d, i) => <Cell key={i} fill={d.c} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {outcomeData.map(d => (
                <div key={d.l} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: d.c }} />
                      <span style={{ fontSize: 12.5, color: T.textMid }}>{d.l}</span>
                    </div>
                    <span style={{ fontSize: 16, color: d.c, fontFamily: "'Georgia',serif", fontWeight: 700 }}>{d.pct}%</span>
                  </div>
                  <PBar pct={d.pct} color={d.c} h={6} />
                  <div style={{ fontSize: 10, color: T.textDim, marginTop: 2 }}>{d.v} children</div>
                </div>
              ))}
            </div>
          </div>
          <InsightBox color={T.amber} soft={T.amberSoft}>
            <strong>43% of children remain at the same status</strong> — this is the addressable improvement gap the Adaptive Engine targets through personalized intensity calibration.
          </InsightBox>
        </Card>

        {/* High-risk exit */}
        <Card>
          <STitle tag="High-Risk Exit" title="Exit High-Risk Status" color={T.blue} soft={T.blueSoft} />
          <div style={{ textAlign: "center", padding: "16px 0 12px" }}>
            <div style={{ fontSize: 11, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Current Exit Rate</div>
            <div style={{ fontSize: 56, fontFamily: "'Georgia',serif", color: T.red, lineHeight: 1, fontWeight: 700 }}>14.6%</div>
            <div style={{ fontSize: 12, color: T.textDim, marginTop: 6 }}>146 / 1,000 children exited high-risk</div>
          </div>
          <div style={{ height: 12, background: T.border, borderRadius: 99, overflow: "hidden", margin: "0 0 16px" }}>
            <div style={{ height: "100%", display: "flex", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: "14.6%", background: T.teal }} />
              <div style={{ flex: 1, background: "rgba(185,28,28,0.1)" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: T.tealSoft, borderRadius: 12, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: 28, color: T.teal, fontFamily: "'Georgia',serif", fontWeight: 700 }}>146</div>
              <div style={{ fontSize: 11, color: T.textDim }}>Exited Risk</div>
            </div>
            <div style={{ background: T.redSoft, borderRadius: 12, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: 28, color: T.red, fontFamily: "'Georgia',serif", fontWeight: 700 }}>854</div>
              <div style={{ fontSize: 11, color: T.textDim }}>Remain At Risk</div>
            </div>
          </div>
          <InsightBox color={T.amber} soft={T.amberSoft}>
            <strong>Target:</strong> 35% exit within 12 months — requires <strong style={{ color: T.text }}>203 more children</strong> to exit high-risk status.
          </InsightBox>
        </Card>
      </div>

      {/* Follow-up insight */}
      <Card>
        <STitle tag="Key Insight" title="Follow-Up Alone Does Not Guarantee Improvement" color={T.red} soft={T.redSoft} />
        <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 16, lineHeight: 1.7 }}>
          This finding from the EDA drives the core design of ECD-RIIP's Adaptive Recommendation Engine. If follow-up quality doesn't improve, volume alone won't achieve targets.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 14 }}>
          {[
            { l: "With Follow-up — Improved",    pct: "~51%", sub: "of 294 children with follow-up",    c: T.teal  },
            { l: "Without Follow-up — Improved", pct: "~45%", sub: "of 706 children without follow-up", c: T.amber },
            { l: "Activities vs Outcome Corr.",  pct: "Weak", sub: "r = 0.1 — very low correlation",    c: T.red   },
          ].map(item => (
            <div key={item.l} style={{ background: T.bg, borderRadius: 14, padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontFamily: "'Georgia',serif", color: item.c, marginBottom: 8, fontWeight: 700 }}>{item.pct}</div>
              <div style={{ fontSize: 12.5, color: T.text, marginBottom: 6, fontWeight: 600 }}>{item.l}</div>
              <div style={{ fontSize: 11, color: T.textDim }}>{item.sub}</div>
            </div>
          ))}
        </div>
        <InsightBox color={T.amber} soft={T.amberSoft}>
          <strong>Implication:</strong> Static intervention mapping is insufficient. The Adaptive Recommendation Engine (contextual bandit) learns which intervention intensity works best per child profile — targeting improvement from 47.2% to 70%+
        </InsightBox>
      </Card>
    </div>
  );
}

// ─── DISTRICTS TAB ───────────────────────────────────────────────────────────

export function DistrictsTab() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${T.navy}15, ${T.blueSoft})`,
        border: `1px solid ${T.navy}20`,
        borderRadius: 14,
        padding: "18px 22px",
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.navy, marginBottom: 6 }}>
          District-Level Governance Intelligence — 4 Districts, Andhra Pradesh
        </div>
        <div style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.7 }}>
          The State ECD Intelligence Hub enables real-time inter-district benchmarking. District authorities gain data-driven resource allocation insights —
          moving from anecdotal assessments to <strong>measurable performance metrics</strong>. Click any district card to highlight it in the comparison chart.
        </div>
      </div>

      <Card style={{ marginBottom: 14 }}>
        <STitle tag="4 Districts · 3 Mandals" title="District Performance — Andhra Pradesh" color={T.navy} soft={T.blueSoft} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {districtData.map(d => (
            <div
              key={d.district}
              onClick={() => setSel(sel === d.district ? null : d.district)}
              style={{
                background: sel === d.district ? T.blueSoft : T.bg,
                borderRadius: 14,
                padding: "18px",
                cursor: "pointer",
                transition: "all 0.2s",
                border: `2px solid ${sel === d.district ? T.blue : T.border}`,
                borderTop: `4px solid ${d.exitRate >= 16 ? T.teal : d.exitRate >= 14 ? T.amber : T.red}`,
              }}
            >
              <div style={{ fontSize: 14, color: T.text, fontWeight: 700, marginBottom: 2 }}>{d.district}</div>
              <div style={{ fontSize: 10, color: T.textDim, marginBottom: 10 }}>
                Performance tier: <span style={{ color: d.exitRate >= 16 ? T.teal : d.exitRate >= 14 ? T.amber : T.red, fontWeight: 600 }}>
                  {d.exitRate >= 16 ? "Leading" : d.exitRate >= 14 ? "Average" : "Needs attention"}
                </span>
              </div>
              <div style={{ fontSize: 28, fontFamily: "'Georgia',serif", color: T.navy, fontWeight: 700, marginBottom: 14 }}>
                {d.n} <span style={{ fontSize: 12, color: T.textDim, fontWeight: 400 }}>children</span>
              </div>
              {[{ l: "Exit Rate", v: d.exitRate, c: T.teal }, { l: "Improvement", v: d.improvement, c: T.blue }, { l: "Pending", v: d.pending, c: T.red }].map(m => (
                <div key={m.l} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 10.5, color: T.textDim }}>{m.l}</span>
                    <span style={{ fontSize: 12, color: m.c, fontWeight: 700 }}>{m.v}%</span>
                  </div>
                  <PBar pct={m.v} color={m.c} h={4} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <STitle tag="Benchmark" title="District Comparison Chart" color={T.teal} soft={T.tealSoft} />
        <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 14, lineHeight: 1.7 }}>
          Cross-district benchmarking reveals structural patterns: Chittoor leads on exit rates while Visakhapatnam has the highest pending referral backlog. ECD-RIIP enables district-level resource reallocation based on these real-time performance signals.
        </div>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={districtData} barSize={20} barCategoryGap="35%">
            <XAxis dataKey="district" tick={{ fill: T.textDim, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CTip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: T.textMid }} />
            <Bar dataKey="exitRate"    name="Exit Rate %"    fill={T.teal}  radius={[6, 6, 0, 0]} />
            <Bar dataKey="improvement" name="Improvement %"  fill={T.blue}  radius={[6, 6, 0, 0]} />
            <Bar dataKey="pending"     name="Pending Ref. %" fill={T.red}   radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 14 }}>
          <div style={{ padding: "12px 16px", background: T.tealSoft, borderRadius: 12, fontSize: 13, color: T.teal }}>
            <strong>Best Exit Rate:</strong> Chittoor — 17% · Strong follow-up adherence
          </div>
          <div style={{ padding: "12px 16px", background: T.redSoft, borderRadius: 12, fontSize: 13, color: T.red }}>
            <strong>Highest Pending:</strong> Visakhapatnam — 54% · SLA enforcement priority
          </div>
          <div style={{ padding: "12px 16px", background: T.blueSoft, borderRadius: 12, fontSize: 13, color: T.blue }}>
            <strong>Best Improvement:</strong> Chittoor — 49% · Model for replication
          </div>
        </div>
      </Card>
    </div>
  );
}
