import { useState } from "react";
import { views } from "../../../data/tteData.js";

export default function Training({ setMode }) {
  const [current, setCurrent] = useState(Math.floor(Math.random() * 20));
  const [show, setShow] = useState(false);

  const view = views[current];

  return (
    <>
      <div className="header">Training Mode</div>

      <div className="content">
        <div className="panel" style={{ width: "100%" }}>
          <div className="viewer">
            <div className="box">Image</div>
            <div className="box">Video</div>
          </div>

          <div className="footer">
            <button onClick={() => setShow(true)}>
              Show Answer
            </button>

            <button
              onClick={() => {
                setCurrent(Math.floor(Math.random() * 20));
                setShow(false);
              }}
            >
              Next
            </button>

            <button onClick={() => setMode("home")}>
              Home
            </button>
          </div>

          {show && (
            <div className="panel">
              <h3>{view.view_name}</h3>
              <p>{view.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}