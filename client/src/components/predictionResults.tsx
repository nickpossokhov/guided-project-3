import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";

export default function PredictionResult(props) {
  const data = props.data;
  const is_resistance = data.is_resistance == "True";
  const model_score = data.accuracy_score;
  const feature_importances = data.feature_importances;

  return (
    <div>
      <h4>Our Prediction</h4>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-header">Featured</div>
        <ul className="list-group list-group-flush">
        <li className="list-group-item">Prediction: {is_resistance ? "Resistance" : "Empire"}</li>
          <li className="list-group-item">Model Score: {model_score}</li>
        </ul>
      </div>
      {/* <div>
        <BarChart featureImportances={feature_importances} />
      </div> */}
    </div>
  );
}



const BarChart = ({ featureImportances }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      chart.destroy();
    }
  }, []);

  const importances = Object.values(featureImportances);
  const features = Object.keys(featureImportances)

  const data = {
    labels: features,
    datasets: [
      {
        label: "Importance",
        data: importances,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 80,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};