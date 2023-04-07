import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("Upper case was clicked");
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Coverted to Upper Case!", "success");
  };

  const handleLoClick = () => {
    // console.log("Lower case was clicked");
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Coverted to Lower Case!", "success");
  };

  const handleClearClick = () => {
    // console.log("Clear Text was clicked");
    setText("");
    props.showAlert("Text Cleared!", "success");
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    props.showAlert("Speaking!", "success");
  };

  const handleCopy = () => {
    let text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Copied to Clipboard!", "success");
  };

  const handleExtraSpace = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Space Removed!", "success");
  };

  const handleOnChange = (event) => {
    // console.log("On change");
    setText(event.target.value);
  };

  function wordCount(content) {
    if (content === "") {
      return 0;
    }
    let arr = content.split(" ");
    let len = arr.length;
    let count = 0;

    for (let i = 0; i < len; i++) {
      if (arr[i] === "" || arr[i] === " ") {
        count++;
      }
    }
    return len - count;
  }

  const [text, setText] = useState("");

  return (
    <>
      <div
        className="mb-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <textarea
          className="form-control my-3"
          style={{
            backgroundColor: props.mode === "dark" ? "grey" : "white",
            color: props.mode === "dark" ? "white" : "black",
          }}
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="8"
          placeholder="Enter your text here."
        ></textarea>
        {/* <br /> */}
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleClearClick}>
          Clear Text
        </button>
        <button className="btn btn-primary mx-1" onClick={speak}>
          Speak
        </button>
        <button className="btn btn-primary mx-1" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-primary mx-1" onClick={handleExtraSpace}>
          Remove Extra Space
        </button>
      </div>

      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Your Text Summary:</h2>
        <p>
          {wordCount(text)} Words ans {text.length} characters
        </p>
        <p>{0.08 * text.split(" ").length} minutes to read</p>
        <h2>Preview</h2>
        <p>
          {text.length > 0 ? text : "Enter something in Text Box to preview."}
        </p>
      </div>
    </>
  );
}
