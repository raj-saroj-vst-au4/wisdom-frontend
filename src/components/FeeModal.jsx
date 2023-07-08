import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "https://tricky-moth-shoe.cyclic.app";

function FeeModal({
  showModal,
  toggleModal,
  name,
  phone,
  feedbid,
  feeyear,
  feemonth,
  feestatus,
  student,
}) {
  const navigate = useNavigate();
  const [newFee, setNewFee] = useState("");

  const handleFee = async (action, studentid, year, month, fee, student) => {
    if(action === "addFee"){
      if (isNaN(fee) || fee < 50){
        return alert("Enter Fees Amount to add Fee")
      }
    }
    try {
      const response = await fetch(`${API_URL}/${action}/${studentid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year,
          month,
          fee,
        }),
      });
      if (response.ok) {
        toggleModal();
        setNewFee("");
        const res = await fetch(`${API_URL}/fetchFee/${student._id}`);
        if (res.ok) {
          const data = await res.json();
          const dataToPass = { stddata: student, feedata: data };
          const userSpecificPageUrl = `/feestatus/${student.name}`;
          navigate(userSpecificPageUrl, { state: dataToPass });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  function handleFeeChange(event) {
    setNewFee(event.target.value);
  }

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", { month: "long" });
  }
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
            <h5 className="modal-title">
              {name}'s Fee for {getMonthName(feemonth)} {feeyear}
            </h5>
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
          <p>
              Status of Fee :{" "}
              {feestatus
                ? `Paid ${feestatus.fee} on ${new Date(
                    feestatus.time
                  ).getDate()}`
                : `Unpaid Fee Pending for `}{" "}
              {getMonthName(feemonth)} {feeyear}
            </p>
                  <br />
                  {
              
              !feestatus ? (
                  <p>
                    Send Reminder :{" "}
                    <a
                      href={`https://api.whatsapp.com/send?phone=${phone}&text=Hi, this is ${name}'s tution teacher from wisdom classes. This is a reminder for payment of tution fees for ${getMonthName(
                        feemonth
                      )}.`}
                      className="btn btn-success"
                    >
                      <i className="bi bi-whatsapp"> Whatsapp </i>
                    </a>
                  </p>) : " "
            
            }
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Load Fee : Rs.</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter fees to save"
                required="required"
                onChange={handleFeeChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleModal}
            >
              Close
            </button>

            {feestatus ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  handleFee("delFee", feedbid, feeyear, feemonth, 0, student)
                }
              >
                Mark as Unpaid
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success"
                onClick={() =>
                  handleFee(
                    "addFee",
                    feedbid,
                    feeyear,
                    feemonth,
                    newFee,
                    student
                  )
                }
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeModal;
