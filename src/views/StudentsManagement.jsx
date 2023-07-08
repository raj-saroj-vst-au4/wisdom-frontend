import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddStudentModal from "../components/AddStudentModal";
const API_URL = "https://wisdom-backend-zvv3.onrender.com";

function StudentsManagement({ Studentsdb }) {
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState(Studentsdb);
  const [searchVal, setSearchVal] = useState("");
  const [showStudentModal, setShowStudentModal] = useState(false);

  const openModal = () => {
    setShowStudentModal(true);
  };

  const closeModal = () => {
    setShowStudentModal(false);
  };

  useEffect(() => {
    if (searchVal.toLowerCase() === "") {
      setFiltered(Studentsdb);
    } else {
      setFiltered(
        Studentsdb.filter((student) => {
          return student.name.toLowerCase().includes(searchVal.toLowerCase());
        })
      );
    }
  }, [searchVal]);

  const handleSearch = (event) => {
    setSearchVal(event.target.value);
  };

  const handleFeeStatus = async (student) => {
    try {
      const response = await fetch(`${API_URL}/fetchFee/${student._id}`);
      if (response.ok) {
        const data = await response.json();
        const dataToPass = { stddata: student, feedata: data };
        const userSpecificPageUrl = `/feestatus/${student.name}`;
        navigate(userSpecificPageUrl, { state: dataToPass });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDisable = async (studentid) => {
    try {
      const response = await fetch(`${API_URL}/disableStudent/${studentid}`);
      if (response.ok) {
        navigate("/")
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEnable = async (studentid) => {
    try {
      const response = await fetch(`${API_URL}/enableStudent/${studentid}`);
      if (response.ok) {
        navigate("/")
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePromo = async (studentid) => {
    try {
        const response = await fetch(`${API_URL}/promoteStudent/${studentid}`);
        if (response.ok) {
          navigate("/")
        }
      } catch (e) {
        console.log(e);
      }
  };

  return (
    <>
        <AddStudentModal showModal={showStudentModal} toggleModal={closeModal}/>
      <div className="d-flex justify-content-center">
        <nav className="navbar navbar-light bg-light">
        <button className="btn btn-outline-primary me-2" onClick={openModal}>
                <i className="bi bi-person-plus"> ADD</i>
            </button>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => handleSearch(e)}
            />
          </form>
        </nav>
      </div>
      <div className="accordion" id="accordionExample">
        {filtered.length === 0 && <h3>No records</h3>}
        {filtered.map((student, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <i className="bi bi-microsoft-teams">
                  <span> </span>
                  {student.name} : {student.class}
                  <sup>th</sup> Standard
                </i>
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    onClick={() => handlePromo(student._id)}
                    className="btn btn-primary"
                  >
                    <i className="bi bi bi-microsoft-teams"> Promote </i>
                  </button>
                  <button
                    onClick={() => handleFeeStatus(student)}
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-wallet2"> Fee </i>
                  </button>
                  {student.active ? (<button
                    onClick={()=> handleDisable(student._id)}
                    className="btn btn-danger"
                  >
                    <i className="bi bi-activity"> Disable </i>
                  </button>) : (<button
                    onClick={()=> handleEnable(student._id)}
                    className="btn btn-success"
                  >
                    <i className="bi bi-activity"> Enable </i>
                  </button>)}
                  

                  {/* {feestatus ? (
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
            )} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StudentsManagement;
