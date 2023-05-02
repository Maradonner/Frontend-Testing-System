import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {atLeastOneCheckboxCheckedValidator} from "./atLeastOneCheckboxCheckedValidator";
import {HttpClient} from "@angular/common/http";
import {Question} from "../../models/QuestionModel";
import {Option} from "../../models/OptionModel";


@Component({
  selector: 'app-create-question-dialog',
  templateUrl: './create-question-dialog.component.html',
  styleUrls: ['./create-question-dialog.component.css']
})
export class CreateQuestionDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateQuestionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Question, string],
              public dialog: MatDialog,
              private fb: FormBuilder,
              private http: HttpClient) {
  }

  files: File[] = [];
  file: File;
  question: Question;
  tmpPictureLink: string;
  url: any;
  questions: Question[] = [];
  selectedFile: File = null;

  form = this.fb.group({
    options: this.fb.array([], {validators: atLeastOneCheckboxCheckedValidator()}),
    title: ['', [Validators.required]],
    pictureUrl: ['', [Validators.required]],
  });

  addOption(title: string = '', isCorrect: boolean = false) {
    const optionForm = this.fb.group({
      title: [title, Validators.required],
      isCorrect: [isCorrect]
    })
    this.options.push(optionForm);
  }

  onFileSelected(event) {
    //this.prepareFilesList(event.target.files);
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append("file", this.selectedFile)
    fd.append("upload_preset", "default")
    fd.append("cloud_name", "dwa1jwp8z")
    console.log("SelectedFile:", this.selectedFile);
    console.log(fd);

    this.http.post('https://api.cloudinary.com/v1_1/dwa1jwp8z/image/upload', fd).subscribe((response: any) => {
      console.log(response);
      this.tmpPictureLink = response.secure_url;
    })
  }

  onFileDropped(files: File[]) {
    this.prepareFilesList(files[0]);
  }

  fileBrowseHandler(event: any) {
    this.prepareFilesList(event.target.files[0]);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  prepareFilesList(file: File) {
    this.selectedFile = file;
    this.file = file;
    this.onUpload();
  }

  get options() {
    return this.form.get("options") as FormArray;
  }

  deleteOption(lessonIndex: number) {
    this.options.removeAt(lessonIndex);
  }

  compareOptions(o1: Option, o2: Option): boolean {
    return o1?.isCorrect === o2?.isCorrect && o1?.title == o2?.title;
  }

  ngOnInit(): void {
    this.question = this.data[0];

    this.form.get('title').setValue(this.question.title);
    this.form.get('pictureUrl').setValue(this.question.pictureUrl);
    console.log(this.question.pictureUrl)


    //this.form.value.title = this.question.title;
    //this.form.value.pictureUrl = this.question.pictureUrl;

    /*
    this.tmpOption = this.question.options.filter(x => x.isCorrect)[0];
     */


    if (this.question.options.length == 0) {
      this.addOption();
      this.addOption();
      this.addOption();
      this.addOption();
    }

    this.question.options.forEach(e => {
      this.addOption(e.title, e.isCorrect);
    })


    /*
    this.tmpTitle = this.question.title;
    //this.tmpOptions = this.question.options;
    this.tmpAnswer = this.question.answer;
    console.log(this.tmpAnswer)
     */
  }

  onConfirm(): void {
    this.options.getRawValue().forEach(e => {
      this.form.value.options.push(e)
    });
    this.question = this.form.getRawValue() as unknown as Question;
    this.dialogRef.close(this.question);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

}
