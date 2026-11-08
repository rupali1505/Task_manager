const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <div className="group flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-4 transition duration-200 hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-sm">
      {/* Task Details */}
      <div className="flex min-w-0 items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
        />

        <span
          className={`break-words text-sm font-medium transition ${
            task.completed ? "text-slate-400 line-through" : "text-slate-700"
          }`}
        >
          {task.title}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
