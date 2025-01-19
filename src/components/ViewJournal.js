import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ViewJournal = () => {
  const { id } = useParams(); // Get the journal ID from the route params
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/journal/id/${id}`);
        const { title, content } = response.data;
        setTitle(title);
        setContent(content);
        setLoading(false);
      } catch (error) {
        setError("Failed to load journal entry. Please try again.");
        setLoading(false);
      }
    };

    fetchJournal();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content cannot be empty.");
      return;
    }

    const updatedJournal = { title, content };

    try {
     
      navigate("/"); // Redirect to the journal list page
    } catch (error) {
      console.error("Error updating journal:", error);
      alert("Failed to update journal. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleUpdate}>
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Edit Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-4 border rounded-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white" readOnly
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Edit Content
        </label>
        <textarea
          id="content"
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full p-4 border rounded-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white" readOnly
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Back
      </button>
    </form>
  );
};

export default ViewJournal;
