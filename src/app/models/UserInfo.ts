import {Quiz} from "./QuizModel";

export interface UserInfo{
  id?:number;
  username:string;
  role:string;
  quizzes: Quiz[];
}
