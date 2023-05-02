export class AnswerDTO {
  constructor(triviaOptionId: number, triviaQuestionId: number, activeTriviaId:number) {
    this.activeTriviaId = activeTriviaId;
    this.triviaOptionId = triviaOptionId;
    this.triviaQuestionId = triviaQuestionId;
  }

  triviaOptionId: number;
  activeTriviaId: number;
  triviaQuestionId: number;
}
