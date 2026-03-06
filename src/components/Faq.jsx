import { useState, useEffect } from "react";

export default function Faq({ q, a, children, forceOpen }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (forceOpen && !open) setOpen(true);
  }, [forceOpen]);

  return (
    <div className="faq-item" onClick={() => setOpen(o => !o)}>
      <div className={`faq-q${open ? " open" : ""}`}>
        <span className={`faq-chevron${open ? " open" : ""}`}>&gt;</span>
        {q}
      </div>
      <div className={`faq-a${open ? " open" : ""}`}>{a}{children}</div>
    </div>
  );
}
