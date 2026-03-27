import { useMemo, useState } from "react";
import { views } from "../../../data/tteData.js";
import { MediaImage, MediaVideo } from "./ReferenceMedia.jsx";
import { getCalibration, saveCalibration } from "../lib/probeMatching.js";

export default function Calibration({ setMode }) {
  const [selectedViewId, setSelectedViewId] = useState(views[0]?.id ?? 1);
  const initialCalibration = getCalibration(views[0]?.id ?? 1);
  const [coords, setCoords] = useState(
    initialCalibration
      ? { x: initialCalibration.x ?? "", y: initialCalibration.y ?? "" }
      : { x: "", y: "" }
  );
  const [tag, setTag] = useState(initialCalibration?.tag ?? "");
  const [status, setStatus] = useState("");

  const currentView = useMemo(() => {
    return views.find((view) => view.id === selectedViewId) ?? views[0];
  }, [selectedViewId]);

  function loadViewCalibration(viewId) {
    const calibration = getCalibration(viewId);
    setCoords({
      x: calibration?.x ?? "",
      y: calibration?.y ?? ""
    });
    setTag(calibration?.tag ?? "");
    setStatus("");
  }

  function handleViewChange(e) {
    const nextViewId = Number(e.target.value);
    setSelectedViewId(nextViewId);
    loadViewCalibration(nextViewId);
  }

  function handleCoordinateChange(axis, value) {
    setCoords((current) => ({
      ...current,
      [axis]: value
    }));
  }

  function handleSave() {
    if (!currentView) return;

    const x = Number(coords.x);
    const y = Number(coords.y);

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      setStatus("Enter valid X and Y coordinates before saving calibration.");
      return;
    }

    saveCalibration(currentView.id, {
      x,
      y,
      tag: tag.trim()
    });

    setStatus("Calibration saved for this view.");
  }

  return (
    <div className="tte-ref-page">
      <div className="tte-ref-topband">
        <div className="tte-ref-brand-wrap">
          <div className="tte-ref-brand-title">Calibration Mode</div>
          <div className="tte-ref-brand-subtitle">
            Save the reference coordinates and tag for each TTE view
          </div>
        </div>
      </div>

      <div className="tte-ref-content">
        <div className="tte-ref-controls-row">
          <div className="tte-ref-status-box">
            {status || "Choose a view and enter the calibration values you want training mode to compare against."}
          </div>

          <select
            className="tte-ref-view-select-top"
            value={selectedViewId}
            onChange={handleViewChange}
          >
            {views.map((view) => (
              <option key={view.id} value={view.id}>
                {view.view_name}
              </option>
            ))}
          </select>
        </div>

        <div className="tte-ref-card">
          <div className="tte-ref-card-titlebar">
            <div className="tte-ref-title-left">
              <span className="tte-ref-view-title">{currentView?.view_name}</span>
              <span className="tte-ref-green-pill">{currentView?.mnemonic}</span>
            </div>

            <span className="tte-ref-blue-pill">{currentView?.category}</span>
          </div>

          <div className="tte-ref-main-body">
            <div className="tte-ref-media-grid">
              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">PROBE POSITION IMAGE</div>
                <div className="tte-ref-media-frame">
                  <MediaImage src={currentView?.image} alt={currentView?.view_name} />
                </div>
              </div>

              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">ECHOCARDIOGRAPHY VIDEO</div>
                <div className="tte-ref-media-frame">
                  <MediaVideo src={currentView?.video} />
                </div>
              </div>
            </div>

            <div className="tte-ref-details-grid">
              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">TAG</div>
                <input
                  className="tte-ref-detail-input"
                  type="text"
                  placeholder="Probe tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>

              <div className="tte-ref-coords-row">
                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">X COORDINATE</div>
                  <input
                    className="tte-ref-detail-input"
                    type="number"
                    placeholder="X"
                    value={coords.x}
                    onChange={(e) => handleCoordinateChange("x", e.target.value)}
                  />
                </div>

                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">Y COORDINATE</div>
                  <input
                    className="tte-ref-detail-input"
                    type="number"
                    placeholder="Y"
                    value={coords.y}
                    onChange={(e) => handleCoordinateChange("y", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="tte-ref-bottom-row tte-ref-bottom-row-between">
            <button className="tte-ref-secondary-btn" onClick={handleSave}>
              Set
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
