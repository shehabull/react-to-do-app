import {useState} from 'react';

function InCompletedTodo({ todos, handleToggleTodoStatus, handleEditTodo }) {
  const [editingTodoId, setEditingTodoId] = useState(null);

  const [updatedTitle, setUpdatedTitle] = useState("");

  return (
    <>
      {todos
        .filter((todo) => todo.status === "incompleted")
        .map((todo) => {
          return (
            <li className="list-group-item" key={todo.id}>
              <div className="group d-flex align-items-center justify-content-between">
                <div className="form-check">
                  <input
                    className="form-check-input ddd"
                    type="checkbox"
                    id={todo.id}
                    checked={todo.status === "completed"}
                    onChange={(event) =>
                      handleToggleTodoStatus(
                        todo.id,
                        todo.title,
                        event.target.checked ? "completed" : "incomplete"
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor={todo.id}>
                    {todo.title}
                  </label>
                </div>
                <div className="icons">
                  <i
                    className="bi bi-pencil"
                    onClick={() => setEditingTodoId(todo.id)}
                  ></i>
                </div>
              </div>
              {editingTodoId === todo.id && (
                <div>
                  <input
                    type="text"
                    defaultValue={todo.title}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <button onClick={() => { handleEditTodo(todo.id, updatedTitle); setEditingTodoId(null);}}>
                    Save
                  </button>
                </div>
              )}
            </li>
          );
        })}
    </>
  );
}

export default InCompletedTodo

