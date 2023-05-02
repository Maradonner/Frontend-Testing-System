import {Data} from "./Data";

export class ContinueTriviaResponse{
  correctAnswer:string;
  isCorrect:boolean;
  isTimedOut:boolean;
  isFinished:boolean;
  livesCount:number;
  livesLeft:number;
  question: Data;
}
