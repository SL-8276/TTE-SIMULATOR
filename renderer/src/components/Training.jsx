import { useEffect, useMemo, useState } from "react";
import { views } from "../../../data/tteData.js";
import { excludedTrainingViewIds, trainingViewOverrides } from "../data/trainingHotspots.js";
import { MediaImage } from "./ReferenceMedia.jsx";
import { TrainingHotspotVideo } from "./TrainingHotspotMedia.jsx";

const trainingViews = views
  .filter((view) => !excludedTrainingViewIds.includes(view.id))
  .map((view) => ({
    ...view,
    ...(trainingViewOverrides[view.id] ?? {})
  }));

export default function Training({ setMode }) {
  const [workflow, setWorkflow] = useState("menu");
  const [search, setSearch] = useState("");
  const [selectedViewName, setSelectedViewName] = useState("");
  const [currentId, setCurrentId] = useState(trainingViews[0]?.id ?? 1);

  const filteredViews = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return trainingViews;

    return trainingViews.filter((view) => {
      return (
        view.view_name.toLowerCase().includes(q) ||
        view.mnemonic.toLowerCase().includes(q) ||
        view.category.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const currentView = useMemo(() => {
    return (
      trainingViews.find((view) => view.id === currentId) ??
      filteredViews[0] ??
      trainingViews[0]
    );
  }, [currentId, filteredViews]);

  const hotspotOptionPool = useMemo(() => getHotspotOptionPool(), []);

  useEffect(() => {
    if (!selectedViewName) return;
    const selected = trainingViews.find((view) => view.view_name === selectedViewName);
    if (selected) {
      setCurrentId(selected.id);
    }
  }, [selectedViewName]);

  useEffect(() => {
    if (!filteredViews.length) return;
    if (!filteredViews.some((view) => view.id === currentId)) {
      setCurrentId(filteredViews[0].id);
      setSelectedViewName(filteredViews[0].view_name);
    }
  }, [currentId, filteredViews]);

  function handleFilteredSelectChange(e) {
    const value = e.target.value;
    setSelectedViewName(value);

    const selected = trainingViews.find((view) => view.view_name === value);
    if (selected) {
      setCurrentId(selected.id);
    }
  }

  if (!currentView) return null;
  const currentHotspots = currentView.hotspots ?? [];

  if (workflow === "menu") {
    return (
      <div className="home-page training-choice-page">
        <div className="home-shell training-choice-shell">
          <div className="home-title-block">
            <div className="home-kicker">Training Mode</div>
            <h1 className="home-title">Training</h1>
          </div>

          <div className="home-button-row training-choice-row">
            <button
              className="home-action-btn training-choice-btn"
              onClick={() => setWorkflow("probe")}
            >
              <span className="home-action-title">Probe Position</span>
            </button>

            <button
              className="home-action-btn training-choice-btn"
              onClick={() => setWorkflow("structures")}
            >
              <span className="home-action-title">Identify Structures</span>
            </button>
          </div>

          <div className="training-choice-footer">
            <button className="tte-ref-home-btn" onClick={() => setMode("home")}>
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (workflow === "probe") {
    return (
      <div className="tte-ref-page">
        <div className="tte-ref-topband">
          <div className="tte-ref-brand-wrap">
            <div className="tte-ref-brand-title">Probe Position</div>
          </div>
        </div>

        <div className="tte-ref-content">
          <div className="tte-ref-card training-empty-card" />

          <div className="tte-ref-bottom-row tte-ref-bottom-row-between">
            <button className="tte-ref-secondary-btn" onClick={() => setWorkflow("menu")}>
              Back
            </button>
            <button className="tte-ref-home-btn" onClick={() => setMode("home")}>
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tte-ref-page">
      <div className="tte-ref-topband">
        <div className="tte-ref-brand-wrap">
          <div className="tte-ref-brand-title">Identify Structures</div>
          <div className="tte-ref-brand-subtitle">
            Identify structures on the unlabelled echocardiography loop
          </div>
        </div>
      </div>

      <div className="tte-ref-content">
        <div className="tte-ref-controls-row">
          <div className="tte-ref-search-box">
            <span className="tte-ref-search-icon">Search</span>
            <input
              className="tte-ref-search-input"
              type="text"
              placeholder="Search training views..."
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
                <div className="tte-ref-section-label">UNLABELLED REFERENCE STILL</div>
                <div className="tte-ref-media-frame">
                  <MediaImage src={currentView.image} alt={currentView.view_name} />
                </div>
              </div>

              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">IDENTIFY STRUCTURE</div>
                <div className="tte-ref-media-frame">
                  <TrainingHotspotVideo
                    src={currentView.video}
                    hotspots={currentHotspots}
                    optionPool={hotspotOptionPool}
                  />
                </div>
              </div>
            </div>

            <div className="tte-ref-details-grid">
              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">VIEW:</div>
                <div className="tte-ref-detail-value">{currentView.description}</div>
              </div>

              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">TRAINING TARGET:</div>
                <div className="tte-ref-detail-value">
                  Choose a point on the loop, answer once, then move to the next structure.
                </div>
              </div>
            </div>
          </div>

          <div className="tte-ref-bottom-row">
            <button className="tte-ref-secondary-btn" onClick={() => setWorkflow("menu")}>
              Back
            </button>
            <button className="tte-ref-home-btn" onClick={() => setMode("home")}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getHotspotOptionPool() {
  return trainingViews
    .flatMap((view) => view.hotspots ?? [])
    .map((spot) => spot.label)
    .filter((label, index, labels) => labels.indexOf(label) === index);
}
