import { Answer, Quiz, User } from "@/interfaces";
import { Session } from "@/interfaces/session";

export interface Participation {
  id: string;
  user: User;
  quiz: Quiz;
  answers: Answer[];
  session: Session;
  clientId: string;
}
