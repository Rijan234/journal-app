import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddJournal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content cannot be empty.");
      return;
    }

    const journalData = { title, content };

    try {
      await axios.post("http://localhost:8080/journal", journalData);
      alert("Journal saved successfully!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      console.error("Error saving journal:", error);
      alert("Failed to save journal. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Enter Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-4 border rounded-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Content
        </label>
        <textarea
          id="content"
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full p-4 border rounded-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Publish
      </button>
    </form>
  );
}

export default AddJournal;
