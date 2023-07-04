import { useState } from "react";
import { useLocation } from "react-router-dom";
import FeeModal from "../components/FeeModal";

const monthList = [
  ["Jan", "Feb", "Mar", "Apr"],
  ["May", "Jun", "Jul", "Aug"],
  ["Sep", "Oct", "Nov", "Dec"],
];

function FeesPage() {
  const location = useLocation();
  const student = location.state.stddata;
  const feedata = location.state.feedata;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const feedataArray = Object.keys(feedata.year);
  const currDate = new Date();
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
      />
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
            {monthList.map((mList, iIndex) => {
              return (
                <tr>
                  {mList.map((month, jIndex) => {
                    const index = mList.length * iIndex + jIndex;
                    return (
                      <td className="text-center" key={month}>
                        <button
                          className={
                            feedata.year[yearly][index]
                              ? "btn btn-success"
                              : currDate.getFullYear() * 100 +
                                  currDate.getMonth() <
                                parseInt(yearly) * 100 + 0
                              ? "btn btn-secondary"
                              : "btn btn-danger"
                          }
                          onClick={() =>
                            openModal(
                              student.name,
                              student.number,
                              feedata._id,
                              yearly,
                              0,
                              feedata.year[yearly][index]
                            )
                          }
                        >
                          {month}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default FeesPage;
