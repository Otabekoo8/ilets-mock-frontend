// src/components/ResultCard.jsx
import React from "react";

export default function ResultCard({ score, total, onRestart }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Yakunlandi ✅</h2>
      <p className="text-lg text-gray-700 mb-6">
        Sizning natijangiz: <span className="font-semibold">{score}</span> / {total}
      </p>
      <button
        onClick={onRestart}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all"
      >
        Qayta boshlash
      </button>
    </div>
  );
}
