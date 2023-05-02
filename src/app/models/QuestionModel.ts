import {Option} from "./OptionModel";

export class Question{
  id:number;
  title:string;
  pictureUrl: string;
  options:Option[];
}
