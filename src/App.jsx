import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './App.css';



const App = () => {
  const [outputs, setOutputs] = useState([]);  // Handle multiple objects
  const webcamRef = useRef(null);

  const captureAndAnalyze = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    // Dummy data with multiple detected objects
    const dummyData = [
      {
        type: 'freshness',
        freshnessIndex: 7,
        ripenessStage: "Moderately Ripe",
        color: "Yellowish Green",
        nutrition: "Good source of Vitamin A and C",
        weight: "200g",
        lifespanLeft: "4 days"
      },
      {
        type: 'grocery',
        brandName: "XYZ Brand",
        variant: "Whole Wheat Flour",
        expiryDate: "2025-06-15",
        description: "1kg pack of whole wheat flour."
      },
      {
        type: 'freshness',
        freshnessIndex: 9,
        ripenessStage: "Fully Ripe",
        color: "Bright Yellow",
        nutrition: "High Potassium",
        weight: "150g",
        lifespanLeft: "1 day"
      }
    ];

    // Set the dummy data as outputs
    setOutputs(dummyData);
  };

  return (
    <div>
      <h1>Freshness and Grocery Detection</h1>

      <div className="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="40%"
        />
      </div>

      <button onClick={captureAndAnalyze}>Capture & Analyze</button>
      
      {outputs.length > 0 && (
        <div className="output-container">
          <h2>Detected Objects:</h2>
          {outputs.map((output, index) => (
            <div key={index} className="output-item">
              <h3>Object {index + 1}</h3>
              {output.type === 'freshness' ? (
                <>
                  <p><strong>Freshness Index:</strong> {output.freshnessIndex}</p>
                  <p><strong>Ripeness Stage:</strong> {output.ripenessStage}</p>
                  <p><strong>Color:</strong> {output.color}</p>
                  <p><strong>Nutrition:</strong> {output.nutrition}</p>
                  <p><strong>Weight:</strong> {output.weight}</p>
                  <p><strong>Lifespan Left:</strong> {output.lifespanLeft}</p>
                </>
              ) : (
                <>
                  <p><strong>Brand Name:</strong> {output.brandName}</p>
                  <p><strong>Variant:</strong> {output.variant}</p>
                  <p><strong>Expiry Date:</strong> {output.expiryDate}</p>
                  <p><strong>Description:</strong> {output.description}</p>
                </>
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;