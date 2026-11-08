import { useState} from "react";
import TaskItem from "./Components/TaskItem";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Practice JavaScript", completed: true },
    { id: 3, title: "Build Task Manager", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Add Task
  const handleAddTask = (event) => {
    event.preventDefault();

    if (newTask.trim() === "") {
      return;
    }

    if (editTaskId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, title: newTask.trim() } : task,
        ),
      );

      setEditTaskId(null);
    } else {
      const task = {
        id: Date.now(),
        title: newTask.trim(),
        completed: false,
      };

      setTasks([...tasks, task]);
    }

    setNewTask("");
  };
  // Complete Task
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setNewTask(task.title);
    setEditTaskId(task.id);
  };

  // Task Statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const activeTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Task Manager
                </h1>

                <p className="mt-2 text-sm text-blue-100">
                  Organize your day, one task at a time.
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
                ✓
              </div>
            </div>
          </div>

          {/* Task Statistics */}
          <div className="grid grid-cols-3 gap-3 border-b border-slate-100 p-5 sm:p-6">
            <div className="rounded-xl bg-blue-50 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Total Tasks
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{activeTasks}</p>

              <p className="mt-1 text-xs font-medium text-slate-500">Active</p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">
                {completedTasks}
              </p>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Completed
              </p>
            </div>
          </div>

          {/* Add Task Form */}
          <div className="p-5 sm:p-6">
            <form
              onSubmit={handleAddTask}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 active:scale-95"
              >
                {editTaskId !== null ? "Update Task" : "+ Add Task"}
              </button>
            </form>

            {/* Task List Heading */}
            {/* Task List Heading */}
            <div className="mb-4 mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">My Tasks</h2>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  {activeTasks} remaining
                </span>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                {["all", "active", "completed"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                      filter === item
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            {/* Task List */}
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <div className="rounded-xl border-2 border-dashed border-slate-200 py-12 text-center">
                <div className="mb-3 text-4xl">📝</div>

                <p className="font-semibold text-slate-700">
                  {tasks.length === 0
                    ? "No tasks yet"
                    : `No ${filter} tasks found`}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {tasks.length === 0
                    ? "Add your first task to get started!"
                    : "Try selecting another filter."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Stay focused. Stay productive.
        </p>
      </div>
    </div>
  );
};

export default App;
