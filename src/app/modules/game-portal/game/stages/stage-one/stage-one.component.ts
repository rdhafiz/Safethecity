import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {Router} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-stage-one',
  templateUrl: './stage-one.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class StageOneComponent implements OnInit {
  @Output() stage = new EventEmitter();
  @Input() duration:number = 20;
  images: any[] = [
    {src: 'ground.png', id: 1, clicked: false},
    {src: 'ground.png', id: 2, clicked: false},
    {src: 'ground.png', id: 3, clicked: false},
    {src: 'ground.png', id: 4, clicked: false},
    {src: 'ground.png', id: 5, clicked: false},
    {src: 'ground.png', id: 6, clicked: false},
    {src: 'ground.png', id: 7, clicked: false},
    {src: 'ground.png', id: 8, clicked: false},
    {src: 'ground.png', id: 9, clicked: false},
  ];

  totalImages: number = 9;
  clickedImages: Set<number> = new Set();
  timerStarted: boolean = false;
  timeoutId: any;

  constructor(private route: Router) {
  }

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
      img.src = 'ground-green.png';
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
    this.stage.emit(1)
  }

  showError() {
    alert('Error! Not all images were clicked in time.');
  }

  reset() {
    this.images.forEach((v: any) => {
      v.src = 'ground.png';
      v.clicked = false;
    })
    this.clickedImages.clear()
    this.timerStarted = false
    clearTimeout(this.timeoutId);
  }
}
