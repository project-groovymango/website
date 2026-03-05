import { useState, useEffect } from "react";
import "./styles/global.css";

import FadeIn from "./components/FadeIn";
import FaqItem from "./components/FaqItem";
import StepTitle from "./components/StepTitle";
import CaseStudyTooltip from "./components/CaseStudyTooltip";
import ToolsMarquee from "./components/ToolsMarquee";
import { LOGOS, FAQ_ITEMS, CASE_STUDIES, CAL_LINK } from "./data/content";
import frogGif from "./assets/frog.gif";
import { MakeLogo } from "./components/iPaaSLogos";
import n8nLogo from "./assets/n8n-logo.svg";
import aminPhoto from "./assets/amin.webp";

const calAttrs = {
  "data-cal-namespace": "30min",
  "data-cal-link": CAL_LINK,
  "data-cal-config": '{"layout":"month_view"}',
};

export default function A2Labs() {
  const [workOpen, setWorkOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);


  useEffect(() => {
    import("@calcom/embed-react").then(({ getCalApi }) =>
      getCalApi({ namespace: "30min" }).then(cal =>
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
      )
    );
  }, []);

  const visibleCases = CASE_STUDIES.filter(c => c.visible);
  const hiddenCases = CASE_STUDIES.filter(c => !c.visible);

  return (
    <>
      <CaseStudyTooltip tooltip={tooltip} />

      <div className="banner">
        Now released — free automation blueprints by a2labs{" "}
        <a href="#" target="_blank" rel="noreferrer">click here →</a>
      </div>

      <div className="container">
        <main>

          <header className="hero">
            <div className="header">
              <div className="logo-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div className="logo">
                    <img src={frogGif} alt="a2labs logo" style={{ width: "48px", height: "48px", position: "relative", top: "-6px" }} />
                  </div>
                  <h1>a2labs</h1>
                </div>
              </div>

              <p className="tagline">Automate, automate, automate — we're nerds who get high on things running efficiently. Help us get our fix, please.</p>
              <p className="description">
                We have been told you have a problem — you can't see a manual process without wanting to automate it. Whether you're an exec drowning in repetitive tasks or a business sitting on untapped opportunities, we're the nerds you didn't know you needed. This was written by ChatGPT and it was so incredibly bad, we decided to keep it because it we like to suffer.
              </p>
              <div className="quote">
                <p>"Yeahh... sometimes what they do is absolute wizardry."</p>
                <cite>— Wisse Dielesen</cite>
              </div>
            </div>

            <button className="cta-primary" {...calAttrs} style={{ cursor: "pointer", border: "none" }}>
              Book a free 15-min call →
            </button>

            <div className="social-proof" style={{ marginTop: "20px" }}>
              <div className="logo-grid">
                {LOGOS.map(({ Svg, dot, delay, cs }, i) => (
                  <div
                    className={`brand-logo${dot ? " has-dot" : ""}`}
                    key={i}
                    onMouseEnter={() => dot && setTooltip(cs)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {dot && <span className={`pulse-dot${delay ? " delay" : ""}`} />}
                    <Svg height={24} />
                  </div>
                ))}
              </div>
            </div>
          </header>

          <FadeIn>
            <section id="projects">
              <p className="section-label"><span role="heading" aria-level="2">Previous projects</span></p>
              <p className="work-intro">Whilst our dear mothers still think we fix computers, this is what we actually do — if it has an API, we can help you automate or rethink the process.</p>

              <div className="case-list">
                {visibleCases.map(({ title, Logo, desc }) => (
                  <div className="case-row" key={title}>
                    <div className="case-left">
                      <div className="case-title">{title}</div>
                      <div className="case-logo"><Logo height={14} /></div>
                    </div>
                    <p className="case-desc">{desc}</p>
                  </div>
                ))}

                <div className={`case-more${workOpen ? " open" : ""}`}>
                  {hiddenCases.map(({ title, Logo, desc }) => (
                    <div className="case-row" key={title}>
                      <div className="case-left">
                        <div className="case-title">{title}</div>
                        <div className="case-logo"><Logo height={14} /></div>
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
              <p className="section-label"><span role="heading" aria-level="2">How it works</span></p>
              <div className="steps">
                <div className="step">
                  <span className="step-num">1</span>
                  <div>
                    <StepTitle hoverText="wat is je probleem">Tell us your problem</StepTitle>
                    <div className="step-desc">We get on a call, map out your current process, and identify exactly where time is being wasted. No jargon, no fluff — just an honest look at what can be automated.</div>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">2</span>
                  <div>
                    <StepTitle>We scope and build</StepTitle>
                    <div className="step-desc">We design the automation, connect your tools (HubSpot, CRM, calendar, whatever you're using), and build it. You'll see progress before we call it done.</div>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">3</span>
                  <div>
                    <StepTitle>You save time, we move on</StepTitle>
                    <div className="step-desc">We hand it over, make sure it runs clean, and document everything. If something breaks, we're still here. Most clients come back with a second problem within two weeks.</div>
                  </div>
                </div>
              </div>
              <button className="cta-primary" {...calAttrs} style={{ marginTop: "32px", cursor: "pointer", border: "none" }}>
                Book a free 15-min call →
              </button>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <div className="team-list">
                <div className="team-card">
                  <div className="team-img-wrap">
                    <img className="team-img" src={aminPhoto} alt="Amin Laanaya" />
                  </div>
                  <div className="team-info">
                    <div className="team-name">Amin Laanaya</div>
                    <div className="team-role">Automation engineer</div>
                    <div className="team-bio">Obsessive about process efficiency. Has automated everything from lead routing to his own morning routine. Probably has a workflow for this bio.</div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <p className="section-label"><span role="heading" aria-level="2">FAQ</span></p>
              <div className="faq">
                {FAQ_ITEMS.map(({ q, a }, i) => (
                  <FaqItem key={i} q={q} a={a}>
                    {q === "How do you make the automations?" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10, opacity: 0.5 }}>
                        <MakeLogo height={16} />
                        <img src={n8nLogo} alt="n8n" style={{ height: 16 }} />
                      </div>
                    )}
                    {q === "Which tools have you worked with?" && <ToolsMarquee />}
                  </FaqItem>
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
                <a href="#" target="_blank" rel="noreferrer" aria-label="Slack"><i className="fab fa-slack"></i></a>
                <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                <a href="#" target="_blank" rel="noreferrer" aria-label="Discord"><i className="fab fa-discord"></i></a>
                <a href="#" target="_blank" rel="noreferrer" aria-label="Telegram"><i className="fab fa-telegram"></i></a>
              </div>
            </div>
            <div className="a2-footer-col">
              <div className="a2-footer-heading">Company</div>
              <a href="#">About</a>
              <a href="#">Careers</a>
            </div>
            <div className="a2-footer-col">
              <div className="a2-footer-heading">Inquiries</div>
              <span>hello@a2labs.io</span>
              <button
                className="cta-primary"
                {...calAttrs}
                style={{ marginTop: "8px", padding: "7px 12px", fontSize: "12px", display: "inline-block", textAlign: "center", width: "auto", cursor: "pointer", border: "none" }}
              >
                Book a call
              </button>
            </div>
          </div>
          <div className="a2-footer-frog">
            <img src={frogGif} alt="a2labs logo" style={{ width: "96px", height: "96px" }} />
          </div>
        </div>
        <p className="a2-footer-copy">© 2026 Laanaya Enterprises, LLC — hosting made possible by a2labs.io</p>
      </footer>
    </>
  );
}
