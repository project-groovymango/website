import { useState, useRef } from "react";
import "./styles/global.css";

import FadeIn from "./components/FadeIn";
import Faq from "./components/Faq";
import StepTitle from "./components/StepTitle";
import Tooltip from "./components/Tooltip";
import ToolsMarquee from "./components/ToolsMarquee";
import CalErrorBoundary from "./components/CalErrorBoundary";
import { LOGOS, FAQ_ITEMS, CASE_STUDIES, CAL_LINK } from "./data/content";
import frogWebp from "./assets/frog.webp";
import { MakeLogo } from "./components/iPaaSLogos";
import n8nLogo from "./assets/n8n-logo.svg";
import aminPhoto from "./assets/amin.webp";

const calAttrs = {
  "data-cal-namespace": "30min",
  "data-cal-link": CAL_LINK,
  "data-cal-config": '{"layout":"month_view"}',
};

export default function App() {
  const [workOpen, setWorkOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const [track, setTrack] = useState("audit");
  const calInitRef = useRef(false);
  const [calLoading, setCalLoading] = useState(false);
  const [calError, setCalError] = useState(false);

  async function initCal() {
    if (calInitRef.current) return;
    setCalLoading(true);
    try {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      calInitRef.current = true;
    } catch (err) {
      console.error("Cal.com embed failed to load:", err);
      setCalError(true);
    } finally {
      setCalLoading(false);
    }
  }

  const visibleCases = CASE_STUDIES.filter(c => c.visible);
  const hiddenCases = CASE_STUDIES.filter(c => !c.visible);

  return (
    <>
      <Tooltip tooltip={tooltip} />

      <CalErrorBoundary>
      <div className="banner">
        Book a free automation consultation —{" "}
        <a href={`https://cal.com/${CAL_LINK}`} target="_blank" rel="noreferrer">schedule a call →</a>
      </div>

      <div className="container">
        <main>

          <header className="hero">
            <div className="header">
              <div className="logo-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div className="logo">
                    <img src={frogWebp} alt="a2labs logo" width={48} height={48} style={{ width: "48px", height: "48px", position: "relative", top: "-6px" }} />
                  </div>
                  <h1>a2labs</h1>
                </div>
              </div>

              <p className="tagline">Workflow automation nerds who get high on things running efficiently. Help us get our fix, please.</p>
              <p className="description">
                We have been told you have a problem — you can't see a manual process without wanting to automate it. Whether you're an exec drowning in repetitive tasks or a business sitting on untapped opportunities, we're the nerds you didn't know you needed. We build automations in Make.com and n8n, and occasionally write code when those tools tap out. This was written by ChatGPT and it was so incredibly bad, we decided to keep it because we like to suffer.
              </p>
              <div className="quote">
                <p>"Yeahh... sometimes what they do is absolute wizardry."</p>
                <cite>— Wisse Dielesen</cite>
              </div>
            </div>

            {calError ? (
              <a href={`https://cal.com/${CAL_LINK}`} target="_blank" rel="noreferrer" className="cta-primary" style={{ cursor: "pointer", border: "none" }}>
                Book a free 15-min call (opens Cal.com) &rarr;
              </a>
            ) : (
              <button className="cta-primary" onClick={initCal} {...calAttrs} style={{ cursor: "pointer", border: "none" }}>
                Book a free 15-min call &rarr;
              </button>
            )}

            <div className="social-proof" style={{ marginTop: "20px" }}>
              <div className="logo-grid">
                {LOGOS.map(({ src, alt, dot, delay, cs, width }, i) => (
                  <div
                    className={`brand-logo${dot ? " has-dot" : ""}`}
                    key={i}
                    onMouseEnter={() => dot && setTooltip(cs)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {dot && <span className={`pulse-dot${delay ? " delay" : ""}`} />}
                    <img src={src} alt={alt} width={width} height={24} />
                  </div>
                ))}
              </div>
            </div>
          </header>

          <FadeIn>
            <section id="projects">
              <h2 className="section-label">Previous projects</h2>
              <p className="work-intro">Whilst our dear mothers still think we fix computers, this is what we actually do — if it has an API, we can help you automate or rethink the process.</p>

              <div className="case-list">
                {visibleCases.map(({ title, logo, logoAlt, logoWidth, desc }) => (
                  <div className="case-row" key={title}>
                    <div className="case-left">
                      <h3 className="case-title">{title}</h3>
                      <div className="case-logo"><img src={logo} alt={logoAlt} width={logoWidth} height={14} /></div>
                    </div>
                    <p className="case-desc">{desc}</p>
                  </div>
                ))}

                <div className={`case-more${workOpen ? " open" : ""}`}>
                  {hiddenCases.map(({ title, logo, logoAlt, logoWidth, desc }) => (
                    <div className="case-row" key={title}>
                      <div className="case-left">
                        <h3 className="case-title">{title}</h3>
                        <div className="case-logo"><img src={logo} alt={logoAlt} width={logoWidth} height={14} /></div>
                      </div>
                      <p className="case-desc">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="show-more-btn" onClick={() => setWorkOpen(prev => !prev)}>
                {workOpen ? "Show less ↑" : "Show more work ↓"}
              </button>
              {workOpen && (
                <p className="show-more-note">That's it, what did you expect? We just started.</p>
              )}
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="section-label">How it works</h2>

              <p className="toggle-intro">Two ways to work with us — depending on whether you already know what needs automating or need us to figure that out first.</p>

              <div className="toggle-wrap">
                <button className={`toggle-btn${track === "audit" ? " active" : ""}`} onClick={() => setTrack("audit")}>Process audit</button>
                <button className={`toggle-btn${track === "problem" ? " active" : ""}`} onClick={() => setTrack("problem")}>Specific problem</button>
              </div>

              <div className="toggle-content">
                <div className="toggle-pricing">{track === "audit" ? "Hourly" : "Project-based"}</div>

                {track === "audit" ? (
                  <div className="steps">
                    <div className="step">
                      <span className="step-num">1</span>
                      <div>
                        <h3 className="step-title">We audit your process</h3>
                        <div className="step-desc">We map out your entire workflow end-to-end, identify bottlenecks, and figure out what's worth automating.</div>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">2</span>
                      <div>
                        <h3 className="step-title">Prioritize by impact</h3>
                        <div className="step-desc">Not everything needs automating. We rank opportunities by time saved and complexity, then tackle the highest-impact ones first.</div>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">3</span>
                      <div>
                        <h3 className="step-title">Build and hand over</h3>
                        <div className="step-desc">We build the automations, connect your tools, document everything, and hand it over. You own it.</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="steps">
                    <div className="step">
                      <span className="step-num">1</span>
                      <div>
                        <h3 className="step-title">Tell us the problem</h3>
                        <div className="step-desc">You come to us with a specific task or bottleneck. We get on a call and understand exactly what needs solving.</div>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">2</span>
                      <div>
                        <h3 className="step-title">We scope and quote</h3>
                        <div className="step-desc">Fixed price, no surprises. We define the deliverable, timeline, and what "done" looks like before we start.</div>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">3</span>
                      <div>
                        <h3 className="step-title">Build and hand over</h3>
                        <div className="step-desc">We build it, test it, connect your tools, and deliver a working automation — documented and maintainable.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {calError ? (
                <a href={`https://cal.com/${CAL_LINK}`} target="_blank" rel="noreferrer" className="cta-primary" style={{ marginTop: "24px", cursor: "pointer", border: "none" }}>
                  Book a free 15-min call (opens Cal.com) &rarr;
                </a>
              ) : (
                <button className="cta-primary" onClick={initCal} {...calAttrs} style={{ marginTop: "24px", cursor: "pointer", border: "none" }}>
                  Book a free 15-min call &rarr;
                </button>
              )}
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="section-label">The team</h2>
              <div className="team-list">
                <div className="team-card">
                  <div className="team-img-wrap">
                    <img className="team-img" src={aminPhoto} alt="Amin Laanaya" width={256} height={256} loading="lazy" />
                  </div>
                  <div className="team-info">
                    <h3 className="team-name">Amin Laanaya</h3>
                    <div className="team-role">Automation engineer</div>
                    <div className="team-bio">Obsessive about process efficiency. Has automated everything from lead routing to his own morning routine. Probably has a workflow for this bio.</div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="section-label">FAQ</h2>
              <div className="faq">
                {FAQ_ITEMS.map(({ q, a }, i) => (
                  <Faq key={i} q={q} a={a}>
                    {q === "How do you make the automations?" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10, opacity: 0.5 }}>
                        <MakeLogo height={16} />
                        <img src={n8nLogo} alt="n8n" width={30} height={16} style={{ height: 16 }} />
                      </div>
                    )}
                    {q === "Which tools have you worked with?" && <ToolsMarquee />}
                  </Faq>
                ))}
              </div>
            </section>
          </FadeIn>

        </main>
      </div>

      <footer className="a2-footer">
        <div className="a2-footer-grid">
          <div className="a2-footer-cols">
            <div className="a2-footer-col">
              <div className="a2-footer-heading">Inquiries</div>
              <span>hello@a2labs.io</span>
              {calError ? (
                <a
                  href={`https://cal.com/${CAL_LINK}`}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-primary"
                  style={{ marginTop: "8px", padding: "7px 12px", fontSize: "12px", display: "inline-block", textAlign: "center", width: "auto", cursor: "pointer", border: "none" }}
                >
                  Book a call (opens Cal.com) &rarr;
                </a>
              ) : (
                <button
                  className="cta-primary"
                  onClick={initCal}
                  {...calAttrs}
                  style={{ marginTop: "8px", padding: "7px 12px", fontSize: "12px", display: "inline-block", textAlign: "center", width: "auto", cursor: "pointer", border: "none" }}
                >
                  Book a call
                </button>
              )}
            </div>
          </div>
          <div className="a2-footer-frog">
            <img src={frogWebp} alt="a2labs logo" width={96} height={96} style={{ width: "96px", height: "96px" }} />
          </div>
        </div>
        <p className="a2-footer-copy">© 2026 Laanaya Enterprises, LLC — hosting made possible by a2labs.io</p>
      </footer>
      </CalErrorBoundary>
    </>
  );
}
