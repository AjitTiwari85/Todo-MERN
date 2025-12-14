import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const slideVariants = {
  initial: (direction) => ({
    x: direction === "login" ? 100 : -100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
  exit: (direction) => ({
    x: direction === "login" ? -100 : 100,
    opacity: 0,
  }),
};

const Auth = () => {
  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        // Use replace to prevent back to login
        navigate("/tasks", { replace: true });
      } else {
        await api.post("/auth/register", form);
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black">
      {/* Background blur */}
      <div className="absolute inset-0 backdrop-blur-sm" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 w-87.5 bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20"
      >
        <AnimatePresence mode="wait" custom={isLogin ? "login" : "signup"}>
          <motion.div
            key={isLogin ? "login" : "signup"}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={isLogin ? "login" : "signup"}
          >
            <h2 className="text-2xl font-bold text-white text-center mb-4">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 outline-none"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 outline-none"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 outline-none"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <button
                disabled={loading}
                className="w-full bg-white text-black py-2 rounded font-semibold flex justify-center items-center gap-2 disabled:opacity-60"
              >
                {loading ? <Loader /> : isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <p
              onClick={() => setIsLogin(!isLogin)}
              className="text-center text-sm text-gray-300 mt-4 cursor-pointer hover:text-white"
            >
              {isLogin
                ? "New here? Create an account"
                : "Already have an account? Login"}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Auth;
