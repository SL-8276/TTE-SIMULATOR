export default function Home({ setMode }) {
  return (
    <div className="home-page">
      <div className="home-shell">
        <div className="home-title-block">
          <div className="home-kicker">Transthoracic Echocardiography Learning Tool</div>
          <h1 className="home-title">TTE SIMULATOR</h1>
          <p className="home-subtitle">
            Learn, review, and practice the 20 standard TTE views
          </p>
        </div>

        <div className="home-button-row">
          <button className="home-action-btn" onClick={() => setMode("teaching")}>
            <span className="home-action-title">Teaching Mode</span>
            <span className="home-action-text">Reference-guided learning</span>
          </button>

          <button className="home-action-btn" onClick={() => setMode("training")}>
            <span className="home-action-title">Training Mode</span>
            <span className="home-action-text">Self-testing and recall</span>
          </button>

          <button className="home-action-btn" onClick={() => setMode("calibration")}>
            <span className="home-action-title">Calibration Mode</span>
            <span className="home-action-text">Tagging and coordinate capture</span>
          </button>
        </div>
      </div>
    </div>
  );
}