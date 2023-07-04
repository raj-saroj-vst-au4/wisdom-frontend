import { useState } from "react";

function FeeModal({
  showModal,
  toggleModal,
  name,
  phone,
  feedbid,
  feeyear,
  feemonth,
  feestatus,
}) {
  const [newFee, setNewFee] = useState("");
  const handleAddFee = async (studentid, year, month, fee) => {
    try {
      const response = await fetch(
        `http://localhost:8800/addFee/${studentid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year,
            month,
            fee,
          }),
        }
      );
      if (response.ok) {
        console.log(response);
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
            </p>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Load Fee : Rs.</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter fees to save"
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
              <button type="button" className="btn btn-danger">
                Mark as Unpaid
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleAddFee(feedbid, feeyear, feemonth, newFee)}
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
