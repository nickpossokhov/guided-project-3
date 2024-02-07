import PredictionResult from "./predictionResults";
import Carousel from "./Carousel"; // Import the Carousel component
import { useState } from "react";
import { api } from "../util/apiCall";

const unit_types = ['unknown', 'at-st', 'stormtrooper', 'x-wing', 'tie_silencer', 'tie_fighter', 
        'at-at', 'resistance_soldier'];

const homeworlds = ['Champala', 'Tund', 'Mirial', 'Haruun Kal', 'Stewjon', 'Toydaria',
       'Naboo', 'Troiken', 'Dathomir', 'Iktotch', 'Concord Dawn', 'Dorin',
       'Dagobah', 'Cerea', 'Rodia', 'Serenno', 'Kashyyyk', 'Corellia',
       'Tholoth', 'Iridonia', 'Glee Anselm', 'Bestine IV', 'Ojom',
       'Socorro', 'Ryloth', 'Malastare', 'Quermia', 'Mon Cala',
       'Chandrila', 'Skako', 'Alderaan', 'Umbara', 'Aleen Minor',
       'Tatooine', 'Muunilinst', 'Zolan', 'Trandosha', 'Sullust', 'Shili',
       'Kalee', 'Eriadu', 'Vulpter'];

export default function Home() {
  const apiEndpoint = "predict";
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

  // const handleSelectChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await api.post(apiEndpoint, formData);
      if (responseData) {
        setPredictionData(responseData);
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
              {/* <input
                type="text"
                name="homeworld"
                className="form-control"
                value={formData.homeworld}
                onChange={handleChange}
                id="exampleFormControlInput"
                placeholder="Shili"
              ></input>
              <input
                type="text"
                name="homeworld"
                className="form-control"
                value={formData.homeworld}
                onChange={handleChange}
                id="exampleFormControlInput"
                placeholder="Shili"
              ></input> */}
              <select className="form-select" name="homeworld" aria-label="Default select example" onChange={handleChange}>
                {homeworlds.map((world, index) => <option value={world}>{world}</option>)}
                <option selected>Select a Homeworld</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Unit Type
              </label>
              {/* <input
                type="text"
                name="unit_type"
                className="form-control"
                value={formData.unit_type}
                onChange={handleChange}
                id="exampleFormControlInput1"
                placeholder="at-st"
              ></input> */}
              <select className="form-select" name="unit_type" aria-label="Default select example" onChange={handleChange}>
                {unit_types.map((unit_type, index) => <option value={unit_type} >{unit_type}</option>)}
                <option selected>Select a Unit Type</option>
              </select>
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
