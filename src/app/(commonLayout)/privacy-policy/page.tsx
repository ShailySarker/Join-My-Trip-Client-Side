"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32 bg-emerald-500 rounded-lg"
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg"
      >
        Hover Me
      </motion.button>
    </div>
  );
}
