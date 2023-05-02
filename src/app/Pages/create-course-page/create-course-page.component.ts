import { Component } from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {FormControl} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

export interface Vegetable {
  name: string;
}

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.css']
})
export class CreateCoursePageComponent {
  vegetables: Vegetable[] = [
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
  ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    const veget: Vegetable = {
      name:value
    }

    // Add our keyword
    if (value) {
      this.vegetables.push(veget);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  drop(event: CdkDragDrop<Vegetable[]>) {
    moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }

  removeKeyword(keyword: Vegetable) {
    const index = this.vegetables.indexOf(keyword);
    if (index >= 0) {
      this.vegetables.splice(index, 1);
    }
  }

}
