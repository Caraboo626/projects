import React from "react";
import "../hooks/externalscripts"
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { useState } from "react";
import script from "../web_pages/script";
import SignModal from '../components/Modal/SignModal'


class homepage extends React.Component{
  
  render(){
    console.log("in render");
    const handleExport = () => {
      console.log("entering export segment")
      // Capture the colors div using HTML2Canvas
      html2canvas(document.getElementById("colors")).then(canvas => {
          // Convert canvas to a Data URL
          const dataURL = canvas.toDataURL("image/png");
          // Create a download link
          const downloadLink = document.createElement("a");
          downloadLink.href = dataURL;
          downloadLink.download = "paletteImage.png";
          // Trigger the download
          downloadLink.click();
      });
  };    
    return (
        <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="App.css" />
          <form>
            <div id="searchDiv">
            <header>
              <div className="title">
                <p>
                    PickPalette 
                </p>
            </div>
            </header>
              <input
                id="search"
                type="text"
                placeholder="Enter a theme (Try rainbow, aquatic, or earth!)"
              />
            </div>
          </form>
          <div id="controls">
            <p>Press Space to generate new colors</p>
          </div>
          <div id="colors">
            <svg width={200} height={200}>
              <rect id="color1" width={200} height={200} fill="#FF6F6F" />
            </svg>
            <svg width={200} height={200}>
              <rect id="color2" width={200} height={200} fill="#FFA36F" />
            </svg>
            <svg width={200} height={200}>
              <rect id="color3" width={200} height={200} fill="#FFE86F" />
            </svg>
            <svg width={200} height={200}>
              <rect id="color4" width={200} height={200} fill="#95FF6F" />
            </svg>
            <svg width={200} height={200}>
              <rect id="color5" width={200} height={200} fill="#6FE5FF" />
            </svg>
            <svg width={200} height={200}>
              <rect id="color6" width={200} height={200} fill="#DA6FFF" />
            </svg>
          </div>
          <div id="codes">
            <p id="code1" className="individualCode">
              FF6F6F
            </p>
            <p id="code2" className="individualCode">
              FFA36F
            </p>
            <p id="code3" className="individualCode">
              FFE86F
            </p>
            <p id="code4" className="individualCode">
              95FF6F
            </p>
            <p id="code5" className="individualCode">
              6FE5FF
            </p>
            <p id="code6" className="individualCode">
              DA6FFF
            </p>
          </div>
          <div class="actions">
            <button className="myButton" type="button" id="export" onClick={handleExport}>
              Export
            </button>
            <div id="about">
              <SignModal></SignModal>
            </div>
          </div>
      </div>
      
    );
    }

}
export default homepage;