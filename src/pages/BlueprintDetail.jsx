import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "../styles/global.css";
import "../styles/blueprint-detail.css";
import { BLUEPRINTS } from "../data/blueprints";
import { CAL_LINK } from "../data/home";
import n8nLogo from "../assets/N8n-logo-new.svg";
import { MakeLogo } from "../components/iPaaSLogos";

const markdownFiles = import.meta.glob("../data/blueprints/templates/*.md", { as: "raw", eager: true });

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
    <>
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
            <div className="bpd-sidebar-line" />
            <div className="bpd-sidebar-content">
              <div className="bpd-sidebar-section">
                <div className="bpd-sidebar-label">Tier</div>
                <span className={`bp-badge ${blueprint.tier}`}>{blueprint.tier}</span>
              </div>

              <div className="bpd-sidebar-section">
                <div className="bpd-sidebar-label">Platform</div>
                <div className="bpd-sidebar-platforms">
                  {blueprint.platform.includes("make") && <span className="bp-platform-logo"><MakeLogo height={14} /></span>}
                  {blueprint.platform.includes("n8n") && <img src={n8nLogo} alt="n8n" height={16} className="bp-platform-logo" />}
                </div>
              </div>

              <div className="bpd-sidebar-section">
                <div className="bpd-sidebar-label">Category</div>
                <span className="bpd-sidebar-value">{blueprint.category}</span>
              </div>

              <div className="bpd-sidebar-section">
                <div className="bpd-sidebar-label">Tools</div>
                <div className="bpd-sidebar-tools">
                  {blueprint.tools.map(t => <span key={t} className="bpd-sidebar-tool">{t}</span>)}
                </div>
              </div>

              {blueprint.tier !== "free" && (
                <div className="bpd-sidebar-section">
                  <div className="bpd-sidebar-label">Price</div>
                  <span className="bpd-sidebar-value">{blueprint.price} EUR</span>
                </div>
              )}

              <div className="bpd-sidebar-actions">
                {blueprint.tier === "free" ? (
                  <a href={blueprint.file || "#"} className="bpd-btn bpd-btn-primary" download>
                    Download blueprint
                  </a>
                ) : (
                  <a href="https://buy.stripe.com/test_8x2cN7csggyj5qmf8new800" target="_blank" rel="noreferrer" className="bpd-btn bpd-btn-primary">
                    Buy blueprint
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

    </>
  );
}
