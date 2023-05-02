import {Question} from "./QuestionModel";

export class Quiz{
  id:number;
  description: string;
  userId:number;
  title:string;
  questionTime:number;
  livesCount: number;
  accumulateTime: boolean;
  pictureUrl: string;
  questions:Question[];
}
