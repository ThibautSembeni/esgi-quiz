"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Quiz } from "@/interfaces";

export default function addQuiz() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const body = {
      quiz: data.quiz,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(body),
    });
    const res = await response.json();
    router.push("/session-list");
  };

  const getQuiz = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Session
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Pour lancer une section veuillez choisir un quiz
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
              <div className="sm:col-span-4">
                <label
                  htmlFor="maxParticipants"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre de participants maximum
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      name="maxParticipants"
                      id="maxParticipants"
                      autoComplete="maxParticipants"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={router.back}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </>
  );
}
