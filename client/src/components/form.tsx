

export default function Form() {
  return (
    <div>
      <h4>Hey, There</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput" className="form-label">
            Homeworld
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput"
            placeholder="Shili"
          ></input>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Unit Type
          </label>
          <input
            type="email"
            className="form-control"
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
  );
}
