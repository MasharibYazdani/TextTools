import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState } from "react";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#17162c";
      showAlert("Dark Mode has been Enabled!", "success");
      // document.title = "TextTools - Dark Mode"; //To show in the title when dark mode is enabled.
      // setInterval(() => {   //To blink the title
      //   document.title = "TextTools is Amazing";
      // }, 2000);

      // setInterval(() => {
      //   document.title = "Install TextTools now!";
      // }, 1500);
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode has been Enabled!", "success");
    }
  };

  return (
    <>
      {/* <Navbar title = "TextUtils" about = "About"/> */}
      {/* <Navbar /> */}

      <Router>
        <Navbar title="TextTools" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />

        <div className="container my-3">
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route
              exact //React always do partial match so we need to write exact for exact match
              path="/"
              element={
                <div className="container my-3">
                  <TextForm
                    heading="Enter your text to Analyze."
                    mode={mode}
                    showAlert={showAlert}
                  />
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
