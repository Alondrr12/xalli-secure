import React, { useState } from "react";

export default function App() {
  const [property, setProperty] = useState("");
  const [devices, setDevices] = useState("");
  const [score, setScore] = useState(null);

  const calculateRisk = () => {
    let risk = 100;

    const deviceList = devices.split(",");
    const deviceCount = deviceList.length;

    risk -= deviceCount * 5;

    if (devices.toLowerCase().includes("camera")) risk -= 10;
    if (devices.toLowerCase().includes("lock")) risk -= 10;
    if (devices.toLowerCase().includes("router")) risk -= 10;

    if (risk < 0) risk = 0;

    setScore(risk);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Xalli Secure™</h1>
      <p>Cyber Risk Assessment for Smart Properties</p>

      <h2>Property</h2>
      <input
        placeholder="Enter property name"
        value={property}
        onChange={(e) => setProperty(e.target.value)}
      />

      <h2>Devices (comma separated)</h2>
      <input
        placeholder="camera, lock, router"
        value={devices}
        onChange={(e) => setDevices(e.target.value)}
      />

      <br /><br />
      <button onClick={calculateRisk}>Generate Risk Score</button>

      {score !== null && (
        <div style={{ marginTop: 20 }}>
          <h2>Risk Score: {score}</h2>
          <p>
            {score < 40
              ? "High Risk"
              : score < 70
              ? "Moderate Risk"
              : "Low Risk"}
          </p>

          <button onClick={() => alert("PDF Report Generated!")}>
            Generate Report
          </button>
        </div>
      )}
    </div>
  );
}
