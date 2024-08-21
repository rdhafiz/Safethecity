import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
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
  @Input() duration:number = 15;
  @Input() images: any[] = [];
  @Input() defaultImage: string = '';
  @Input() changeImageTo: string = '';
  @Input() totalImages: number = 25;

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
    this.timeoutId = setInterval(() => {
      // Reset one random image every interval
      this.resetOneRandomImage();

      // If all images have been clicked, show success and clear the interval
      if (this.clickedImages.size === this.totalImages) {
        this.showSuccess();
        clearInterval(this.timeoutId);
      }
    }, this.duration * 1000);
  }

  showSuccess() {
    this.stage.emit(2)
  }

  showError() {
    console.log('Error! Not all images were clicked in time.');
  }
  resetOneRandomImage() {
    const clickedImages = Array.from(this.clickedImages);

    if (clickedImages.length > 0) {
      // Select a random image from the clicked images
      const randomIndex = Math.floor(Math.random() * clickedImages.length);
      const randomImageId = clickedImages[randomIndex];

      // Find the image in the images array and reset it
      const imageToReset = this.images.find((img: any) => img.id === randomImageId);
      if (imageToReset) {
        imageToReset.src = this.defaultImage;
        imageToReset.clicked = false;
      }

      // Remove the reset image from the clickedImages set
      this.clickedImages.delete(randomImageId);
    }

    // If all images are reset, clear the timer
    if (this.clickedImages.size === 0) {
      this.timerStarted = false;
      clearInterval(this.timeoutId);
    }
  }
}
