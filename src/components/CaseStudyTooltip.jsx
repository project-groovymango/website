import { useState, useEffect } from "react";

export default function CaseStudyTooltip({ tooltip }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!tooltip) return;
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [tooltip]);

  return (
    <div
      className={`case-tooltip${tooltip ? " visible" : ""}`}
      style={{ left: pos.x + 16, top: pos.y + 16 }}
    >
      {tooltip && (
        <>
          <div className="case-tooltip-body">{tooltip.body}</div>
          <hr className="case-tooltip-divider" />
          <div className="case-tooltip-person">
            <div className="case-tooltip-avatar">
              {tooltip.person.photo
                ? <img src={tooltip.person.photo} alt={tooltip.person.name} />
                : tooltip.person.emoji}
            </div>
            <div>
              <div className="case-tooltip-person-name">{tooltip.person.name}</div>
              <div className="case-tooltip-person-role">{tooltip.person.role}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
