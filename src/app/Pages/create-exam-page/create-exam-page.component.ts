import {Component} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {autoSave} from "./AutoSave";

interface ITestOption {
  title: string;
}

interface ITest {
  firstName: string;
  secondName: string;
  age: number;
  options: string[]
}

const key = 'save1';

@Component({
  selector: 'app-create-exam-page',
  templateUrl: './create-exam-page.component.html',
  styleUrls: ['./create-exam-page.component.css']
})
export class CreateExamPageComponent {
  constructor(private dialogService: DialogService,
              private fb: FormBuilder) {
  }

  test1: ITest = {
    age: 10,
    options: ["11", "22", "33"],
    secondName: 'second',
    firstName: 'first'
  }

  @autoSave(key)
  form = this.fb.group({
    examName: '',
    examId: '',
    examSession: '',
    firstName: 'first',
    secondName: 'second',
    age: 10,
    questions: new FormArray([
      new FormGroup({
        title: new FormControl('1'),
        options: new FormArray([
          new FormGroup({
            title: new FormControl('option1'),
            isCorrect: new FormControl(false)
          }),
        ])
      })
    ]),
    options: new FormArray([
      new FormGroup({
        title: new FormControl('option1'),
        isCorrect: new FormControl(false)
      }),
      new FormGroup({
        title: new FormControl('option2'),
        isCorrect: new FormControl(false)
      }),
      new FormGroup({
        title: new FormControl('option3'),
        isCorrect: new FormControl(false)
      }),
      new FormGroup({
        title: new FormControl('option4'),
        isCorrect: new FormControl(false)
      }),
    ])
  })

  get options() {
    return this.form.get("options") as FormArray;
  }


  handleFileInput(event: any) {
    // Get the first file from the input
    const file = event.target.files[0];
    console.log(file)
  }

  addQuestion(): void {
    this.dialogService.openAddQuestionDialog().afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        return;
      }
    });
  }

  ngOnInit(): void {
    const optionForm = this.fb.group({
      title: [''],
      isCorrect: [false]
    })
    this.options.push(optionForm);

    //this.form.value.questions.push(test1, test2)

    //this.form.value.questions.push(test1, test2)
    console.log(this.form)


    /*
    const exam: any = {
      title: "ER",
      description: "BEST",
      questions: ["sfdsdfsdf", "fsdfsdfsd", "fsdwerqewqe", "3gsdwergwe", "wer23h343"],
      type: "xcvxc"
    }
    this.exam = exam;
     */
  }

}
