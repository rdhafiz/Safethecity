import {Component, ViewChild} from "@angular/core";
import { LoadingService } from "../../../services/loading.service";
import {Router} from "@angular/router";
import {StageOneComponent} from "./stages/stage-one/stage-one.component";
import {StageTwoComponent} from "./stages/stage-two/stage-two.component";
import {StageThreeComponent} from "./stages/stage-three/stage-three.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  imports: [
    StageOneComponent,
    StageTwoComponent,
    StageThreeComponent,
  ],
  standalone: true
})
export class GameComponent   {
  @ViewChild(StageOneComponent) private StageOneComponent: any = StageOneComponent;
  duration: number = 3; // seconds
  progress: number = 0;
  progressPercentage: number = 0;
  progressInterval: any = null;
  stages: any = [1,2,3,4];
  selectedStage: number = 1; // can be from 1 to 4
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
  changeStage(stage:number = 0){
    this.selectedStage = stage
    this.loadData()
  }
}
