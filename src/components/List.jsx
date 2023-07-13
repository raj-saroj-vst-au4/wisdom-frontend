import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function List({ API_URL }) {
  const [Studentsdb, setStudentsdb] = useState([]);
  const activeData = Studentsdb.filter((stdnt) => stdnt.active);
  const [filtered, setFiltered] = useState(activeData);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token || JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()) {
    return window.location.replace("/login");
  }

  const fetchUserData = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}/fetchStudents`, {
      headers: {
        "x-access-token": token,
      },
    });
    if (response.ok) {
      setIsLoading(false);
      return response.json();
    } else if (response.status === 401) {
      return window.location.replace("/login");
    }
  };

  useEffect(() => {
    if (
      !token ||
      JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()
    ) {
      return window.location.replace("/login");
    }

    fetchUserData()
      .then((data) => {
        setStudentsdb(data.data);
        return data.data;
      })
      .then((objData) => setFiltered(objData.filter((stdnt) => stdnt.active)))
      .catch((e) => console.log("Error Fetching data:", e));
  }, []);

  useEffect(() => {
    if (searchVal.toLowerCase() === "") {
      setFiltered(activeData);
    } else {
      setFiltered(
        activeData.filter((student) => {
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
      setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <>
      <div>{isLoading ? <Loader /> : ""}</div>
      <div className="d-flex justify-content-center">
        <nav className="navbar navbar-light bg-light">
          <form className="d-flex">
            <input
              className="form-control"
              type="search"
              placeholder="Search Student"
              aria-label="Search"
              onChange={(e) => handleSearch(e)}
            />
          </form>
        </nav>
      </div>
      <div className="btn-group btn-group-justified d-flex justify-content-center">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFiltered(activeData)}
          >
            All
          </button>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setFiltered(activeData.filter((student) => student.batch === 911))
            }
          >
            9 to 11
          </button>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setFiltered(activeData.filter((student) => student.batch === 24))
            }
          >
            2 to 4
          </button>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setFiltered(activeData.filter((student) => student.batch === 46))
            }
          >
            4 to 6
          </button>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setFiltered(activeData.filter((student) => student.batch === 79))
            }
          >
            7 to 9
          </button>
        </div>
      </div>
      <br></br>
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
                  <a
                    href={`https://wa.me/${student.number}`}
                    className="btn btn-success"
                  >
                    <i className="bi bi-whatsapp"> Whatsapp </i>
                  </a>
                  <a
                    href={`tel:${student.number}`}
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-telephone-forward"> Call</i>
                  </a>
                  <button
                    onClick={() => handleFeeStatus(student)}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-wallet2"> Check Fee </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default List;
