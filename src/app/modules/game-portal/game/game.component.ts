import { Component, ViewChild } from "@angular/core";
import { LoadingService } from "../../../services/loading.service";
import { Router } from "@angular/router";
import { StageOneComponent } from "./stages/stage-one/stage-one.component";
import { StageTwoComponent } from "./stages/stage-two/stage-two.component";
import { StageThreeComponent } from "./stages/stage-three/stage-three.component";
import { PopupComponent } from "./stages/popup/popup.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  imports: [
    StageOneComponent,
    StageTwoComponent,
    StageThreeComponent,
    PopupComponent,
  ],
  standalone: true
})
export class GameComponent {
  // Reference to the PopupComponent used to control the modal
  @ViewChild(PopupComponent) private PopupComponent: any = PopupComponent;

  // Duration for the loading screen in seconds
  duration: number = 1;
  // Current progress of the loading screen
  progress: number = 0;
  // Progress percentage for the loading screen
  progressPercentage: number = 0;
  // Interval ID for updating progress
  progressInterval: any = null;
  // Array of stages
  stages: any = [1, 2, 3];
  // Duration for each stage in seconds
  stagesDuration: any = [15, 10, 7];
  // Index of the stage to select next
  selectNextStage: number = 0; // can be from 0 to 3
  // Index of the currently selected stage
  selectedStage: number = 0; // can be from 0 to 3

  constructor(private loadingService: LoadingService, private route: Router) {
    this.pageLoading();
  }

  // Function to handle the loading screen
  pageLoading() {
    // Reset progress and percentage
    this.progressPercentage = 0;
    this.progress = 0;
    // Show the loading screen
    this.loadingService.show();

    // Update progress every second
    this.progressInterval = setInterval(() => {
      this.progress = this.progress + 0.1;
      this.progressPercentage = (this.progress / this.duration) * 100; // Calculate percentage
      this.loadingService.setProgress(this.progressPercentage);
      // Check if progress has reached the duration
      if (this.progress >= this.duration) {
        this.completeProgress();
      }
    }, 100);

    // Complete the progress after the specified duration
    setTimeout(() => {
      this.completeProgress();
    }, this.duration * 1000);
  }

  // Function to complete the loading screen
  completeProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.progress = this.duration; // Ensure progress is set to 100%
    this.loadingService.hide();
  }

  // Function to change the stage and open the modal
  changeStage(stage: number = 0) {
    this.selectNextStage = stage;
    let messageParam:any = {
      title:'',
      subTitle:'',
    }
    switch (stage){
      case 1:
        messageParam.title = 'Success!';
        messageParam.subTitle = 'You have successfully planted grass';
        break;
      case 2:
        messageParam.title = 'Success!';
        messageParam.subTitle = 'You have successfully planted trees';
        break;
      case 3:
        messageParam.title = 'Success!';
        messageParam.subTitle = 'You have successfully build houses';
        break;
      default:
        messageParam.title = 'Unknown Stage';
        messageParam.subTitle = 'The stage does not match any predefined stages.';
    }
    this.PopupComponent.openModal(messageParam);
  }

  // Function to proceed to the next stage or navigate to a different route
  nextStage() {
    this.progress = 0;
    this.progressPercentage = 0;
    this.selectedStage = this.selectNextStage;
    // Check if the selected stage is valid
    if (this.stages[this.selectedStage] !== undefined) {
      this.pageLoading();
    } else {
      // Navigate to the '/portal' route if the stage is invalid
      this.route.navigate(['/portal']);
    }
  }
}
