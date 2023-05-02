import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appMouse]'
})
export class MouseDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() updateProgress = new EventEmitter<any>();


  @HostListener('mouseenter') onMouseEnter() {
    this.fileOver = true;
    this.updateProgress.emit('on');
    console.log('enter')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.fileOver = false;
    this.updateProgress.emit('from');
    console.log('leave')
  }

}
