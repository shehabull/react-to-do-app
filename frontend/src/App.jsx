import { useState, useEffect } from "react";
import CompletedTodo from "./components/CompletedTodo";
import InCompletedTodo from "./components/InCompletedTodo";
import axios from "axios";


function App() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);


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


const handleDeleteTodo = async (todoId) => {
  try {
    await axios.delete(`http://localhost:3000/todos/${todoId}`);
    const updatedCompletedTodos = completedTodos.filter(
      (todo) => todo.id !== todoId
    );
    setCompletedTodos(updatedCompletedTodos);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

const handleEditTodo = async (todoId, updatedTitle) => {

  try {
    await axios.put(`http://localhost:3000/todos/${todoId}`, {
      title: updatedTitle,
      status: "incompleted",
    });
    const response = await axios.get("http://localhost:3000/todos");
    const updatedTodos = response.data;
    setTodos(updatedTodos);
    
  } catch (error) {
    console.error("Error editing todo:", error);
  }
};


  const handleToggleTodoStatus = async (todoId, title, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/todos/${todoId}`, {
        title: title,
        status: newStatus,
      });
      const response = await axios.get("http://localhost:3000/todos");
      const updatedTodos = response.data;
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };
    

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios.get("http://localhost:3000/todos");
      const data = result.data;
      setTodos(data);
    };
    fetchTodos();
  }, [title, completedTodos]);


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center mt-3">Todo List</h1>
            <section className="section">
              <div className="w-50 mx-auto">
                <form id="form" onSubmit={handleSubmit}>
                  <label htmlFor="new-task" className="mb-2">
                    Add a new task
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
              </div>
            </section>

            <section className="row section pt-5">
              <div className="col-5">
                <h3>Incompleted Task</h3>
                <ul className="list-group items">
                  <InCompletedTodo
                    todos={todos}
                    handleToggleTodoStatus={handleToggleTodoStatus}
                    handleEditTodo={handleEditTodo}
                  />
                </ul>
              </div>
              <div className="col-5 mx-auto">
                <h3>Completed Task</h3>
                <ul className="list-group completed-items">
                  <CompletedTodo
                    todos={todos}
                    handleDeleteTodo={handleDeleteTodo}
                  />
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
