"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Question } from "@/interfaces";
import QuestionComponent from "@/components/molecules/question";
export default function Session() {
  const router = useRouter();
  const params = useSearchParams();
  const { isAuthenticated, user } = useAuth();
  const sessionId = params.get("session");
  const currentSocket = useRef<Socket>();
  const [username, setUsername] = useState<string | null>(null);
  const [membersCount, setMembersCount] = useState<number>(0);
  const [sessionStatus, setSessionStatus] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [results, setResults] = useState<{
    correct_answer: boolean;
    results: {
      optionTitle: string;
      count: number;
      isCorrect: boolean;
    }[];
  }>();
  useEffect(() => {
    const socket = io(
      `${process.env.NEXT_PUBLIC_API_URL}/session${
        isAuthenticated && user.roles === "user"
          ? `?token=${localStorage.getItem("access_token")}`
          : ""
      }`,
    );
    currentSocket.current = socket;
    console.log("Connecting to server");
    socket.on("connect", () => {
      console.log("Connected to server", sessionId);
      // socket.emit("join", sessionId);
    });

    socket.on("session_not_found", () => {
      console.error("Session not found");
      socket.close();
      router.push("/");
    });

    socket.on("unauthorized", () => {
      console.log("Session unauthorized");
    });

    socket.on("members-number", (data) => {
      console.log("members-number", data);
      setMembersCount(data);
    });

    socket.on("session-started", () => {
      console.log("session-started");
      setSessionStatus("started");
    });

    socket.on("session-finish", () => {
      console.log("session-finish");
      setSessionStatus("finish");
    });

    socket.on("question-sent", (question: Question) => {
      console.log("question-sent", question);
      setCurrentQuestion(question);
      setResults(null);
    });

    socket.on("countdown", (data) => {
      console.log("countdown", data);
      setCountdown(data);
    });

    socket.on("results-sent", (data) => {
      setResults(data);
    });

    return () => {
      console.log("Disconnecting from server");
      socket.close();
    };
  }, []);

  const handleSubmitUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    setUsername(username as string);
    currentSocket.current.emit("join", { sessionId, username });
  };

  const handleStartQuiz = () => {
    currentSocket.current.emit("start-session", { session: sessionId });
  };
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="mt-10">
          {username === null && !isAuthenticated && (
            <form onSubmit={handleSubmitUsername}>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Sarah Connor"
                  aria-describedby="username-description"
                  required={true}
                />
                <button
                  type={"submit"}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Rejoindre
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500" id="email-description">
                Vous allez rejoindre la session en tant qu'invité.
              </p>
            </form>
          )}
          {username !== null &&
            !isAuthenticated &&
            sessionStatus !== "started" &&
            sessionStatus !== "finish" && (
              <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                <p>Vous avez rejoint la session.</p>
                <p>En attente de la connexion des autres participants</p>
                <p>Vous êtes {membersCount} dans la session.</p>
              </blockquote>
            )}
          {isAuthenticated &&
            user.roles === "user" &&
            sessionStatus !== "started" &&
            sessionStatus !== "finish" && (
              <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                <p>Vous êtes {membersCount} dans la session.</p>
                <button
                  type={"button"}
                  onClick={handleStartQuiz}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Lancer le quiz
                </button>{" "}
              </blockquote>
            )}
          {sessionStatus === "started" && (
            <>
              {currentQuestion && (
                <QuestionComponent
                  socket={currentSocket.current}
                  question={currentQuestion}
                  countdown={countdown}
                  results={results}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
