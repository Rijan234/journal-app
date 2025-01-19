import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get("http://localhost:8080/journal");
        const transformedData = response.data.map(entry => ({
          id: entry.id, // Use full ObjectId as string
          title: entry.title,
          content: entry.content,
          date: entry.date,
        }));
        setJournals(transformedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleEditClick = (id) => {
    navigate(`/update-journal/${id}`);
  };
  const handleViewClick = (id) => {
    navigate(`/view-journal/${id}`);
  };


  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this journal?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/journal/id/${id}`);
      setJournals(journals.filter(journal => journal.id !== id)); // Update state to remove deleted entry
      alert("Journal deleted successfully!");
    } catch (error) {
      console.error("Error deleting journal:", error);
      alert("Failed to delete journal. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="m-4">Journal Entries</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Content</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal) => (
              <tr
                key={journal.id}
                className="odd:bg-white even:bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {journal.title}
                </td>
                <td className="px-6 py-4">{journal.content}</td>
                <td className="px-6 py-4">{new Date(journal.date).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-green-600 dark:text-blue-500 hover:underline ml-2"
                    onClick={() => handleViewClick(journal.id)}
                  >
                    View
                  </button>
                  <button
                    className="font-medium text-yellow-600 dark:text-blue-500 hover:underline ml-2"
                    onClick={() => handleEditClick(journal.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                    onClick={() => handleDeleteClick(journal.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JournalList;
