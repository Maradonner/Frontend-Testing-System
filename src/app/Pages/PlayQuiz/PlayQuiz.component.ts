import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Subscription, timer} from "rxjs";
import {Data} from "../../models/Data";
import {Option} from "../../models/OptionModel";


@Component({
  selector: 'app-PlayQuiz',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class PlayQuizComponent {
  select: Option;
  data: Data;
  progressValue = 100;
  sub: Subscription;
  secondsLeft: number;
  option: Option = {
    id: 0,
    triviaQuestionId: 0,
    isCorrect: false,
    title: ''
  }

  @Output()
  selectedOption = new EventEmitter<Option>();

  @Input("select")
  set setTasks(option: Option) {
    this.select = option;
  }

  @Input("data")
  set setData(data: Data) {
    this.data = data;
    this.isClicked = false;

    if (!!this.data) {
      if (this.secondsLeft > 0 && data.accumulateTime == 1) {
        this.timer(this.secondsLeft + this.data.questionTime);
      } else {
        this.timer(this.data.questionTime);
      }
    }
  }


  timer(seconds: number) {
    const length = seconds * 1000;
    const start = new Date().getTime();
    const source = timer(0, 250);

    this.sub = source.subscribe(() => {
      const time = new Date().getTime();
      this.secondsLeft = (length - (time - start)) / 1000;
      if (time - start > length) {
        this.option.triviaQuestionId = this.data.question.id;
        this.onSelectOption(this.option)
      }
      this.progressValue = 100 - 100 * (time - start) / length;
    });
  }

  isClicked: boolean = false;

  onSelectOption(option: Option) {
    if (this.isClicked) {
      return;
    }
    this.isClicked = true;
    console.log("OnSELECT:", this.select, this.data, this.progressValue, this.sub)
    this.sub.unsubscribe();
    this.selectedOption.emit(option);
  }

  ngOnDestroy() {
    if (!!this.sub)
      this.sub.unsubscribe();
  }

}
