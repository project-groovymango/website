import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
import n8nLogo from "./assets/N8n-logo-new.svg";
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

  const [faqAutoOpen, setFaqAutoOpen] = useState(-1);
  const faqTimerRef = useRef(null);
  const faqTriggeredRef = useRef(false);

  useEffect(() => {
    function onScroll() {
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (atBottom && !faqTriggeredRef.current) {
        if (!faqTimerRef.current) {
          faqTimerRef.current = setTimeout(() => {
            faqTriggeredRef.current = true;
            FAQ_ITEMS.forEach((_, i) => {
              setTimeout(() => setFaqAutoOpen(i), i * 3000);
            });
          }, 3000);
        }
      } else if (!atBottom && !faqTriggeredRef.current) {
        clearTimeout(faqTimerRef.current);
        faqTimerRef.current = null;
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(faqTimerRef.current); };
  }, []);

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
                    <img src={frogWebp} alt="a2labs logo" width={313} height={350} style={{ width: "48px", height: "auto", position: "relative", top: "-6px" }} />
                  </div>
                  <h1>a2labs</h1>
                </div>
              </div>

              <p className="tagline">Automate, automate, automate — we're nerds who get high on things running efficiently. Help us get our fix, please.</p>
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
              <h2 className="section-label">The "team"</h2>
              <div className="team-list">
                <div className="team-card">
                  <div className="team-img-wrap">
                    <img className="team-img" src={aminPhoto} alt="Amin Laanaya" width={256} height={256} loading="lazy" />
                  </div>
                  <div className="team-info">
                    <h3 className="team-name">Amin Laanaya</h3>
                    <div className="team-role">Automation engineer</div>
                    <div className="team-bio">Previously the owner of go-to-market tech stacks, being responsible for designing, implementing and maintaining business processes and automations, optimizing the productivity of organizations. Now sharing my passion.</div>
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
                  <Faq key={i} q={q} a={a} forceOpen={faqAutoOpen >= i}>
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
              <div className="a2-footer-heading">Resources</div>
              <a href="#">Terms</a>
              <a href="#">Privacy Policy</a>
              <div className="a2-footer-socials">
                <a href="#" target="_blank" rel="noreferrer" aria-label="Slack"><svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor"><path d="M94.12 315.1c0 25.9-21.16 47.06-47.06 47.06S0 341 0 315.1c0-25.9 21.16-47.06 47.06-47.06h47.06v47.06zm23.72 0c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06v117.84c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V315.1zm47.06-221.22c-25.9 0-47.06-21.16-47.06-47.06S139 0 164.9 0s47.06 21.16 47.06 47.06v47.06H164.9zm0 23.72c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H47.06C21.16 211.72 0 190.56 0 164.66s21.16-47.06 47.06-47.06H164.9zm221.22 47.06c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06-21.16 47.06-47.06 47.06h-47.06v-47.06zm-23.72 0c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V47.06C268.18 21.16 289.34 0 315.24 0s47.06 21.16 47.06 47.06v117.84zm-47.06 221.22c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06-47.06-21.16-47.06-47.06v-47.06h47.06zm0-23.72c-25.9 0-47.06-21.16-47.06-47.06s21.16-47.06 47.06-47.06h117.84c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H315.24z"/></svg></a>
                <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></a>
                <a href="#" target="_blank" rel="noreferrer" aria-label="Discord"><svg width="14" height="14" viewBox="0 0 640 512" fill="currentColor"><path d="M524.531 69.836a1.5 1.5 0 00-.764-.7A485.065 485.065 0 00404.081 32.03a1.816 1.816 0 00-1.923.91 337.461 337.461 0 00-14.9 30.6 447.848 447.848 0 00-134.426 0 309.541 309.541 0 00-15.135-30.6 1.89 1.89 0 00-1.924-.91 483.689 483.689 0 00-119.688 37.107 1.712 1.712 0 00-.788.676C39.068 183.651 18.186 294.69 28.43 404.354a2.016 2.016 0 00.765 1.375 487.666 487.666 0 00146.825 74.189 1.9 1.9 0 002.063-.676A348.2 348.2 0 00208.12 430.4a1.86 1.86 0 00-1.019-2.588 321.173 321.173 0 01-45.868-21.853 1.885 1.885 0 01-.185-3.126c3.082-2.309 6.166-4.711 9.109-7.137a1.819 1.819 0 011.9-.256c96.229 43.917 200.41 43.917 295.5 0a1.812 1.812 0 011.924.233 239.8 239.8 0 009.109 7.16 1.884 1.884 0 01-.162 3.126 301.407 301.407 0 01-45.89 21.83 1.875 1.875 0 00-1 2.611 391.055 391.055 0 0030.014 48.815 1.864 1.864 0 002.063.7A486.048 486.048 0 00610.7 405.729a1.882 1.882 0 00.765-1.352c12.264-126.783-20.532-236.912-86.934-334.541zM222.491 337.58c-28.972 0-52.844-26.587-52.844-59.239s23.409-59.241 52.844-59.241c29.665 0 53.306 26.82 52.843 59.241 0 32.652-23.41 59.239-52.843 59.239zm195.38 0c-28.971 0-52.843-26.587-52.843-59.239s23.409-59.241 52.843-59.241c29.667 0 53.307 26.82 52.844 59.241 0 32.652-23.177 59.239-52.844 59.239z"/></svg></a>
                <a href="#" target="_blank" rel="noreferrer" aria-label="Telegram"><svg width="14" height="14" viewBox="0 0 496 512" fill="currentColor"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"/></svg></a>
              </div>
            </div>
            <div className="a2-footer-col">
              <div className="a2-footer-heading">Company</div>
              <Link to="/blueprints" style={{ display: "inline-flex", alignItems: "baseline", gap: "5px" }}>Blueprints <span style={{ fontSize: "9px", background: "var(--gold)", color: "#000", padding: "0 4px", borderRadius: "3px", fontWeight: 600 }}>new</span></Link>
              <a href="#">About</a>
              <a href="#">Careers</a>
            </div>
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
            <img src={frogWebp} alt="a2labs logo" width={313} height={350} style={{ width: "96px", height: "auto" }} />
          </div>
        </div>
        <p className="a2-footer-copy">© 2026 Laanaya Enterprises, LLC — hosting made possible by a2labs.io</p>
      </footer>
      </CalErrorBoundary>
    </>
  );
}
