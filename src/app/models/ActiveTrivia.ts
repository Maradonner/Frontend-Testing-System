import {Answer} from "./AnswerModel";
import {Quiz} from "./QuizModel";

export class ActiveTrivia {
  id:number;
  startTime:Date;
  answers:Answer[];
  triviaQuiz: Quiz
  userId:number
}
