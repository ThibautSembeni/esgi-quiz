"use client";
import { Switch } from "@headlessui/react";
import React, { useState } from "react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface AnswerProps {
  type: "new" | "confirmed";
  onSubmit: (title: string, is_correct: boolean) => void;
}
export default function Answer({ type, onSubmit }: AnswerProps) {
  const [enabled, setEnabled] = useState(false);
  const [title, setTitle] = useState("");
  return (
    <>
      {type === "new" && (
        <div
          className={
            "m-2 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
          }
        >
          <div className={"flex justify-start items-center space-x-1"}>
            <label
              htmlFor="option-title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Titre de la réponse
              <span className={"text-red-500"}>*</span>
            </label>
            <div className="w-full">
              <input
                type="option-title"
                id="option-title"
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="you@example.com"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Switch.Group
              as="div"
              className="flex items-center justify-between"
            >
              <span className="flex flex-grow flex-col">
                <Switch.Label
                  as="span"
                  className="text-sm font-medium leading-6 text-gray-900"
                  passive
                >
                  Bonne réponse ?
                </Switch.Label>
                <Switch.Description as="span" className="text-sm text-gray-500">
                  Renseignez si cette réponse est une bonne réponse.
                </Switch.Description>
              </span>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                name={"option-is_correct"}
                className={classNames(
                  enabled ? "bg-indigo-600" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  )}
                />
              </Switch>
            </Switch.Group>
          </div>
          <div className={"flex items-center justify-end gap-2"}>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                setTitle("");
                setEnabled(false);
              }}
            >
              Réinitialiser
            </button>
            <button
              type="button"
              onClick={() => {
                onSubmit(title, enabled);
                setTitle("");
                setEnabled(false);
              }}
              disabled={!title || title.length < 1}
              className={`rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${classNames(
                !title || title.length < 1
                  ? "cursor-not-allowed text-gray-400 bg-gray-200"
                  : "",
              )}`}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
      {type === "confirmed" && (
        <div
          className={
            "m-2 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8"
          }
        >
          <div className={"flex justify-start items-center space-x-1"}>
            <label
              htmlFor="option-title"
              className="block text-sm font-medium leading-6 text-gray-900"
            ></label>
          </div>
        </div>
      )}
    </>
  );
}
