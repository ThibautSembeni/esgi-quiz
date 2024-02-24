"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/molecules/tables";
import { Quiz, Session } from "@/interfaces";

export default function Quiz() {
  const [session, setSession] = useState<Session[]>([]);
  const getAllSession = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    setSession(data);
  };

  useEffect(() => {
    getAllSession();
  }, []);

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8">
        <Table
          headersColumns={["Nom du quiz", "Code Pin de la session"]}
          bodyRows={session.map((q) => [q.quiz.name, q.id])}
          type="striped rows"
          title="Sessions"
          description="Liste des sessions lancées"
          addingButton={true}
          addingButtonLabel="Lancer une session"
          addingLink="/session-list/add"
          editButton={false}
          editButtonLabel="Modifier un quiz"
          editLink="/quiz/edit"
          additionalButton={false}
          additionalButtonLabel="Démarrer la session"
        />
      </div>
    </div>
  );
}
