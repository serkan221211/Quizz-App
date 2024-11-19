"use client";

import { IQuestion } from "@/interfaces/app";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { twMerge } from "tailwind-merge";

type Props = {
  question: IQuestion;
  timer: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  isOptionSelectable: boolean;
  questionIndex: number;
};

const Question = ({
  question,
  timer,
  onAnswer,
  onNext,
  isOptionSelectable,
  questionIndex,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = useCallback(
    (option: string) => {
      setSelectedOption(option);
      onAnswer(option);
    },
    [onAnswer]
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
      <h2 className="md:text-lg test-base font-semibold text-black mb-6">
        Soru {questionIndex + 1}:{" "}
        <span className="font-normal">{question.question}</span>
      </h2>
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={twMerge(
              clsx(
                "flex items-center w-full text-left md:py-3 md:px-4 py-2 px-4 rounded-lg transition md:text-base text-sm",
                {
                  "bg-green-200":
                    isOptionSelectable && selectedOption === option,
                  "bg-gray-100 hover:bg-gray-200":
                    isOptionSelectable && selectedOption !== option,
                  "bg-gray-100 cursor-not-allowed": !isOptionSelectable,
                }
              )
            )}
            disabled={!isOptionSelectable}
            onClick={() => handleOptionClick(option)}
          >
            <span className="mr-4 font-semibold text-gray-500">
              {String.fromCharCode(65 + index)}.
            </span>
            <span className="text-gray-700">{option}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          className={twMerge(
            "bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition",
            clsx({
              "cursor-pointer": isOptionSelectable,
              "cursor-not-allowed": !isOptionSelectable,
            })
          )}
          onClick={() => (isOptionSelectable ? onNext() : () => {})}
        >
          Sonraki Soru
        </button>
      </div>
      <div className="flex items-center justify-center mt-10">
        <div className="w-28 h-28">
          <CircularProgressbar
            value={(timer / 30) * 100}
            text={`${timer}s`}
            styles={buildStyles({
              textSize: "16px",
              textColor: "#333",
              pathColor: "#f97316",
              trailColor: "#e5e7eb",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
