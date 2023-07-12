import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudentModal({ showModal, toggleModal, API_URL }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [standard, setStandard] = useState("");
  const [batch, setBatch] = useState("");
  const [fees, setFees] = useState("");
  const token = localStorage.getItem("token");

  if (!token || JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()) {
    return window.location.replace("/login");
  }

  const handleAddStudent = async () => {
    if (!name) {
      return alert("Input the Name");
    } else if (isNaN(number) || 9999999999 < number || number < 5000000000) {
      return alert("Input Valid Phone Number");
    } else if (isNaN(fees) || fees < 50) {
      return alert("Invalid Fees");
    } else if (!standard) {
      return alert("Select Class or Standard");
    } else if (!batch) {
      return alert("Select the batch");
    } else {
      const studentid =
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 1000000;
      try {
        const response = await fetch(`${API_URL}/addStudent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            name,
            number: "+91" + number.toString(),
            standard,
            batch,
            fees,
            studentid,
          }),
        });
        if (response.ok) {
          toggleModal();
          window.location.replace("/students");
        } else if (response.status === 401) {
          return window.location.replace("/login");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add a New Student</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={toggleModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Students Full Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <br />

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Phone No.</label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">+91</div>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id="inputNumber"
                      placeholder="Parents Phone"
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Class</label>
                <div className="col-sm-9">
                  <select
                    id="inputClass"
                    className="form-control"
                    defaultValue="null"
                    onChange={(e) => setStandard(e.target.value)}
                  >
                    <option value="null" disabled>
                      Select Class
                    </option>
                    <option value="0">KG</option>
                    <option value="1">1st Standard</option>
                    <option value="2">2nd Standard</option>
                    <option value="3">3rd Standard</option>
                    <option value="4">4th Standard</option>
                    <option value="5">5th Standard</option>
                  </select>
                </div>
              </div>
              <br />
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Batch</label>
                <div className="col-sm-9">
                  <select
                    id="inputBatch"
                    className="form-control"
                    defaultValue="null"
                    onChange={(e) => setBatch(e.target.value)}
                  >
                    <option value="null" disabled>
                      Select Batch
                    </option>
                    <option value="911">9 to 11 Morning Batch</option>
                    <option value="24">2 to 4 Afternoon Batch</option>
                    <option value="46">4 to 6 Afternoon Batch</option>
                    <option value="79">7 to 9 Evening Batch</option>
                  </select>
                </div>
              </div>
              <br />
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Fees</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    id="inputFees"
                    placeholder="Monthly Fees"
                    onChange={(e) => setFees(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => handleAddStudent(e)}
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudentModal;
