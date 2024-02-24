import { Quiz } from "@/interfaces";

export interface Session {
  id: string;
  user: string;
  quiz: Quiz;
  options?: Answer[];
}

export interface Answer {
  title: string;
  is_correct: boolean;
}
