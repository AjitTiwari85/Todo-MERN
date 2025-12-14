import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function TaskCard({ task, onDelete, onEdit, onToggle }) {
  const completed = task.status === "completed";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`backdrop-blur-lg border rounded-xl p-4 flex justify-between items-center shadow
        ${
          completed
            ? "bg-green-500/10 border-green-400/30"
            : "bg-white/10 border-white/20"
        }`}
    >
      <div className="flex items-center gap-3">
        {/* STATUS TOGGLE */}
        <button
          onClick={() => onToggle(task)}
          className={`w-6 h-6 rounded-full border flex items-center justify-center
            ${
              completed
                ? "border-green-400 bg-green-400 text-black"
                : "border-gray-400"
            }`}
        >
          {completed && "✓"}
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h3
              className={`font-semibold ${
                completed ? "text-green-300 line-through" : "text-white"
              }`}
            >
              {task.title}
            </h3>

            <span className="text-xs text-gray-400">
              • {formatDate(task.createdAt)}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-300 text-sm">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-yellow-400 hover:bg-yellow-400/20 hover:scale-105 transition"
          title="Edit Task"
        >
          <FiEdit size={16} />
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-red-400 hover:bg-red-400/20 hover:scale-105 transition"
          title="Delete Task"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;

