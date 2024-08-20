import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import { Router } from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-stage-two',
  templateUrl: './stage-two.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class StageTwoComponent implements OnInit {
  @Output() stage = new EventEmitter();
  images: any[] = [
    { src: 'ground-green.png', id: 1, clicked: false },
    { src: 'ground-green.png', id: 2, clicked: false },
    { src: 'ground-green.png', id: 3, clicked: false },
    { src: 'ground-green.png', id: 4, clicked: false },
    { src: 'ground-green.png', id: 5, clicked: false },
    { src: 'ground-green.png', id: 6, clicked: false },
    { src: 'ground-green.png', id: 7, clicked: false },
    { src: 'ground-green.png', id: 8, clicked: false },
    { src: 'ground-green.png', id: 9, clicked: false },
  ];

   totalImages: number = 9;
   clickedImages: Set<number> = new Set();
   timerStarted: boolean = false;
   timeoutId: any;
   duration:number = 3;

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
      img.src = 'tree-3.png';
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
    alert('Success! All images were clicked in time.');
    this.stage.emit(3)
  }

  showError() {
    alert('Error! Not all images were clicked in time.');
  }
  reset(){
    this.images.forEach((v:any) => {
      v.src = 'ground-green.png';
      v.clicked = false;
    })
    this.clickedImages.clear()
    this.timerStarted = false
    clearTimeout(this.timeoutId);
  }
}
