import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/blueprints.css";
import { BLUEPRINTS, PLATFORMS, TIERS, CATEGORIES, ALL_TOOLS } from "../data/blueprints";
import frogWebp from "../assets/frog.webp";
import n8nLogo from "../assets/N8n-logo-new.svg";
import { MakeLogo } from "../components/iPaaSLogos";

export default function Blueprints() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState(null);
  const [tier, setTier] = useState(null);
  const [category, setCategory] = useState(null);
  const [tool, setTool] = useState(null);

  const filtered = useMemo(() => {
    return BLUEPRINTS.filter(b => {
      if (platform && !b.platform.includes(platform)) return false;
      if (tier && b.tier !== tier) return false;
      if (category && b.category !== category) return false;
      if (tool && !b.tools.includes(tool)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!b.title.toLowerCase().includes(q) && !b.desc.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, platform, tier, category, tool]);

  const toggle = (current, value, setter) => setter(current === value ? null : value);

  return (
    <div className="bp-page">
      <div className="bp-header">
        <Link to="/" className="bp-back">&larr; a2labs</Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={frogWebp} alt="a2labs" width={313} height={350} style={{ width: "36px", height: "auto" }} />
          <h1 className="bp-title">Blueprints</h1>
        </div>
        <p className="bp-subtitle">These are blueprints which have been made by a2labs which are free or paid. You can choose to either setup each template yourself or ask us to set it up for you and customise it to your liking.</p>
      </div>

      <div className="bp-layout">
        <aside className="bp-sidebar">
          <div className="bp-filter-group">
            <div className="bp-filter-heading">Platform</div>
            {PLATFORMS.map(p => (
              <button key={p} className={`bp-filter-btn${platform === p ? " active" : ""}`} onClick={() => toggle(platform, p, setPlatform)}>
                {p === "n8n" ? "n8n" : "Make"}
              </button>
            ))}
          </div>

          <div className="bp-filter-group">
            <div className="bp-filter-heading">Complexity</div>
            {TIERS.map(t => (
              <button key={t} className={`bp-filter-btn${tier === t ? " active" : ""}`} onClick={() => toggle(tier, t, setTier)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="bp-filter-group">
            <div className="bp-filter-heading">Category</div>
            <select className="bp-select" value={category || ""} onChange={e => setCategory(e.target.value || null)}>
              <option value="">All</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="bp-filter-group">
            <div className="bp-filter-heading">Tools</div>
            {ALL_TOOLS.map(t => (
              <button key={t} className={`bp-filter-btn${tool === t ? " active" : ""}`} onClick={() => toggle(tool, t, setTool)}>
                {t}
              </button>
            ))}
          </div>
        </aside>

        <main className="bp-main">
          <input
            className="bp-search"
            type="text"
            placeholder="Filter by name or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="bp-table-wrap">
            <table className="bp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Platform</th>
                  <th>Tools</th>
                  <th>Tier</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={i} className="bp-table-row">
                    <td>
                      <div className="bp-table-name">{b.title}</div>
                      <div className="bp-table-desc">{b.desc}</div>
                    </td>
                    <td><span className="bp-category-tag">{b.category}</span></td>
                    <td className="bp-table-platform-cell">
                      <div className="bp-platform-stack">
                        {b.platform.includes("make") && <span className="bp-platform-logo"><MakeLogo height={14} /></span>}
                        {b.platform.includes("n8n") && <img src={n8nLogo} alt="n8n" height={16} className="bp-platform-logo" />}
                      </div>
                    </td>
                    <td>
                      <div className="bp-tool-tags">
                        {b.tools.map(t => <span key={t} className="bp-tool-tag">{t}</span>)}
                      </div>
                    </td>
                    <td><span className={`bp-badge ${b.tier}`}>{b.tier}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="bp-empty">No blueprints match your filters.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
