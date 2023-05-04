import {Quiz} from "./QuizModel";

export interface UserInfo{
  id?:number;
  email:string;
  role:string;
  quizzes: Quiz[];
}
