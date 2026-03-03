import { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, AreaChart, Area, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, STitle, PBar, CTip, InsightBox } from "./UIComponents";
import { T, KPI, riskDist, trendData } from "../data/mockData";

function KPICard({ k, animated }) {
  return (
    <Card style={{ padding: 20, borderTop: `3px solid ${k.color}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, color: T.textMid, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600, maxWidth: 120, lineHeight: 1.5 }}>
          {k.label}
        </div>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: k.soft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
          {k.icon}
        </div>
      </div>
      <div style={{ fontSize: 36, fontFamily: "'Georgia',serif", color: k.color, lineHeight: 1, marginBottom: 4, fontWeight: 700 }}>
        {k.current}<span style={{ fontSize: 15 }}>{k.unit}</span>
      </div>
      <div style={{ fontSize: 11, color: T.textDim, marginBottom: 10 }}>{k.raw}</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: T.textDim }}>Current baseline</span>
        <span style={{ fontSize: 11, color: k.color, fontWeight: 600 }}>Target: {k.target}{k.unit}</span>
      </div>
      <PBar pct={animated ? k.current : 0} color={k.color} />
      <div style={{ marginTop: 8, fontSize: 10.5, color: T.textDim }}>
        Gap to close: <strong style={{ color: k.color }}>{Math.abs(k.target - k.current).toFixed(1)}{k.unit}</strong>
      </div>
    </Card>
  );
}

export default function UCRSPanel() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 150); }, []);

  return (
    <div>
      {/* Mission banner */}
      <div style={{
        background: `linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 100%)`,
        borderRadius: 16,
        padding: "22px 28px",
        marginBottom: 16,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>
            ECD-RIIP · Phase 1 · Andhra Pradesh
          </div>
          <div style={{ fontSize: 20, fontFamily: "'Georgia',serif", fontWeight: 700, marginBottom: 8 }}>
            Early Childhood Development — Risk Intelligence & Intervention Platform
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 680 }}>
            An AI-powered governance layer over ICDS and RBSK workflows. Integrating 14+ child-level risk dimensions into a{" "}
            <strong style={{ color: "#fff" }}>Unified Child Risk Score (UCRS)</strong> — shifting Andhra Pradesh from reactive identification to proactive, personalized intervention.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, minWidth: 200 }}>
          {[{ l: "Children Tracked", v: "1,000" }, { l: "Data Dimensions", v: "14+" }, { l: "Districts", v: "4" }, { l: "Model Phase", v: "Pilot" }].map(x => (
            <div key={x.l} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Georgia',serif" }}>{x.v}</div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{x.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 16 }}>
        {KPI.map(k => <KPICard key={k.label} k={k} animated={animated} />)}
      </div>

      {/* Risk distribution + cycles */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 14, marginBottom: 14 }}>
        <Card>
          <STitle tag="Baseline Risk Output" title="Child Risk Distribution — 1,000 Children" />
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <ResponsiveContainer width={165} height={165}>
              <PieChart>
                <Pie data={riskDist} cx="50%" cy="50%" innerRadius={46} outerRadius={70} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {riskDist.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {riskDist.map(d => (
                <div key={d.name} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.color }} />
                      <span style={{ fontSize: 13, color: T.textMid }}>{d.name}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 20, color: d.color, fontFamily: "'Georgia',serif", fontWeight: 700 }}>{d.value}%</span>
                      <span style={{ fontSize: 10, color: T.textDim, display: "block" }}>{d.n} children</span>
                    </div>
                  </div>
                  <PBar pct={d.value} color={d.color} h={5} />
                </div>
              ))}
              <div style={{ marginTop: 12, padding: "10px 14px", background: T.blueSoft, borderRadius: 10, fontSize: 11.5, color: T.textMid, lineHeight: 1.9 }}>
                Mean Composite DQ: <strong style={{ color: T.teal }}>94.9</strong> &nbsp;·&nbsp; Any domain delay: <strong style={{ color: T.red }}>52.4%</strong>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <STitle tag="Registration" title="Cycles & Demographics" color={T.blue} soft={T.blueSoft} />
          <div style={{ fontSize: 12, color: T.textDim, marginBottom: 14, lineHeight: 1.6 }}>
            Children assessed across three screening cycles — baseline, follow-up, and re-screen — under ICDS-CAS protocol.
          </div>
          {[{ l: "Baseline", n: 580, pct: 58, c: T.navy }, { l: "Follow-up", n: 317, pct: 31.7, c: T.teal }, { l: "Re-screen", n: 103, pct: 10.3, c: T.amber }].map(c => (
            <div key={c.l} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: T.textMid }}>{c.l}</span>
                <span style={{ fontSize: 13, color: c.c, fontWeight: 600 }}>{c.n} <span style={{ color: T.textDim, fontWeight: 400 }}>({c.pct}%)</span></span>
              </div>
              <PBar pct={c.pct} color={c.c} />
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
            {[{ l: "Male", n: 518, pct: "51.8%", c: T.blue }, { l: "Female", n: 482, pct: "48.2%", c: T.purple }].map(g => (
              <div key={g.l} style={{ background: T.bg, borderRadius: 12, padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: T.textDim, marginBottom: 4 }}>{g.l}</div>
                <div style={{ fontSize: 22, fontFamily: "'Georgia',serif", color: g.c, fontWeight: 700 }}>{g.pct}</div>
                <div style={{ fontSize: 10, color: T.textDim }}>{g.n} children</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Trend chart */}
      <Card>
        <STitle tag="12-Month Projection" title="Key Metrics Trajectory — Baseline to Target" color={T.navy} soft={T.blueSoft} />
        <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 14, lineHeight: 1.7 }}>
          ECD-RIIP's adaptive engine is projected to more than double the high-risk exit rate, raise improvement rates to 70%+, and slash pending referrals from 51% to under 5% within 12 months through systematic SLA enforcement and personalized intervention.
        </div>
        <ResponsiveContainer width="100%" height={210}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="gt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={T.teal} stopOpacity={0.15} />
                <stop offset="95%" stopColor={T.teal} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={T.blue} stopOpacity={0.15} />
                <stop offset="95%" stopColor={T.blue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="m" tick={{ fill: T.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CTip />} />
            <Area type="monotone" dataKey="exit" name="Exit High-Risk %" stroke={T.teal} fill="url(#gt)" strokeWidth={2.5} dot={{ fill: T.teal, r: 4, strokeWidth: 0 }} />
            <Area type="monotone" dataKey="impr" name="Improvement %" stroke={T.blue} fill="url(#gb)" strokeWidth={2.5} dot={{ fill: T.blue, r: 4, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="pend" name="Pending Ref. %" stroke={T.red} strokeWidth={2} strokeDasharray="5 4" dot={{ fill: T.red, r: 4, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 24, marginTop: 10 }}>
          {[{ l: "Exit High-Risk %", c: T.teal }, { l: "Improvement %", c: T.blue }, { l: "Pending Referrals %", c: T.red }].map(x => (
            <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 18, height: 3, background: x.c, borderRadius: 2 }} />
              <span style={{ fontSize: 11, color: T.textMid }}>{x.l}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
