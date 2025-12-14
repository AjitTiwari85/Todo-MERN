import { motion } from "framer-motion";

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

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(task)}
          className="text-yellow-400 hover:scale-110 transition"
        >
          ✏️
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-400 hover:scale-110 transition"
        >
          🗑️
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;
