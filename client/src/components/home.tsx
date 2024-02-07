import PredictionResult from "./predictionResults";
import Carousel from "./Carousel"; // Import the Carousel component
import { useState } from "react";
import { api } from "../util/apiCall";

export default function Home() {
  const apiEndpoint = "/get/predict";
  const [formData, setFormData] = useState({
    homeworld: "",
    unit_type: "",
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await api.post(apiEndpoint, formData);
      if (responseData) {
        setPredictionData(responseData.data);
        setSubmissionSuccess(true);
      }
    } catch (error) {
      console.error("Error adding post:", error.message);
      setSubmissionSuccess(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Stellar Forces Oracle</h1>
      <div className="row d-flex justify-content-center m-4 p-4 ">
        <div className="col-6">
          <h4>Hey, There</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput" className="form-label">
                Homeworld
              </label>
              <input
                type="text"
                name="homeworld"
                className="form-control"
                value={formData.homeworld}
                onChange={handleChange}
                id="exampleFormControlInput"
                placeholder="Shili"
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Unit Type
              </label>
              <input
                type="text"
                name="unit_type"
                className="form-control"
                value={formData.unit_type}
                onChange={handleChange}
                id="exampleFormControlInput1"
                placeholder="at-st"
              ></input>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Predict
              </button>
            </div>
          </form>
        </div>
        <div className="col-6">
          {submissionSuccess ? (
            <PredictionResult data={predictionData} />
          ) : (
            <Carousel />
          )}
        </div>
      </div>
    </div>
  );
}
