import React, { ReactDOM, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/List";
import FeesPage from "./views/FeesPage";
import Layout from "./Layout";

const fetchUserData = async () => {
  const response = await fetch(
    "https://wisdom-backend-zvv3.onrender.com/fetchStudents"
  );
  return response.json();
};

const App = () => {
  const [studentsData, setStudentsData] = useState(null);

  useEffect(() => {
    // Fetch the data when the component mounts
    fetchUserData()
      .then((data) => setStudentsData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route
            path="students"
            element={
              <div className="container mt-5">
                {studentsData ? (
                  <List Studentsdb={studentsData} />
                ) : (
                  <div className="container mt-5">" Loading Data "</div>
                )}
              </div>
            }
          />
          <Route path="/feestatus/:studentid" element={<FeesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
