import { useState, useEffect } from "react";
import "./styles/global.css";

import FadeIn from "./components/FadeIn";
import Faq from "./components/Faq";
import StepTitle from "./components/StepTitle";
import Tooltip from "./components/Tooltip";
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

export default function App() {
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
      <Tooltip tooltip={tooltip} />

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
                {LOGOS.map(({ src, alt, dot, delay, cs }, i) => (
                  <div
                    className={`brand-logo${dot ? " has-dot" : ""}`}
                    key={i}
                    onMouseEnter={() => dot && setTooltip(cs)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {dot && <span className={`pulse-dot${delay ? " delay" : ""}`} />}
                    <img src={src} alt={alt} height={24} />
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
                {visibleCases.map(({ title, logo, logoAlt, desc }) => (
                  <div className="case-row" key={title}>
                    <div className="case-left">
                      <div className="case-title">{title}</div>
                      <div className="case-logo"><img src={logo} alt={logoAlt} height={14} /></div>
                    </div>
                    <p className="case-desc">{desc}</p>
                  </div>
                ))}

                <div className={`case-more${workOpen ? " open" : ""}`}>
                  {hiddenCases.map(({ title, logo, logoAlt, desc }) => (
                    <div className="case-row" key={title}>
                      <div className="case-left">
                        <div className="case-title">{title}</div>
                        <div className="case-logo"><img src={logo} alt={logoAlt} height={14} /></div>
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
                    <img className="team-img" src={aminPhoto} alt="Amin Laanaya" loading="lazy" />
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
                  <Faq key={i} q={q} a={a}>
                    {q === "How do you make the automations?" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10, opacity: 0.5 }}>
                        <MakeLogo height={16} />
                        <img src={n8nLogo} alt="n8n" style={{ height: 16 }} />
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
