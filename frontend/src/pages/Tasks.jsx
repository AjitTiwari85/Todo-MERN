import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  // CREATE / UPDATE
  const submitTask = async () => {
    if (!title) return;

    setLoading(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, {
          title,
          description,
        });
      } else {
        await api.post("/tasks", { title, description });
      }

      closeModal();
      fetchTasks();
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const openCreate = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setShowModal(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
    setShowModal(true);
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";

    await api.put(`/tasks/${task._id}`, {
      status: newStatus,
    });

    fetchTasks();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setTitle("");
    setDescription("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true }); // prevent back to tasks
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black p-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto flex justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">My Tasks</h1>
        <button onClick={logout} className="text-red-400">
          Logout
        </button>
      </div>

      {/* Card */}
      <motion.div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <button
          onClick={openCreate}
          className="mb-4 bg-white text-black px-4 py-2 rounded hover:scale-105 transition"
        >
          + Add Task
        </button>

        <AnimatePresence>
          <div className="mt-4 max-h-105 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
            {tasks.length === 0 ? (
              <p className="text-gray-400 text-center mt-10">
                No tasks yet. Add your first task!
              </p>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={deleteTask}
                  onEdit={openEdit}
                  onToggle={toggleStatus}
                />
              ))
            )}
          </div>
        </AnimatePresence>
      </motion.div>

      {/* MODAL */}
      <TaskModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={submitTask}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        loading={loading}
        isEdit={!!editingTask}
      />
    </div>
  );
};

export default Tasks;
