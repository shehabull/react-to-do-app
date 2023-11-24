import axios from "axios";
import React, { useState } from "react";

function AddNewTodo() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.trim()) {
      try {
        await axios.post("http://localhost:3000/todos", {
          title: title,
          status: "incompleted",
        });
        setTitle("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <label htmlFor="new-task" className="mb-2">
          নতুন কাজ যোগ করুন
        </label>
        <div className="input-group" htmlFor="new-task">
          <input
            type="text"
            className="form-control"
            id="new-task"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Add Todo
          </button>
        </div>
      </form>
    </>
  );
}

export default AddNewTodo;
