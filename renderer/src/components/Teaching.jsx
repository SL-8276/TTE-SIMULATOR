import { useMemo, useState } from "react";
import { views } from "../../../data/tteData.js";

export default function Teaching({ setMode }) {
  const [index, setIndex] = useState(0);
  const view = views[index];

  const structureText = useMemo(() => {
    if (!view?.structures_visible?.length) return "Structures not listed.";
    return view.structures_visible.join(", ");
  }, [view]);

  function goPrev() {
    setIndex((prev) => (prev - 1 + views.length) % views.length);
  }

  function goNext() {
    setIndex((prev) => (prev + 1) % views.length);
  }

  return (
    <div className="mode-screen">
      <div className="mode-topbar">
        <div className="mode-title-wrap">
          <h2 className="mode-title">Teaching Mode</h2>
          <div className="mode-subtitle">
            Guided learning for standard TTE views
          </div>
        </div>

        <div className="mode-top-controls">
          <select
            className="view-select"
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
          >
            {views.map((item, i) => (
              <option key={item.id ?? i} value={i}>
                {i + 1}. {item.view_name}
              </option>
            ))}
          </select>

          <div className="progress-pill">
            {index + 1} / {views.length}
          </div>
        </div>
      </div>

      <div className="teaching-main">
        <div className="viewer-card">
          <div className="viewer-card-header">Probe Position</div>
          <div className="viewer-frame">
            {view.probe_position_image ? (
              <img
                src={view.probe_position_image}
                alt={view.view_name}
                className="media-fit"
              />
            ) : (
              <div className="viewer-placeholder">
                <div className="placeholder-title">Probe Position Image</div>
                <div className="placeholder-subtext">{view.view_name}</div>
              </div>
            )}
          </div>
        </div>

        <div className="viewer-card">
          <div className="viewer-card-header">Echo Video</div>
          <div className="viewer-frame">
            {view.echo_video ? (
              <video
                className="media-fit"
                src={view.echo_video}
                controls
                playsInline
              />
            ) : (
              <div className="viewer-placeholder">
                <div className="placeholder-title">Echo Video</div>
                <div className="placeholder-subtext">{view.view_name}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="teaching-bottom">
        <div className="info-card description-card">
          <div className="info-card-title">
            {view.view_name} <span className="category-tag">{view.category}</span>
          </div>

          <div className="description-grid">
            <div className="info-line">
              <span className="info-label">Probe Orientation:</span>
              <span className="info-value">{view.probe_orientation}</span>
            </div>

            <div className="info-line">
              <span className="info-label">Intercostal Space:</span>
              <span className="info-value">{view.intercostal_space}</span>
            </div>

            <div className="info-line">
              <span className="info-label">Patient Position:</span>
              <span className="info-value">{view.patient_position}</span>
            </div>

            <div className="info-line info-line-full">
              <span className="info-label">Structures Visible:</span>
              <span className="info-value">{structureText}</span>
            </div>

            <div className="info-line info-line-full">
              <span className="info-label">Description:</span>
              <span className="info-value">{view.description}</span>
            </div>
          </div>
        </div>

        <div className="nav-card">
          <button className="nav-btn secondary-btn" onClick={goPrev}>
            Previous
          </button>
          <button className="nav-btn primary-btn" onClick={goNext}>
            Next
          </button>
          <button className="nav-btn home-btn" onClick={() => setMode("home")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}