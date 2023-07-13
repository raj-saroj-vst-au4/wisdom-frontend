import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Chart } from "react-google-charts";
import Loader from "../components/Loader";

export const options = {
  is3D: true,
  width: 330,
  height: 250,
  legend: "left",
  chartArea: { left: 0, top: 0, right: 0, bottom: 0 },
};

const handlePieStats = (db) => {
  const counts = {};
  for (let i = 0; i < db.length; i++) {
    const element = db[i].batch;
    counts[element] = (counts[element] || 0) + 1;
  }
  return [
    ["time", "total"],
    ["9 to 11 AM", counts[911]],
    ["2 to 4 PM", counts[24]],
    ["4 to 6 PM", counts[46]],
    ["7 to 9 PM", counts[79]],
  ];
};

const PieChart = ({ API_URL }) => {
  const [studentsData, setStudentsData] = useState([]);
  const [pd, setPD] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token || JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()) {
    return window.location.replace("/login");
  }

  const fetchUserData = async () => {
    const response = await fetch(`${API_URL}/fetchStudents`, {
      headers: {
        "x-access-token": token,
      },
    });
    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      return window.location.replace("/login");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUserData()
      .then((data) => setStudentsData(data.data))
      .then(async () => {
        try {
          const res = await fetch(`${API_URL}/fetchPendingFee`, {
            headers: {
              "x-access-token": token,
            },
          });
          if (res.ok) {
            const pendingFeeData = await res.json();
            return setPD(pendingFeeData.data);
          } else if (response.status === 401) {
            return window.location.replace("/login");
          }
        } catch (e) {
          return e;
        }
      })
      .then(() => setIsLoading(false))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const piedata = handlePieStats(studentsData);
  return (
    <>
      <div>{isLoading ? <Loader /> : ""}</div>
      <Card border="dark" style={{ width: "100%", marginTop: "4rem" }}>
        <Card.Header>Statistics</Card.Header>
        <Card.Body>
          <Card.Title>Batch-Wise Chart</Card.Title>
          <Chart
            chartType="PieChart"
            data={piedata}
            options={options}
            width={"0rem"}
            height={"250px"}
            style={{ padding: 0 }}
          />
        </Card.Body>
      </Card>
      <Card border="dark" style={{ width: "100%", marginTop: "2rem" }}>
        <Card.Header>Reminder</Card.Header>
        <Card.Body>
          <Card.Title>Pending Fees</Card.Title>
          <ul className="list-group">
            {pd?.map((p) => {
              return p.pendingmonths >= 1 ? (
                <li key={p.id} className="input-group">
                  <div
                    className={`form-control list-group-item list-group-item-${
                      p.pendingmonths > 2 ? "danger" : "warning"
                    }`}
                    aria-describedby="button-addon4"
                  >
                    {p.name} : {p.pendingmonths} Pending !
                  </div>
                  <div
                    className="input-group-append btn-group"
                    id="button-addon4"
                  >
                    <a
                      href={`https://wa.me/${p.num}`}
                      className="btn btn-success"
                    >
                      <i className="bi bi-whatsapp" />
                    </a>
                    <a href={`tel:${p.num}`} className="btn btn-secondary">
                      <i className="bi bi-telephone-forward" />
                    </a>
                  </div>
                </li>
              ) : (
                ""
              );
            })}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default PieChart;

{
  /* <li
                    key={p.id}
                    className={
                      "list-group-item list-group-item-" +
                      (p.pendingmonths > 2 ? "danger" : "warning")
                    }
                  >
                    {p.name} has {p.pendingmonths} months fee pending !
                  </li>
                  <li
                    className="list-group-item btn-group d-flex justify-content-right"
                    role="group"
                    aria-label="Basic example"
                  >
                    <a
                      href={`https://wa.me/${p.phone}`}
                      className="btn btn-success"
                    >
                      <i className="bi bi-whatsapp" />
                    </a>
                    <a href={`tel:${p.number}`} className="btn btn-secondary">
                      <i className="bi bi-telephone-forward" />
                    </a>
                  </li> */
}
