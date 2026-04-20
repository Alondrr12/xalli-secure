import React, { useState } from "react";

export default function App() {
  const [property, setProperty] = useState("");
  const [deviceList, setDeviceList] = useState([]);
  const [score, setScore] = useState(null);

  const addDevice = () => {
    setDeviceList([...deviceList, ""]);
  };

  const updateDevice = (index, value) => {
    const updated = [...deviceList];
    updated[index] = value;
    setDeviceList(updated);
  };

  const calculateRisk = () => {
    let risk = 100;

    deviceList.forEach((device) => {
      const d = device.toLowerCase();

      if (d.includes("camera")) risk -= 10;
      if (d.includes("router")) risk -= 15;
      if (d.includes("lock")) risk -= 8;
      if (d.includes("wifi")) risk -= 12;
    });

    if (deviceList.length > 5) risk -= 10;

    if (risk < 0) risk = 0;

    setScore(risk);
  };

  const getColor = () => {
    if (score < 40) return "red";
    if (score < 70) return "orange";
    return "green";
  };

  return (
    <div style={{
      padding: 40,
      fontFamily: "Arial",
      maxWidth: 600,
      margin: "auto",
      textAlign: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <h1>Xalli Secure™</h1>
      <p>Cloud-Based Cyber Risk Assessment for Smart Properties</p>

      <h2>Property</h2>
      <input
        style={{ padding: 10, marginBottom: 20, width: "100%" }}
        placeholder="Enter property name"
        value={property}
        onChange={(e) => setProperty(e.target.value)}
      />

      <h2>Devices</h2>
      <button onClick={addDevice}>+ Add Device</button>

      {deviceList.map((device, index) => (
        <input
          key={index}
          style={{ display: "block", margin: "10px auto", padding: 10 }}
          placeholder="Device (camera, router...)"
          value={device}
          onChange={(e) => updateDevice(index, e.target.value)}
        />
      ))}

      <br />
      <button
        style={{ padding: 10, marginTop: 20 }}
        onClick={calculateRisk}
      >
        Generate Risk Score
      </button>

      {score !== null && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ color: getColor() }}>
            Risk Score: {score}
          </h2>

          <p>
            {score < 40
              ? "High Risk"
              : score < 70
              ? "Moderate Risk"
              : "Low Risk"}
          </p>

          {score < 70 && (
            <div>
              <h3>Recommendations:</h3>
              <ul style={{ textAlign: "left" }}>
                <li>Change default passwords</li>
                <li>Enable encryption</li>
                <li>Update firmware</li>
                <li>Segment network devices</li>
              </ul>
            </div>
          )}

          <button
            onClick={() => {
              const report = `
Property: ${property}
Devices: ${deviceList.join(", ")}
Risk Score: ${score}
              `;
              alert(report);
            }}
          >
            Generate Report
          </button>
        </div>
      )}
    </div>
  );
}