import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import QuestionCard from "../components/QuestionCard";

const API_BASE = "https://ielts-mock-backend-b2je.onrender.com";
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TestPage() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const INITIAL_SECONDS = 600;
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const timerRef = useRef(null);

  const answeredCount = useMemo(
    () => answers.filter((a) => a !== undefined && a !== null).length,
    [answers]
  );

  const progressPercent = useMemo(
    () => (answeredCount / questions.length) * 100 || 0,
    [answeredCount, questions.length]
  );

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/test`);
      if (!res.ok) throw new Error("Serverdan ma'lumot olishda xatolik");
      const data = await res.json();
      const sliced = data.length > 30 ? shuffle(data).slice(0, 30) : data;
      setQuestions(sliced);
      setAnswers(new Array(sliced.length).fill(null));
    } catch (e) {
      setError(e.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!started || submitted) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, submitted]);

  const handleSelect = (qIndex, optIndex) => {
    if (answers[qIndex] !== null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
    if (qIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(qIndex + 1);
      }, 300);
    }
  };

  const calcScore = () =>
    questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctAnswerIndex ? 1 : 0),
      0
    );

  const handleSubmit = (auto = false) => {
    if (!auto && answeredCount < questions.length) {
      if (
        !window.confirm(
          "Hamma savollarga javob bermadingiz. Baribir yakunlaymizmi?"
        )
      )
        return;
    }
    setSubmitted(true);
    clearInterval(timerRef.current);
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Boshlash ekrani */}
        {!started && !submitted && !loading && questions.length > 0 && (
          <div className="text-center animate-fadeIn min-h-[50vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-gradient">
            <h1 className="text-4xl font-extrabold mb-4 text-blue-800 tracking-wide drop-shadow-md">
              IELTS Mock Test
            </h1>
            <p className="text-gray-600 mb-6">
              10 daqiqada o‘z IELTS bilimlaringizni sinang!
            </p>
            <button
              className="btn-primary px-6 py-3 text-lg rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
              onClick={() => setStarted(true)}
            >
              Start 🚀
            </button>
          </div>
        )}

        {/* Test jarayoni */}
        {started && !submitted && !loading && questions.length > 0 && (
          <>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-mono text-lg">
                  ⏱ {minutes}:{seconds}
                </span>
                <span className="text-sm">
                  {answeredCount}/{questions.length} javob
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 transition-all duration-500 ease-out ${
                    progressPercent < 40
                      ? "bg-red-500"
                      : progressPercent < 80
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <QuestionCard
              key={currentIndex}
              index={currentIndex}
              total={questions.length}
              question={questions[currentIndex]}
              selectedIndex={answers[currentIndex]}
              onSelect={(opt) => handleSelect(currentIndex, opt)}
              submitted={submitted}
              className="animate-fadeSlide"
            />

            <div className="flex justify-between mt-6">
              <button
                disabled={currentIndex === 0}
                className="btn-secondary px-4 py-2 disabled:opacity-50 hover:bg-blue-100 hover:scale-105 transition-all duration-200"
                onClick={() => setCurrentIndex((p) => p - 1)}
              >
                ⬅ Previous
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  className="btn-primary px-4 py-2 hover:scale-105 transition-transform duration-200"
                  onClick={() => setCurrentIndex((p) => p + 1)}
                >
                  Next ➡
                </button>
              ) : (
                <button
                  className="btn-primary px-4 py-2 hover:scale-105 transition-transform duration-200"
                  onClick={() => handleSubmit(false)}
                >
                  Finish Test 🏁
                </button>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-10 h-10 rounded-full border text-sm font-bold 
                    ${
                      currentIndex === idx
                        ? "bg-blue-500 text-white"
                        : answers[idx] !== null
                        ? "bg-green-300"
                        : "bg-gray-200"
                    } 
                    hover:scale-105 transition-transform`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Test tugagan qismi */}
        {submitted && (
          <div className="animate-fadeIn">
            {/* Yakun kartasi */}
            <div className="flex flex-col items-center justify-center text-center mb-8">
              <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                <div className="mb-4">
                  {calcScore() / questions.length >= 0.8 ? (
                    <span className="text-5xl">🥇</span>
                  ) : calcScore() / questions.length >= 0.5 ? (
                    <span className="text-5xl">🥈</span>
                  ) : (
                    <span className="text-5xl">🥉</span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                  Test yakunlandi ✅
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Siz {questions.length} ta savoldan {calcScore()} tasiga
                  to‘g‘ri javob berdingiz.
                </p>
                <button
                  className="btn-primary px-6 py-3 text-lg rounded-full hover:scale-105 transition-transform duration-200"
                  onClick={handleHome}
                >
                  Bosh sahifa 🏠
                </button>
              </div>
            </div>

            {/* Savollar va to‘g‘ri javoblar */}
            <div className="grid gap-4">
              {questions.map((q, idx) => (
                <QuestionCard
                  key={q._id || idx}
                  index={idx}
                  total={questions.length}
                  question={q}
                  selectedIndex={answers[idx]}
                  onSelect={() => {}}
                  submitted={true}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
