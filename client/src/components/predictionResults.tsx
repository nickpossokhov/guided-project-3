import React from "react";
import { Bar } from "react-chartjs-2";

export default function PredictionResult() {
  return (
    <div>
      <h4>Our Prediction</h4>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-header">Featured</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Model Score: </li>
          <li className="list-group-item">F1-score: </li>
          <li className="list-group-item">Recall:</li>
          <li className="list-group-item">Precision:</li>
          <li className="list-group-item">Accuracy:</li>
          <li className="list-group-item">Confusion Matrix:</li>
        </ul>
      </div>
    </div>
  );
}



const BarChart = ({ featureImportances }) => {
  const data = {
    labels: featureImportances.map((item) => item.Feature),
    datasets: [
      {
        label: "Importance",
        data: featureImportances.map((item) => item.Importance),
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
      <Bar data={data} options={options} />
    </div>
  );
};