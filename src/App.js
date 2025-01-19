import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddJournal from "./components/AddJournal";
import JournalList from "./api/JournalList"; // Ensure the path points to the correct location
import UpdateJournal from "./components/UpdateJournal"; // Import the update component
import "./App.css";
import ViewJournal from "./components/ViewJournal";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Route for the Journal List */}
          <Route
            path="/"
            element={
              <div>
                <button
                  className="relative right-0 inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  onClick={() => (window.location.href = "/add-journal")}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add new Journal
                  </span>
                </button>
                <JournalList />
              </div>
            }
          />

          {/* Route for Adding a Journal */}
          <Route path="/add-journal" element={<AddJournal />} />

          {/* Route for Updating a Journal */}
          <Route path="/update-journal/:id" element={<UpdateJournal />} />
          <Route path="/view-journal/:id" element={<ViewJournal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
