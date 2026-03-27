import { useEffect, useMemo, useState } from "react";
import { views } from "../../../data/tteData.js";
import { MediaImage, MediaVideo } from "./ReferenceMedia.jsx";
import {
  extractQuaternion,
  findMatchingView,
  formatQuaternion,
  loadCalibrations,
  normalizeProbeReading
} from "../lib/probeMatching.js";

export default function Training({ setMode }) {
  const [probeReading, setProbeReading] = useState(null);
  const [matchedViewId, setMatchedViewId] = useState(null);
  const [status, setStatus] = useState("Waiting for probe input.");
  const [matchedCalibration, setMatchedCalibration] = useState(null);

  const currentView = useMemo(() => {
    return views.find((view) => view.id === matchedViewId) ?? null;
  }, [matchedViewId]);

  useEffect(() => {
    function applyProbeReading(reading) {
      const normalized = normalizeProbeReading(reading);
      setProbeReading(normalized);

      const calibrations = loadCalibrations();
      const match = findMatchingView(reading, calibrations, views);

      if (match) {
        setMatchedViewId(match.view.id);
        setMatchedCalibration(match.calibration);
        setStatus("Matched probe input with the closest calibrated TTE view.");
        return;
      }

      setMatchedViewId(null);
      setMatchedCalibration(null);
      setStatus("No calibrated view matched the current probe tag and quaternion.");
    }

    const unsubscribe =
      window.probeInput && typeof window.probeInput.onReading === "function"
        ? window.probeInput.onReading(applyProbeReading)
        : null;

    if (!unsubscribe) {
      setStatus("Waiting for probe input. No probe-reading event has been received yet.");
    }

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  const readingLabel = useMemo(() => {
    if (!probeReading) return "No probe data received yet";

    const parts = [];
    if (probeReading.rawTag) parts.push(`Tag: ${probeReading.rawTag}`);
    const quaternionLabel = formatQuaternion(extractQuaternion(probeReading));
    if (quaternionLabel) parts.push(quaternionLabel);
    if (probeReading.button !== undefined) parts.push(`Button: ${probeReading.button}`);
    if (probeReading.sequence !== undefined) parts.push(`Seq: ${probeReading.sequence}`);
    return parts.join(" | ") || "Probe data received";
  }, [probeReading]);

  const savedCalibrationLabel = useMemo(() => {
    if (!matchedCalibration) return status;

    return `${status} Saved tag: ${matchedCalibration.tag || "None"} | ${formatQuaternion(
      extractQuaternion(matchedCalibration)
    )}`;
  }, [matchedCalibration, status]);

  return (
    <div className="tte-ref-page">
      <div className="tte-ref-topband">
        <div className="tte-ref-brand-wrap">
          <div className="tte-ref-brand-title">Training Mode</div>
          <div className="tte-ref-brand-subtitle">
            Probe input is matched against your saved calibration values
          </div>
        </div>
      </div>

      <div className="tte-ref-content">
        <div className="tte-ref-card">
          <div className="tte-ref-card-titlebar">
            <div className="tte-ref-title-left">
              <span className="tte-ref-view-title">
                {currentView ? currentView.view_name : "Awaiting Matched View"}
              </span>
              <span className="tte-ref-green-pill">
                {currentView?.mnemonic ?? "Probe"}
              </span>
            </div>

            <span className="tte-ref-blue-pill">
              {currentView?.category ?? "Training"}
            </span>
          </div>

          <div className="tte-ref-main-body">
            <div className="tte-ref-media-grid">
              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">PROBE POSITION IMAGE</div>
                <div className="tte-ref-media-frame">
                  <MediaImage
                    src={currentView?.image}
                    alt={currentView?.view_name ?? "Matched TTE view"}
                    fallbackTitle="Waiting for a calibrated probe match"
                  />
                </div>
              </div>

              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">ECHOCARDIOGRAPHY VIDEO</div>
                <div className="tte-ref-media-frame">
                  <MediaVideo
                    src={currentView?.video}
                    fallbackTitle="Matched echocardiography video will appear here"
                  />
                </div>
              </div>
            </div>

            <div className="tte-ref-details-grid">
              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">PROBE INPUT</div>
                <div className="tte-ref-detail-value">{readingLabel}</div>
              </div>

              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">MATCH STATUS</div>
                <div className="tte-ref-detail-value">
                  {currentView && matchedCalibration ? savedCalibrationLabel : status}
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
