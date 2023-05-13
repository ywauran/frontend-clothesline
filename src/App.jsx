import React, { useState } from "react";
import Calculate from "./pages/Calculate";
import Home from "./pages/Home";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "calculate":
        return <Calculate />;
      case "history":
        return <History />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="flex flex-col p-6 bg-white App">
      <div className="py-5 ">
        <nav className="flex justify-between items-center bg-[#132A49]  p-5 rounded-md ">
          <h1 className="text-[#D9D9D9] text-xl font-bold">Sistem Jemuran</h1>
          <ul className="flex items-center space-x-10">
            <li>
              <button
                onClick={() => handlePageChange("home")}
                className={`${
                  currentPage === "home" ? "font-bold" : null
                } bg-[#CEA434] px-10 py-1.5 rounded-md`}
              >
                Beranda
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange("history")}
                className={`${
                  currentPage === "history" ? "font-bold" : null
                } bg-[#CEA434] px-10 py-1.5 rounded-md`}
              >
                Riwayat
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="">{renderPage()}</div>
    </div>
  );
}

export default App;
