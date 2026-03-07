import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "../styles/global.css";
import "../styles/blueprint-detail.css";
import { BLUEPRINTS } from "../data/blueprints";
import { CAL_LINK } from "../data/content";
import n8nLogo from "../assets/N8n-logo-new.svg";
import { MakeLogo } from "../components/iPaaSLogos";

const markdownFiles = import.meta.glob("../data/blueprints/*.md", { as: "raw", eager: true });

export default function BlueprintDetail() {
  const { slug } = useParams();
  const blueprint = BLUEPRINTS.find(b => b.slug === slug);

  if (!blueprint) {
    return (
      <div className="bpd-page">
        <Link to="/blueprints" className="bpd-back">&larr; Back to blueprints</Link>
        <h1 style={{ color: "#fff", marginTop: 24 }}>Blueprint not found</h1>
      </div>
    );
  }

  const mdKey = Object.keys(markdownFiles).find(k => k.includes(slug));
  const markdown = mdKey ? markdownFiles[mdKey] : "No content yet.";

  return (
    <div className="bpd-page">
      <Link to="/blueprints" className="bpd-back">&larr; Back to blueprints</Link>

      <div className="bpd-layout">
        <main className="bpd-content">
          <h1 className="bpd-title">{blueprint.title}</h1>
          <div className="bpd-markdown">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </main>

        <aside className="bpd-sidebar">
          <div className="bpd-card">
            <div className="bpd-card-tier">
              <span className={`bp-badge ${blueprint.tier}`}>{blueprint.tier}</span>
            </div>

            <div className="bpd-card-section">
              <div className="bpd-card-label">Platform</div>
              <div className="bpd-card-platforms">
                {blueprint.platform.includes("make") && <span className="bp-platform-logo"><MakeLogo height={14} /></span>}
                {blueprint.platform.includes("n8n") && <img src={n8nLogo} alt="n8n" height={16} className="bp-platform-logo" />}
              </div>
            </div>

            <div className="bpd-card-section">
              <div className="bpd-card-label">Category</div>
              <span className="bp-category-tag">{blueprint.category}</span>
            </div>

            <div className="bpd-card-section">
              <div className="bpd-card-label">Tools</div>
              <div className="bp-tool-tags">
                {blueprint.tools.map(t => <span key={t} className="bp-tool-tag">{t}</span>)}
              </div>
            </div>

            <div className="bpd-card-actions">
              {blueprint.tier === "free" ? (
                <a href={blueprint.file || "#"} className="bpd-btn bpd-btn-primary" download>
                  Download blueprint
                </a>
              ) : (
                <a href="https://buy.stripe.com/test_8x2cN7csggyj5qmf8new800" target="_blank" rel="noreferrer" className="bpd-btn bpd-btn-primary">
                  Buy blueprint for {blueprint.price} EUR
                </a>
              )}
              <a
                href={`https://cal.com/${CAL_LINK}`}
                target="_blank"
                rel="noreferrer"
                className="bpd-btn bpd-btn-secondary"
              >
                Have us set it up for you &rarr;
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
