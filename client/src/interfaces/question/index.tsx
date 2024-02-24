import { Quiz } from "@/interfaces";

export interface Question {
  id: number;
  title: string;
  quiz?: Quiz;
  options?: Answer[];
  duration: number;
}

export interface Answer {
  id?: number;
  title: string;
  is_correct: boolean;
}
