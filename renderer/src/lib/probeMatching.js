const CALIBRATION_STORAGE_KEY = "tte-calibration-settings";
const DEFAULT_COORDINATE_TOLERANCE = 36;

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function normalizeTag(tag) {
  return String(tag ?? "").trim().toLowerCase();
}

export function normalizeCoordinate(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.round(numeric) : null;
}

export function loadCalibrations() {
  if (!canUseStorage()) return {};

  try {
    const raw = window.localStorage.getItem(CALIBRATION_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCalibration(viewId, calibration) {
  if (!canUseStorage()) return {};

  const next = {
    ...loadCalibrations(),
    [String(viewId)]: calibration
  };

  window.localStorage.setItem(CALIBRATION_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function getCalibration(viewId) {
  return loadCalibrations()[String(viewId)] ?? null;
}

export function normalizeProbeReading(reading) {
  if (!reading || typeof reading !== "object") return null;

  return {
    x: normalizeCoordinate(reading.x),
    y: normalizeCoordinate(reading.y),
    tag: normalizeTag(reading.tag),
    rawTag: String(reading.tag ?? "").trim()
  };
}

export function findMatchingView(reading, calibrations, views) {
  const normalized = normalizeProbeReading(reading);
  if (!normalized) return null;

  const candidates = views
    .map((view) => {
      const saved = calibrations[String(view.id)];
      if (!saved) return null;

      const savedTag = normalizeTag(saved.tag);
      const savedX = normalizeCoordinate(saved.x);
      const savedY = normalizeCoordinate(saved.y);

      const hasCoordinates = normalized.x !== null && normalized.y !== null;
      const savedHasCoordinates = savedX !== null && savedY !== null;
      const tagMatches =
        !normalized.tag || !savedTag ? true : normalized.tag === savedTag;

      if (!tagMatches) return null;

      const dx = hasCoordinates && savedHasCoordinates ? Math.abs(normalized.x - savedX) : Number.POSITIVE_INFINITY;
      const dy = hasCoordinates && savedHasCoordinates ? Math.abs(normalized.y - savedY) : Number.POSITIVE_INFINITY;
      const distance =
        Number.isFinite(dx) && Number.isFinite(dy)
          ? Math.hypot(dx, dy)
          : Number.POSITIVE_INFINITY;

      return {
        view,
        calibration: saved,
        dx,
        dy,
        distance,
        exactCoordinateMatch:
          dx <= DEFAULT_COORDINATE_TOLERANCE && dy <= DEFAULT_COORDINATE_TOLERANCE
      };
    })
    .filter(Boolean);

  if (!candidates.length) return null;

  const exact = candidates
    .filter((candidate) => candidate.exactCoordinateMatch)
    .sort((left, right) => left.distance - right.distance);

  if (exact.length) return exact[0];

  const tagged = candidates.filter((candidate) => normalized.tag && normalizeTag(candidate.calibration.tag) === normalized.tag);
  const ranked = (tagged.length ? tagged : candidates).sort(
    (left, right) => left.distance - right.distance
  );

  return ranked[0] ?? null;
}

export { CALIBRATION_STORAGE_KEY, DEFAULT_COORDINATE_TOLERANCE };
