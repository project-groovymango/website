import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/slack-connect.css";

export default function SlackConnect() {
  return (
    <div className="sc-page">
      <Link to="/#team" className="sc-back">&larr; a2labs</Link>

      <h1 className="sc-title">Get in touch</h1>
      <p className="sc-subtitle">Under here are three ways to reach me. I do give pointers in the right direction and I like to think along for free. Why for free? Well... its quite simple, just to network with others and I hope to eventually work with those who reach out to me for help.</p>

      <h2 className="sc-heading">Slack connect</h2>
      <div className="steps">
        <div className="step">
          <span className="step-num">1</span>
          <div>
            <h3 className="step-title">Open Slack</h3>
            <div className="step-desc">You will need a paid Slack plan, but most companies have one - anyway, open Slack on desktop or your phone and follow the steps below to message me.</div>
          </div>
        </div>
        <div className="step">
          <span className="step-num">2</span>
          <div>
            <h3 className="step-title">Start a direct message</h3>
            <div className="step-desc">Click the <strong>"+"</strong> button next to "Direct messages" in your sidebar on the left.</div>
          </div>
        </div>
        <div className="step">
          <span className="step-num">3</span>
          <div>
            <h3 className="step-title">Type in my e-mail</h3>
            <div className="step-desc">Enter my email address: <strong>amin@a2labs.io</strong> - and voila, now Slack will send me an invite and I'll accept it. <u>We can chat directly without me being in a channel.</u></div>
          </div>
        </div>
      </div>

      <h2 className="sc-heading">Telegram</h2>
      <p className="sc-contact-desc"><a href="https://t.me/bobcycle" target="_blank" rel="noreferrer" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: "2px" }}>@bobcycle</a></p>

      <h2 className="sc-heading">E-mail</h2>
      <p className="sc-contact-desc"><a href="mailto:amin@a2labs.io" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: "2px" }}>amin@a2labs.io</a></p>    </div>
  );
}
