import { User } from '../../user/entities/user.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Session } from '../../session/entities/session.entity';

export class CreateParticipationDto {
  user: User;
  quiz: Quiz;
  session: Session;
  clientId: string;
}
