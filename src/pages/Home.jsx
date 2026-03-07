import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/global.css";

import FadeIn from "../components/FadeIn";
import Faq from "../components/Faq";
import StepTitle from "../components/StepTitle";
import Tooltip from "../components/Tooltip";
import ToolsMarquee from "../components/ToolsMarquee";
import CalErrorBoundary from "../components/CalErrorBoundary";
import { LOGOS, FAQ_ITEMS, CASE_STUDIES, CAL_LINK } from "../data/home";
import frogWebp from "../assets/frog.webp";
import { MakeLogo } from "../components/iPaaSLogos";
import n8nLogo from "../assets/N8n-logo-new.svg";
import aminPhoto from "../assets/amin.webp";
import angelaPhoto from "../assets/angela.webp";

const calAttrs = {
  "data-cal-namespace": "30min",
  "data-cal-link": CAL_LINK,
  "data-cal-config": '{"layout":"month_view"}',
};

export default function App() {
  const location = useLocation();

  const [tooltip, setTooltip] = useState(null);
  const [track, setTrack] = useState("audit");
  const calInitRef = useRef(false);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);
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


  const allCases = CASE_STUDIES;

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
                {LOGOS.map(({ src, alt, width }, i) => (
                  <div className="brand-logo" key={i}>
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

              <div className="case-ticker-wrap">
                <div className="case-ticker">
                  {[...allCases, ...allCases].map(({ title, logo, logoAlt, logoWidth, desc }, i) => (
                    <div className="case-row" key={`${title}-${i}`}>
                      <div className="case-left">
                        <h3 className="case-title">{title}</h3>
                        <div className="case-logo"><img src={logo} alt={logoAlt} width={logoWidth} height={14} /></div>
                      </div>
                      <p className="case-desc">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section id="how-it-works">
              <h2 className="section-label">How it works</h2>

              <p className="toggle-intro">Three ways to work with us. We provide a full service audit of your go-to-market stack and see what can run more efficient or we execute upon a predefined scope. Alternatively use our blueprints like other companies.</p>

              <div className="toggle-wrap">
                <button className={`toggle-btn${track === "audit" ? " active" : ""}`} onClick={() => setTrack("audit")}>Process audit</button>
                <button className={`toggle-btn${track === "problem" ? " active" : ""}`} onClick={() => setTrack("problem")}>Specific problem</button>
                <button className={`toggle-btn gold${track === "blueprints" ? " active" : ""}`} onClick={() => setTrack("blueprints")}>
                  Blueprints
                </button>
              </div>

              <div className="toggle-content">
                <div className={track === "blueprints" ? "active" : ""}>
                  <p className="step-desc" style={{ marginBottom: "20px" }}>We're publishing automation blueprints for Make.com and N8N which solve real business problems to everyone. This after our own frustration on having to make and test all of them from scratch throughout our years of automation.</p>
                  <div className="steps">
                    <div className="step">
                      <span className="step-num">1</span>
                      <div>
                        <h3 className="step-title">Browse our blueprints</h3>
                        <div className="step-desc">You can download blueprints for free or at a premium and set them up yourself or ask us to do it and to fully customise it to your liking.</div>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">2</span>
                      <div>
                        <h3 className="step-title">Import the automation</h3>
                        <div className="step-desc">After downloading, you will receive the blueprint and a step-by-step guide on how to set it up. Amend it to your business needs and save time.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={track === "audit" ? "active" : ""}>
                  <div className="steps">
                    <div className="step">
                      <span className="step-num">1</span>
                      <div>
                        <h3 className="step-title">Audit of your lead to customer journey</h3>
                        <div className="step-desc">We map out the entire journey and figure out where time is most wasted in the process. Together we will discuss our findings and suggestions.</div>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">2</span>
                      <div>
                        <h3 className="step-title">Prioritize by impact</h3>
                        <div className="step-desc">Not everything needs to be fixed. After the bottlenecks have been presented, we priortise them in partnership and talk about the approach.</div>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">3</span>
                      <div>
                        <h3 className="step-title">Building it out and handing over</h3>
                        <div className="step-desc">Once aligned on priorities... we build, test, iterate, monitor, document and train relevant stakeholders. Our priority is adoption of the deliverable.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={track === "problem" ? "active" : ""}>
                  <div className="steps">
                    <div className="step">
                      <span className="step-num">1</span>
                      <div>
                        <h3 className="step-title">Tell us the problem</h3>
                        <div className="step-desc">You come to us with a specific task or problem.</div>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">2</span>
                      <div>
                        <h3 className="step-title">Scoping 'n quoting</h3>
                        <div className="step-desc">We break down what has to be done to solve the bottleneck, define what success looks like, and give you a clear timeline and fixed quote.</div>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">3</span>
                      <div>
                        <h3 className="step-title">Build and hand over</h3>
                        <div className="step-desc">Once we get the green light... we build, test, iterate, monitor, document, train relevant stakeholders and handover the automation blueprint.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {track === "blueprints" ? (
                <Link to="/blueprints" state={{ from: "how-it-works" }} className="cta-primary" style={{ marginTop: "24px", cursor: "pointer", border: "none", background: "var(--gold)", color: "#000", display: "block", textAlign: "center", textDecoration: "none", padding: "13px", boxSizing: "border-box", lineHeight: "normal", fontSize: "14px" }}>
                  Browse our blueprints &rarr;
                </Link>
              ) : calError ? (
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
            <section id="team">
              <h2 className="section-label">The "team"</h2>
              <div className="team-list">
                <div className="team-card" style={{ position: "relative" }}>
                  <div className="team-img-wrap">
                    <img className="team-img" src={aminPhoto} alt="Amin Laanaya" width={256} height={256} loading="lazy" />
                  </div>
                  <div className="team-info">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 className="team-name">Amin Laanaya</h3>
                        <div className="team-role">Automation engineer</div>
                      </div>
                      <Link to="/slack" aria-label="Slack" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#F5F5DC", textDecoration: "none", transition: "opacity 0.15s" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.7"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                        <span style={{ fontSize: "12px", fontStyle: "italic", textAlign: "right", lineHeight: "1.4" }}>Message me<br/>on Slack</span>
                        <svg width="30" height="30" viewBox="0 0 448 512" fill="currentColor"><path d="M94.12 315.1c0 25.9-21.16 47.06-47.06 47.06S0 341 0 315.1c0-25.9 21.16-47.06 47.06-47.06h47.06v47.06zm23.72 0c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06v117.84c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V315.1zm47.06-221.22c-25.9 0-47.06-21.16-47.06-47.06S139 0 164.9 0s47.06 21.16 47.06 47.06v47.06H164.9zm0 23.72c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H47.06C21.16 211.72 0 190.56 0 164.66s21.16-47.06 47.06-47.06H164.9zm221.22 47.06c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06-21.16 47.06-47.06 47.06h-47.06v-47.06zm-23.72 0c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V47.06C268.18 21.16 289.34 0 315.24 0s47.06 21.16 47.06 47.06v117.84zm-47.06 221.22c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06-47.06-21.16-47.06-47.06v-47.06h47.06zm0-23.72c-25.9 0-47.06-21.16-47.06-47.06s21.16-47.06 47.06-47.06h117.84c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H315.24z"/></svg>
                      </Link>
                    </div>
                    <div className="team-bio">Previously the owner of go-to-market tech stacks, being responsible for designing, implementing and maintaining business processes and automations, optimizing the productivity of organizations. Now sharing my passion.</div>
                  </div>
                </div>
                <div className="team-card">
                  <div className="team-img-wrap">
                    <img className="team-img" src={angelaPhoto} alt="Angela" width={256} height={256} loading="lazy" />
                  </div>
                  <div className="team-info">
                    <h3 className="team-name">Angela den Hollander</h3>
                    <div className="team-role">Legal council & Security officer</div>
                    <div className="team-bio">Making sure that whatever we're doing stays secure for us and our customers. Reviews contracts, handles compliance, and keeps our data practices airtight — so you don't have to worry about it.</div>
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
              <div className="a2-footer-heading">Resources</div>
              <a href="#">Terms</a>
              <a href="#">Privacy Policy</a>
              <div className="a2-footer-socials">
                <a href="#" target="_blank" rel="noreferrer" aria-label="Slack"><svg width="24" height="24" viewBox="0 0 448 512" fill="currentColor"><path d="M94.12 315.1c0 25.9-21.16 47.06-47.06 47.06S0 341 0 315.1c0-25.9 21.16-47.06 47.06-47.06h47.06v47.06zm23.72 0c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06v117.84c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V315.1zm47.06-221.22c-25.9 0-47.06-21.16-47.06-47.06S139 0 164.9 0s47.06 21.16 47.06 47.06v47.06H164.9zm0 23.72c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H47.06C21.16 211.72 0 190.56 0 164.66s21.16-47.06 47.06-47.06H164.9zm221.22 47.06c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06-21.16 47.06-47.06 47.06h-47.06v-47.06zm-23.72 0c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V47.06C268.18 21.16 289.34 0 315.24 0s47.06 21.16 47.06 47.06v117.84zm-47.06 221.22c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06-47.06-21.16-47.06-47.06v-47.06h47.06zm0-23.72c-25.9 0-47.06-21.16-47.06-47.06s21.16-47.06 47.06-47.06h117.84c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H315.24z"/></svg></a>
                <a href="#" target="_blank" rel="noreferrer" aria-label="Telegram"><svg width="24" height="24" viewBox="0 0 496 512" fill="currentColor"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"/></svg></a>
                <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg width="24" height="24" viewBox="0 0 448 512" fill="currentColor"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></a>
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
