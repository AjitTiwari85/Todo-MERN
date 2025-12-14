import { motion } from "framer-motion";

const Loader = ({ size = 24 }) => {
  return (
    <motion.div
      className="border-2 border-white border-t-transparent rounded-full"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 0.8,
        ease: "linear"
      }}
    />
  );
};

export default Loader;
