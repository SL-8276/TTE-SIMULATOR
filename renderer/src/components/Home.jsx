export default function Home({ setMode }) {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="title">TTE SIMULATOR</h1>

        <button className="main-btn" onClick={() => setMode("teaching")}>
          Teaching Mode
        </button>

        <button className="main-btn" onClick={() => setMode("training")}>
          Training Mode
        </button>

        <button className="main-btn" onClick={() => setMode("calibration")}>
          Calibration Mode
        </button>
      </div>
    </div>
  );
}