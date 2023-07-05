import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:8800";

function List({ Studentsdb }) {
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState(Studentsdb);
  const [searchVal, setSearchVal] = useState("");


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

  const handlePromo = (stdid) => {
    return console.log(stdid);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <nav className="navbar navbar-light bg-light">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => handleSearch(e)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
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
                  <a
                    href={`tel:${student.number}`}
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-telephone-forward"> Call</i>
                  </a>
                  <a
                    href={`https://wa.me/${student.number}`}
                    className="btn btn-success"
                  >
                    <i className="bi bi-whatsapp"> Whatsapp </i>
                  </a>
                  <button
                    onClick={() => handleFeeStatus(student)}
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-wallet2"> Check Fee </i>
                  </button>
                  <button
                    onClick={() => handlePromo(student._id)}
                    className="btn btn-primary"
                  >
                    <i className="bi bi bi-microsoft-teams"> Promote </i>
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
