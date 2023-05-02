import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-page',
  templateUrl: './choose-page.component.html',
  styleUrls: ['./choose-page.component.css']
})
export class ChoosePageComponent {

  perem:boolean = false;

  clicker(){
    console.log(this.perem)
  }

}
