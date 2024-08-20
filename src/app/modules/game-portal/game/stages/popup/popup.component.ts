import {Component, ViewChild} from "@angular/core";
import {LoadingService} from "../../../../../services/loading.service";
import {Router} from "@angular/router";
import {StageOneComponent} from "../stage-one/stage-one.component";
import {StageTwoComponent} from "../stage-two/stage-two.component";
import {StageThreeComponent} from "../stage-three/stage-three.component";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  imports: [
    StageOneComponent,
    StageTwoComponent,
    StageThreeComponent,
  ],
  standalone: true
})
export class PopupComponent   {
  @ViewChild(StageOneComponent) private StageOneComponent: any = StageOneComponent;
  duration: number = 3; // seconds
  progress: number = 0;
  progressPercentage: number = 0;
  progressInterval: any = null;
  stages: any = [1,2,3];
  stagesDuration: any = [20,15,10];
  selectedStage: number = 0 ; // can be from 0 to 3
  constructor(private loadingService: LoadingService, private route:Router) {
    this.loadData();
  }

  loadData() {
    this.progressPercentage = 0;
    this.progress = 0;
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
    if(this.stages[this.selectedStage] != undefined){
      this.loadData()
    }else{
      this.route.navigate(['/portal'])
    }
  }

  closeModel() {
    const modelDiv = document.getElementById('stageModal');
    if(modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

}
