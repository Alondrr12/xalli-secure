import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

/* 🔐 LOGIN */
function Login({ setLoggedIn }) {
  return (
    <div style={loginContainer}>
      <div style={loginCard}>
        <div style={logo}>
          <div style={logoBox}>X</div>
          <span>Xalli Secure</span>
        </div>

        <p style={{ color: "#9ca3af" }}>
          Secure Your Space. Simplify Your Risk.
        </p>

        <input style={input} placeholder="Email" />
        <input style={input} type="password" placeholder="Password" />

        <button style={primaryButton} onClick={() => setLoggedIn(true)}>
          Sign In
        </button>
      </div>
    </div>
  );
}

/* 🧭 SIDEBAR */
function Sidebar() {
  return (
    <div style={sidebar}>
      <div style={logo}>
        <div style={logoBox}>X</div>
        <span>Xalli Secure</span>
      </div>

      <Link style={nav} to="/">Dashboard</Link>
      <Link style={nav} to="/properties">Properties</Link>
      <Link style={nav} to="/analytics">Analytics</Link>
      <Link style={nav} to="/reports">Reports</Link>
      <Link style={nav} to="/account">Account</Link>
    </div>
  );
}

/* 🧠 DASHBOARD (NOW INCLUDES PROPERTIES) */
function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [score, setScore] = useState(null);

  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState("");

  const addDevice = () => setDevices([...devices, ""]);

  const updateDevice = (i, val) => {
    const copy = [...devices];
    copy[i] = val;
    setDevices(copy);
  };

  const addProperty = () => {
    if (!newProperty) return;
    setProperties([...properties, newProperty]);
    setNewProperty("");
  };

  const calculate = () => {
    let risk = 100;

    devices.forEach(d => {
      const device = d.toLowerCase();
      if (device.includes("camera")) risk -= 10;
      if (device.includes("router")) risk -= 15;
      if (device.includes("lock")) risk -= 8;
    });

    if (risk < 0) risk = 0;
    setScore(risk);
  };

  return (
    <div style={card}>
      <h2>Dashboard</h2>

      {/* PROPERTIES SECTION */}
      <h3>Properties</h3>
      <input
        style={input}
        placeholder="Add property..."
        value={newProperty}
        onChange={(e) => setNewProperty(e.target.value)}
      />

      <button style={primaryButton} onClick={addProperty}>
        Add Property
      </button>

      {properties.map((p, i) => (
        <div key={i} style={propertyItem}>{p}</div>
      ))}

      {/* DEVICES */}
      <h3 style={{ marginTop: 20 }}>Devices</h3>

      <button style={secondaryButton} onClick={addDevice}>
        + Add Device
      </button>

      {devices.map((d, i) => (
        <input
          key={i}
          style={input}
          placeholder="camera, router..."
          value={d}
          onChange={(e) => updateDevice(i, e.target.value)}
        />
      ))}

      <button style={primaryButton} onClick={calculate}>
        Analyze Risk
      </button>

      {/* RESULTS */}
      {score !== null && (
        <>
          <h2 style={{ marginTop: 20 }}>Risk Score: {score}</h2>

          <div style={barContainer}>
            <div style={{ ...barFill, width: `${score}%` }} />
          </div>
        </>
      )}
    </div>
  );
}

/* 🏠 PROPERTIES PAGE */
function Properties() {
  return (
    <div style={card}>
      <h2>Properties</h2>
      <p>Manage all properties here.</p>
    </div>
  );
}

/* 📊 ANALYTICS */
function Analytics() {
  return (
    <div style={card}>
      <h2>Analytics</h2>

      <div style={chartBar(30)} />
      <div style={chartBar(60)} />
      <div style={chartBar(80)} />

      <p style={{ marginTop: 10 }}>
        Device risk trends over time.
      </p>
    </div>
  );
}

/* 📄 REPORTS */
function Reports() {
  return (
    <div style={card}>
      <h2>Reports</h2>
      <p>Security reports will appear here.</p>
    </div>
  );
}

/* 👤 ACCOUNT */
function Account() {
  return (
    <div style={card}>
      <h2>Account</h2>

      <p><strong>Name:</strong> Alondra</p>
      <p><strong>Role:</strong> Security Analyst</p>
      <p><strong>Plan:</strong> Premium</p>

      <button style={secondaryButton}>Logout</button>
    </div>
  );
}

/* 🧠 MAIN APP */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <Login setLoggedIn={setLoggedIn} />;

  return (
    <Router>
      <div style={layout}>
        <Sidebar />

        <div style={main}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

/* 🎨 STYLES */

const layout = {
  display: "flex",
  height: "100vh",
  background: "#0a0a0a",
  color: "white",
  fontFamily: "Arial"
};

const sidebar = {
  width: 220,
  background: "#1a1a1a",
  padding: 20
};

const nav = {
  display: "block",
  marginTop: 15,
  color: "#9ca3af",
  textDecoration: "none"
};

const main = {
  flex: 1,
  padding: 30
};

const card = {
  background: "#1a1a1a",
  padding: 20,
  borderRadius: 10,
  maxWidth: 500
};

const input = {
  padding: 10,
  marginTop: 10,
  width: "100%",
  borderRadius: 6,
  border: "none",
  background: "#2a2a2a",
  color: "white"
};

const primaryButton = {
  marginTop: 10,
  padding: 12,
  background: "#7f1d1d",
  color: "white",
  border: "none",
  borderRadius: 6
};

const secondaryButton = {
  marginTop: 10,
  padding: 10,
  background: "#2a2a2a",
  color: "white",
  border: "none",
  borderRadius: 6
};

const barContainer = {
  height: 10,
  background: "#2a2a2a",
  marginTop: 10
};

const barFill = {
  height: "100%",
  background: "#7f1d1d"
};

const propertyItem = {
  background: "#2a2a2a",
  padding: 10,
  marginTop: 5,
  borderRadius: 6
};

const chartBar = (width) => ({
  height: 20,
  width: `${width}%`,
  background: "#7f1d1d",
  marginTop: 10
});

const loginContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#0a0a0a"
};

const loginCard = {
  background: "#1a1a1a",
  padding: 30,
  borderRadius: 10,
  textAlign: "center",
  width: 300
};

const logo = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 10,
  fontWeight: "bold"
};

const logoBox = {
  width: 30,
  height: 30,
  background: "#991b1b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 6
};