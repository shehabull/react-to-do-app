function CompletedTodo({ handleDeleteTodo, todos }) {
  return (
    <>
      {todos
        .filter((todos) => todos.status === "completed")
        .map((todo) => {
          return (
            <li
              key={todo.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  checked
                  type="checkbox"
                  value=""
                  id={todo.id}
                  disabled="disabled"
                />
                <label className="form-check-label" htmlFor={todo.id}>
                  {todo.title}
                </label>
              </div>
              <div className="icons">
                <i
                  className="bi bi-trash text-danger"
                  onClick={() => handleDeleteTodo(todo.id)}
                ></i>
              </div>
            </li>
          );
        })}
    </>
  );
}

export default CompletedTodo;
