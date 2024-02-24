"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/molecules/tables";
import { Question } from "@/interfaces";
export default function Question() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const getQuestions = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/question`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = await response.json();
    setQuestions(data);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8">
        <Table
          headersColumns={["Question", "Quiz"]}
          bodyRows={questions.map((question) => [
            question.title,
            question.quiz.name,
          ])}
          type="striped rows"
          title="Questions"
          description="Liste des questions disponibles."
          addingButton={true}
          addingButtonLabel="Ajouter une question"
          addingLink="/questions/add"
          editButton={false}
          editButtonLabel="Modifier un question"
          editLink="/questions/edit"
        />
      </div>
    </div>
  );
}
