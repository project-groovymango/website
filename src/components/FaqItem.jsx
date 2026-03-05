import { useState } from "react";

export default function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" onClick={() => setOpen(o => !o)}>
      <div className={`faq-q${open ? " open" : ""}`}>
        <span className={`faq-chevron${open ? " open" : ""}`}>&gt;</span>
        {q}
      </div>
      <div className={`faq-a${open ? " open" : ""}`}>{a}</div>
    </div>
  );
}
