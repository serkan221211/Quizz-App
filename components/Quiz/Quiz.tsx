"use client";

import { useState, useEffect, useCallback } from "react";
import { IQuestion, IApiResponse } from "@/interfaces/app";
import { fetcher } from "@/utils/api";
import Question from "./Question";
import QuizInfo from "./QuizInfo";
import Results from "./Results";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isStarted, setIsStarted] = useState(false);
  const [isOptionSelectable, setIsOptionSelectable] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const fetchQuestions = useCallback(async () => {
    try {
      const data: IApiResponse[] = await fetcher(
        "/posts",
        process.env.NEXT_PUBLIC_API_URL || ""
      );
      const formattedQuestions = data.slice(0, 10).map((item) => {
        const options = [
          item.body.slice(0, 20),
          item.body.slice(20, 40),
          item.body.slice(40, 60),
          item.body.slice(60, 80),
        ];
        const correctAnswer =
          options[Math.floor(Math.random() * options.length)];
        return {
          id: item.id,
          question: item.title,
          options,
          correctAnswer,
        };
      });
      setQuestions(formattedQuestions);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to fetch questions:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (isStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      if (timer === 20) {
        setIsOptionSelectable(true);
      }

      return () => clearInterval(interval);
    }

    if (timer === 0) {
      handleNext();
    }
  }, [timer, isStarted]);

  const handleStart = useCallback((status: number) => {
    setIsStarted(status === 0 ? true : false);
    setCurrentQuestion(0);
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => ({
        ...question,
        answer: null,
      }))
    );
    setTimer(30);
    setIsOptionSelectable(false);
    setIsQuizFinished(false);
  }, []);

  const handleNext = useCallback(() => {
    if (!questions[currentQuestion].answer) {
      setQuestions((prev) => {
        const updatedQuestions = [...prev];
        updatedQuestions[currentQuestion].answer = null;
        return updatedQuestions;
      });
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(30);
      setIsOptionSelectable(false);
    } else {
      setIsStarted(false);
      setIsQuizFinished(true);
    }
  }, [
    currentQuestion,
    questions,
    setQuestions,
    setCurrentQuestion,
    setTimer,
    setIsOptionSelectable,
    setIsStarted,
    setIsQuizFinished,
  ]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (isOptionSelectable) {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === questions[currentQuestion].id
              ? { ...question, answer }
              : question
          )
        );
      }
    },
    [isOptionSelectable, questions, currentQuestion, setQuestions]
  );

  return (
    <div className="w-full flex items-center justify-center">
      {!isStarted ? (
        isQuizFinished ? (
          <Results questions={questions} onRestart={handleStart} />
        ) : (
          <QuizInfo onStart={handleStart} />
        )
      ) : (
        <Question
          question={questions[currentQuestion]}
          timer={timer}
          onAnswer={handleAnswer}
          onNext={handleNext}
          isOptionSelectable={isOptionSelectable}
          questionIndex={currentQuestion}
        />
      )}
    </div>
  );
};

export default Quiz;
