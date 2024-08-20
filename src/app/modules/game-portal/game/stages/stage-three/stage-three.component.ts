import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import { Router } from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-stage-three',
  templateUrl: './stage-three.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class StageThreeComponent implements OnInit {
  @Output() stage = new EventEmitter();
  @Input() duration:number = 10;
  @Input() images: any[] = [];
  @Input() defaultImage: string = '';
  @Input() changeImageTo: string = '';

   totalImages: number = 9;
   clickedImages: Set<number> = new Set();
   timerStarted: boolean = false;
   timeoutId: any;

  constructor(private route: Router) {}

  ngOnInit() {
    // No initial timer; will be started on first click
  }

  changeLand(img: any) {
    if (!img.clicked) {
      // Start the timer on the first click
      if (!this.timerStarted) {
        this.startTimer();
        this.timerStarted = true;
      }

      // Change the image source
      img.src = this.changeImageTo;
      img.clicked = true;
      this.clickedImages.add(img.id);

      // Check if all images have been clicked
      if (this.clickedImages.size === this.totalImages) {
        this.showSuccess();
        clearTimeout(this.timeoutId); // Clear the timer if all images are clicked
      }
    }
  }

  startTimer() {
    this.timeoutId = setTimeout(() => {
      // Check if all images are clicked after the timer ends
      if (this.clickedImages.size !== this.totalImages) {
        this.showError();
      }
      this.reset()
    }, this.duration * 1000);
  }

  showSuccess() {
    this.stage.emit(3)
  }

  showError() {
    console.log('Error! Not all images were clicked in time.');
  }
  reset(){
    this.images.forEach((v:any) => {
      v.src = this.defaultImage;
      v.clicked = false;
    })
    this.clickedImages.clear()
    this.timerStarted = false
    clearTimeout(this.timeoutId);
  }
}
