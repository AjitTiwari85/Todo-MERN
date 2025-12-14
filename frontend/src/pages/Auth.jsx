import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } else {
      if (!form.name || !form.email || !form.password) {
        return alert("All fields required");
      }

      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      alert("Registered successfully. Please login.");
      setIsLogin(true);
    }
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        key={isLogin}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-6 rounded-lg w-80 shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-black text-white py-2">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p
          className="text-sm text-center mt-3 cursor-pointer text-blue-600"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
