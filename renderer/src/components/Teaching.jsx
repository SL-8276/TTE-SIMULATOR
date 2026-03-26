import { useEffect, useMemo, useState } from "react";
import { views } from "../../../data/tteData.js";

function MediaImage({ src, alt }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    return (
      <div className="tte-ref-media-placeholder">
        <div className="tte-ref-media-placeholder-title">Probe Position Image</div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="tte-media-fit"
      onError={() => setError(true)}
    />
  );
}

function MediaVideo({ src }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    return (
      <div className="tte-ref-media-placeholder tte-ref-video-placeholder">
        <div className="tte-ref-media-placeholder-title">Echocardiography Video</div>
      </div>
    );
  }

  return (
    <video
      key={src}
      className="tte-media-fit tte-video-bg"
      src={src}
      controls
      loop
      autoPlay
      muted
      playsInline
      onError={() => setError(true)}
    />
  );
}

export default function Teaching({ setMode }) {
  const [search, setSearch] = useState("");
  const [selectedViewName, setSelectedViewName] = useState("");
  const [currentId, setCurrentId] = useState(views[0]?.id ?? 1);

  const filteredViews = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return views;

    return views.filter((view) => {
      return (
        view.view_name.toLowerCase().includes(q) ||
        view.mnemonic.toLowerCase().includes(q) ||
        view.category.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const currentView = useMemo(() => {
    return views.find((view) => view.id === currentId) ?? views[0];
  }, [currentId]);

  useEffect(() => {
    if (!selectedViewName) return;
    const selected = views.find((view) => view.view_name === selectedViewName);
    if (selected) {
      setCurrentId(selected.id);
    }
  }, [selectedViewName]);

  function handleFilteredSelectChange(e) {
    const value = e.target.value;
    setSelectedViewName(value);

    const selected = views.find((view) => view.view_name === value);
    if (selected) {
      setCurrentId(selected.id);
    }
  }

  if (!currentView) return null;

  return (
    <div className="tte-ref-page">
      <div className="tte-ref-topband">
        <div className="tte-ref-brand-wrap">
          <div className="tte-ref-brand-title">TTE Standard Views</div>
          <div className="tte-ref-brand-subtitle">
            Transthoracic Echocardiography Reference
          </div>
        </div>
      </div>

      <div className="tte-ref-content">
        <div className="tte-ref-controls-row">
          <div className="tte-ref-search-box">
            <span className="tte-ref-search-icon">⌕</span>
            <input
              className="tte-ref-search-input"
              type="text"
              placeholder="Search views..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="tte-ref-view-select-top"
            value={selectedViewName || currentView.view_name}
            onChange={handleFilteredSelectChange}
          >
            {filteredViews.map((view) => (
              <option key={view.id} value={view.view_name}>
                {view.view_name}
              </option>
            ))}
          </select>
        </div>

        <div className="tte-ref-card">
          <div className="tte-ref-card-titlebar">
            <div className="tte-ref-title-left">
              <span className="tte-ref-view-title">{currentView.view_name}</span>
              <span className="tte-ref-green-pill">{currentView.mnemonic}</span>
            </div>

            <span className="tte-ref-blue-pill">{currentView.category}</span>
          </div>

          <div className="tte-ref-main-body">
            <div className="tte-ref-media-grid">
              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">PROBE POSITION IMAGE</div>
                <div className="tte-ref-media-frame">
                  <MediaImage src={currentView.image} alt={currentView.view_name} />
                </div>
              </div>

              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">ECHOCARDIOGRAPHY VIDEO</div>
                <div className="tte-ref-media-frame">
                  <MediaVideo src={currentView.video} />
                </div>
              </div>
            </div>

            <div className="tte-ref-details-grid">
              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">PROBE POSITION:</div>
                <div className="tte-ref-detail-value">
                  {currentView.intercostal_space}
                </div>
              </div>

              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">PROBE MARKER:</div>
                <div className="tte-ref-detail-value">
                  {currentView.probe_orientation}
                </div>
              </div>
            </div>
          </div>

          <div className="tte-ref-bottom-row">
            <button className="tte-ref-home-btn" onClick={() => setMode("home")}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}