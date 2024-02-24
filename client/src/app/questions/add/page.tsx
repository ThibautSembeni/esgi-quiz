"use client";
import Answer from "@/components/molecules/answer";
import { Answer as AnswerType, Quiz } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function AddQuestion() {
  const [options, setOptions] = useState<AnswerType[]>([]);
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const router = useRouter();
  const handleAddAnswer = async (title: string, is_correct: boolean) => {
    setOptions([...options, { title, is_correct }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const payload = {
      title: data.title,
      quiz: data.quiz,
      options: options,
      duration: data.duration || 30,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/question`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      },
    );
    const res = await response.json();
    console.log(res);
    router.push("/questions");
  };

  const getQuiz = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    setQuiz(data);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Créer une question
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Sélectionnez le quiz auquel vous souhaitez ajouter une question et
            remplissez les champs ci-dessous.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Titre de la question
                <span className={"text-red-500"}>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="question-title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"Quelle est la capitale de la France ?"}
                  required={true}
                />
              </div>
            </div>
            <div className="col-span-4">
              <label
                htmlFor="duration"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Temps de réponse (en secondes)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  autoComplete="question-duration"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"30"}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="quiz"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quiz
              </label>
              <div className="mt-2">
                <select
                  id="quiz"
                  name="quiz"
                  autoComplete="quiz-name"
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {quiz.map((quiz, index) => (
                    <option key={index} value={quiz.id}>
                      {quiz.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <p className="block text-sm font-medium leading-6 text-gray-900">
                Réponses
              </p>
              {options.length > 0 && (
                <ul className="mt-2 flex items-center gap-2">
                  {options.map((option, index) => (
                    <li key={index}>
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          option.is_correct
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        } `}
                      >
                        {option.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <Answer type={"new"} onSubmit={handleAddAnswer} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
