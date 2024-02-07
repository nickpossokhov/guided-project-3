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
