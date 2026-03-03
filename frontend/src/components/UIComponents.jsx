import { T } from "../data/mockData";

export function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: T.surface,
        borderRadius: 16,
        boxShadow: T.shadow,
        padding: 22,
        border: `1px solid ${T.border}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ children, color = T.teal, soft = T.tealSoft }) {
  return (
    <span
      style={{
        fontSize: 10,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        color,
        background: soft,
        padding: "4px 12px",
        borderRadius: 20,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

export function STitle({ tag, title, color = T.teal, soft = T.tealSoft }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <Badge color={color} soft={soft}>{tag}</Badge>
      <div
        style={{
          fontSize: 17,
          fontFamily: "'Georgia',serif",
          color: T.text,
          marginTop: 8,
          fontWeight: 700,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>
    </div>
  );
}

export function PBar({ pct, color, h = 6 }) {
  return (
    <div
      style={{
        height: h,
        background: T.border,
        borderRadius: 99,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.min(pct, 100)}%`,
          background: color,
          borderRadius: 99,
          transition: "width 0.8s ease",
        }}
      />
    </div>
  );
}

export function CTip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        padding: "10px 14px",
        boxShadow: T.shadowMd,
        fontSize: 12,
      }}
    >
      <div style={{ color: T.textMid, marginBottom: 5, fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginTop: 2 }}>
          {p.name}: <strong>{p.value}%</strong>
        </div>
      ))}
    </div>
  );
}

export function InsightBox({ color, soft, children }) {
  return (
    <div
      style={{
        padding: "13px 16px",
        background: soft,
        borderRadius: 12,
        fontSize: 13,
        color,
        lineHeight: 1.7,
        marginTop: 12,
      }}
    >
      {children}
    </div>
  );
}

export function StatPill({ label, value, color, soft }) {
  return (
    <div
      style={{
        background: soft,
        borderRadius: 12,
        padding: "14px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 28,
          color,
          fontFamily: "'Georgia',serif",
          fontWeight: 700,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: T.textDim, marginTop: 3 }}>{label}</div>
    </div>
  );
}
