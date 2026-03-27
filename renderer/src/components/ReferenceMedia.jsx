import { useEffect, useState } from "react";

export function MediaImage({ src, alt, fallbackTitle = "Probe Position Image" }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    return (
      <div className="tte-ref-media-placeholder">
        <div className="tte-ref-media-placeholder-title">{fallbackTitle}</div>
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

export function MediaVideo({ src, fallbackTitle = "Echocardiography Video" }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    return (
      <div className="tte-ref-media-placeholder tte-ref-video-placeholder">
        <div className="tte-ref-media-placeholder-title">{fallbackTitle}</div>
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
