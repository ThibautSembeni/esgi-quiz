import { Quiz } from "@/interfaces";

export interface Question {
  id: number;
  title: string;
  quiz: Quiz;
  options?: Answer[];
}

export interface Answer {
  title: string;
  is_correct: boolean;
}
