import {Component, ViewChild} from "@angular/core";
import { LoadingService } from "../../../services/loading.service";
import {Router} from "@angular/router";
import {StageOneComponent} from "./stages/stage-one/stage-one.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  imports: [
    StageOneComponent,
  ],
  standalone: true
})
export class GameComponent   {
  @ViewChild(StageOneComponent) private StageOneComponent: any = StageOneComponent;
  duration: number = 3; // seconds
  progress: number = 0;
  progressPercentage: number = 0;
  progressInterval: any = null;
  constructor(private loadingService: LoadingService, private route:Router) {
    this.loadData();
  }

  loadData() {
    this.loadingService.show();
    this.progressInterval = setInterval(() => {
      this.progress++;
      this.progressPercentage = (this.progress / this.duration) * 100; // Calculate percentage
      this.loadingService.setProgress(this.progressPercentage);
      if (this.progress >= this.duration) {
        this.completeProgress();
      }
    }, 1000);

    setTimeout(() => {
      this.completeProgress();
    }, this.duration * 1000);
  }

  completeProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.progress = this.duration; // Ensure progress is set to 100%
    this.loadingService.hide();

  }
}
