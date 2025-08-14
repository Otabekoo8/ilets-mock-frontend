export default function QuestionCard({
  index,
  total,
  question,
  selectedIndex,
  onSelect,
  submitted
}) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Savol {index + 1} / {total}
      </h2>
      <p className="text-xl font-medium text-gray-900 mb-6">{question.questionText}</p>
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, idx) => {
          let optionClass =
            "border border-gray-300 rounded-lg px-4 py-3 text-left transition-all duration-200";

          if (submitted) {
            if (idx === question.correctAnswerIndex) {
              optionClass += " bg-green-100 border-green-500";
            } else if (
              selectedIndex === idx &&
              idx !== question.correctAnswerIndex
            ) {
              optionClass += " bg-red-100 border-red-500";
            }
          } else if (selectedIndex === idx) {
            optionClass += " bg-blue-100 border-blue-500";
          }

          return (
            <button
              key={idx}
              onClick={() => !submitted && selectedIndex === null && onSelect(idx)}
              className={optionClass}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
