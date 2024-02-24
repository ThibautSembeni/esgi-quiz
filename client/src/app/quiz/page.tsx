"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/molecules/tables";
import { Quiz } from "@/interfaces";

export default function Quiz() {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const getAllQuiz = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setQuiz(data);
  };

  useEffect(() => {
    getAllQuiz();
  }, []);

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8">
        <Table
          headersColumns={["Nom"]}
          bodyRows={quiz.map((q) => [q.name])}
          type="striped rows"
          title="Quiz"
          description="Liste des quiz"
          addingButton={true}
          addingButtonLabel="Ajouter un quiz"
          addingLink="/quiz/add"
          editButton={true}
          editButtonLabel="Modifier un quiz"
          editLink="/quiz/edit"
        />
      </div>
    </div>
  );
}
