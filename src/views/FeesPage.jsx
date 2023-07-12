import { useState } from "react";
import { useLocation } from "react-router-dom";
import FeeModal from "../components/FeeModal";

function FeesPage({ API_URL }) {
  const location = useLocation();
  const student = location.state.stddata;
  const feedata = location.state.feedata;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const feedataArray = Object.keys(feedata.year);
  const currDate = new Date();
  const stdjoiningdate = new Date(student.joiningdate);
  const stdyearmonth =
    stdjoiningdate.getFullYear() * 100 + stdjoiningdate.getMonth();
  const openModal = (name, phone, feedbid, year, month, status) => {
    setShowModal(true);
    setModalData({ name, phone, feedbid, year, month, status });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-4 p-4">
      <FeeModal
        showModal={showModal}
        toggleModal={closeModal}
        name={modalData.name}
        phone={modalData.phone}
        feedbid={modalData.feedbid}
        feeyear={modalData.year}
        feemonth={modalData.month}
        feestatus={modalData.status}
        student={student}
        API_URL={API_URL}
      />
      <h3 className="text-center mt-3">
        {student.name} Joined on{" "}
        {stdjoiningdate.toLocaleString("default", { month: "short" }) +
          " " +
          stdjoiningdate.getFullYear()}
      </h3>
      {feedata.year.length === 0 && <h3>No Fee Records</h3>}
      {feedataArray.map((yearly, index) => (
        <table className="table table-dark mt-4" key={index}>
          <thead>
            <tr>
              <th scope="col" colSpan="4" className="text-center">
                {student.name}'s Fee Record {yearly}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 0
                      ? "btn btn-disabled"
                      : feedata.year[yearly][0]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 0
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={(event) =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      0,
                      feedata.year[yearly][0]
                    )
                  }
                >
                  Jan
                </button>
              </td>

              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 1
                      ? "btn btn-disabled"
                      : feedata.year[yearly][1]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 1
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      1,
                      feedata.year[yearly][1]
                    )
                  }
                >
                  Feb
                </button>
              </td>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 2
                      ? "btn btn-disabled"
                      : feedata.year[yearly][2]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 2
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      2,
                      feedata.year[yearly][2]
                    )
                  }
                >
                  Mar
                </button>
              </td>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 3
                      ? "btn btn-disabled"
                      : feedata.year[yearly][3]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 3
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      3,
                      feedata.year[yearly][3]
                    )
                  }
                >
                  Apr
                </button>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 4
                      ? "btn btn-disabled"
                      : feedata.year[yearly][4]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 4
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      4,
                      feedata.year[yearly][4]
                    )
                  }
                >
                  May
                </button>
              </td>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 5
                      ? "btn btn-disabled"
                      : feedata.year[yearly][5]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 5
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      5,
                      feedata.year[yearly][5]
                    )
                  }
                >
                  Jun
                </button>
              </td>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 6
                      ? "btn btn-disabled"
                      : feedata.year[yearly][6]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 6
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      6,
                      feedata.year[yearly][6]
                    )
                  }
                >
                  Jul
                </button>
              </td>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 7
                      ? "btn btn-disabled"
                      : feedata.year[yearly][7]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 7
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      7,
                      feedata.year[yearly][7]
                    )
                  }
                >
                  Aug
                </button>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 8
                      ? "btn btn-disabled"
                      : feedata.year[yearly][8]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 8
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      8,
                      feedata.year[yearly][8]
                    )
                  }
                >
                  Sep
                </button>
              </td>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 9
                      ? "btn btn-disabled"
                      : feedata.year[yearly][9]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 9
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      9,
                      feedata.year[yearly][9]
                    )
                  }
                >
                  Oct
                </button>
              </td>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 10
                      ? "btn btn-disabled"
                      : feedata.year[yearly][10]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 10
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      10,
                      feedata.year[yearly][10]
                    )
                  }
                >
                  Nov
                </button>
              </td>
              <td className="text-center">
                <button
                  className={
                    stdyearmonth > parseInt(yearly) * 100 + 11
                      ? "btn btn-disabled"
                      : feedata.year[yearly][11]
                      ? "btn btn-success"
                      : currDate.getFullYear() * 100 + currDate.getMonth() <
                        parseInt(yearly) * 100 + 11
                      ? "btn btn-secondary"
                      : "btn btn-danger"
                  }
                  onClick={() =>
                    openModal(
                      student.name,
                      student.number,
                      student._id,
                      yearly,
                      11,
                      feedata.year[yearly][11]
                    )
                  }
                >
                  Dec
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default FeesPage;
