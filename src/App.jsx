import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/List";
import FeesPage from "./views/FeesPage.jsx";
import Layout from "./Layout";
import PieChart from "./components/PieChart";
import StudentsManagement from "./views/StudentsManagement";
import { LoginPage } from "./views/LoginPage";
// const API_URL = "http://localhost:8800";
const API_URL = "https://tricky-moth-shoe.cyclic.app";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage API_URL={API_URL} />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<PieChart API_URL={API_URL} />} />
          <Route
            path="students"
            element={
              <div className="container mt-5">
                {<StudentsManagement API_URL={API_URL} />}
              </div>
            }
          />
          <Route
            path="fees"
            element={
              <div className="container mt-5">{<List API_URL={API_URL} />}</div>
            }
          />
          <Route
            path="/feestatus/:studentid"
            element={<FeesPage API_URL={API_URL} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
