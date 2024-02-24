import { Participation } from '../../participation/entities/participation.entity';
import { Question } from '../../question/entities/question.entity';
import { Option } from '../../option/entities/option.entity';

export class CreateAnswerDto {
  participation: Participation;
  question: Question;
  option: Option;
}
