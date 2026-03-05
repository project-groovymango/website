import { useState } from "react";

export default function StepTitle({ children, hoverText }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="step-title"
      onMouseEnter={() => hoverText && setHovered(true)}
      onMouseLeave={() => hoverText && setHovered(false)}
    >
      {hoverText && hovered ? hoverText : children}
    </div>
  );
}
