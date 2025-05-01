import { useState } from "react";
import { Howl } from "howler";
import { motion } from "framer-motion";
import "./index.css";

const maxSolubility = {
  5: 2,
  25: 5,
  45: 8,
};

const pourSound = new Howl({
  src: ["/sounds/pour.mp3"]
});

export default function App() {
  const [cups, setCups] = useState({
    5: 0,
    25: 0,
    45: 0,
  });

  const addSugar = (temp) => {
    pourSound.play();
    setCups((prev) => {
      const newCount = prev[temp] + 1;
      return {
        ...prev,
        [temp]: newCount,
      };
    });
  };

  const reset = () => {
    setCups({ 5: 0, 25: 0, 45: 0 });
  };

  return (
    <div className="container">
      <h1>Sugar Solubility at Different Temperatures</h1>
      <div className="beakers">
        {[5, 25, 45].map((temp) => (
          <div key={temp} className="beaker">
            <div className="glass">
              <motion.div
                className="solution"
                initial={{ height: 0 }}
                animate={{ height: `${Math.min(cups[temp], maxSolubility[temp]) * 10 + 20}px` }}
                transition={{ duration: 0.5 }}
              />
              <div className="status">
                {cups[temp] <= maxSolubility[temp]
                  ? "All sugar dissolved"
                  : "Undissolved sugar present"}
              </div>
            </div>
            <p>{temp}°C</p>
            <p>Spoons added: {cups[temp]}</p>
            <button onClick={() => addSugar(temp)}>Add one spoon of sugar</button>
          </div>
        ))}
      </div>
      <button onClick={reset} className="reset">Reset Experiment</button>
    </div>
  );
}