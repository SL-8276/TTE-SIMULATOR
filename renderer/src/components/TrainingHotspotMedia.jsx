import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_MEDIA_SIZE = { width: 16, height: 9 };
const QUIZ_PANEL_WIDTH = 216;
const QUIZ_PANEL_HEIGHT = 158;
const CORRECT_DISMISS_DELAY = 300;

export function TrainingHotspotVideo({
  src,
  fallbackTitle = "Echocardiography Video",
  hotspots = [],
  optionPool = []
}) {
  const stageRef = useRef(null);
  const dismissTimerRef = useRef(null);
  const [error, setError] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [mediaSize, setMediaSize] = useState(DEFAULT_MEDIA_SIZE);
  const [activeSpotId, setActiveSpotId] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setError(false);
    setActiveSpotId("");
    setAnswers({});
    setMediaSize(DEFAULT_MEDIA_SIZE);
    clearDismissTimer(dismissTimerRef);
  }, [src]);

  useEffect(() => {
    return () => clearDismissTimer(dismissTimerRef);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const applySize = () => {
      const rect = stage.getBoundingClientRect();
      setStageSize({ width: rect.width, height: rect.height });
    };

    applySize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", applySize);
      return () => window.removeEventListener("resize", applySize);
    }

    const observer = new ResizeObserver(applySize);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const safeHotspots = useMemo(
    () => (Array.isArray(hotspots) ? hotspots : []),
    [hotspots]
  );

  const fitRect = useMemo(
    () => calculateFitRect(stageSize, mediaSize),
    [mediaSize, stageSize]
  );

  const activeSpot = useMemo(
    () => safeHotspots.find((spot) => spot.id === activeSpotId) ?? null,
    [activeSpotId, safeHotspots]
  );

  const options = useMemo(
    () =>
      activeSpot
        ? buildOptions(activeSpot, safeHotspots, optionPool)
        : [],
    [activeSpot, optionPool, safeHotspots]
  );

  if (!src || error) {
    return (
      <div className="tte-ref-media-placeholder tte-ref-video-placeholder">
        <div className="tte-ref-media-placeholder-title">{fallbackTitle}</div>
      </div>
    );
  }

  const activeAnswer = activeSpot ? answers[activeSpot.id] : "";
  const activePoint = activeSpot ? getPointPosition(activeSpot, fitRect) : null;
  const panelStyle = activePoint
    ? getQuizPanelStyle(activePoint, stageSize)
    : undefined;

  function activateSpot(spotId, activationType = "click") {
    const activeIsUnresolved =
      activeSpotId && activeSpot && answers[activeSpotId] !== activeSpot.label;

    if ((activationType === "hover" || activationType === "focus") && dismissTimerRef.current) {
      return;
    }

    if (activeIsUnresolved && activeSpotId !== spotId) {
      return;
    }

    clearDismissTimer(dismissTimerRef);
    setActiveSpotId(spotId);
  }

  return (
    <div className="tte-hotspot-stage is-video" ref={stageRef}>
      <video
        key={src}
        className="tte-hotspot-media tte-video-bg"
        controls
        loop
        autoPlay
        muted
        playsInline
        src={src}
        style={fitRect}
        onError={() => setError(true)}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          setMediaSize({
            width: video.videoWidth || DEFAULT_MEDIA_SIZE.width,
            height: video.videoHeight || DEFAULT_MEDIA_SIZE.height
          });
        }}
      />

      <div className="tte-hotspot-layer" aria-hidden={!safeHotspots.length}>
        {safeHotspots.map((spot, index) => {
          const position = getPointPosition(spot, fitRect);
          const selected = activeSpotId === spot.id;
          const correct = answers[spot.id] === spot.label;

          return (
            <button
              aria-label={`Choose anatomy spot ${index + 1}`}
              className={`tte-hotspot-dot${selected ? " is-selected" : ""}${correct ? " is-correct" : ""}`}
              key={spot.id}
              onClick={() => activateSpot(spot.id)}
              onFocus={() => activateSpot(spot.id, "focus")}
              onMouseEnter={() => activateSpot(spot.id, "hover")}
              onMouseMove={() => activateSpot(spot.id, "hover")}
              onPointerEnter={() => activateSpot(spot.id, "hover")}
              onPointerMove={() => activateSpot(spot.id, "hover")}
              style={{
                left: position.left,
                top: position.top
              }}
              type="button"
            >
              <span className="tte-hotspot-pulse" />
            </button>
          );
        })}
      </div>

      {activeSpot ? (
        <div className="tte-hotspot-quiz" style={panelStyle}>
          <div className="tte-hotspot-quiz-header">
            <div className="tte-hotspot-quiz-title">Identify this structure</div>
            <button
              aria-label="Close identify popup"
              className="tte-hotspot-quiz-close"
              onClick={() => {
                clearDismissTimer(dismissTimerRef);
                setActiveSpotId("");
              }}
              type="button"
            >
              x
            </button>
          </div>
          <div className="tte-hotspot-options">
            {options.map((option) => {
              const selected = activeAnswer === option;
              const correct = selected && option === activeSpot.label;
              const wrong = selected && option !== activeSpot.label;

              return (
                <button
                  className={`tte-hotspot-option${correct ? " is-correct" : ""}${wrong ? " is-wrong" : ""}`}
                  key={option}
                  onClick={() => {
                    const isCorrect = option === activeSpot.label;
                    clearDismissTimer(dismissTimerRef);
                    setAnswers((current) => ({
                      ...current,
                      [activeSpot.id]: option
                    }));
                    if (isCorrect) {
                      dismissTimerRef.current = window.setTimeout(() => {
                        dismissTimerRef.current = null;
                        setActiveSpotId("");
                      }, CORRECT_DISMISS_DELAY);
                    }
                  }}
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function calculateFitRect(stageSize, mediaSize) {
  const stageWidth = stageSize.width || 1;
  const stageHeight = stageSize.height || 1;
  const mediaRatio =
    mediaSize.width && mediaSize.height
      ? mediaSize.width / mediaSize.height
      : DEFAULT_MEDIA_SIZE.width / DEFAULT_MEDIA_SIZE.height;
  const stageRatio = stageWidth / stageHeight;

  if (stageRatio > mediaRatio) {
    const height = stageHeight;
    const width = height * mediaRatio;
    return {
      height,
      left: (stageWidth - width) / 2,
      top: 0,
      width
    };
  }

  const width = stageWidth;
  const height = width / mediaRatio;
  return {
    height,
    left: 0,
    top: (stageHeight - height) / 2,
    width
  };
}

function getPointPosition(spot, fitRect) {
  return {
    left: fitRect.left + (fitRect.width * spot.x) / 100,
    top: fitRect.top + (fitRect.height * spot.y) / 100
  };
}

function getQuizPanelStyle(point, stageSize) {
  const padding = 12;
  const maxLeft = Math.max(padding, stageSize.width - QUIZ_PANEL_WIDTH - padding);
  const maxTop = Math.max(padding, stageSize.height - QUIZ_PANEL_HEIGHT - padding);
  const candidates = [
    { left: padding, top: padding },
    { left: maxLeft, top: padding },
    { left: padding, top: maxTop },
    { left: maxLeft, top: maxTop }
  ];
  const best = candidates
    .map((candidate) => {
      const centerX = candidate.left + QUIZ_PANEL_WIDTH / 2;
      const centerY = candidate.top + QUIZ_PANEL_HEIGHT / 2;
      const distance = Math.hypot(point.left - centerX, point.top - centerY);
      return { ...candidate, distance };
    })
    .sort((left, right) => right.distance - left.distance)[0];

  return {
    left: clamp(best.left, padding, maxLeft),
    top: clamp(best.top, padding, maxTop)
  };
}

function buildOptions(activeSpot, hotspots, optionPool) {
  const labels = uniqueLabels([
    ...hotspots.map((spot) => spot.label),
    ...(Array.isArray(optionPool) ? optionPool : [])
  ]);
  const distractorPool = labels.filter((label) => label !== activeSpot.label);
  const seed = getSeed(activeSpot.id);
  const rotated = rotate(distractorPool, distractorPool.length ? seed % distractorPool.length : 0);
  const baseOptions = [activeSpot.label, ...rotated.slice(0, 3)];
  const offset = baseOptions.length ? seed % baseOptions.length : 0;

  return rotate(baseOptions, offset).slice(0, 4);
}

function uniqueLabels(labels) {
  return labels
    .map((label) => String(label ?? "").trim())
    .filter(Boolean)
    .filter((label, index, all) => all.indexOf(label) === index);
}

function rotate(values, offset) {
  if (!values.length) return values;
  return [...values.slice(offset), ...values.slice(0, offset)];
}

function getSeed(value) {
  return String(value)
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function clearDismissTimer(timerRef) {
  if (timerRef.current) {
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }
}
