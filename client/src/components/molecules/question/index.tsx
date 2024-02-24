"use client";
import { Question } from "@/interfaces";
import { Socket } from "socket.io-client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Countdown from "@/components/atoms/Countdown";
interface QuestionProps {
  question?: Question;
  socket: Socket;
  countdown: number;
  results?: {
    correct_answer: boolean;
    results: {
      optionTitle: string;
      count: number;
      isCorrect: boolean;
    }[];
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Question({
  question,
  socket,
  countdown,
  results,
}: QuestionProps) {
  const [selectAnswer, setSelectAnswer] = useState<number | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectAnswer) {
      socket.emit("answer-question", {
        option_id: selectAnswer,
        question_id: question.id,
      });
    }

    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
    }
  };

  useEffect(() => {
    submitButtonRef.current.disabled = false;
  }, [question]);

  if (!results) {
    return (
      <>
        <Countdown countdown={countdown} />
        <form
          onSubmit={handleSubmitAnswer}
          // className={"flex flex-col justify-center"}
        >
          <RadioGroup
            value={selectAnswer}
            onChange={setSelectAnswer}
            name="answer"
          >
            <RadioGroup.Label className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9 flex justify-center">
              {question.title}
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
              {question.options.map((answer) => (
                <RadioGroup.Option
                  key={answer.id}
                  value={answer.id}
                  disabled={submitButtonRef.current?.disabled}
                  className={({ active }) =>
                    classNames(
                      active
                        ? "border-indigo-600 ring-2 ring-indigo-600"
                        : "border-gray-300",
                      "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
                    )
                  }
                >
                  {({ checked, active }) => (
                    <>
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <RadioGroup.Label
                            as="span"
                            className="block text-sm font-medium text-gray-900"
                          >
                            {answer.title}
                          </RadioGroup.Label>
                        </span>
                      </span>
                      <CheckCircleIcon
                        className={classNames(
                          !checked ? "invisible" : "",
                          "h-5 w-5 text-indigo-600",
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "border-indigo-600" : "border-transparent",
                          "pointer-events-none absolute -inset-px rounded-lg",
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <button
            ref={submitButtonRef}
            type={"submit"}
            className={`rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center flex justify-center mt-4
        ${classNames(
          submitButtonRef.current?.disabled
            ? "cursor-not-allowed bg-gray-400 text-white-400 hover:bg-gray-400"
            : "",
        )}`}
          >
            Valider
          </button>
        </form>
      </>
    );
  } else {
    return (
      <div>
        <p>
          Vous avez {results.correct_answer ? "bien" : "mal"} répondu à la
          question
        </p>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
          {results.results.map((result, index) => (
            <div
              key={index}
              className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
            >
              <span className="flex flex-1">
                <span className="flex flex-col">
                  <span className="block text-sm font-medium text-gray-900">
                    {result.optionTitle}
                  </span>
                  <span className="mt-1 flex items-center text-sm text-gray-500">
                    {result.count} réponses
                  </span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
