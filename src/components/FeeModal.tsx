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
              {feestatus ? "Paid Fee for " : "Unpaid Fee Pending for "}{" "}
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
              <button type="button" className="btn btn-success">
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
