import { motion } from "framer-motion";
import Loader from "./Loader";

function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  setTitle,
  setDescription,
  loading,
  isEdit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-[350px]"
      >
        <h2 className="text-xl font-bold text-white mb-4">
          {isEdit ? "Edit Task" : "Create Task"}
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full mb-3 p-2 rounded bg-white/20 text-white outline-none"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full mb-4 p-2 rounded bg-white/20 text-white outline-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={loading}
            className="bg-white text-black px-4 py-1 rounded flex items-center gap-2"
          >
            {loading ? <Loader size={18} /> : isEdit ? "Update" : "Add"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default TaskModal;
