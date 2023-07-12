import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddStudentModal from "../components/AddStudentModal";
import Loader from "../components/Loader";

function StudentsManagement({ API_URL }) {
  const [Studentsdb, setStudentsdb] = useState([]);
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState(Studentsdb);
  const [searchVal, setSearchVal] = useState("");
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (
      !token ||
      JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()
    ) {
      return window.location.replace("/login");
    }
    setIsLoading(true);
    const fetchStudents = async () => {
      const response = await fetch(`${API_URL}/fetchStudents`, {
        headers: {
          "x-access-token": token,
        },
      });
      if (response.ok) {
        const objectData = await response.json();
        setStudentsdb(objectData.data);
        setFiltered(objectData.data);
      } else if (response.status === 401) {
        return window.location.replace("/login");
      }
      setIsLoading(false);
    };
    fetchStudents();
  }, []);

  const openModal = () => {
    setShowStudentModal(true);
  };

  const closeModal = () => {
    setShowStudentModal(false);
  };

  useEffect(() => {
    if (
      !token ||
      JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()
    ) {
      return window.location.replace("/login");
    }
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
    if (
      !token ||
      JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()
    ) {
      return window.location.replace("/login");
    }
    try {
      const response = await fetch(`${API_URL}/fetchFee/${student._id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const dataToPass = { stddata: student, feedata: data };
        const userSpecificPageUrl = `/feestatus/${student.name}`;
        navigate(userSpecificPageUrl, { state: dataToPass });
      } else if (response.status === 401) {
        return window.location.replace("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDisable = async (studentid) => {
    if (
      !token ||
      JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()
    ) {
      return window.location.replace("/login");
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/disableStudent/${studentid}`, {
        headers: {
          "x-access-token": token,
        },
      });
      if (response.ok) {
        window.location.replace("/");
      } else if (response.status === 401) {
        return window.location.replace("/login");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const handleEnable = async (studentid) => {
    if (
      !token ||
      JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()
    ) {
      return window.location.replace("/login");
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/enableStudent/${studentid}`, {
        headers: {
          "x-access-token": token,
        },
      });
      if (response.ok) {
        window.location.replace("/");
      } else if (response.status === 401) {
        return window.location.replace("/login");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const handlePromo = async (studentid) => {
    if (
      !token ||
      JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()
    ) {
      return window.location.replace("/login");
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/promoteStudent/${studentid}`, {
        headers: {
          "x-access-token": token,
        },
      });
      if (response.ok) {
        navigate("/");
      } else if (response.status === 401) {
        return window.location.replace("/login");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div>{isLoading ? <Loader /> : ""}</div>

      <AddStudentModal
        showModal={showStudentModal}
        toggleModal={closeModal}
        API_URL={API_URL}
      />
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
        {filtered.length === 0 && <h3> No Records Found</h3>}
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
                  {student.active ? (
                    <button
                      onClick={() => handleDisable(student._id)}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-activity"> Disable </i>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnable(student._id)}
                      className="btn btn-success"
                    >
                      <i className="bi bi-activity"> Enable </i>
                    </button>
                  )}
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
