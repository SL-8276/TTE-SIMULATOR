import { useState } from "react";
import { views } from "../../../data/tteData.js";

export default function Calibration({ setMode }) {
  const [coords, setCoords] = useState(null);
  const [tag, setTag] = useState("");

  function handleClick(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  }

  return (
    <>
      <div className="header">Calibration Mode</div>

      <div className="content">
        <div className="panel" style={{ width: "100%" }}>
          <div className="viewer">
            <div className="box" onClick={handleClick}>
              Click Image
            </div>
            <div className="box">Video</div>
          </div>

          <div className="footer">
            <input
              placeholder="Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />

            <div>
              {coords && `X:${coords.x} Y:${coords.y}`}
            </div>

            <button>SET</button>

            <button onClick={() => setMode("home")}>
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}