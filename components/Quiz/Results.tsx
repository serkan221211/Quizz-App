import { IQuestion } from "@/interfaces/app";

type Props = {
  questions: IQuestion[];
  onRestart: (status: number) => void;
};

const Results = ({ questions, onRestart }: Props) => {
  return (
    <div className="flex flex-col items-center w-full px-4 text-black h-full">
      <h2 className="md:text-2xl text-lg font-semibold mb-6">Sonuçlar</h2>

      <div className="overflow-x-auto w-full md:text-base text-sm">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left border-b font-semibold">
                Soru
              </th>
              <th className="py-2 px-4 text-left border-b font-semibold">
                Cevabınız
              </th>
              <th className="py-2 px-4 text-left border-b font-semibold">
                Doğru Cevap
              </th>
              <th className="py-2 px-4 text-left border-b font-semibold">
                Durum
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => {
              const answer = question.answer;
              const isCorrect = answer === question.correctAnswer;
              return (
                <tr
                  key={question.id}
                  className={`border-b ${
                    isCorrect ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <td className="py-2 px-4">{question.question}</td>
                  <td className="py-2 px-4">{answer || "Cevap yok"}</td>
                  <td className="py-2 px-4">{question.correctAnswer}</td>
                  <td className="py-2 px-4">
                    {isCorrect ? (
                      <span className="text-green-600">✔️ Doğru</span>
                    ) : (
                      <span className="text-red-600">❌ Yanlış</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => onRestart(1)}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Yeniden Başlat
      </button>
    </div>
  );
};

export default Results;
