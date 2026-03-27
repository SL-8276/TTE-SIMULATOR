import { useEffect, useMemo, useState } from "react";
import { views } from "../../../data/tteData.js";
import { MediaImage, MediaVideo } from "./ReferenceMedia.jsx";
import {
  extractQuaternion,
  formatQuaternion,
  getCalibration,
  normalizeProbeReading,
  saveCalibration
} from "../lib/probeMatching.js";

export default function Calibration({ setMode }) {
  const [selectedViewId, setSelectedViewId] = useState(views[0]?.id ?? 1);
  const initialCalibration = getCalibration(views[0]?.id ?? 1);
  const [probeReading, setProbeReading] = useState(null);
  const [status, setStatus] = useState("");

  const currentView = useMemo(() => {
    return views.find((view) => view.id === selectedViewId) ?? views[0];
  }, [selectedViewId]);

  const currentCalibration = useMemo(() => {
    return getCalibration(selectedViewId);
  }, [selectedViewId, status]);

  useEffect(() => {
    const unsubscribe =
      window.probeInput && typeof window.probeInput.onReading === "function"
        ? window.probeInput.onReading((reading) => {
            setProbeReading(normalizeProbeReading(reading));
          })
        : null;

    if (!unsubscribe) {
      setStatus("Waiting for live probe data in calibration mode.");
    }

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  function loadViewCalibration(viewId) {
    setStatus("");
  }

  function handleViewChange(e) {
    const nextViewId = Number(e.target.value);
    setSelectedViewId(nextViewId);
    loadViewCalibration(nextViewId);
  }

  function handleSave() {
    if (!currentView) return;
    if (!probeReading) {
      setStatus("No live probe reading available to save.");
      return;
    }

    saveCalibration(currentView.id, {
      tag: probeReading.rawTag,
      qx: probeReading.qx,
      qy: probeReading.qy,
      qz: probeReading.qz,
      qw: probeReading.qw
    });

    setStatus("Calibration saved from the latest live probe reading.");
  }

  return (
    <div className="tte-ref-page">
      <div className="tte-ref-topband">
        <div className="tte-ref-brand-wrap">
          <div className="tte-ref-brand-title">Calibration Mode</div>
          <div className="tte-ref-brand-subtitle">
            Save the live probe tag and quaternion values for each TTE view
          </div>
        </div>
      </div>

      <div className="tte-ref-content">
        <div className="tte-ref-controls-row">
          <div className="tte-ref-status-box">
            {status || "Choose a view, position the probe, and save the current live reading for training mode."}
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
                <div className="tte-ref-detail-label">LIVE PROBE TAG</div>
                <div className="tte-ref-detail-value">
                  {probeReading?.rawTag || "No live tag received yet"}
                </div>
              </div>

              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">LIVE QUATERNION</div>
                <div className="tte-ref-detail-value">
                  {probeReading
                    ? formatQuaternion(extractQuaternion(probeReading))
                    : "No live quaternion received yet"}
                </div>
              </div>
            </div>

            <div className="tte-ref-details-grid">
              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">SAVED CALIBRATION TAG</div>
                <div className="tte-ref-detail-value">
                  {currentCalibration?.tag || "No saved calibration for this view"}
                </div>
              </div>

              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">SAVED QUATERNION</div>
                <div className="tte-ref-detail-value">
                  {currentCalibration
                    ? formatQuaternion(extractQuaternion(currentCalibration))
                    : "No saved quaternion for this view"}
                </div>
              </div>
            </div>

            <div className="tte-ref-details-grid">
              <div className="tte-ref-coords-row">
                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">MATCH INPUT SOURCE</div>
                  <div className="tte-ref-detail-value">
                    Tag plus qx, qy, qz, qw from the hardware probe
                  </div>
                </div>

                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">SAVE ACTION</div>
                  <div className="tte-ref-detail-value">
                    Press Set to store the latest live reading for this selected view
                  </div>
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
