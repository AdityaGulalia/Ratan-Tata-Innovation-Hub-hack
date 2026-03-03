import {
  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, STitle, PBar, CTip, InsightBox } from "./UIComponents";
import { T, delayDomains, numDelays, dqData } from "../data/mockData";

export default function EscalationPanel() {
  return (
    <div>
      {/* Context banner */}
      <div style={{
        background: T.redSoft,
        border: `1px solid ${T.red}22`,
        borderRadius: 14,
        padding: "16px 22px",
        marginBottom: 16,
        display: "flex",
        gap: 20,
        alignItems: "center",
      }}>
        <div style={{ fontSize: 28 }}>🧠</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.red, marginBottom: 4 }}>
            Developmental Delay Analysis — 524 of 1,000 Children Affected
          </div>
          <div style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.7 }}>
            The Predictive Escalation Engine tracks developmental quotients (DQ) across five domains. A DQ below 85 flags a delay threshold.
            The UCRS model identifies children at risk of <strong>escalating from Low/Medium → High risk within 60 days</strong>, enabling pre-emptive referral before crises develop.
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* Domain delays */}
        <Card>
          <STitle tag="Developmental Risk Sheet" title="Delays by Domain — 524 Children (52.4%)" color={T.red} soft={T.redSoft} />
          <InsightBox color={T.red} soft={T.redSoft}>
            Language delay is the <strong>most prevalent</strong> at 18.2%, followed by Gross Motor (14.6%). These domains are the primary triggers for the Adaptive Intervention Engine's language and motor stimulation bundles.
          </InsightBox>
          <div style={{ marginTop: 16 }}>
            {delayDomains.map(d => (
              <div key={d.domain} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: T.textMid }}>{d.domain}</span>
                  <span style={{ fontSize: 14, color: d.color, fontWeight: 700 }}>
                    {d.pct}% <span style={{ fontSize: 11, color: T.textDim, fontWeight: 400 }}>({d.n} children)</span>
                  </span>
                </div>
                <PBar pct={d.pct * 4} color={d.color} h={8} />
                <div style={{ fontSize: 10.5, color: T.textDim, marginTop: 3 }}>
                  Intervention: {d.domain.includes("Language") ? "Language stimulation bundle" :
                    d.domain.includes("Motor") ? "Motor stimulation bundle" :
                    d.domain.includes("Social") ? "Behaviour-focused plan" :
                    d.domain.includes("Fine") ? "Fine motor activity pack" : "Cognitive enrichment plan"}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Concurrent delays */}
        <Card>
          <STitle tag="Severity" title="Concurrent Domain Delays" color={T.amber} soft={T.amberSoft} />
          <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 14, lineHeight: 1.7 }}>
            Children with multiple concurrent domain delays require escalated intervention intensity. The UCRS model weights multi-domain delay as a high-priority escalation signal.
          </div>
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={numDelays} barSize={46} barCategoryGap="30%">
              <XAxis dataKey="d" tick={{ fill: T.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: T.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CTip />} />
              <Bar dataKey="n" name="Children" radius={[8, 8, 0, 0]}>
                {numDelays.map((_, i) => <Cell key={i} fill={[T.teal, T.amber, T.red, "#991B1B"][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 10 }}>
            {numDelays.map((d, i) => (
              <div key={d.d} style={{ background: T.bg, borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontFamily: "'Georgia',serif", color: [T.teal, T.amber, T.red, "#991B1B"][i], fontWeight: 700 }}>{d.pct}%</div>
                <div style={{ fontSize: 10, color: T.textDim, marginTop: 2 }}>{d.d}</div>
                <div style={{ fontSize: 10, color: T.textDim }}>{d.n} children</div>
              </div>
            ))}
          </div>
          <InsightBox color={T.amber} soft={T.amberSoft}>
            <strong>13.9% of children</strong> have 2 or more concurrent delays — these are highest priority for escalation engine targeting.
          </InsightBox>
        </Card>
      </div>

      {/* DQ by domain */}
      <Card>
        <STitle tag="Assessment Sheet" title="Mean Developmental Quotient (DQ) by Domain — Composite DQ: 94.9" color={T.navy} soft={T.blueSoft} />
        <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 14, lineHeight: 1.7 }}>
          DQ scores measure a child's developmental age relative to chronological age. A score below <strong style={{ color: T.red }}>85 marks the delay threshold</strong>.
          The Escalation Engine monitors DQ trends cycle-over-cycle — a dropping DQ is the primary trigger for the 48-hour high-risk response pathway.
        </div>
        <ResponsiveContainer width="100%" height={210}>
          <BarChart data={dqData} barSize={52} barCategoryGap="25%">
            <XAxis dataKey="d" tick={{ fill: T.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[85, 100]} tick={{ fill: T.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CTip />} />
            <Bar dataKey="dq" name="Mean DQ" radius={[8, 8, 0, 0]}>
              {dqData.map((d, i) => <Cell key={i} fill={d.c} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 14 }}>
          <div style={{ padding: "12px 16px", background: T.redSoft, borderRadius: 12, fontSize: 13, color: T.red }}>
            <strong>Language DQ 91.2</strong> — weakest domain, highest intervention priority
          </div>
          <div style={{ padding: "12px 16px", background: T.amberSoft, borderRadius: 12, fontSize: 13, color: T.amber }}>
            <strong>64 children (6.4%)</strong> below composite DQ threshold of 85
          </div>
          <div style={{ padding: "12px 16px", background: T.tealSoft, borderRadius: 12, fontSize: 13, color: T.teal }}>
            <strong>Cognitive DQ 96.4</strong> — strongest domain, lowest delay rate
          </div>
        </div>

        {/* Escalation engine explainer */}
        <div style={{
          marginTop: 16,
          padding: "16px 20px",
          background: `linear-gradient(135deg, ${T.navy}08, ${T.blueSoft})`,
          borderRadius: 14,
          border: `1px solid ${T.border}`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            How the Predictive Escalation Engine Works
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {[
              { step: "1", label: "DQ Trend Input", desc: "Tracks domain DQ change across cycles" },
              { step: "2", label: "Caregiver Signal", desc: "Monitors engagement & nutrition trajectory" },
              { step: "3", label: "Binary Output", desc: "Escalation risk flag + confidence score" },
              { step: "4", label: "Pre-emptive Action", desc: "Triggers referral before risk escalates" },
            ].map(s => (
              <div key={s.step} style={{ textAlign: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.navy, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{s.step}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: T.text, marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 10.5, color: T.textDim, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
